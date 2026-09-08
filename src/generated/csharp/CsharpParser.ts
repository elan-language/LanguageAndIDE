// Generated from src/grammars/csharp/Csharp.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { CsharpListener } from "./CsharpListener.js";
import { CsharpVisitor } from "./CsharpVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class CsharpParser extends antlr.Parser {
    public static readonly STATIC = 1;
    public static readonly VOID = 2;
    public static readonly TEST_CLASS_ANNOT = 3;
    public static readonly TEST_METHOD_ANNOT = 4;
    public static readonly CONST = 5;
    public static readonly ENUM = 6;
    public static readonly ABSTRACT = 7;
    public static readonly FOREACH = 8;
    public static readonly VAR = 9;
    public static readonly ASSERT = 10;
    public static readonly ARE_EQUAL = 11;
    public static readonly SEMI_COLON = 12;
    public static readonly THROW = 13;
    public static readonly NEW = 14;
    public static readonly CATCH = 15;
    public static readonly PUBLIC = 16;
    public static readonly PRIVATE = 17;
    public static readonly GET = 18;
    public static readonly SET = 19;
    public static readonly GET_SET = 20;
    public static readonly CLASS = 21;
    public static readonly ELSE = 22;
    public static readonly FOR = 23;
    public static readonly IF = 24;
    public static readonly IN = 25;
    public static readonly INPUT = 26;
    public static readonly LAMBDA = 27;
    public static readonly MAIN = 28;
    public static readonly PRINT = 29;
    public static readonly RETURN = 30;
    public static readonly TRY = 31;
    public static readonly WHILE = 32;
    public static readonly ARROW = 33;
    public static readonly MOD = 34;
    public static readonly EQUAL = 35;
    public static readonly NOT_EQUAL = 36;
    public static readonly AND = 37;
    public static readonly OR = 38;
    public static readonly NOT = 39;
    public static readonly INTERPOLATED_STRING_PREFIX = 40;
    public static readonly INT_NAME = 41;
    public static readonly FLOAT_NAME = 42;
    public static readonly BOOL_NAME = 43;
    public static readonly STRING_NAME = 44;
    public static readonly LIST_NAME = 45;
    public static readonly BINARY_PREFIX = 46;
    public static readonly HEX_PREFIX = 47;
    public static readonly THIS_INSTANCE = 48;
    public static readonly TUPLE = 49;
    public static readonly COMMENT = 50;
    public static readonly LIT_BOOLEAN = 51;
    public static readonly POWER = 52;
    public static readonly WS = 53;
    public static readonly NL = 54;
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
    public static readonly IF_ = 74;
    public static readonly NAME_STARTING_TEST_ = 75;
    public static readonly NAME_STARTING_LC = 76;
    public static readonly NAME_STARTING_UC = 77;
    public static readonly LITERAL_BINARY = 78;
    public static readonly LITERAL_HEX = 79;
    public static readonly LITERAL_INTEGER = 80;
    public static readonly LITERAL_FLOAT = 81;
    public static readonly INTERPOLATED_STRING = 82;
    public static readonly LITERAL_STRING = 83;
    public static readonly WHITESPACES = 84;
    public static readonly TEXT = 85;
    public static readonly GHOSTED = 86;
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
    public static readonly RULE_litInt = 47;
    public static readonly RULE_litFloat = 48;
    public static readonly RULE_enumValue = 49;
    public static readonly RULE_litString = 50;
    public static readonly RULE_index = 51;
    public static readonly RULE_identifierWithOptIndexes = 52;
    public static readonly RULE_propertyRef = 53;
    public static readonly RULE_expression = 54;
    public static readonly RULE_term = 55;
    public static readonly RULE_chainHead = 56;
    public static readonly RULE_chainable = 57;
    public static readonly RULE_bracketedExpression = 58;
    public static readonly RULE_unaryExpression = 59;
    public static readonly RULE_binaryExpression = 60;
    public static readonly RULE_tuple = 61;
    public static readonly RULE_methodCall = 62;
    public static readonly RULE_binaryOperator = 63;
    public static readonly RULE_newInstance = 64;
    public static readonly RULE_paramDef = 65;
    public static readonly RULE_typeGeneric = 66;
    public static readonly RULE_typeTuple = 67;
    public static readonly RULE_lambda = 68;
    public static readonly RULE_list = 69;
    public static readonly RULE_interpolatedString = 70;
    public static readonly RULE_power = 71;

    public static readonly literalNames = [
        null, "'static'", "'void'", null, null, "'const'", "'enum'", "'abstract'", 
        "'foreach'", "'var'", "'Assert'", "'areEqual'", "';'", "'throw'", 
        "'new'", "'catch'", "'public'", "'private'", "'get'", "'set'", null, 
        "'class'", "'else'", "'for'", "'if'", "'in'", "'input'", "'lambda'", 
        "'main'", "'print'", "'return'", "'try'", "'while'", "'=>'", "'%'", 
        "'=='", "'!='", "'&&'", "'||'", "'!'", "'$'", "'int'", "'double'", 
        "'bool'", "'string'", "'List'", "'0b'", "'0x'", "'this'", "'tuple'", 
        null, null, "'^'", null, null, "'='", "'{'", "'}'", "'['", "']'", 
        "'('", "')'", "'.'", "','", "':'", "'+'", "'-'", "'*'", "'/'", "'<'", 
        "'>'", "'<='", "'>='", "'\"'", "'if_'", null, null, null, null, 
        null, null, null, null, null, null, null, "'[ghosted]'"
    ];

    public static readonly symbolicNames = [
        null, "STATIC", "VOID", "TEST_CLASS_ANNOT", "TEST_METHOD_ANNOT", 
        "CONST", "ENUM", "ABSTRACT", "FOREACH", "VAR", "ASSERT", "ARE_EQUAL", 
        "SEMI_COLON", "THROW", "NEW", "CATCH", "PUBLIC", "PRIVATE", "GET", 
        "SET", "GET_SET", "CLASS", "ELSE", "FOR", "IF", "IN", "INPUT", "LAMBDA", 
        "MAIN", "PRINT", "RETURN", "TRY", "WHILE", "ARROW", "MOD", "EQUAL", 
        "NOT_EQUAL", "AND", "OR", "NOT", "INTERPOLATED_STRING_PREFIX", "INT_NAME", 
        "FLOAT_NAME", "BOOL_NAME", "STRING_NAME", "LIST_NAME", "BINARY_PREFIX", 
        "HEX_PREFIX", "THIS_INSTANCE", "TUPLE", "COMMENT", "LIT_BOOLEAN", 
        "POWER", "WS", "NL", "SINGLE_EQUALS", "OPEN_BRACE", "CLOSE_BRACE", 
        "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", "CLOSE_BRACKET", 
        "DOT", "COMMA", "COLON", "PLUS", "MINUS", "MULT", "DIVIDE", "LT", 
        "GT", "LE", "GE", "DOUBLE_QUOTES", "IF_", "NAME_STARTING_TEST_", 
        "NAME_STARTING_LC", "NAME_STARTING_UC", "LITERAL_BINARY", "LITERAL_HEX", 
        "LITERAL_INTEGER", "LITERAL_FLOAT", "INTERPOLATED_STRING", "LITERAL_STRING", 
        "WHITESPACES", "TEXT", "GHOSTED"
    ];
    public static readonly ruleNames = [
        "file", "global", "main", "function", "test", "procedure", "constant", 
        "enum", "concreteClass", "abstractClass", "commentLine", "ordinaryStatement", 
        "ifStatement", "whileLoop", "forLoop", "tryStatement", "assert", 
        "letStatement", "print", "variableDefinition", "assignment", "inputStatement", 
        "procedureCall", "throwStatement", "returnStatement", "elseIfClause", 
        "elseClause", "catchStatement", "constructorMember", "property", 
        "functionMethod", "procedureMethod", "abstractFunction", "abstractProcedure", 
        "identifier", "assignable", "methodName", "testName", "typeName", 
        "constantValue", "argList", "argument", "paramsList", "type", "enumValuesList", 
        "assertActual", "litValue", "litInt", "litFloat", "enumValue", "litString", 
        "index", "identifierWithOptIndexes", "propertyRef", "expression", 
        "term", "chainHead", "chainable", "bracketedExpression", "unaryExpression", 
        "binaryExpression", "tuple", "methodCall", "binaryOperator", "newInstance", 
        "paramDef", "typeGeneric", "typeTuple", "lambda", "list", "interpolatedString", 
        "power",
    ];

    public get grammarFileName(): string { return "Csharp.g4"; }
    public get literalNames(): (string | null)[] { return CsharpParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return CsharpParser.symbolicNames; }
    public get ruleNames(): string[] { return CsharpParser.ruleNames; }
    public get serializedATN(): number[] { return CsharpParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, CsharpParser._ATN, CsharpParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public file(): FileContext {
        let localContext = new FileContext(this.context, this.state);
        this.enterRule(localContext, 0, CsharpParser.RULE_file);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                {
                this.state = 144;
                this.match(CsharpParser.COMMENT);
                }
                break;
            }
            this.state = 150;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2097386) !== 0) || _la === 50) {
                {
                {
                this.state = 147;
                this.global();
                }
                }
                this.state = 152;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 54) {
                {
                {
                this.state = 153;
                this.match(CsharpParser.NL);
                }
                }
                this.state = 158;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 159;
            this.match(CsharpParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public global(): GlobalContext {
        let localContext = new GlobalContext(this.context, this.state);
        this.enterRule(localContext, 2, CsharpParser.RULE_global);
        try {
            this.state = 170;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 161;
                this.main();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 162;
                this.function_();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 163;
                this.test();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 164;
                this.procedure();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 165;
                this.constant();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 166;
                this.enum_();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 167;
                this.concreteClass();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 168;
                this.abstractClass();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 169;
                this.commentLine();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 172;
            this.match(CsharpParser.STATIC);
            this.state = 173;
            this.match(CsharpParser.VOID);
            this.state = 174;
            this.match(CsharpParser.MAIN);
            this.state = 175;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 176;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 177;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 178;
            this.match(CsharpParser.NL);
            this.state = 182;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 179;
                this.ordinaryStatement();
                }
                }
                this.state = 184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 185;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 186;
            this.match(CsharpParser.COMMENT);
            this.state = 187;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 189;
            this.match(CsharpParser.STATIC);
            this.state = 190;
            this.type_();
            this.state = 191;
            this.methodName();
            this.state = 192;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 194;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 193;
                this.paramsList();
                }
            }

            this.state = 196;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 197;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 198;
            this.match(CsharpParser.COMMENT);
            this.state = 199;
            this.match(CsharpParser.NL);
            this.state = 204;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                this.state = 202;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
                case 1:
                    {
                    this.state = 200;
                    this.letStatement();
                    }
                    break;
                case 2:
                    {
                    this.state = 201;
                    this.ordinaryStatement();
                    }
                    break;
                }
                }
                this.state = 206;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 207;
            this.returnStatement();
            this.state = 208;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 209;
            this.match(CsharpParser.COMMENT);
            this.state = 210;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 212;
            this.match(CsharpParser.TEST_CLASS_ANNOT);
            this.state = 213;
            this.match(CsharpParser.CLASS);
            this.state = 214;
            this.typeName();
            this.state = 215;
            this.match(CsharpParser.NL);
            this.state = 216;
            this.match(CsharpParser.TEST_METHOD_ANNOT);
            this.state = 217;
            this.match(CsharpParser.STATIC);
            this.state = 218;
            this.match(CsharpParser.VOID);
            this.state = 219;
            this.testName();
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9 || _la === 10 || _la === 50) {
                {
                this.state = 224;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
                case 1:
                    {
                    this.state = 220;
                    this.assert();
                    }
                    break;
                case 2:
                    {
                    this.state = 221;
                    this.letStatement();
                    }
                    break;
                case 3:
                    {
                    this.state = 222;
                    this.variableDefinition();
                    }
                    break;
                case 4:
                    {
                    this.state = 223;
                    this.commentLine();
                    }
                    break;
                }
                }
                this.state = 228;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 229;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 230;
            this.match(CsharpParser.COMMENT);
            this.state = 231;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 233;
            this.match(CsharpParser.STATIC);
            this.state = 234;
            this.match(CsharpParser.VOID);
            this.state = 235;
            this.methodName();
            this.state = 236;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 238;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 237;
                this.paramsList();
                }
            }

            this.state = 240;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 241;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 242;
            this.match(CsharpParser.COMMENT);
            this.state = 243;
            this.match(CsharpParser.NL);
            this.state = 247;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 244;
                this.ordinaryStatement();
                }
                }
                this.state = 249;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 250;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 251;
            this.match(CsharpParser.COMMENT);
            this.state = 252;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 254;
            this.match(CsharpParser.CONST);
            this.state = 255;
            this.identifier();
            this.state = 256;
            this.match(CsharpParser.EQUAL);
            this.state = 257;
            this.constantValue();
            this.state = 258;
            this.match(CsharpParser.COMMENT);
            this.state = 259;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 261;
            this.match(CsharpParser.ENUM);
            this.state = 262;
            this.typeName();
            this.state = 263;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 264;
            this.enumValuesList();
            this.state = 265;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 266;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 268;
            this.match(CsharpParser.CLASS);
            this.state = 269;
            this.typeName();
            this.state = 272;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 64) {
                {
                this.state = 270;
                this.match(CsharpParser.COLON);
                this.state = 271;
                this.typeName();
                }
            }

            this.state = 274;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 275;
            this.match(CsharpParser.NL);
            this.state = 283;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 16 || _la === 50) {
                {
                this.state = 281;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
                case 1:
                    {
                    this.state = 276;
                    this.constructorMember();
                    }
                    break;
                case 2:
                    {
                    this.state = 277;
                    this.property();
                    }
                    break;
                case 3:
                    {
                    this.state = 278;
                    this.functionMethod();
                    }
                    break;
                case 4:
                    {
                    this.state = 279;
                    this.procedureMethod();
                    }
                    break;
                case 5:
                    {
                    this.state = 280;
                    this.commentLine();
                    }
                    break;
                }
                }
                this.state = 285;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 286;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 287;
            this.match(CsharpParser.COMMENT);
            this.state = 288;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 290;
            this.match(CsharpParser.ABSTRACT);
            this.state = 291;
            this.match(CsharpParser.CLASS);
            this.state = 292;
            this.typeName();
            this.state = 295;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 64) {
                {
                this.state = 293;
                this.match(CsharpParser.COLON);
                this.state = 294;
                this.typeName();
                }
            }

            this.state = 297;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 298;
            this.match(CsharpParser.NL);
            this.state = 307;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 7 || _la === 16 || _la === 50) {
                {
                this.state = 305;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
                case 1:
                    {
                    this.state = 299;
                    this.property();
                    }
                    break;
                case 2:
                    {
                    this.state = 300;
                    this.functionMethod();
                    }
                    break;
                case 3:
                    {
                    this.state = 301;
                    this.procedureMethod();
                    }
                    break;
                case 4:
                    {
                    this.state = 302;
                    this.abstractFunction();
                    }
                    break;
                case 5:
                    {
                    this.state = 303;
                    this.abstractProcedure();
                    }
                    break;
                case 6:
                    {
                    this.state = 304;
                    this.commentLine();
                    }
                    break;
                }
                }
                this.state = 309;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 310;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 311;
            this.match(CsharpParser.COMMENT);
            this.state = 312;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 314;
            this.match(CsharpParser.COMMENT);
            this.state = 315;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ordinaryStatement(): OrdinaryStatementContext {
        let localContext = new OrdinaryStatementContext(this.context, this.state);
        this.enterRule(localContext, 22, CsharpParser.RULE_ordinaryStatement);
        try {
            this.state = 328;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 317;
                this.print();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 318;
                this.variableDefinition();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 319;
                this.assignment();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 320;
                this.inputStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 321;
                this.ifStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 322;
                this.whileLoop();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 323;
                this.forLoop();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 324;
                this.procedureCall();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 325;
                this.tryStatement();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 326;
                this.throwStatement();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 327;
                this.commentLine();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 330;
            this.match(CsharpParser.IF);
            this.state = 331;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 332;
            this.expression(0);
            this.state = 333;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 334;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 335;
            this.match(CsharpParser.NL);
            this.state = 341;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 339;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
                    case 1:
                        {
                        this.state = 336;
                        this.elseIfClause();
                        }
                        break;
                    case 2:
                        {
                        this.state = 337;
                        this.elseClause();
                        }
                        break;
                    case 3:
                        {
                        this.state = 338;
                        this.ordinaryStatement();
                        }
                        break;
                    }
                    }
                }
                this.state = 343;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            }
            this.state = 344;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 345;
            this.match(CsharpParser.COMMENT);
            this.state = 346;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 348;
            this.match(CsharpParser.WHILE);
            this.state = 349;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 350;
            this.expression(0);
            this.state = 351;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 352;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 353;
            this.match(CsharpParser.NL);
            this.state = 357;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 354;
                this.ordinaryStatement();
                }
                }
                this.state = 359;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 360;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 361;
            this.match(CsharpParser.COMMENT);
            this.state = 362;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 364;
            this.match(CsharpParser.FOREACH);
            this.state = 365;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 366;
            this.match(CsharpParser.VAR);
            this.state = 367;
            this.identifier();
            this.state = 368;
            this.match(CsharpParser.IN);
            this.state = 369;
            this.expression(0);
            this.state = 370;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 371;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 372;
            this.match(CsharpParser.NL);
            this.state = 376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 373;
                this.ordinaryStatement();
                }
                }
                this.state = 378;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 379;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 380;
            this.match(CsharpParser.COMMENT);
            this.state = 381;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 383;
            this.match(CsharpParser.TRY);
            this.state = 384;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 385;
            this.match(CsharpParser.NL);
            this.state = 389;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 386;
                this.ordinaryStatement();
                }
                }
                this.state = 391;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 392;
            this.catchStatement();
            this.state = 396;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 393;
                this.ordinaryStatement();
                }
                }
                this.state = 398;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 399;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 400;
            this.match(CsharpParser.COMMENT);
            this.state = 401;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 403;
            this.match(CsharpParser.ASSERT);
            this.state = 404;
            this.match(CsharpParser.DOT);
            this.state = 405;
            this.match(CsharpParser.ARE_EQUAL);
            this.state = 406;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 407;
            this.assertActual();
            this.state = 408;
            this.match(CsharpParser.COMMA);
            this.state = 409;
            this.expression(0);
            this.state = 410;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 411;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 412;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 414;
            this.match(CsharpParser.VAR);
            this.state = 415;
            this.identifier();
            this.state = 416;
            this.match(CsharpParser.SINGLE_EQUALS);
            this.state = 417;
            this.expression(0);
            this.state = 418;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 419;
            this.match(CsharpParser.COMMENT);
            this.state = 420;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 422;
            this.match(CsharpParser.PRINT);
            this.state = 423;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 425;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 136450685) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 1021) !== 0)) {
                {
                this.state = 424;
                this.expression(0);
                }
            }

            this.state = 427;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 428;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 429;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 431;
            this.match(CsharpParser.VAR);
            this.state = 432;
            this.identifier();
            this.state = 433;
            this.match(CsharpParser.SINGLE_EQUALS);
            this.state = 434;
            this.expression(0);
            this.state = 435;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 436;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 438;
            this.assignable();
            this.state = 439;
            this.match(CsharpParser.SINGLE_EQUALS);
            this.state = 440;
            this.expression(0);
            this.state = 441;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 442;
            this.match(CsharpParser.COMMENT);
            this.state = 443;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 445;
            this.identifier();
            this.state = 446;
            this.match(CsharpParser.EQUAL);
            this.state = 447;
            this.match(CsharpParser.INPUT);
            this.state = 448;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 449;
            this.expression(0);
            this.state = 450;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 451;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 452;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 454;
            this.term();
            this.state = 455;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 456;
            this.match(CsharpParser.COMMENT);
            this.state = 457;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 459;
            this.match(CsharpParser.THROW);
            this.state = 460;
            this.match(CsharpParser.NEW);
            this.state = 461;
            this.typeName();
            this.state = 462;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 463;
            this.expression(0);
            this.state = 464;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 465;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 466;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 468;
            this.match(CsharpParser.RETURN);
            this.state = 469;
            this.expression(0);
            this.state = 470;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 471;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 473;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 474;
            this.match(CsharpParser.ELSE);
            this.state = 475;
            this.match(CsharpParser.IF);
            this.state = 476;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 477;
            this.expression(0);
            this.state = 478;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 479;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 480;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 482;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 483;
            this.match(CsharpParser.ELSE);
            this.state = 484;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 485;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 487;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 488;
            this.match(CsharpParser.CATCH);
            this.state = 489;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 490;
            this.typeName();
            this.state = 491;
            this.identifier();
            this.state = 492;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 493;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 494;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 496;
            this.match(CsharpParser.PUBLIC);
            this.state = 497;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 498;
                this.paramsList();
                }
            }

            this.state = 501;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 502;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 503;
            this.match(CsharpParser.NL);
            this.state = 507;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 504;
                this.ordinaryStatement();
                }
                }
                this.state = 509;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 510;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 511;
            this.match(CsharpParser.COMMENT);
            this.state = 512;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 514;
            this.match(CsharpParser.PUBLIC);
            this.state = 515;
            this.type_();
            this.state = 516;
            this.identifier();
            this.state = 517;
            this.match(CsharpParser.GET_SET);
            this.state = 518;
            this.match(CsharpParser.COMMENT);
            this.state = 519;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 521;
            this.match(CsharpParser.PUBLIC);
            this.state = 522;
            this.type_();
            this.state = 523;
            this.methodName();
            this.state = 524;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 526;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 525;
                this.paramsList();
                }
            }

            this.state = 528;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 529;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 530;
            this.match(CsharpParser.COMMENT);
            this.state = 531;
            this.match(CsharpParser.NL);
            this.state = 536;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                this.state = 534;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
                case 1:
                    {
                    this.state = 532;
                    this.letStatement();
                    }
                    break;
                case 2:
                    {
                    this.state = 533;
                    this.ordinaryStatement();
                    }
                    break;
                }
                }
                this.state = 538;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 539;
            this.returnStatement();
            this.state = 540;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 541;
            this.match(CsharpParser.COMMENT);
            this.state = 542;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 544;
            this.match(CsharpParser.PUBLIC);
            this.state = 545;
            this.match(CsharpParser.VOID);
            this.state = 546;
            this.methodName();
            this.state = 547;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 549;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 548;
                this.paramsList();
                }
            }

            this.state = 551;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 552;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 553;
            this.match(CsharpParser.COMMENT);
            this.state = 554;
            this.match(CsharpParser.NL);
            this.state = 558;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2701140736) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 286080513) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 255) !== 0)) {
                {
                {
                this.state = 555;
                this.ordinaryStatement();
                }
                }
                this.state = 560;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 561;
            this.match(CsharpParser.CLOSE_BRACE);
            this.state = 562;
            this.match(CsharpParser.COMMENT);
            this.state = 563;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 565;
            this.match(CsharpParser.ABSTRACT);
            this.state = 566;
            this.type_();
            this.state = 567;
            this.methodName();
            this.state = 568;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 570;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 569;
                this.paramsList();
                }
            }

            this.state = 572;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 573;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 574;
            this.match(CsharpParser.COMMENT);
            this.state = 575;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 577;
            this.match(CsharpParser.ABSTRACT);
            this.state = 578;
            this.match(CsharpParser.VOID);
            this.state = 579;
            this.methodName();
            this.state = 580;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 582;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 287) !== 0) || _la === 77) {
                {
                this.state = 581;
                this.paramsList();
                }
            }

            this.state = 584;
            this.match(CsharpParser.CLOSE_BRACKET);
            this.state = 585;
            this.match(CsharpParser.SEMI_COLON);
            this.state = 586;
            this.match(CsharpParser.COMMENT);
            this.state = 587;
            this.match(CsharpParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 589;
            this.match(CsharpParser.NAME_STARTING_LC);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignable(): AssignableContext {
        let localContext = new AssignableContext(this.context, this.state);
        this.enterRule(localContext, 70, CsharpParser.RULE_assignable);
        try {
            this.state = 593;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CsharpParser.NAME_STARTING_LC:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 591;
                this.identifierWithOptIndexes();
                }
                break;
            case CsharpParser.THIS_INSTANCE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 592;
                this.propertyRef();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 595;
            this.match(CsharpParser.NAME_STARTING_LC);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 597;
            this.match(CsharpParser.NAME_STARTING_TEST_);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 599;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 31) !== 0) || _la === 77)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constantValue(): ConstantValueContext {
        let localContext = new ConstantValueContext(this.context, this.state);
        this.enterRule(localContext, 78, CsharpParser.RULE_constantValue);
        try {
            this.state = 603;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CsharpParser.INT_NAME:
            case CsharpParser.FLOAT_NAME:
            case CsharpParser.BOOL_NAME:
            case CsharpParser.STRING_NAME:
            case CsharpParser.LIST_NAME:
            case CsharpParser.LIT_BOOLEAN:
            case CsharpParser.NAME_STARTING_UC:
            case CsharpParser.LITERAL_BINARY:
            case CsharpParser.LITERAL_HEX:
            case CsharpParser.LITERAL_INTEGER:
            case CsharpParser.LITERAL_FLOAT:
            case CsharpParser.INTERPOLATED_STRING:
            case CsharpParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 601;
                this.litValue();
                }
                break;
            case CsharpParser.NAME_STARTING_LC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 602;
                this.identifier();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 605;
            this.argument();
            this.state = 610;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 606;
                this.match(CsharpParser.COMMA);
                this.state = 607;
                this.argument();
                }
                }
                this.state = 612;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 82, CsharpParser.RULE_argument);
        try {
            this.state = 615;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CsharpParser.LAMBDA:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 613;
                this.lambda();
                }
                break;
            case CsharpParser.NEW:
            case CsharpParser.NOT:
            case CsharpParser.INT_NAME:
            case CsharpParser.FLOAT_NAME:
            case CsharpParser.BOOL_NAME:
            case CsharpParser.STRING_NAME:
            case CsharpParser.LIST_NAME:
            case CsharpParser.THIS_INSTANCE:
            case CsharpParser.LIT_BOOLEAN:
            case CsharpParser.OPEN_BRACE:
            case CsharpParser.OPEN_BRACKET:
            case CsharpParser.MINUS:
            case CsharpParser.IF_:
            case CsharpParser.NAME_STARTING_LC:
            case CsharpParser.NAME_STARTING_UC:
            case CsharpParser.LITERAL_BINARY:
            case CsharpParser.LITERAL_HEX:
            case CsharpParser.LITERAL_INTEGER:
            case CsharpParser.LITERAL_FLOAT:
            case CsharpParser.INTERPOLATED_STRING:
            case CsharpParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 614;
                this.expression(0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 617;
            this.paramDef();
            this.state = 622;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 618;
                this.match(CsharpParser.COMMA);
                this.state = 619;
                this.paramDef();
                }
                }
                this.state = 624;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 86, CsharpParser.RULE_type);
        try {
            this.state = 628;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 625;
                this.typeTuple();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 626;
                this.typeName();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 627;
                this.typeGeneric();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 630;
            this.identifier();
            this.state = 635;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 631;
                this.match(CsharpParser.COMMA);
                this.state = 632;
                this.identifier();
                }
                }
                this.state = 637;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
            this.state = 638;
            this.expression(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public litValue(): LitValueContext {
        let localContext = new LitValueContext(this.context, this.state);
        this.enterRule(localContext, 92, CsharpParser.RULE_litValue);
        try {
            this.state = 645;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CsharpParser.LIT_BOOLEAN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 640;
                this.match(CsharpParser.LIT_BOOLEAN);
                }
                break;
            case CsharpParser.LITERAL_BINARY:
            case CsharpParser.LITERAL_HEX:
            case CsharpParser.LITERAL_INTEGER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 641;
                this.litInt();
                }
                break;
            case CsharpParser.LITERAL_FLOAT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 642;
                this.litFloat();
                }
                break;
            case CsharpParser.INTERPOLATED_STRING:
            case CsharpParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 643;
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
                this.state = 644;
                this.enumValue();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public litInt(): LitIntContext {
        let localContext = new LitIntContext(this.context, this.state);
        this.enterRule(localContext, 94, CsharpParser.RULE_litInt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 647;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public litFloat(): LitFloatContext {
        let localContext = new LitFloatContext(this.context, this.state);
        this.enterRule(localContext, 96, CsharpParser.RULE_litFloat);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(CsharpParser.LITERAL_FLOAT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public enumValue(): EnumValueContext {
        let localContext = new EnumValueContext(this.context, this.state);
        this.enterRule(localContext, 98, CsharpParser.RULE_enumValue);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 651;
            this.typeName();
            this.state = 652;
            this.match(CsharpParser.DOT);
            this.state = 653;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public litString(): LitStringContext {
        let localContext = new LitStringContext(this.context, this.state);
        this.enterRule(localContext, 100, CsharpParser.RULE_litString);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            _la = this.tokenStream.LA(1);
            if(!(_la === 82 || _la === 83)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public index(): IndexContext {
        let localContext = new IndexContext(this.context, this.state);
        this.enterRule(localContext, 102, CsharpParser.RULE_index);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 657;
            this.match(CsharpParser.OPEN_SQ_BRACKET);
            this.state = 658;
            this.expression(0);
            this.state = 659;
            this.match(CsharpParser.CLOSE_SQ_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifierWithOptIndexes(): IdentifierWithOptIndexesContext {
        let localContext = new IdentifierWithOptIndexesContext(this.context, this.state);
        this.enterRule(localContext, 104, CsharpParser.RULE_identifierWithOptIndexes);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 661;
            this.identifier();
            this.state = 665;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 58) {
                {
                {
                this.state = 662;
                this.index();
                }
                }
                this.state = 667;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertyRef(): PropertyRefContext {
        let localContext = new PropertyRefContext(this.context, this.state);
        this.enterRule(localContext, 106, CsharpParser.RULE_propertyRef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 668;
            this.match(CsharpParser.THIS_INSTANCE);
            this.state = 669;
            this.match(CsharpParser.DOT);
            this.state = 670;
            this.identifierWithOptIndexes();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
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
        let _startState = 108;
        this.enterRecursionRule(localContext, 108, CsharpParser.RULE_expression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 685;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CsharpParser.NEW:
                {
                this.state = 673;
                this.newInstance();
                }
                break;
            case CsharpParser.NOT:
            case CsharpParser.MINUS:
                {
                this.state = 674;
                this.unaryExpression();
                }
                break;
            case CsharpParser.INT_NAME:
            case CsharpParser.FLOAT_NAME:
            case CsharpParser.BOOL_NAME:
            case CsharpParser.STRING_NAME:
            case CsharpParser.LIST_NAME:
            case CsharpParser.THIS_INSTANCE:
            case CsharpParser.LIT_BOOLEAN:
            case CsharpParser.OPEN_BRACE:
            case CsharpParser.OPEN_BRACKET:
            case CsharpParser.NAME_STARTING_LC:
            case CsharpParser.NAME_STARTING_UC:
            case CsharpParser.LITERAL_BINARY:
            case CsharpParser.LITERAL_HEX:
            case CsharpParser.LITERAL_INTEGER:
            case CsharpParser.LITERAL_FLOAT:
            case CsharpParser.INTERPOLATED_STRING:
            case CsharpParser.LITERAL_STRING:
                {
                this.state = 675;
                this.term();
                }
                break;
            case CsharpParser.IF_:
                {
                this.state = 676;
                this.match(CsharpParser.IF_);
                this.state = 677;
                this.match(CsharpParser.OPEN_BRACKET);
                this.state = 678;
                this.expression(0);
                this.state = 679;
                this.match(CsharpParser.COMMA);
                this.state = 680;
                this.expression(0);
                this.state = 681;
                this.match(CsharpParser.COMMA);
                this.state = 682;
                this.expression(0);
                this.state = 683;
                this.match(CsharpParser.CLOSE_BRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 693;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new ExpressionContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, CsharpParser.RULE_expression);
                    this.state = 687;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 688;
                    this.binaryOperator();
                    this.state = 689;
                    this.expression(3);
                    }
                    }
                }
                this.state = 695;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public term(): TermContext {
        let localContext = new TermContext(this.context, this.state);
        this.enterRule(localContext, 110, CsharpParser.RULE_term);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 696;
            this.chainHead();
            this.state = 701;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 697;
                    this.match(CsharpParser.DOT);
                    this.state = 698;
                    this.chainable();
                    }
                    }
                }
                this.state = 703;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public chainHead(): ChainHeadContext {
        let localContext = new ChainHeadContext(this.context, this.state);
        this.enterRule(localContext, 112, CsharpParser.RULE_chainHead);
        try {
            this.state = 710;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 704;
                this.match(CsharpParser.THIS_INSTANCE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 705;
                this.bracketedExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 706;
                this.tuple();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 707;
                this.litValue();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 708;
                this.list();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 709;
                this.chainable();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public chainable(): ChainableContext {
        let localContext = new ChainableContext(this.context, this.state);
        this.enterRule(localContext, 114, CsharpParser.RULE_chainable);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 714;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 712;
                this.identifier();
                }
                break;
            case 2:
                {
                this.state = 713;
                this.methodCall();
                }
                break;
            }
            this.state = 719;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 716;
                    this.index();
                    }
                    }
                }
                this.state = 721;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 49, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public bracketedExpression(): BracketedExpressionContext {
        let localContext = new BracketedExpressionContext(this.context, this.state);
        this.enterRule(localContext, 116, CsharpParser.RULE_bracketedExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 722;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 723;
            this.expression(0);
            this.state = 724;
            this.match(CsharpParser.CLOSE_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unaryExpression(): UnaryExpressionContext {
        let localContext = new UnaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 118, CsharpParser.RULE_unaryExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 726;
            _la = this.tokenStream.LA(1);
            if(!(_la === 39 || _la === 66)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 727;
            this.term();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public binaryExpression(): BinaryExpressionContext {
        let localContext = new BinaryExpressionContext(this.context, this.state);
        this.enterRule(localContext, 120, CsharpParser.RULE_binaryExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 729;
            this.term();
            this.state = 730;
            this.binaryOperator();
            this.state = 731;
            this.expression(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public tuple(): TupleContext {
        let localContext = new TupleContext(this.context, this.state);
        this.enterRule(localContext, 122, CsharpParser.RULE_tuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 733;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 734;
            this.expression(0);
            this.state = 735;
            this.match(CsharpParser.COMMA);
            this.state = 736;
            this.expression(0);
            this.state = 741;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 737;
                this.match(CsharpParser.COMMA);
                this.state = 738;
                this.expression(0);
                }
                }
                this.state = 743;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 744;
            this.match(CsharpParser.CLOSE_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public methodCall(): MethodCallContext {
        let localContext = new MethodCallContext(this.context, this.state);
        this.enterRule(localContext, 124, CsharpParser.RULE_methodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 746;
            this.methodName();
            this.state = 747;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 749;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14 || _la === 27 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 136450685) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 1021) !== 0)) {
                {
                this.state = 748;
                this.argList();
                }
            }

            this.state = 751;
            this.match(CsharpParser.CLOSE_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public binaryOperator(): BinaryOperatorContext {
        let localContext = new BinaryOperatorContext(this.context, this.state);
        this.enterRule(localContext, 126, CsharpParser.RULE_binaryOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 753;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 2147483679) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 127) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public newInstance(): NewInstanceContext {
        let localContext = new NewInstanceContext(this.context, this.state);
        this.enterRule(localContext, 128, CsharpParser.RULE_newInstance);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 755;
            this.match(CsharpParser.NEW);
            this.state = 756;
            this.type_();
            this.state = 757;
            this.match(CsharpParser.OPEN_BRACKET);
            this.state = 759;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14 || _la === 27 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 136450685) !== 0) || ((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & 1021) !== 0)) {
                {
                this.state = 758;
                this.argList();
                }
            }

            this.state = 761;
            this.match(CsharpParser.CLOSE_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public paramDef(): ParamDefContext {
        let localContext = new ParamDefContext(this.context, this.state);
        this.enterRule(localContext, 130, CsharpParser.RULE_paramDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 763;
            this.type_();
            this.state = 764;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeGeneric(): TypeGenericContext {
        let localContext = new TypeGenericContext(this.context, this.state);
        this.enterRule(localContext, 132, CsharpParser.RULE_typeGeneric);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 766;
            this.typeName();
            this.state = 767;
            this.match(CsharpParser.LT);
            this.state = 768;
            this.type_();
            this.state = 773;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 769;
                this.match(CsharpParser.COMMA);
                this.state = 770;
                this.type_();
                }
                }
                this.state = 775;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 776;
            this.match(CsharpParser.GT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeTuple(): TypeTupleContext {
        let localContext = new TypeTupleContext(this.context, this.state);
        this.enterRule(localContext, 134, CsharpParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 778;
            this.match(CsharpParser.TUPLE);
            this.state = 779;
            this.match(CsharpParser.OPEN_SQ_BRACKET);
            this.state = 780;
            this.type_();
            this.state = 783;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 781;
                this.match(CsharpParser.COMMA);
                this.state = 782;
                this.type_();
                }
                }
                this.state = 785;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 63);
            this.state = 787;
            this.match(CsharpParser.CLOSE_SQ_BRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public lambda(): LambdaContext {
        let localContext = new LambdaContext(this.context, this.state);
        this.enterRule(localContext, 136, CsharpParser.RULE_lambda);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 789;
            this.match(CsharpParser.LAMBDA);
            this.state = 790;
            this.argList();
            this.state = 791;
            this.match(CsharpParser.COLON);
            this.state = 792;
            this.expression(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public list(): ListContext {
        let localContext = new ListContext(this.context, this.state);
        this.enterRule(localContext, 138, CsharpParser.RULE_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 794;
            this.match(CsharpParser.OPEN_BRACE);
            this.state = 795;
            this.expression(0);
            this.state = 800;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 796;
                this.match(CsharpParser.COMMA);
                this.state = 797;
                this.expression(0);
                }
                }
                this.state = 802;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 803;
            this.match(CsharpParser.CLOSE_BRACE);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public interpolatedString(): InterpolatedStringContext {
        let localContext = new InterpolatedStringContext(this.context, this.state);
        this.enterRule(localContext, 140, CsharpParser.RULE_interpolatedString);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 805;
            this.match(CsharpParser.INTERPOLATED_STRING_PREFIX);
            this.state = 806;
            this.match(CsharpParser.LITERAL_STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public power(): PowerContext {
        let localContext = new PowerContext(this.context, this.state);
        this.enterRule(localContext, 142, CsharpParser.RULE_power);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.term();
            this.state = 809;
            this.match(CsharpParser.POWER);
            this.state = 810;
            this.term();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 54:
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
        4,1,86,813,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,1,0,
        3,0,146,8,0,1,0,5,0,149,8,0,10,0,12,0,152,9,0,1,0,5,0,155,8,0,10,
        0,12,0,158,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,171,
        8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,181,8,2,10,2,12,2,184,9,
        2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,3,3,195,8,3,1,3,1,3,1,3,1,
        3,1,3,1,3,5,3,203,8,3,10,3,12,3,206,9,3,1,3,1,3,1,3,1,3,1,3,1,4,
        1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,5,4,225,8,4,10,4,12,
        4,228,9,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,3,5,239,8,5,1,5,1,
        5,1,5,1,5,1,5,5,5,246,8,5,10,5,12,5,249,9,5,1,5,1,5,1,5,1,5,1,6,
        1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,
        1,8,3,8,273,8,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,5,8,282,8,8,10,8,12,
        8,285,9,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,3,9,296,8,9,1,9,1,
        9,1,9,1,9,1,9,1,9,1,9,1,9,5,9,306,8,9,10,9,12,9,309,9,9,1,9,1,9,
        1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,
        11,1,11,1,11,3,11,329,8,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
        12,1,12,5,12,340,8,12,10,12,12,12,343,9,12,1,12,1,12,1,12,1,12,1,
        13,1,13,1,13,1,13,1,13,1,13,1,13,5,13,356,8,13,10,13,12,13,359,9,
        13,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,
        14,1,14,5,14,375,8,14,10,14,12,14,378,9,14,1,14,1,14,1,14,1,14,1,
        15,1,15,1,15,1,15,5,15,388,8,15,10,15,12,15,391,9,15,1,15,1,15,5,
        15,395,8,15,10,15,12,15,398,9,15,1,15,1,15,1,15,1,15,1,16,1,16,1,
        16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,
        17,1,17,1,17,1,17,1,18,1,18,1,18,3,18,426,8,18,1,18,1,18,1,18,1,
        18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,
        20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,
        22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,
        24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,
        26,1,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,
        27,1,28,1,28,1,28,3,28,500,8,28,1,28,1,28,1,28,1,28,5,28,506,8,28,
        10,28,12,28,509,9,28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,
        1,29,1,29,1,30,1,30,1,30,1,30,1,30,3,30,527,8,30,1,30,1,30,1,30,
        1,30,1,30,1,30,5,30,535,8,30,10,30,12,30,538,9,30,1,30,1,30,1,30,
        1,30,1,30,1,31,1,31,1,31,1,31,1,31,3,31,550,8,31,1,31,1,31,1,31,
        1,31,1,31,5,31,557,8,31,10,31,12,31,560,9,31,1,31,1,31,1,31,1,31,
        1,32,1,32,1,32,1,32,1,32,3,32,571,8,32,1,32,1,32,1,32,1,32,1,32,
        1,33,1,33,1,33,1,33,1,33,3,33,583,8,33,1,33,1,33,1,33,1,33,1,33,
        1,34,1,34,1,35,1,35,3,35,594,8,35,1,36,1,36,1,37,1,37,1,38,1,38,
        1,39,1,39,3,39,604,8,39,1,40,1,40,1,40,5,40,609,8,40,10,40,12,40,
        612,9,40,1,41,1,41,3,41,616,8,41,1,42,1,42,1,42,5,42,621,8,42,10,
        42,12,42,624,9,42,1,43,1,43,1,43,3,43,629,8,43,1,44,1,44,1,44,5,
        44,634,8,44,10,44,12,44,637,9,44,1,45,1,45,1,46,1,46,1,46,1,46,1,
        46,3,46,646,8,46,1,47,1,47,1,48,1,48,1,49,1,49,1,49,1,49,1,50,1,
        50,1,51,1,51,1,51,1,51,1,52,1,52,5,52,664,8,52,10,52,12,52,667,9,
        52,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,
        54,1,54,1,54,1,54,1,54,3,54,686,8,54,1,54,1,54,1,54,1,54,5,54,692,
        8,54,10,54,12,54,695,9,54,1,55,1,55,1,55,5,55,700,8,55,10,55,12,
        55,703,9,55,1,56,1,56,1,56,1,56,1,56,1,56,3,56,711,8,56,1,57,1,57,
        3,57,715,8,57,1,57,5,57,718,8,57,10,57,12,57,721,9,57,1,58,1,58,
        1,58,1,58,1,59,1,59,1,59,1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,
        1,61,1,61,5,61,740,8,61,10,61,12,61,743,9,61,1,61,1,61,1,62,1,62,
        1,62,3,62,750,8,62,1,62,1,62,1,63,1,63,1,64,1,64,1,64,1,64,3,64,
        760,8,64,1,64,1,64,1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,5,66,
        772,8,66,10,66,12,66,775,9,66,1,66,1,66,1,67,1,67,1,67,1,67,1,67,
        4,67,784,8,67,11,67,12,67,785,1,67,1,67,1,68,1,68,1,68,1,68,1,68,
        1,69,1,69,1,69,1,69,5,69,799,8,69,10,69,12,69,802,9,69,1,69,1,69,
        1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,0,1,108,72,0,2,4,6,8,10,
        12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,
        56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,
        100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,140,142,0,5,2,0,41,45,77,77,1,0,78,80,1,0,82,83,
        2,0,39,39,66,66,2,0,34,38,65,72,832,0,145,1,0,0,0,2,170,1,0,0,0,
        4,172,1,0,0,0,6,189,1,0,0,0,8,212,1,0,0,0,10,233,1,0,0,0,12,254,
        1,0,0,0,14,261,1,0,0,0,16,268,1,0,0,0,18,290,1,0,0,0,20,314,1,0,
        0,0,22,328,1,0,0,0,24,330,1,0,0,0,26,348,1,0,0,0,28,364,1,0,0,0,
        30,383,1,0,0,0,32,403,1,0,0,0,34,414,1,0,0,0,36,422,1,0,0,0,38,431,
        1,0,0,0,40,438,1,0,0,0,42,445,1,0,0,0,44,454,1,0,0,0,46,459,1,0,
        0,0,48,468,1,0,0,0,50,473,1,0,0,0,52,482,1,0,0,0,54,487,1,0,0,0,
        56,496,1,0,0,0,58,514,1,0,0,0,60,521,1,0,0,0,62,544,1,0,0,0,64,565,
        1,0,0,0,66,577,1,0,0,0,68,589,1,0,0,0,70,593,1,0,0,0,72,595,1,0,
        0,0,74,597,1,0,0,0,76,599,1,0,0,0,78,603,1,0,0,0,80,605,1,0,0,0,
        82,615,1,0,0,0,84,617,1,0,0,0,86,628,1,0,0,0,88,630,1,0,0,0,90,638,
        1,0,0,0,92,645,1,0,0,0,94,647,1,0,0,0,96,649,1,0,0,0,98,651,1,0,
        0,0,100,655,1,0,0,0,102,657,1,0,0,0,104,661,1,0,0,0,106,668,1,0,
        0,0,108,685,1,0,0,0,110,696,1,0,0,0,112,710,1,0,0,0,114,714,1,0,
        0,0,116,722,1,0,0,0,118,726,1,0,0,0,120,729,1,0,0,0,122,733,1,0,
        0,0,124,746,1,0,0,0,126,753,1,0,0,0,128,755,1,0,0,0,130,763,1,0,
        0,0,132,766,1,0,0,0,134,778,1,0,0,0,136,789,1,0,0,0,138,794,1,0,
        0,0,140,805,1,0,0,0,142,808,1,0,0,0,144,146,5,50,0,0,145,144,1,0,
        0,0,145,146,1,0,0,0,146,150,1,0,0,0,147,149,3,2,1,0,148,147,1,0,
        0,0,149,152,1,0,0,0,150,148,1,0,0,0,150,151,1,0,0,0,151,156,1,0,
        0,0,152,150,1,0,0,0,153,155,5,54,0,0,154,153,1,0,0,0,155,158,1,0,
        0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,159,1,0,0,0,158,156,1,0,
        0,0,159,160,5,0,0,1,160,1,1,0,0,0,161,171,3,4,2,0,162,171,3,6,3,
        0,163,171,3,8,4,0,164,171,3,10,5,0,165,171,3,12,6,0,166,171,3,14,
        7,0,167,171,3,16,8,0,168,171,3,18,9,0,169,171,3,20,10,0,170,161,
        1,0,0,0,170,162,1,0,0,0,170,163,1,0,0,0,170,164,1,0,0,0,170,165,
        1,0,0,0,170,166,1,0,0,0,170,167,1,0,0,0,170,168,1,0,0,0,170,169,
        1,0,0,0,171,3,1,0,0,0,172,173,5,1,0,0,173,174,5,2,0,0,174,175,5,
        28,0,0,175,176,5,60,0,0,176,177,5,61,0,0,177,178,5,56,0,0,178,182,
        5,54,0,0,179,181,3,22,11,0,180,179,1,0,0,0,181,184,1,0,0,0,182,180,
        1,0,0,0,182,183,1,0,0,0,183,185,1,0,0,0,184,182,1,0,0,0,185,186,
        5,57,0,0,186,187,5,50,0,0,187,188,5,54,0,0,188,5,1,0,0,0,189,190,
        5,1,0,0,190,191,3,86,43,0,191,192,3,72,36,0,192,194,5,60,0,0,193,
        195,3,84,42,0,194,193,1,0,0,0,194,195,1,0,0,0,195,196,1,0,0,0,196,
        197,5,61,0,0,197,198,5,56,0,0,198,199,5,50,0,0,199,204,5,54,0,0,
        200,203,3,34,17,0,201,203,3,22,11,0,202,200,1,0,0,0,202,201,1,0,
        0,0,203,206,1,0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,207,1,0,
        0,0,206,204,1,0,0,0,207,208,3,48,24,0,208,209,5,57,0,0,209,210,5,
        50,0,0,210,211,5,54,0,0,211,7,1,0,0,0,212,213,5,3,0,0,213,214,5,
        21,0,0,214,215,3,76,38,0,215,216,5,54,0,0,216,217,5,4,0,0,217,218,
        5,1,0,0,218,219,5,2,0,0,219,226,3,74,37,0,220,225,3,32,16,0,221,
        225,3,34,17,0,222,225,3,38,19,0,223,225,3,20,10,0,224,220,1,0,0,
        0,224,221,1,0,0,0,224,222,1,0,0,0,224,223,1,0,0,0,225,228,1,0,0,
        0,226,224,1,0,0,0,226,227,1,0,0,0,227,229,1,0,0,0,228,226,1,0,0,
        0,229,230,5,57,0,0,230,231,5,50,0,0,231,232,5,54,0,0,232,9,1,0,0,
        0,233,234,5,1,0,0,234,235,5,2,0,0,235,236,3,72,36,0,236,238,5,60,
        0,0,237,239,3,84,42,0,238,237,1,0,0,0,238,239,1,0,0,0,239,240,1,
        0,0,0,240,241,5,61,0,0,241,242,5,56,0,0,242,243,5,50,0,0,243,247,
        5,54,0,0,244,246,3,22,11,0,245,244,1,0,0,0,246,249,1,0,0,0,247,245,
        1,0,0,0,247,248,1,0,0,0,248,250,1,0,0,0,249,247,1,0,0,0,250,251,
        5,57,0,0,251,252,5,50,0,0,252,253,5,54,0,0,253,11,1,0,0,0,254,255,
        5,5,0,0,255,256,3,68,34,0,256,257,5,35,0,0,257,258,3,78,39,0,258,
        259,5,50,0,0,259,260,5,54,0,0,260,13,1,0,0,0,261,262,5,6,0,0,262,
        263,3,76,38,0,263,264,5,56,0,0,264,265,3,88,44,0,265,266,5,61,0,
        0,266,267,5,54,0,0,267,15,1,0,0,0,268,269,5,21,0,0,269,272,3,76,
        38,0,270,271,5,64,0,0,271,273,3,76,38,0,272,270,1,0,0,0,272,273,
        1,0,0,0,273,274,1,0,0,0,274,275,5,56,0,0,275,283,5,54,0,0,276,282,
        3,56,28,0,277,282,3,58,29,0,278,282,3,60,30,0,279,282,3,62,31,0,
        280,282,3,20,10,0,281,276,1,0,0,0,281,277,1,0,0,0,281,278,1,0,0,
        0,281,279,1,0,0,0,281,280,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,
        0,283,284,1,0,0,0,284,286,1,0,0,0,285,283,1,0,0,0,286,287,5,57,0,
        0,287,288,5,50,0,0,288,289,5,54,0,0,289,17,1,0,0,0,290,291,5,7,0,
        0,291,292,5,21,0,0,292,295,3,76,38,0,293,294,5,64,0,0,294,296,3,
        76,38,0,295,293,1,0,0,0,295,296,1,0,0,0,296,297,1,0,0,0,297,298,
        5,56,0,0,298,307,5,54,0,0,299,306,3,58,29,0,300,306,3,60,30,0,301,
        306,3,62,31,0,302,306,3,64,32,0,303,306,3,66,33,0,304,306,3,20,10,
        0,305,299,1,0,0,0,305,300,1,0,0,0,305,301,1,0,0,0,305,302,1,0,0,
        0,305,303,1,0,0,0,305,304,1,0,0,0,306,309,1,0,0,0,307,305,1,0,0,
        0,307,308,1,0,0,0,308,310,1,0,0,0,309,307,1,0,0,0,310,311,5,57,0,
        0,311,312,5,50,0,0,312,313,5,54,0,0,313,19,1,0,0,0,314,315,5,50,
        0,0,315,316,5,54,0,0,316,21,1,0,0,0,317,329,3,36,18,0,318,329,3,
        38,19,0,319,329,3,40,20,0,320,329,3,42,21,0,321,329,3,24,12,0,322,
        329,3,26,13,0,323,329,3,28,14,0,324,329,3,44,22,0,325,329,3,30,15,
        0,326,329,3,46,23,0,327,329,3,20,10,0,328,317,1,0,0,0,328,318,1,
        0,0,0,328,319,1,0,0,0,328,320,1,0,0,0,328,321,1,0,0,0,328,322,1,
        0,0,0,328,323,1,0,0,0,328,324,1,0,0,0,328,325,1,0,0,0,328,326,1,
        0,0,0,328,327,1,0,0,0,329,23,1,0,0,0,330,331,5,24,0,0,331,332,5,
        60,0,0,332,333,3,108,54,0,333,334,5,61,0,0,334,335,5,56,0,0,335,
        341,5,54,0,0,336,340,3,50,25,0,337,340,3,52,26,0,338,340,3,22,11,
        0,339,336,1,0,0,0,339,337,1,0,0,0,339,338,1,0,0,0,340,343,1,0,0,
        0,341,339,1,0,0,0,341,342,1,0,0,0,342,344,1,0,0,0,343,341,1,0,0,
        0,344,345,5,57,0,0,345,346,5,50,0,0,346,347,5,54,0,0,347,25,1,0,
        0,0,348,349,5,32,0,0,349,350,5,60,0,0,350,351,3,108,54,0,351,352,
        5,61,0,0,352,353,5,56,0,0,353,357,5,54,0,0,354,356,3,22,11,0,355,
        354,1,0,0,0,356,359,1,0,0,0,357,355,1,0,0,0,357,358,1,0,0,0,358,
        360,1,0,0,0,359,357,1,0,0,0,360,361,5,57,0,0,361,362,5,50,0,0,362,
        363,5,54,0,0,363,27,1,0,0,0,364,365,5,8,0,0,365,366,5,60,0,0,366,
        367,5,9,0,0,367,368,3,68,34,0,368,369,5,25,0,0,369,370,3,108,54,
        0,370,371,5,61,0,0,371,372,5,56,0,0,372,376,5,54,0,0,373,375,3,22,
        11,0,374,373,1,0,0,0,375,378,1,0,0,0,376,374,1,0,0,0,376,377,1,0,
        0,0,377,379,1,0,0,0,378,376,1,0,0,0,379,380,5,57,0,0,380,381,5,50,
        0,0,381,382,5,54,0,0,382,29,1,0,0,0,383,384,5,31,0,0,384,385,5,56,
        0,0,385,389,5,54,0,0,386,388,3,22,11,0,387,386,1,0,0,0,388,391,1,
        0,0,0,389,387,1,0,0,0,389,390,1,0,0,0,390,392,1,0,0,0,391,389,1,
        0,0,0,392,396,3,54,27,0,393,395,3,22,11,0,394,393,1,0,0,0,395,398,
        1,0,0,0,396,394,1,0,0,0,396,397,1,0,0,0,397,399,1,0,0,0,398,396,
        1,0,0,0,399,400,5,57,0,0,400,401,5,50,0,0,401,402,5,54,0,0,402,31,
        1,0,0,0,403,404,5,10,0,0,404,405,5,62,0,0,405,406,5,11,0,0,406,407,
        5,60,0,0,407,408,3,90,45,0,408,409,5,63,0,0,409,410,3,108,54,0,410,
        411,5,61,0,0,411,412,5,12,0,0,412,413,5,54,0,0,413,33,1,0,0,0,414,
        415,5,9,0,0,415,416,3,68,34,0,416,417,5,55,0,0,417,418,3,108,54,
        0,418,419,5,12,0,0,419,420,5,50,0,0,420,421,5,54,0,0,421,35,1,0,
        0,0,422,423,5,29,0,0,423,425,5,60,0,0,424,426,3,108,54,0,425,424,
        1,0,0,0,425,426,1,0,0,0,426,427,1,0,0,0,427,428,5,61,0,0,428,429,
        5,12,0,0,429,430,5,54,0,0,430,37,1,0,0,0,431,432,5,9,0,0,432,433,
        3,68,34,0,433,434,5,55,0,0,434,435,3,108,54,0,435,436,5,12,0,0,436,
        437,5,54,0,0,437,39,1,0,0,0,438,439,3,70,35,0,439,440,5,55,0,0,440,
        441,3,108,54,0,441,442,5,12,0,0,442,443,5,50,0,0,443,444,5,54,0,
        0,444,41,1,0,0,0,445,446,3,68,34,0,446,447,5,35,0,0,447,448,5,26,
        0,0,448,449,5,60,0,0,449,450,3,108,54,0,450,451,5,61,0,0,451,452,
        5,12,0,0,452,453,5,54,0,0,453,43,1,0,0,0,454,455,3,110,55,0,455,
        456,5,12,0,0,456,457,5,50,0,0,457,458,5,54,0,0,458,45,1,0,0,0,459,
        460,5,13,0,0,460,461,5,14,0,0,461,462,3,76,38,0,462,463,5,60,0,0,
        463,464,3,108,54,0,464,465,5,61,0,0,465,466,5,12,0,0,466,467,5,54,
        0,0,467,47,1,0,0,0,468,469,5,30,0,0,469,470,3,108,54,0,470,471,5,
        12,0,0,471,472,5,54,0,0,472,49,1,0,0,0,473,474,5,57,0,0,474,475,
        5,22,0,0,475,476,5,24,0,0,476,477,5,60,0,0,477,478,3,108,54,0,478,
        479,5,61,0,0,479,480,5,56,0,0,480,481,5,54,0,0,481,51,1,0,0,0,482,
        483,5,57,0,0,483,484,5,22,0,0,484,485,5,56,0,0,485,486,5,54,0,0,
        486,53,1,0,0,0,487,488,5,57,0,0,488,489,5,15,0,0,489,490,5,60,0,
        0,490,491,3,76,38,0,491,492,3,68,34,0,492,493,5,61,0,0,493,494,5,
        56,0,0,494,495,5,54,0,0,495,55,1,0,0,0,496,497,5,16,0,0,497,499,
        5,60,0,0,498,500,3,84,42,0,499,498,1,0,0,0,499,500,1,0,0,0,500,501,
        1,0,0,0,501,502,5,61,0,0,502,503,5,56,0,0,503,507,5,54,0,0,504,506,
        3,22,11,0,505,504,1,0,0,0,506,509,1,0,0,0,507,505,1,0,0,0,507,508,
        1,0,0,0,508,510,1,0,0,0,509,507,1,0,0,0,510,511,5,57,0,0,511,512,
        5,50,0,0,512,513,5,54,0,0,513,57,1,0,0,0,514,515,5,16,0,0,515,516,
        3,86,43,0,516,517,3,68,34,0,517,518,5,20,0,0,518,519,5,50,0,0,519,
        520,5,54,0,0,520,59,1,0,0,0,521,522,5,16,0,0,522,523,3,86,43,0,523,
        524,3,72,36,0,524,526,5,60,0,0,525,527,3,84,42,0,526,525,1,0,0,0,
        526,527,1,0,0,0,527,528,1,0,0,0,528,529,5,61,0,0,529,530,5,56,0,
        0,530,531,5,50,0,0,531,536,5,54,0,0,532,535,3,34,17,0,533,535,3,
        22,11,0,534,532,1,0,0,0,534,533,1,0,0,0,535,538,1,0,0,0,536,534,
        1,0,0,0,536,537,1,0,0,0,537,539,1,0,0,0,538,536,1,0,0,0,539,540,
        3,48,24,0,540,541,5,57,0,0,541,542,5,50,0,0,542,543,5,54,0,0,543,
        61,1,0,0,0,544,545,5,16,0,0,545,546,5,2,0,0,546,547,3,72,36,0,547,
        549,5,60,0,0,548,550,3,84,42,0,549,548,1,0,0,0,549,550,1,0,0,0,550,
        551,1,0,0,0,551,552,5,61,0,0,552,553,5,56,0,0,553,554,5,50,0,0,554,
        558,5,54,0,0,555,557,3,22,11,0,556,555,1,0,0,0,557,560,1,0,0,0,558,
        556,1,0,0,0,558,559,1,0,0,0,559,561,1,0,0,0,560,558,1,0,0,0,561,
        562,5,57,0,0,562,563,5,50,0,0,563,564,5,54,0,0,564,63,1,0,0,0,565,
        566,5,7,0,0,566,567,3,86,43,0,567,568,3,72,36,0,568,570,5,60,0,0,
        569,571,3,84,42,0,570,569,1,0,0,0,570,571,1,0,0,0,571,572,1,0,0,
        0,572,573,5,61,0,0,573,574,5,12,0,0,574,575,5,50,0,0,575,576,5,54,
        0,0,576,65,1,0,0,0,577,578,5,7,0,0,578,579,5,2,0,0,579,580,3,72,
        36,0,580,582,5,60,0,0,581,583,3,84,42,0,582,581,1,0,0,0,582,583,
        1,0,0,0,583,584,1,0,0,0,584,585,5,61,0,0,585,586,5,12,0,0,586,587,
        5,50,0,0,587,588,5,54,0,0,588,67,1,0,0,0,589,590,5,76,0,0,590,69,
        1,0,0,0,591,594,3,104,52,0,592,594,3,106,53,0,593,591,1,0,0,0,593,
        592,1,0,0,0,594,71,1,0,0,0,595,596,5,76,0,0,596,73,1,0,0,0,597,598,
        5,75,0,0,598,75,1,0,0,0,599,600,7,0,0,0,600,77,1,0,0,0,601,604,3,
        92,46,0,602,604,3,68,34,0,603,601,1,0,0,0,603,602,1,0,0,0,604,79,
        1,0,0,0,605,610,3,82,41,0,606,607,5,63,0,0,607,609,3,82,41,0,608,
        606,1,0,0,0,609,612,1,0,0,0,610,608,1,0,0,0,610,611,1,0,0,0,611,
        81,1,0,0,0,612,610,1,0,0,0,613,616,3,136,68,0,614,616,3,108,54,0,
        615,613,1,0,0,0,615,614,1,0,0,0,616,83,1,0,0,0,617,622,3,130,65,
        0,618,619,5,63,0,0,619,621,3,130,65,0,620,618,1,0,0,0,621,624,1,
        0,0,0,622,620,1,0,0,0,622,623,1,0,0,0,623,85,1,0,0,0,624,622,1,0,
        0,0,625,629,3,134,67,0,626,629,3,76,38,0,627,629,3,132,66,0,628,
        625,1,0,0,0,628,626,1,0,0,0,628,627,1,0,0,0,629,87,1,0,0,0,630,635,
        3,68,34,0,631,632,5,63,0,0,632,634,3,68,34,0,633,631,1,0,0,0,634,
        637,1,0,0,0,635,633,1,0,0,0,635,636,1,0,0,0,636,89,1,0,0,0,637,635,
        1,0,0,0,638,639,3,108,54,0,639,91,1,0,0,0,640,646,5,51,0,0,641,646,
        3,94,47,0,642,646,3,96,48,0,643,646,3,100,50,0,644,646,3,98,49,0,
        645,640,1,0,0,0,645,641,1,0,0,0,645,642,1,0,0,0,645,643,1,0,0,0,
        645,644,1,0,0,0,646,93,1,0,0,0,647,648,7,1,0,0,648,95,1,0,0,0,649,
        650,5,81,0,0,650,97,1,0,0,0,651,652,3,76,38,0,652,653,5,62,0,0,653,
        654,3,68,34,0,654,99,1,0,0,0,655,656,7,2,0,0,656,101,1,0,0,0,657,
        658,5,58,0,0,658,659,3,108,54,0,659,660,5,59,0,0,660,103,1,0,0,0,
        661,665,3,68,34,0,662,664,3,102,51,0,663,662,1,0,0,0,664,667,1,0,
        0,0,665,663,1,0,0,0,665,666,1,0,0,0,666,105,1,0,0,0,667,665,1,0,
        0,0,668,669,5,48,0,0,669,670,5,62,0,0,670,671,3,104,52,0,671,107,
        1,0,0,0,672,673,6,54,-1,0,673,686,3,128,64,0,674,686,3,118,59,0,
        675,686,3,110,55,0,676,677,5,74,0,0,677,678,5,60,0,0,678,679,3,108,
        54,0,679,680,5,63,0,0,680,681,3,108,54,0,681,682,5,63,0,0,682,683,
        3,108,54,0,683,684,5,61,0,0,684,686,1,0,0,0,685,672,1,0,0,0,685,
        674,1,0,0,0,685,675,1,0,0,0,685,676,1,0,0,0,686,693,1,0,0,0,687,
        688,10,2,0,0,688,689,3,126,63,0,689,690,3,108,54,3,690,692,1,0,0,
        0,691,687,1,0,0,0,692,695,1,0,0,0,693,691,1,0,0,0,693,694,1,0,0,
        0,694,109,1,0,0,0,695,693,1,0,0,0,696,701,3,112,56,0,697,698,5,62,
        0,0,698,700,3,114,57,0,699,697,1,0,0,0,700,703,1,0,0,0,701,699,1,
        0,0,0,701,702,1,0,0,0,702,111,1,0,0,0,703,701,1,0,0,0,704,711,5,
        48,0,0,705,711,3,116,58,0,706,711,3,122,61,0,707,711,3,92,46,0,708,
        711,3,138,69,0,709,711,3,114,57,0,710,704,1,0,0,0,710,705,1,0,0,
        0,710,706,1,0,0,0,710,707,1,0,0,0,710,708,1,0,0,0,710,709,1,0,0,
        0,711,113,1,0,0,0,712,715,3,68,34,0,713,715,3,124,62,0,714,712,1,
        0,0,0,714,713,1,0,0,0,715,719,1,0,0,0,716,718,3,102,51,0,717,716,
        1,0,0,0,718,721,1,0,0,0,719,717,1,0,0,0,719,720,1,0,0,0,720,115,
        1,0,0,0,721,719,1,0,0,0,722,723,5,60,0,0,723,724,3,108,54,0,724,
        725,5,61,0,0,725,117,1,0,0,0,726,727,7,3,0,0,727,728,3,110,55,0,
        728,119,1,0,0,0,729,730,3,110,55,0,730,731,3,126,63,0,731,732,3,
        108,54,0,732,121,1,0,0,0,733,734,5,60,0,0,734,735,3,108,54,0,735,
        736,5,63,0,0,736,741,3,108,54,0,737,738,5,63,0,0,738,740,3,108,54,
        0,739,737,1,0,0,0,740,743,1,0,0,0,741,739,1,0,0,0,741,742,1,0,0,
        0,742,744,1,0,0,0,743,741,1,0,0,0,744,745,5,61,0,0,745,123,1,0,0,
        0,746,747,3,72,36,0,747,749,5,60,0,0,748,750,3,80,40,0,749,748,1,
        0,0,0,749,750,1,0,0,0,750,751,1,0,0,0,751,752,5,61,0,0,752,125,1,
        0,0,0,753,754,7,4,0,0,754,127,1,0,0,0,755,756,5,14,0,0,756,757,3,
        86,43,0,757,759,5,60,0,0,758,760,3,80,40,0,759,758,1,0,0,0,759,760,
        1,0,0,0,760,761,1,0,0,0,761,762,5,61,0,0,762,129,1,0,0,0,763,764,
        3,86,43,0,764,765,3,68,34,0,765,131,1,0,0,0,766,767,3,76,38,0,767,
        768,5,69,0,0,768,773,3,86,43,0,769,770,5,63,0,0,770,772,3,86,43,
        0,771,769,1,0,0,0,772,775,1,0,0,0,773,771,1,0,0,0,773,774,1,0,0,
        0,774,776,1,0,0,0,775,773,1,0,0,0,776,777,5,70,0,0,777,133,1,0,0,
        0,778,779,5,49,0,0,779,780,5,58,0,0,780,783,3,86,43,0,781,782,5,
        63,0,0,782,784,3,86,43,0,783,781,1,0,0,0,784,785,1,0,0,0,785,783,
        1,0,0,0,785,786,1,0,0,0,786,787,1,0,0,0,787,788,5,59,0,0,788,135,
        1,0,0,0,789,790,5,27,0,0,790,791,3,80,40,0,791,792,5,64,0,0,792,
        793,3,108,54,0,793,137,1,0,0,0,794,795,5,56,0,0,795,800,3,108,54,
        0,796,797,5,63,0,0,797,799,3,108,54,0,798,796,1,0,0,0,799,802,1,
        0,0,0,800,798,1,0,0,0,800,801,1,0,0,0,801,803,1,0,0,0,802,800,1,
        0,0,0,803,804,5,57,0,0,804,139,1,0,0,0,805,806,5,40,0,0,806,807,
        5,83,0,0,807,141,1,0,0,0,808,809,3,110,55,0,809,810,5,52,0,0,810,
        811,3,110,55,0,811,143,1,0,0,0,56,145,150,156,170,182,194,202,204,
        224,226,238,247,272,281,283,295,305,307,328,339,341,357,376,389,
        396,425,499,507,526,534,536,549,558,570,582,593,603,610,615,622,
        628,635,645,665,685,693,701,710,714,719,741,749,759,773,785,800
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!CsharpParser.__ATN) {
            CsharpParser.__ATN = new antlr.ATNDeserializer().deserialize(CsharpParser._serializedATN);
        }

        return CsharpParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(CsharpParser.literalNames, CsharpParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return CsharpParser.vocabulary;
    }

    private static readonly decisionsToDFA = CsharpParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
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
        if(listener.enterFile) {
             listener.enterFile(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitFile) {
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
        if(listener.enterGlobal) {
             listener.enterGlobal(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitGlobal) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_main;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterMain) {
             listener.enterMain(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitMain) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_function;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitFunction) {
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
    public variableDefinition(i?: number): VariableDefinitionContext[] | VariableDefinitionContext | null {
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
        if(listener.enterTest) {
             listener.enterTest(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTest) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_procedure;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterProcedure) {
             listener.enterProcedure(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitProcedure) {
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
        if(listener.enterConstant) {
             listener.enterConstant(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitConstant) {
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
        if(listener.enterEnum) {
             listener.enterEnum(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitEnum) {
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
    public constructorMember(i?: number): ConstructorMemberContext[] | ConstructorMemberContext | null {
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
        if(listener.enterConcreteClass) {
             listener.enterConcreteClass(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitConcreteClass) {
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
    public abstractProcedure(i?: number): AbstractProcedureContext[] | AbstractProcedureContext | null {
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
        if(listener.enterAbstractClass) {
             listener.enterAbstractClass(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAbstractClass) {
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
        if(listener.enterCommentLine) {
             listener.enterCommentLine(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitCommentLine) {
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
        if(listener.enterOrdinaryStatement) {
             listener.enterOrdinaryStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitOrdinaryStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_ifStatement;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitIfStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_whileLoop;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterWhileLoop) {
             listener.enterWhileLoop(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitWhileLoop) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_forLoop;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterForLoop) {
             listener.enterForLoop(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitForLoop) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_tryStatement;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterTryStatement) {
             listener.enterTryStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTryStatement) {
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
        if(listener.enterAssert) {
             listener.enterAssert(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAssert) {
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
        if(listener.enterLetStatement) {
             listener.enterLetStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLetStatement) {
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
        if(listener.enterPrint) {
             listener.enterPrint(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitPrint) {
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
        if(listener.enterVariableDefinition) {
             listener.enterVariableDefinition(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitVariableDefinition) {
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
        if(listener.enterAssignment) {
             listener.enterAssignment(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAssignment) {
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
        if(listener.enterInputStatement) {
             listener.enterInputStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitInputStatement) {
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
        if(listener.enterProcedureCall) {
             listener.enterProcedureCall(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitProcedureCall) {
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
        if(listener.enterThrowStatement) {
             listener.enterThrowStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitThrowStatement) {
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
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitReturnStatement) {
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
        if(listener.enterElseIfClause) {
             listener.enterElseIfClause(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitElseIfClause) {
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
        if(listener.enterElseClause) {
             listener.enterElseClause(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitElseClause) {
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
        if(listener.enterCatchStatement) {
             listener.enterCatchStatement(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitCatchStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_constructorMember;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterConstructorMember) {
             listener.enterConstructorMember(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitConstructorMember) {
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
        if(listener.enterProperty) {
             listener.enterProperty(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitProperty) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_functionMethod;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterFunctionMethod) {
             listener.enterFunctionMethod(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitFunctionMethod) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_procedureMethod;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterProcedureMethod) {
             listener.enterProcedureMethod(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitProcedureMethod) {
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
        if(listener.enterAbstractFunction) {
             listener.enterAbstractFunction(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAbstractFunction) {
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
        if(listener.enterAbstractProcedure) {
             listener.enterAbstractProcedure(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAbstractProcedure) {
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
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitIdentifier) {
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
        if(listener.enterAssignable) {
             listener.enterAssignable(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAssignable) {
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
        if(listener.enterMethodName) {
             listener.enterMethodName(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitMethodName) {
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
        if(listener.enterTestName) {
             listener.enterTestName(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTestName) {
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
        if(listener.enterTypeName) {
             listener.enterTypeName(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTypeName) {
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
        if(listener.enterConstantValue) {
             listener.enterConstantValue(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitConstantValue) {
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
        if(listener.enterArgList) {
             listener.enterArgList(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitArgList) {
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
        if(listener.enterArgument) {
             listener.enterArgument(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitArgument) {
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
        if(listener.enterParamsList) {
             listener.enterParamsList(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitParamsList) {
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
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitType) {
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
        if(listener.enterEnumValuesList) {
             listener.enterEnumValuesList(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitEnumValuesList) {
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
        if(listener.enterAssertActual) {
             listener.enterAssertActual(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitAssertActual) {
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
    public LIT_BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(CsharpParser.LIT_BOOLEAN, 0);
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
        if(listener.enterLitValue) {
             listener.enterLitValue(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLitValue) {
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
        if(listener.enterLitInt) {
             listener.enterLitInt(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLitInt) {
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
        if(listener.enterLitFloat) {
             listener.enterLitFloat(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLitFloat) {
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
        if(listener.enterEnumValue) {
             listener.enterEnumValue(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitEnumValue) {
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
    public LITERAL_STRING(): antlr.TerminalNode | null {
        return this.getToken(CsharpParser.LITERAL_STRING, 0);
    }
    public INTERPOLATED_STRING(): antlr.TerminalNode | null {
        return this.getToken(CsharpParser.INTERPOLATED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return CsharpParser.RULE_litString;
    }
    public override enterRule(listener: CsharpListener): void {
        if(listener.enterLitString) {
             listener.enterLitString(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLitString) {
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
        if(listener.enterIndex) {
             listener.enterIndex(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitIndex) {
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
        if(listener.enterIdentifierWithOptIndexes) {
             listener.enterIdentifierWithOptIndexes(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitIdentifierWithOptIndexes) {
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
        if(listener.enterPropertyRef) {
             listener.enterPropertyRef(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitPropertyRef) {
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
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitExpression) {
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
        if(listener.enterTerm) {
             listener.enterTerm(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTerm) {
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
        if(listener.enterChainHead) {
             listener.enterChainHead(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitChainHead) {
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
        if(listener.enterChainable) {
             listener.enterChainable(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitChainable) {
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
        if(listener.enterBracketedExpression) {
             listener.enterBracketedExpression(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitBracketedExpression) {
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
        if(listener.enterUnaryExpression) {
             listener.enterUnaryExpression(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitUnaryExpression) {
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
        if(listener.enterBinaryExpression) {
             listener.enterBinaryExpression(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitBinaryExpression) {
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
        if(listener.enterTuple) {
             listener.enterTuple(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTuple) {
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
        if(listener.enterMethodCall) {
             listener.enterMethodCall(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitMethodCall) {
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
        if(listener.enterBinaryOperator) {
             listener.enterBinaryOperator(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitBinaryOperator) {
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
        if(listener.enterNewInstance) {
             listener.enterNewInstance(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitNewInstance) {
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
        if(listener.enterParamDef) {
             listener.enterParamDef(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitParamDef) {
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
        if(listener.enterTypeGeneric) {
             listener.enterTypeGeneric(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTypeGeneric) {
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
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitTypeTuple) {
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
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitLambda) {
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
        if(listener.enterList) {
             listener.enterList(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitList) {
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
        if(listener.enterInterpolatedString) {
             listener.enterInterpolatedString(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitInterpolatedString) {
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
        if(listener.enterPower) {
             listener.enterPower(this);
        }
    }
    public override exitRule(listener: CsharpListener): void {
        if(listener.exitPower) {
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
