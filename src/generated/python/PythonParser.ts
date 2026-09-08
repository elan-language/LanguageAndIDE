// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { PythonListener } from "./PythonListener.js";
import { PythonVisitor } from "./PythonVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class PythonParser extends antlr.Parser {
    public static readonly ABSTRACT_METHOD = 1;
    public static readonly ASSERT_EQUAL = 2;
    public static readonly AS = 3;
    public static readonly DEF = 4;
    public static readonly CLASS = 5;
    public static readonly ELIF = 6;
    public static readonly ELSE = 7;
    public static readonly EXCEPT = 8;
    public static readonly FOR = 9;
    public static readonly IF = 10;
    public static readonly IN = 11;
    public static readonly INIT = 12;
    public static readonly INPUT = 13;
    public static readonly LAMBDA = 14;
    public static readonly MAIN = 15;
    public static readonly NONE = 16;
    public static readonly PASS = 17;
    public static readonly PRINT = 18;
    public static readonly RAISE = 19;
    public static readonly RETURN = 20;
    public static readonly TRY = 21;
    public static readonly WHILE = 22;
    public static readonly ABC = 23;
    public static readonly ENUM = 24;
    public static readonly TESTCASE = 25;
    public static readonly ARROW = 26;
    public static readonly MOD = 27;
    public static readonly EQUAL = 28;
    public static readonly NOT_EQUAL = 29;
    public static readonly AND = 30;
    public static readonly OR = 31;
    public static readonly NOT = 32;
    public static readonly COMMENT_MARKER = 33;
    public static readonly INTERPOLATED_STRING_PREFIX = 34;
    public static readonly INT_NAME = 35;
    public static readonly FLOAT_NAME = 36;
    public static readonly BOOL_NAME = 37;
    public static readonly STRING_NAME = 38;
    public static readonly LIST_NAME = 39;
    public static readonly FUNC_NAME = 40;
    public static readonly TRUE = 41;
    public static readonly FALSE = 42;
    public static readonly BINARY_PREFIX = 43;
    public static readonly HEX_PREFIX = 44;
    public static readonly THIS_INSTANCE = 45;
    public static readonly TUPLE = 46;
    public static readonly FUNCTION_ANNOTATION = 47;
    public static readonly PROCECDURE_ANNOTATION = 48;
    public static readonly CONSTANT_ANNOTATION = 49;
    public static readonly ENUM_ANNOTATION = 50;
    public static readonly CONCRETE_CLASS_ANNOTATION = 51;
    public static readonly ABSTRACT_CLASS_ANNOTATION = 52;
    public static readonly VARIABLE_ANNOTATION = 53;
    public static readonly ASSIGNMENT_ANNOTATION = 54;
    public static readonly INPUT_ANNOTATION = 55;
    public static readonly CALL_ANNOTATION = 56;
    public static readonly LET_ANNOTATION = 57;
    public static readonly ELSE_IF_ANNOTATION = 58;
    public static readonly PROPERTY_ANNOTATION = 59;
    public static readonly FUNCTION_METHOD_ANNOTATION = 60;
    public static readonly PROCEDURE_METHOD_ANNOTATION = 61;
    public static readonly COMMENT = 62;
    public static readonly LIT_BOOLEAN = 63;
    public static readonly POWER = 64;
    public static readonly WS = 65;
    public static readonly NL = 66;
    public static readonly SINGLE_EQUALS = 67;
    public static readonly OPEN_BRACE = 68;
    public static readonly CLOSE_BRACE = 69;
    public static readonly OPEN_SQ_BRACKET = 70;
    public static readonly CLOSE_SQ_BRACKET = 71;
    public static readonly OPEN_BRACKET = 72;
    public static readonly CLOSE_BRACKET = 73;
    public static readonly DOT = 74;
    public static readonly COMMA = 75;
    public static readonly COLON = 76;
    public static readonly PLUS = 77;
    public static readonly MINUS = 78;
    public static readonly MULT = 79;
    public static readonly DIVIDE = 80;
    public static readonly LT = 81;
    public static readonly GT = 82;
    public static readonly LE = 83;
    public static readonly GE = 84;
    public static readonly DOUBLE_QUOTES = 85;
    public static readonly IF_ = 86;
    public static readonly NAME_STARTING_TEST_ = 87;
    public static readonly NAME_STARTING_LC = 88;
    public static readonly NAME_STARTING_UC = 89;
    public static readonly LITERAL_BINARY = 90;
    public static readonly LITERAL_HEX = 91;
    public static readonly LITERAL_INTEGER = 92;
    public static readonly LITERAL_FLOAT = 93;
    public static readonly INTERPOLATED_STRING = 94;
    public static readonly LITERAL_STRING = 95;
    public static readonly WHITESPACES = 96;
    public static readonly TEXT = 97;
    public static readonly GHOSTED = 98;
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
    public static readonly RULE_litInt = 49;
    public static readonly RULE_litFloat = 50;
    public static readonly RULE_enumValue = 51;
    public static readonly RULE_litString = 52;
    public static readonly RULE_index = 53;
    public static readonly RULE_identifierWithOptIndexes = 54;
    public static readonly RULE_propertyRef = 55;
    public static readonly RULE_expression = 56;
    public static readonly RULE_term = 57;
    public static readonly RULE_chainHead = 58;
    public static readonly RULE_chainable = 59;
    public static readonly RULE_bracketedExpression = 60;
    public static readonly RULE_unaryExpression = 61;
    public static readonly RULE_binaryExpression = 62;
    public static readonly RULE_tuple = 63;
    public static readonly RULE_methodCall = 64;
    public static readonly RULE_binaryOperator = 65;
    public static readonly RULE_newInstance = 66;
    public static readonly RULE_paramDef = 67;
    public static readonly RULE_typeGeneric = 68;
    public static readonly RULE_typeFunc = 69;
    public static readonly RULE_typeTuple = 70;
    public static readonly RULE_lambda = 71;
    public static readonly RULE_list = 72;
    public static readonly RULE_interpolatedString = 73;
    public static readonly RULE_power = 74;

    public static readonly literalNames = [
        null, "'@abstractmethod'", "'assertEqual'", "'as'", "'def'", "'class'", 
        "'elif'", "'else'", "'except'", "'for'", "'if'", "'in'", "'__init__'", 
        "'input'", "'lambda'", "'main'", "'None'", "'pass'", "'print'", 
        "'raise'", "'return'", "'try'", "'while'", "'ABC'", "'Enum'", "'unittest.TestCase'", 
        "'->'", "'%'", "'=='", "'!='", "'and'", "'or'", "'not'", "'#'", 
        "'f'", "'int'", "'float'", "'bool'", "'str'", "'list'", "'Callable'", 
        "'True'", "'False'", "'0b'", "'0x'", "'self'", "'tuple'", null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, "'^'", null, null, "'='", "'{'", "'}'", 
        "'['", "']'", "'('", "')'", "'.'", "','", "':'", "'+'", "'-'", "'*'", 
        "'/'", "'<'", "'>'", "'<='", "'>='", "'\"'", "'if_'", null, null, 
        null, null, null, null, null, null, null, null, null, "'[ghosted]'"
    ];

    public static readonly symbolicNames = [
        null, "ABSTRACT_METHOD", "ASSERT_EQUAL", "AS", "DEF", "CLASS", "ELIF", 
        "ELSE", "EXCEPT", "FOR", "IF", "IN", "INIT", "INPUT", "LAMBDA", 
        "MAIN", "NONE", "PASS", "PRINT", "RAISE", "RETURN", "TRY", "WHILE", 
        "ABC", "ENUM", "TESTCASE", "ARROW", "MOD", "EQUAL", "NOT_EQUAL", 
        "AND", "OR", "NOT", "COMMENT_MARKER", "INTERPOLATED_STRING_PREFIX", 
        "INT_NAME", "FLOAT_NAME", "BOOL_NAME", "STRING_NAME", "LIST_NAME", 
        "FUNC_NAME", "TRUE", "FALSE", "BINARY_PREFIX", "HEX_PREFIX", "THIS_INSTANCE", 
        "TUPLE", "FUNCTION_ANNOTATION", "PROCECDURE_ANNOTATION", "CONSTANT_ANNOTATION", 
        "ENUM_ANNOTATION", "CONCRETE_CLASS_ANNOTATION", "ABSTRACT_CLASS_ANNOTATION", 
        "VARIABLE_ANNOTATION", "ASSIGNMENT_ANNOTATION", "INPUT_ANNOTATION", 
        "CALL_ANNOTATION", "LET_ANNOTATION", "ELSE_IF_ANNOTATION", "PROPERTY_ANNOTATION", 
        "FUNCTION_METHOD_ANNOTATION", "PROCEDURE_METHOD_ANNOTATION", "COMMENT", 
        "LIT_BOOLEAN", "POWER", "WS", "NL", "SINGLE_EQUALS", "OPEN_BRACE", 
        "CLOSE_BRACE", "OPEN_SQ_BRACKET", "CLOSE_SQ_BRACKET", "OPEN_BRACKET", 
        "CLOSE_BRACKET", "DOT", "COMMA", "COLON", "PLUS", "MINUS", "MULT", 
        "DIVIDE", "LT", "GT", "LE", "GE", "DOUBLE_QUOTES", "IF_", "NAME_STARTING_TEST_", 
        "NAME_STARTING_LC", "NAME_STARTING_UC", "LITERAL_BINARY", "LITERAL_HEX", 
        "LITERAL_INTEGER", "LITERAL_FLOAT", "INTERPOLATED_STRING", "LITERAL_STRING", 
        "WHITESPACES", "TEXT", "GHOSTED"
    ];
    public static readonly ruleNames = [
        "file", "global", "main", "function", "test", "procedure", "constant", 
        "enum", "concreteClass", "abstractClass", "commentGlobal", "ordinaryStatement", 
        "print", "variableDefinition", "assignment", "inputStatement", "ifStatement", 
        "whileLoop", "forLoop", "procedureCall", "tryStatement", "throwStatement", 
        "commentStatement", "assert", "letStatement", "returnStatement", 
        "elseIfClause", "elseClause", "catchStatement", "constructorMember", 
        "property", "functionMethod", "procedureMethod", "abstractFunction", 
        "abstractProcedure", "commentMember", "identifier", "assignable", 
        "methodName", "testName", "typeName", "constantValue", "argList", 
        "argument", "paramsList", "type", "enumValuesList", "assertActual", 
        "litValue", "litInt", "litFloat", "enumValue", "litString", "index", 
        "identifierWithOptIndexes", "propertyRef", "expression", "term", 
        "chainHead", "chainable", "bracketedExpression", "unaryExpression", 
        "binaryExpression", "tuple", "methodCall", "binaryOperator", "newInstance", 
        "paramDef", "typeGeneric", "typeFunc", "typeTuple", "lambda", "list", 
        "interpolatedString", "power",
    ];

    public get grammarFileName(): string { return "Python.g4"; }
    public get literalNames(): (string | null)[] { return PythonParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return PythonParser.symbolicNames; }
    public get ruleNames(): string[] { return PythonParser.ruleNames; }
    public get serializedATN(): number[] { return PythonParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, PythonParser._ATN, PythonParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public file(): FileContext {
        let localContext = new FileContext(this.context, this.state);
        this.enterRule(localContext, 0, PythonParser.RULE_file);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 151;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                {
                this.state = 150;
                this.match(PythonParser.COMMENT);
                }
                break;
            }
            this.state = 156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4 || _la === 5 || _la === 62 || _la === 88) {
                {
                {
                this.state = 153;
                this.global();
                }
                }
                this.state = 158;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 66) {
                {
                {
                this.state = 159;
                this.match(PythonParser.NL);
                }
                }
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 165;
            this.match(PythonParser.EOF);
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
        this.enterRule(localContext, 2, PythonParser.RULE_global);
        try {
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 167;
                this.main();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 168;
                this.function_();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 169;
                this.test();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 170;
                this.procedure();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 171;
                this.constant();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 172;
                this.enum_();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 173;
                this.concreteClass();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 174;
                this.abstractClass();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 175;
                this.commentGlobal();
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
        this.enterRule(localContext, 4, PythonParser.RULE_main);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 178;
            this.match(PythonParser.DEF);
            this.state = 179;
            this.match(PythonParser.MAIN);
            this.state = 180;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 181;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 182;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 183;
            this.match(PythonParser.ARROW);
            this.state = 184;
            this.match(PythonParser.NONE);
            this.state = 185;
            this.match(PythonParser.COLON);
            this.state = 186;
            this.match(PythonParser.NL);
            this.state = 190;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 187;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 192;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            }
            this.state = 193;
            this.match(PythonParser.COMMENT);
            this.state = 194;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 6, PythonParser.RULE_function);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(PythonParser.DEF);
            this.state = 197;
            this.methodName();
            this.state = 198;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 200;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 199;
                this.paramsList();
                }
            }

            this.state = 202;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 203;
            this.match(PythonParser.ARROW);
            this.state = 204;
            this.type_();
            this.state = 205;
            this.match(PythonParser.COLON);
            this.state = 206;
            this.match(PythonParser.FUNCTION_ANNOTATION);
            this.state = 207;
            this.match(PythonParser.NL);
            this.state = 212;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7079424) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 402654239) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66846725) !== 0)) {
                {
                this.state = 210;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
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
            this.match(PythonParser.COMMENT);
            this.state = 217;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 8, PythonParser.RULE_test);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 219;
            this.match(PythonParser.CLASS);
            this.state = 220;
            this.testName();
            this.state = 221;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 222;
            this.match(PythonParser.TESTCASE);
            this.state = 223;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 224;
            this.match(PythonParser.COMMENT);
            this.state = 225;
            this.match(PythonParser.NL);
            this.state = 232;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 230;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
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
                }
                this.state = 234;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 9, this.context);
            }
            this.state = 235;
            this.match(PythonParser.COMMENT);
            this.state = 236;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 10, PythonParser.RULE_procedure);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(PythonParser.DEF);
            this.state = 239;
            this.methodName();
            this.state = 240;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 241;
                this.paramsList();
                }
            }

            this.state = 244;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 245;
            this.match(PythonParser.ARROW);
            this.state = 246;
            this.match(PythonParser.NONE);
            this.state = 247;
            this.match(PythonParser.COLON);
            this.state = 248;
            this.match(PythonParser.PROCECDURE_ANNOTATION);
            this.state = 249;
            this.match(PythonParser.NL);
            this.state = 253;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 250;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 255;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            }
            this.state = 256;
            this.match(PythonParser.COMMENT);
            this.state = 257;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 12, PythonParser.RULE_constant);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 259;
            this.identifier();
            this.state = 260;
            this.match(PythonParser.EQUAL);
            this.state = 261;
            this.constantValue();
            this.state = 262;
            this.match(PythonParser.CONSTANT_ANNOTATION);
            this.state = 263;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 14, PythonParser.RULE_enum);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 265;
            this.match(PythonParser.CLASS);
            this.state = 266;
            this.typeName();
            this.state = 267;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 268;
            this.match(PythonParser.ENUM);
            this.state = 269;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 270;
            this.match(PythonParser.COLON);
            this.state = 271;
            this.match(PythonParser.ENUM_ANNOTATION);
            this.state = 272;
            this.match(PythonParser.NL);
            this.state = 273;
            this.enumValuesList();
            this.state = 274;
            this.match(PythonParser.NL);
            this.state = 275;
            this.match(PythonParser.COMMENT);
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
        this.enterRule(localContext, 16, PythonParser.RULE_concreteClass);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 277;
            this.match(PythonParser.CLASS);
            this.state = 278;
            this.typeName();
            this.state = 283;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 72) {
                {
                this.state = 279;
                this.match(PythonParser.OPEN_BRACKET);
                this.state = 280;
                this.typeName();
                this.state = 281;
                this.match(PythonParser.CLOSE_BRACKET);
                }
            }

            this.state = 285;
            this.match(PythonParser.COLON);
            this.state = 286;
            this.match(PythonParser.CONCRETE_CLASS_ANNOTATION);
            this.state = 287;
            this.match(PythonParser.NL);
            this.state = 295;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 293;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
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
                }
                this.state = 297;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            }
            this.state = 298;
            this.match(PythonParser.COMMENT);
            this.state = 299;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 18, PythonParser.RULE_abstractClass);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 301;
            this.match(PythonParser.CLASS);
            this.state = 302;
            this.typeName();
            this.state = 307;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PythonParser.OPEN_BRACKET:
                {
                this.state = 303;
                this.match(PythonParser.OPEN_BRACKET);
                this.state = 304;
                this.typeName();
                }
                break;
            case PythonParser.ABC:
                {
                this.state = 305;
                this.match(PythonParser.ABC);
                this.state = 306;
                this.match(PythonParser.CLOSE_BRACKET);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 309;
            this.match(PythonParser.ABSTRACT_CLASS_ANNOTATION);
            this.state = 310;
            this.match(PythonParser.NL);
            this.state = 319;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 317;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
                    case 1:
                        {
                        this.state = 311;
                        this.property();
                        }
                        break;
                    case 2:
                        {
                        this.state = 312;
                        this.functionMethod();
                        }
                        break;
                    case 3:
                        {
                        this.state = 313;
                        this.procedureMethod();
                        }
                        break;
                    case 4:
                        {
                        this.state = 314;
                        this.abstractFunction();
                        }
                        break;
                    case 5:
                        {
                        this.state = 315;
                        this.abstractProcedure();
                        }
                        break;
                    case 6:
                        {
                        this.state = 316;
                        this.commentMember();
                        }
                        break;
                    }
                    }
                }
                this.state = 321;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            }
            this.state = 322;
            this.match(PythonParser.COMMENT);
            this.state = 323;
            this.match(PythonParser.NL);
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
    public commentGlobal(): CommentGlobalContext {
        let localContext = new CommentGlobalContext(this.context, this.state);
        this.enterRule(localContext, 20, PythonParser.RULE_commentGlobal);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 325;
            this.match(PythonParser.COMMENT);
            this.state = 326;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 22, PythonParser.RULE_ordinaryStatement);
        try {
            this.state = 339;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 328;
                this.print();
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
                this.assignment();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 331;
                this.inputStatement();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 332;
                this.ifStatement();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 333;
                this.whileLoop();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 334;
                this.forLoop();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 335;
                this.procedureCall();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 336;
                this.tryStatement();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 337;
                this.throwStatement();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 338;
                this.commentStatement();
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
    public print(): PrintContext {
        let localContext = new PrintContext(this.context, this.state);
        this.enterRule(localContext, 24, PythonParser.RULE_print);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 341;
            this.match(PythonParser.PRINT);
            this.state = 342;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 344;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2147508729) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66912517) !== 0)) {
                {
                this.state = 343;
                this.expression(0);
                }
            }

            this.state = 346;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 347;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 26, PythonParser.RULE_variableDefinition);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 349;
            this.identifier();
            this.state = 350;
            this.match(PythonParser.EQUAL);
            this.state = 351;
            this.expression(0);
            this.state = 352;
            this.match(PythonParser.VARIABLE_ANNOTATION);
            this.state = 353;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 28, PythonParser.RULE_assignment);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 355;
            this.assignable();
            this.state = 356;
            this.match(PythonParser.EQUAL);
            this.state = 357;
            this.expression(0);
            this.state = 358;
            this.match(PythonParser.ASSIGNMENT_ANNOTATION);
            this.state = 359;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 30, PythonParser.RULE_inputStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 361;
            this.identifier();
            this.state = 362;
            this.match(PythonParser.EQUAL);
            this.state = 363;
            this.match(PythonParser.INPUT);
            this.state = 364;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 365;
            this.expression(0);
            this.state = 366;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 367;
            this.match(PythonParser.INPUT_ANNOTATION);
            this.state = 368;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 32, PythonParser.RULE_ifStatement);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.match(PythonParser.IF);
            this.state = 371;
            this.expression(0);
            this.state = 372;
            this.match(PythonParser.COLON);
            this.state = 373;
            this.match(PythonParser.NL);
            this.state = 379;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 377;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case PythonParser.ELIF:
                        {
                        this.state = 374;
                        this.elseIfClause();
                        }
                        break;
                    case PythonParser.ELSE:
                        {
                        this.state = 375;
                        this.elseClause();
                        }
                        break;
                    case PythonParser.FOR:
                    case PythonParser.IF:
                    case PythonParser.PRINT:
                    case PythonParser.RAISE:
                    case PythonParser.TRY:
                    case PythonParser.WHILE:
                    case PythonParser.INT_NAME:
                    case PythonParser.FLOAT_NAME:
                    case PythonParser.BOOL_NAME:
                    case PythonParser.STRING_NAME:
                    case PythonParser.LIST_NAME:
                    case PythonParser.THIS_INSTANCE:
                    case PythonParser.COMMENT:
                    case PythonParser.LIT_BOOLEAN:
                    case PythonParser.OPEN_SQ_BRACKET:
                    case PythonParser.OPEN_BRACKET:
                    case PythonParser.NAME_STARTING_LC:
                    case PythonParser.NAME_STARTING_UC:
                    case PythonParser.LITERAL_BINARY:
                    case PythonParser.LITERAL_HEX:
                    case PythonParser.LITERAL_INTEGER:
                    case PythonParser.LITERAL_FLOAT:
                    case PythonParser.INTERPOLATED_STRING:
                    case PythonParser.LITERAL_STRING:
                        {
                        this.state = 376;
                        this.ordinaryStatement();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 381;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 21, this.context);
            }
            this.state = 382;
            this.match(PythonParser.COMMENT);
            this.state = 383;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 34, PythonParser.RULE_whileLoop);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.match(PythonParser.WHILE);
            this.state = 386;
            this.expression(0);
            this.state = 387;
            this.match(PythonParser.COLON);
            this.state = 388;
            this.match(PythonParser.NL);
            this.state = 392;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 389;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 394;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
            }
            this.state = 395;
            this.match(PythonParser.COMMENT);
            this.state = 396;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 36, PythonParser.RULE_forLoop);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 398;
            this.match(PythonParser.FOR);
            this.state = 399;
            this.identifier();
            this.state = 400;
            this.match(PythonParser.IN);
            this.state = 401;
            this.expression(0);
            this.state = 402;
            this.match(PythonParser.COLON);
            this.state = 403;
            this.match(PythonParser.NL);
            this.state = 407;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 404;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 409;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            }
            this.state = 410;
            this.match(PythonParser.COMMENT);
            this.state = 411;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 38, PythonParser.RULE_procedureCall);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 413;
            this.term();
            this.state = 414;
            this.match(PythonParser.CALL_ANNOTATION);
            this.state = 415;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 40, PythonParser.RULE_tryStatement);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 417;
            this.match(PythonParser.TRY);
            this.state = 418;
            this.match(PythonParser.NL);
            this.state = 422;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7079424) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 402654239) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66846725) !== 0)) {
                {
                {
                this.state = 419;
                this.ordinaryStatement();
                }
                }
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 425;
            this.catchStatement();
            this.state = 429;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 426;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 431;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
            }
            this.state = 432;
            this.match(PythonParser.COMMENT);
            this.state = 433;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 42, PythonParser.RULE_throwStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 435;
            this.match(PythonParser.RAISE);
            this.state = 436;
            this.typeName();
            this.state = 437;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 438;
            this.litString();
            this.state = 439;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 440;
            this.match(PythonParser.NL);
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
    public commentStatement(): CommentStatementContext {
        let localContext = new CommentStatementContext(this.context, this.state);
        this.enterRule(localContext, 44, PythonParser.RULE_commentStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 442;
            this.match(PythonParser.COMMENT);
            this.state = 443;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 46, PythonParser.RULE_assert);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 445;
            this.match(PythonParser.THIS_INSTANCE);
            this.state = 446;
            this.match(PythonParser.DOT);
            this.state = 447;
            this.match(PythonParser.ASSERT_EQUAL);
            this.state = 448;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 449;
            this.assertActual();
            this.state = 450;
            this.match(PythonParser.COMMA);
            this.state = 451;
            this.expression(0);
            this.state = 452;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 453;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 48, PythonParser.RULE_letStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.identifier();
            this.state = 456;
            this.match(PythonParser.EQUAL);
            this.state = 457;
            this.expression(0);
            this.state = 458;
            this.match(PythonParser.LET_ANNOTATION);
            this.state = 459;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 50, PythonParser.RULE_returnStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 461;
            this.match(PythonParser.RETURN);
            this.state = 462;
            this.expression(0);
            this.state = 463;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 52, PythonParser.RULE_elseIfClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            this.match(PythonParser.ELIF);
            this.state = 466;
            this.expression(0);
            this.state = 467;
            this.match(PythonParser.COLON);
            this.state = 468;
            this.match(PythonParser.ELSE_IF_ANNOTATION);
            this.state = 469;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 54, PythonParser.RULE_elseClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 471;
            this.match(PythonParser.ELSE);
            this.state = 472;
            this.match(PythonParser.COLON);
            this.state = 473;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 56, PythonParser.RULE_catchStatement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 475;
            this.match(PythonParser.EXCEPT);
            this.state = 476;
            this.typeName();
            this.state = 477;
            this.match(PythonParser.AS);
            this.state = 478;
            this.identifier();
            this.state = 479;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 58, PythonParser.RULE_constructorMember);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 481;
            this.match(PythonParser.DEF);
            this.state = 482;
            this.match(PythonParser.INIT);
            this.state = 483;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 485;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 484;
                this.paramsList();
                }
            }

            this.state = 487;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 488;
            this.match(PythonParser.ARROW);
            this.state = 489;
            this.match(PythonParser.NONE);
            this.state = 490;
            this.match(PythonParser.COLON);
            this.state = 491;
            this.match(PythonParser.NL);
            this.state = 495;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 492;
                    this.ordinaryStatement();
                    }
                    }
                }
                this.state = 497;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            }
            this.state = 498;
            this.match(PythonParser.COMMENT);
            this.state = 499;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 60, PythonParser.RULE_property);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 501;
            this.identifier();
            this.state = 502;
            this.match(PythonParser.COLON);
            this.state = 503;
            this.type_();
            this.state = 504;
            this.match(PythonParser.PROPERTY_ANNOTATION);
            this.state = 505;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 62, PythonParser.RULE_functionMethod);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 507;
            this.match(PythonParser.DEF);
            this.state = 508;
            this.methodName();
            this.state = 509;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 510;
                this.paramsList();
                }
            }

            this.state = 513;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 514;
            this.match(PythonParser.ARROW);
            this.state = 515;
            this.type_();
            this.state = 516;
            this.match(PythonParser.COLON);
            this.state = 517;
            this.match(PythonParser.FUNCTION_METHOD_ANNOTATION);
            this.state = 518;
            this.match(PythonParser.NL);
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7079424) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 402654239) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66846725) !== 0)) {
                {
                this.state = 521;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
                case 1:
                    {
                    this.state = 519;
                    this.letStatement();
                    }
                    break;
                case 2:
                    {
                    this.state = 520;
                    this.ordinaryStatement();
                    }
                    break;
                }
                }
                this.state = 525;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 526;
            this.returnStatement();
            this.state = 527;
            this.match(PythonParser.COMMENT);
            this.state = 528;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 64, PythonParser.RULE_procedureMethod);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 530;
            this.match(PythonParser.DEF);
            this.state = 531;
            this.methodName();
            this.state = 532;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 534;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 533;
                this.paramsList();
                }
            }

            this.state = 536;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 537;
            this.match(PythonParser.ARROW);
            this.state = 538;
            this.match(PythonParser.NONE);
            this.state = 539;
            this.match(PythonParser.COLON);
            this.state = 540;
            this.match(PythonParser.PROCEDURE_METHOD_ANNOTATION);
            this.state = 541;
            this.match(PythonParser.NL);
            this.state = 545;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
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
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            }
            this.state = 548;
            this.match(PythonParser.COMMENT);
            this.state = 549;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 66, PythonParser.RULE_abstractFunction);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 551;
            this.match(PythonParser.ABSTRACT_METHOD);
            this.state = 552;
            this.match(PythonParser.NL);
            this.state = 553;
            this.match(PythonParser.DEF);
            this.state = 554;
            this.methodName();
            this.state = 555;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 556;
                this.paramsList();
                }
            }

            this.state = 559;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 560;
            this.match(PythonParser.ARROW);
            this.state = 561;
            this.type_();
            this.state = 562;
            this.match(PythonParser.COLON);
            this.state = 563;
            this.match(PythonParser.NL);
            this.state = 564;
            this.match(PythonParser.PASS);
            this.state = 565;
            this.match(PythonParser.COMMENT);
            this.state = 566;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 68, PythonParser.RULE_abstractProcedure);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 568;
            this.match(PythonParser.ABSTRACT_METHOD);
            this.state = 569;
            this.match(PythonParser.NL);
            this.state = 570;
            this.match(PythonParser.DEF);
            this.state = 571;
            this.methodName();
            this.state = 572;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 574;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 88) {
                {
                this.state = 573;
                this.paramsList();
                }
            }

            this.state = 576;
            this.match(PythonParser.CLOSE_BRACKET);
            this.state = 577;
            this.match(PythonParser.ARROW);
            this.state = 578;
            this.match(PythonParser.NONE);
            this.state = 579;
            this.match(PythonParser.COLON);
            this.state = 580;
            this.match(PythonParser.NL);
            this.state = 581;
            this.match(PythonParser.PASS);
            this.state = 582;
            this.match(PythonParser.COMMENT);
            this.state = 583;
            this.match(PythonParser.NL);
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
    public commentMember(): CommentMemberContext {
        let localContext = new CommentMemberContext(this.context, this.state);
        this.enterRule(localContext, 70, PythonParser.RULE_commentMember);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 586;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 62) {
                {
                this.state = 585;
                this.match(PythonParser.COMMENT);
                }
            }

            this.state = 588;
            this.match(PythonParser.NL);
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
        this.enterRule(localContext, 72, PythonParser.RULE_identifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 590;
            this.match(PythonParser.NAME_STARTING_LC);
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
        this.enterRule(localContext, 74, PythonParser.RULE_assignable);
        try {
            this.state = 594;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PythonParser.NAME_STARTING_LC:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 592;
                this.identifierWithOptIndexes();
                }
                break;
            case PythonParser.THIS_INSTANCE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 593;
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
        this.enterRule(localContext, 76, PythonParser.RULE_methodName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 596;
            this.match(PythonParser.NAME_STARTING_LC);
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
        this.enterRule(localContext, 78, PythonParser.RULE_testName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 598;
            this.match(PythonParser.NAME_STARTING_TEST_);
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
        this.enterRule(localContext, 80, PythonParser.RULE_typeName);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 600;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 31) !== 0) || _la === 89)) {
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
        this.enterRule(localContext, 82, PythonParser.RULE_constantValue);
        try {
            this.state = 604;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PythonParser.INT_NAME:
            case PythonParser.FLOAT_NAME:
            case PythonParser.BOOL_NAME:
            case PythonParser.STRING_NAME:
            case PythonParser.LIST_NAME:
            case PythonParser.LIT_BOOLEAN:
            case PythonParser.NAME_STARTING_UC:
            case PythonParser.LITERAL_BINARY:
            case PythonParser.LITERAL_HEX:
            case PythonParser.LITERAL_INTEGER:
            case PythonParser.LITERAL_FLOAT:
            case PythonParser.INTERPOLATED_STRING:
            case PythonParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 602;
                this.litValue();
                }
                break;
            case PythonParser.NAME_STARTING_LC:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 603;
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
        this.enterRule(localContext, 84, PythonParser.RULE_argList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 606;
            this.argument();
            this.state = 611;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 607;
                this.match(PythonParser.COMMA);
                this.state = 608;
                this.argument();
                }
                }
                this.state = 613;
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
        this.enterRule(localContext, 86, PythonParser.RULE_argument);
        try {
            this.state = 616;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PythonParser.LAMBDA:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 614;
                this.lambda();
                }
                break;
            case PythonParser.NOT:
            case PythonParser.INT_NAME:
            case PythonParser.FLOAT_NAME:
            case PythonParser.BOOL_NAME:
            case PythonParser.STRING_NAME:
            case PythonParser.LIST_NAME:
            case PythonParser.FUNC_NAME:
            case PythonParser.THIS_INSTANCE:
            case PythonParser.TUPLE:
            case PythonParser.LIT_BOOLEAN:
            case PythonParser.OPEN_SQ_BRACKET:
            case PythonParser.OPEN_BRACKET:
            case PythonParser.MINUS:
            case PythonParser.IF_:
            case PythonParser.NAME_STARTING_LC:
            case PythonParser.NAME_STARTING_UC:
            case PythonParser.LITERAL_BINARY:
            case PythonParser.LITERAL_HEX:
            case PythonParser.LITERAL_INTEGER:
            case PythonParser.LITERAL_FLOAT:
            case PythonParser.INTERPOLATED_STRING:
            case PythonParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 615;
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
        this.enterRule(localContext, 88, PythonParser.RULE_paramsList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 618;
            this.paramDef();
            this.state = 623;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 619;
                this.match(PythonParser.COMMA);
                this.state = 620;
                this.paramDef();
                }
                }
                this.state = 625;
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
        this.enterRule(localContext, 90, PythonParser.RULE_type);
        try {
            this.state = 630;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 626;
                this.typeTuple();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 627;
                this.typeName();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 628;
                this.typeGeneric();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 629;
                this.typeFunc();
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
        this.enterRule(localContext, 92, PythonParser.RULE_enumValuesList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.identifier();
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 633;
                this.match(PythonParser.COMMA);
                this.state = 634;
                this.identifier();
                }
                }
                this.state = 639;
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
        this.enterRule(localContext, 94, PythonParser.RULE_assertActual);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
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
        this.enterRule(localContext, 96, PythonParser.RULE_litValue);
        try {
            this.state = 647;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case PythonParser.LIT_BOOLEAN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 642;
                this.match(PythonParser.LIT_BOOLEAN);
                }
                break;
            case PythonParser.LITERAL_BINARY:
            case PythonParser.LITERAL_HEX:
            case PythonParser.LITERAL_INTEGER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 643;
                this.litInt();
                }
                break;
            case PythonParser.LITERAL_FLOAT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 644;
                this.litFloat();
                }
                break;
            case PythonParser.INTERPOLATED_STRING:
            case PythonParser.LITERAL_STRING:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 645;
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
                this.state = 646;
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
        this.enterRule(localContext, 98, PythonParser.RULE_litInt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & 7) !== 0))) {
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
        this.enterRule(localContext, 100, PythonParser.RULE_litFloat);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 651;
            this.match(PythonParser.LITERAL_FLOAT);
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
        this.enterRule(localContext, 102, PythonParser.RULE_enumValue);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 653;
            this.typeName();
            this.state = 654;
            this.match(PythonParser.DOT);
            this.state = 655;
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
        this.enterRule(localContext, 104, PythonParser.RULE_litString);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 657;
            _la = this.tokenStream.LA(1);
            if(!(_la === 94 || _la === 95)) {
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
        this.enterRule(localContext, 106, PythonParser.RULE_index);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 659;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 660;
            this.expression(0);
            this.state = 661;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
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
        this.enterRule(localContext, 108, PythonParser.RULE_identifierWithOptIndexes);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 663;
            this.identifier();
            this.state = 667;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 70) {
                {
                {
                this.state = 664;
                this.index();
                }
                }
                this.state = 669;
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
        this.enterRule(localContext, 110, PythonParser.RULE_propertyRef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 670;
            this.match(PythonParser.THIS_INSTANCE);
            this.state = 671;
            this.match(PythonParser.DOT);
            this.state = 672;
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
        let _startState = 112;
        this.enterRecursionRule(localContext, 112, PythonParser.RULE_expression, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 687;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                {
                this.state = 675;
                this.newInstance();
                }
                break;
            case 2:
                {
                this.state = 676;
                this.unaryExpression();
                }
                break;
            case 3:
                {
                this.state = 677;
                this.term();
                }
                break;
            case 4:
                {
                this.state = 678;
                this.match(PythonParser.IF_);
                this.state = 679;
                this.match(PythonParser.OPEN_BRACKET);
                this.state = 680;
                this.expression(0);
                this.state = 681;
                this.match(PythonParser.COMMA);
                this.state = 682;
                this.expression(0);
                this.state = 683;
                this.match(PythonParser.COMMA);
                this.state = 684;
                this.expression(0);
                this.state = 685;
                this.match(PythonParser.CLOSE_BRACKET);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 695;
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
                    this.pushNewRecursionContext(localContext, _startState, PythonParser.RULE_expression);
                    this.state = 689;
                    if (!(this.precpred(this.context, 2))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                    }
                    this.state = 690;
                    this.binaryOperator();
                    this.state = 691;
                    this.expression(3);
                    }
                    }
                }
                this.state = 697;
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
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public term(): TermContext {
        let localContext = new TermContext(this.context, this.state);
        this.enterRule(localContext, 114, PythonParser.RULE_term);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 698;
            this.chainHead();
            this.state = 703;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 699;
                    this.match(PythonParser.DOT);
                    this.state = 700;
                    this.chainable();
                    }
                    }
                }
                this.state = 705;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
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
        this.enterRule(localContext, 116, PythonParser.RULE_chainHead);
        try {
            this.state = 712;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 706;
                this.match(PythonParser.THIS_INSTANCE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 707;
                this.bracketedExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 708;
                this.tuple();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 709;
                this.litValue();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 710;
                this.list();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 711;
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
        this.enterRule(localContext, 118, PythonParser.RULE_chainable);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 714;
                this.identifier();
                }
                break;
            case 2:
                {
                this.state = 715;
                this.methodCall();
                }
                break;
            }
            this.state = 721;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 718;
                    this.index();
                    }
                    }
                }
                this.state = 723;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
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
        this.enterRule(localContext, 120, PythonParser.RULE_bracketedExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 724;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 725;
            this.expression(0);
            this.state = 726;
            this.match(PythonParser.CLOSE_BRACKET);
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
        this.enterRule(localContext, 122, PythonParser.RULE_unaryExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 728;
            _la = this.tokenStream.LA(1);
            if(!(_la === 32 || _la === 78)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 729;
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
        this.enterRule(localContext, 124, PythonParser.RULE_binaryExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 731;
            this.term();
            this.state = 732;
            this.binaryOperator();
            this.state = 733;
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
        this.enterRule(localContext, 126, PythonParser.RULE_tuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 735;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 736;
            this.expression(0);
            this.state = 737;
            this.match(PythonParser.COMMA);
            this.state = 738;
            this.expression(0);
            this.state = 743;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 739;
                this.match(PythonParser.COMMA);
                this.state = 740;
                this.expression(0);
                }
                }
                this.state = 745;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 746;
            this.match(PythonParser.CLOSE_BRACKET);
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
        this.enterRule(localContext, 128, PythonParser.RULE_methodCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 748;
            this.methodName();
            this.state = 749;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2147508729) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66912517) !== 0)) {
                {
                this.state = 750;
                this.argList();
                }
            }

            this.state = 753;
            this.match(PythonParser.CLOSE_BRACKET);
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
        this.enterRule(localContext, 130, PythonParser.RULE_binaryOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 755;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4160749568) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 255) !== 0))) {
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
        this.enterRule(localContext, 132, PythonParser.RULE_newInstance);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 757;
            this.type_();
            this.state = 758;
            this.match(PythonParser.OPEN_BRACKET);
            this.state = 760;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14 || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2147508729) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 66912517) !== 0)) {
                {
                this.state = 759;
                this.argList();
                }
            }

            this.state = 762;
            this.match(PythonParser.CLOSE_BRACKET);
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
        this.enterRule(localContext, 134, PythonParser.RULE_paramDef);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 764;
            this.identifier();
            this.state = 765;
            this.match(PythonParser.COLON);
            this.state = 766;
            this.type_();
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
        this.enterRule(localContext, 136, PythonParser.RULE_typeGeneric);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 768;
            this.typeName();
            this.state = 769;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 770;
            this.type_();
            this.state = 775;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 771;
                this.match(PythonParser.COMMA);
                this.state = 772;
                this.type_();
                }
                }
                this.state = 777;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 778;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
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
    public typeFunc(): TypeFuncContext {
        let localContext = new TypeFuncContext(this.context, this.state);
        this.enterRule(localContext, 138, PythonParser.RULE_typeFunc);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 780;
            this.match(PythonParser.FUNC_NAME);
            this.state = 781;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 782;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 783;
            this.type_();
            this.state = 788;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 784;
                this.match(PythonParser.COMMA);
                this.state = 785;
                this.type_();
                }
                }
                this.state = 790;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 791;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
            this.state = 792;
            this.type_();
            this.state = 793;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
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
        this.enterRule(localContext, 140, PythonParser.RULE_typeTuple);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 795;
            this.match(PythonParser.TUPLE);
            this.state = 796;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 797;
            this.type_();
            this.state = 800;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 798;
                this.match(PythonParser.COMMA);
                this.state = 799;
                this.type_();
                }
                }
                this.state = 802;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 75);
            this.state = 804;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
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
        this.enterRule(localContext, 142, PythonParser.RULE_lambda);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 806;
            this.match(PythonParser.LAMBDA);
            this.state = 807;
            this.argList();
            this.state = 808;
            this.match(PythonParser.COLON);
            this.state = 809;
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
        this.enterRule(localContext, 144, PythonParser.RULE_list);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.match(PythonParser.OPEN_SQ_BRACKET);
            this.state = 812;
            this.expression(0);
            this.state = 817;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 75) {
                {
                {
                this.state = 813;
                this.match(PythonParser.COMMA);
                this.state = 814;
                this.expression(0);
                }
                }
                this.state = 819;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 820;
            this.match(PythonParser.CLOSE_SQ_BRACKET);
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
        this.enterRule(localContext, 146, PythonParser.RULE_interpolatedString);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 822;
            this.match(PythonParser.INTERPOLATED_STRING_PREFIX);
            this.state = 823;
            this.match(PythonParser.LITERAL_STRING);
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
        this.enterRule(localContext, 148, PythonParser.RULE_power);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 825;
            this.term();
            this.state = 826;
            this.match(PythonParser.POWER);
            this.state = 827;
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
        case 56:
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
        4,1,98,830,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,2,73,7,73,2,74,7,74,1,0,3,0,152,8,0,1,0,5,0,155,8,0,10,0,12,
        0,158,9,0,1,0,5,0,161,8,0,10,0,12,0,164,9,0,1,0,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,3,1,177,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
        1,2,1,2,1,2,5,2,189,8,2,10,2,12,2,192,9,2,1,2,1,2,1,2,1,3,1,3,1,
        3,1,3,3,3,201,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,211,8,3,10,
        3,12,3,214,9,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
        4,1,4,1,4,5,4,231,8,4,10,4,12,4,234,9,4,1,4,1,4,1,4,1,5,1,5,1,5,
        1,5,3,5,243,8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,5,5,252,8,5,10,5,12,
        5,255,9,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,
        7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,3,8,284,8,
        8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,5,8,294,8,8,10,8,12,8,297,9,8,
        1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,3,9,308,8,9,1,9,1,9,1,9,1,9,
        1,9,1,9,1,9,1,9,5,9,318,8,9,10,9,12,9,321,9,9,1,9,1,9,1,9,1,10,1,
        10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,3,
        11,340,8,11,1,12,1,12,1,12,3,12,345,8,12,1,12,1,12,1,12,1,13,1,13,
        1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,
        1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
        5,16,378,8,16,10,16,12,16,381,9,16,1,16,1,16,1,16,1,17,1,17,1,17,
        1,17,1,17,5,17,391,8,17,10,17,12,17,394,9,17,1,17,1,17,1,17,1,18,
        1,18,1,18,1,18,1,18,1,18,1,18,5,18,406,8,18,10,18,12,18,409,9,18,
        1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,5,20,421,8,20,
        10,20,12,20,424,9,20,1,20,1,20,5,20,428,8,20,10,20,12,20,431,9,20,
        1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,
        1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,
        1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,
        1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,
        1,29,3,29,486,8,29,1,29,1,29,1,29,1,29,1,29,1,29,5,29,494,8,29,10,
        29,12,29,497,9,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,
        31,1,31,1,31,1,31,3,31,512,8,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
        31,1,31,5,31,522,8,31,10,31,12,31,525,9,31,1,31,1,31,1,31,1,31,1,
        32,1,32,1,32,1,32,3,32,535,8,32,1,32,1,32,1,32,1,32,1,32,1,32,1,
        32,5,32,544,8,32,10,32,12,32,547,9,32,1,32,1,32,1,32,1,33,1,33,1,
        33,1,33,1,33,1,33,3,33,558,8,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,34,3,34,575,8,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,35,3,35,587,8,35,1,35,1,
        35,1,36,1,36,1,37,1,37,3,37,595,8,37,1,38,1,38,1,39,1,39,1,40,1,
        40,1,41,1,41,3,41,605,8,41,1,42,1,42,1,42,5,42,610,8,42,10,42,12,
        42,613,9,42,1,43,1,43,3,43,617,8,43,1,44,1,44,1,44,5,44,622,8,44,
        10,44,12,44,625,9,44,1,45,1,45,1,45,1,45,3,45,631,8,45,1,46,1,46,
        1,46,5,46,636,8,46,10,46,12,46,639,9,46,1,47,1,47,1,48,1,48,1,48,
        1,48,1,48,3,48,648,8,48,1,49,1,49,1,50,1,50,1,51,1,51,1,51,1,51,
        1,52,1,52,1,53,1,53,1,53,1,53,1,54,1,54,5,54,666,8,54,10,54,12,54,
        669,9,54,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,1,56,1,56,1,56,1,56,3,56,688,8,56,1,56,1,56,1,56,1,56,
        5,56,694,8,56,10,56,12,56,697,9,56,1,57,1,57,1,57,5,57,702,8,57,
        10,57,12,57,705,9,57,1,58,1,58,1,58,1,58,1,58,1,58,3,58,713,8,58,
        1,59,1,59,3,59,717,8,59,1,59,5,59,720,8,59,10,59,12,59,723,9,59,
        1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,63,1,63,
        1,63,1,63,1,63,1,63,5,63,742,8,63,10,63,12,63,745,9,63,1,63,1,63,
        1,64,1,64,1,64,3,64,752,8,64,1,64,1,64,1,65,1,65,1,66,1,66,1,66,
        3,66,761,8,66,1,66,1,66,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,
        1,68,5,68,774,8,68,10,68,12,68,777,9,68,1,68,1,68,1,69,1,69,1,69,
        1,69,1,69,1,69,5,69,787,8,69,10,69,12,69,790,9,69,1,69,1,69,1,69,
        1,69,1,70,1,70,1,70,1,70,1,70,4,70,801,8,70,11,70,12,70,802,1,70,
        1,70,1,71,1,71,1,71,1,71,1,71,1,72,1,72,1,72,1,72,5,72,816,8,72,
        10,72,12,72,819,9,72,1,72,1,72,1,73,1,73,1,73,1,74,1,74,1,74,1,74,
        1,74,0,1,112,75,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
        36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,
        80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,
        118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,
        0,5,2,0,35,39,89,89,1,0,90,92,1,0,94,95,2,0,32,32,78,78,2,0,27,31,
        77,84,849,0,151,1,0,0,0,2,176,1,0,0,0,4,178,1,0,0,0,6,196,1,0,0,
        0,8,219,1,0,0,0,10,238,1,0,0,0,12,259,1,0,0,0,14,265,1,0,0,0,16,
        277,1,0,0,0,18,301,1,0,0,0,20,325,1,0,0,0,22,339,1,0,0,0,24,341,
        1,0,0,0,26,349,1,0,0,0,28,355,1,0,0,0,30,361,1,0,0,0,32,370,1,0,
        0,0,34,385,1,0,0,0,36,398,1,0,0,0,38,413,1,0,0,0,40,417,1,0,0,0,
        42,435,1,0,0,0,44,442,1,0,0,0,46,445,1,0,0,0,48,455,1,0,0,0,50,461,
        1,0,0,0,52,465,1,0,0,0,54,471,1,0,0,0,56,475,1,0,0,0,58,481,1,0,
        0,0,60,501,1,0,0,0,62,507,1,0,0,0,64,530,1,0,0,0,66,551,1,0,0,0,
        68,568,1,0,0,0,70,586,1,0,0,0,72,590,1,0,0,0,74,594,1,0,0,0,76,596,
        1,0,0,0,78,598,1,0,0,0,80,600,1,0,0,0,82,604,1,0,0,0,84,606,1,0,
        0,0,86,616,1,0,0,0,88,618,1,0,0,0,90,630,1,0,0,0,92,632,1,0,0,0,
        94,640,1,0,0,0,96,647,1,0,0,0,98,649,1,0,0,0,100,651,1,0,0,0,102,
        653,1,0,0,0,104,657,1,0,0,0,106,659,1,0,0,0,108,663,1,0,0,0,110,
        670,1,0,0,0,112,687,1,0,0,0,114,698,1,0,0,0,116,712,1,0,0,0,118,
        716,1,0,0,0,120,724,1,0,0,0,122,728,1,0,0,0,124,731,1,0,0,0,126,
        735,1,0,0,0,128,748,1,0,0,0,130,755,1,0,0,0,132,757,1,0,0,0,134,
        764,1,0,0,0,136,768,1,0,0,0,138,780,1,0,0,0,140,795,1,0,0,0,142,
        806,1,0,0,0,144,811,1,0,0,0,146,822,1,0,0,0,148,825,1,0,0,0,150,
        152,5,62,0,0,151,150,1,0,0,0,151,152,1,0,0,0,152,156,1,0,0,0,153,
        155,3,2,1,0,154,153,1,0,0,0,155,158,1,0,0,0,156,154,1,0,0,0,156,
        157,1,0,0,0,157,162,1,0,0,0,158,156,1,0,0,0,159,161,5,66,0,0,160,
        159,1,0,0,0,161,164,1,0,0,0,162,160,1,0,0,0,162,163,1,0,0,0,163,
        165,1,0,0,0,164,162,1,0,0,0,165,166,5,0,0,1,166,1,1,0,0,0,167,177,
        3,4,2,0,168,177,3,6,3,0,169,177,3,8,4,0,170,177,3,10,5,0,171,177,
        3,12,6,0,172,177,3,14,7,0,173,177,3,16,8,0,174,177,3,18,9,0,175,
        177,3,20,10,0,176,167,1,0,0,0,176,168,1,0,0,0,176,169,1,0,0,0,176,
        170,1,0,0,0,176,171,1,0,0,0,176,172,1,0,0,0,176,173,1,0,0,0,176,
        174,1,0,0,0,176,175,1,0,0,0,177,3,1,0,0,0,178,179,5,4,0,0,179,180,
        5,15,0,0,180,181,5,72,0,0,181,182,5,73,0,0,182,183,5,73,0,0,183,
        184,5,26,0,0,184,185,5,16,0,0,185,186,5,76,0,0,186,190,5,66,0,0,
        187,189,3,22,11,0,188,187,1,0,0,0,189,192,1,0,0,0,190,188,1,0,0,
        0,190,191,1,0,0,0,191,193,1,0,0,0,192,190,1,0,0,0,193,194,5,62,0,
        0,194,195,5,66,0,0,195,5,1,0,0,0,196,197,5,4,0,0,197,198,3,76,38,
        0,198,200,5,72,0,0,199,201,3,88,44,0,200,199,1,0,0,0,200,201,1,0,
        0,0,201,202,1,0,0,0,202,203,5,73,0,0,203,204,5,26,0,0,204,205,3,
        90,45,0,205,206,5,76,0,0,206,207,5,47,0,0,207,212,5,66,0,0,208,211,
        3,48,24,0,209,211,3,22,11,0,210,208,1,0,0,0,210,209,1,0,0,0,211,
        214,1,0,0,0,212,210,1,0,0,0,212,213,1,0,0,0,213,215,1,0,0,0,214,
        212,1,0,0,0,215,216,3,50,25,0,216,217,5,62,0,0,217,218,5,66,0,0,
        218,7,1,0,0,0,219,220,5,5,0,0,220,221,3,78,39,0,221,222,5,72,0,0,
        222,223,5,25,0,0,223,224,5,73,0,0,224,225,5,62,0,0,225,232,5,66,
        0,0,226,231,3,46,23,0,227,231,3,48,24,0,228,231,3,26,13,0,229,231,
        3,44,22,0,230,226,1,0,0,0,230,227,1,0,0,0,230,228,1,0,0,0,230,229,
        1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,233,235,
        1,0,0,0,234,232,1,0,0,0,235,236,5,62,0,0,236,237,5,66,0,0,237,9,
        1,0,0,0,238,239,5,4,0,0,239,240,3,76,38,0,240,242,5,72,0,0,241,243,
        3,88,44,0,242,241,1,0,0,0,242,243,1,0,0,0,243,244,1,0,0,0,244,245,
        5,73,0,0,245,246,5,26,0,0,246,247,5,16,0,0,247,248,5,76,0,0,248,
        249,5,48,0,0,249,253,5,66,0,0,250,252,3,22,11,0,251,250,1,0,0,0,
        252,255,1,0,0,0,253,251,1,0,0,0,253,254,1,0,0,0,254,256,1,0,0,0,
        255,253,1,0,0,0,256,257,5,62,0,0,257,258,5,66,0,0,258,11,1,0,0,0,
        259,260,3,72,36,0,260,261,5,28,0,0,261,262,3,82,41,0,262,263,5,49,
        0,0,263,264,5,66,0,0,264,13,1,0,0,0,265,266,5,5,0,0,266,267,3,80,
        40,0,267,268,5,72,0,0,268,269,5,24,0,0,269,270,5,73,0,0,270,271,
        5,76,0,0,271,272,5,50,0,0,272,273,5,66,0,0,273,274,3,92,46,0,274,
        275,5,66,0,0,275,276,5,62,0,0,276,15,1,0,0,0,277,278,5,5,0,0,278,
        283,3,80,40,0,279,280,5,72,0,0,280,281,3,80,40,0,281,282,5,73,0,
        0,282,284,1,0,0,0,283,279,1,0,0,0,283,284,1,0,0,0,284,285,1,0,0,
        0,285,286,5,76,0,0,286,287,5,51,0,0,287,295,5,66,0,0,288,294,3,58,
        29,0,289,294,3,60,30,0,290,294,3,62,31,0,291,294,3,64,32,0,292,294,
        3,70,35,0,293,288,1,0,0,0,293,289,1,0,0,0,293,290,1,0,0,0,293,291,
        1,0,0,0,293,292,1,0,0,0,294,297,1,0,0,0,295,293,1,0,0,0,295,296,
        1,0,0,0,296,298,1,0,0,0,297,295,1,0,0,0,298,299,5,62,0,0,299,300,
        5,66,0,0,300,17,1,0,0,0,301,302,5,5,0,0,302,307,3,80,40,0,303,304,
        5,72,0,0,304,308,3,80,40,0,305,306,5,23,0,0,306,308,5,73,0,0,307,
        303,1,0,0,0,307,305,1,0,0,0,308,309,1,0,0,0,309,310,5,52,0,0,310,
        319,5,66,0,0,311,318,3,60,30,0,312,318,3,62,31,0,313,318,3,64,32,
        0,314,318,3,66,33,0,315,318,3,68,34,0,316,318,3,70,35,0,317,311,
        1,0,0,0,317,312,1,0,0,0,317,313,1,0,0,0,317,314,1,0,0,0,317,315,
        1,0,0,0,317,316,1,0,0,0,318,321,1,0,0,0,319,317,1,0,0,0,319,320,
        1,0,0,0,320,322,1,0,0,0,321,319,1,0,0,0,322,323,5,62,0,0,323,324,
        5,66,0,0,324,19,1,0,0,0,325,326,5,62,0,0,326,327,5,66,0,0,327,21,
        1,0,0,0,328,340,3,24,12,0,329,340,3,26,13,0,330,340,3,28,14,0,331,
        340,3,30,15,0,332,340,3,32,16,0,333,340,3,34,17,0,334,340,3,36,18,
        0,335,340,3,38,19,0,336,340,3,40,20,0,337,340,3,42,21,0,338,340,
        3,44,22,0,339,328,1,0,0,0,339,329,1,0,0,0,339,330,1,0,0,0,339,331,
        1,0,0,0,339,332,1,0,0,0,339,333,1,0,0,0,339,334,1,0,0,0,339,335,
        1,0,0,0,339,336,1,0,0,0,339,337,1,0,0,0,339,338,1,0,0,0,340,23,1,
        0,0,0,341,342,5,18,0,0,342,344,5,72,0,0,343,345,3,112,56,0,344,343,
        1,0,0,0,344,345,1,0,0,0,345,346,1,0,0,0,346,347,5,73,0,0,347,348,
        5,66,0,0,348,25,1,0,0,0,349,350,3,72,36,0,350,351,5,28,0,0,351,352,
        3,112,56,0,352,353,5,53,0,0,353,354,5,66,0,0,354,27,1,0,0,0,355,
        356,3,74,37,0,356,357,5,28,0,0,357,358,3,112,56,0,358,359,5,54,0,
        0,359,360,5,66,0,0,360,29,1,0,0,0,361,362,3,72,36,0,362,363,5,28,
        0,0,363,364,5,13,0,0,364,365,5,72,0,0,365,366,3,112,56,0,366,367,
        5,73,0,0,367,368,5,55,0,0,368,369,5,66,0,0,369,31,1,0,0,0,370,371,
        5,10,0,0,371,372,3,112,56,0,372,373,5,76,0,0,373,379,5,66,0,0,374,
        378,3,52,26,0,375,378,3,54,27,0,376,378,3,22,11,0,377,374,1,0,0,
        0,377,375,1,0,0,0,377,376,1,0,0,0,378,381,1,0,0,0,379,377,1,0,0,
        0,379,380,1,0,0,0,380,382,1,0,0,0,381,379,1,0,0,0,382,383,5,62,0,
        0,383,384,5,66,0,0,384,33,1,0,0,0,385,386,5,22,0,0,386,387,3,112,
        56,0,387,388,5,76,0,0,388,392,5,66,0,0,389,391,3,22,11,0,390,389,
        1,0,0,0,391,394,1,0,0,0,392,390,1,0,0,0,392,393,1,0,0,0,393,395,
        1,0,0,0,394,392,1,0,0,0,395,396,5,62,0,0,396,397,5,66,0,0,397,35,
        1,0,0,0,398,399,5,9,0,0,399,400,3,72,36,0,400,401,5,11,0,0,401,402,
        3,112,56,0,402,403,5,76,0,0,403,407,5,66,0,0,404,406,3,22,11,0,405,
        404,1,0,0,0,406,409,1,0,0,0,407,405,1,0,0,0,407,408,1,0,0,0,408,
        410,1,0,0,0,409,407,1,0,0,0,410,411,5,62,0,0,411,412,5,66,0,0,412,
        37,1,0,0,0,413,414,3,114,57,0,414,415,5,56,0,0,415,416,5,66,0,0,
        416,39,1,0,0,0,417,418,5,21,0,0,418,422,5,66,0,0,419,421,3,22,11,
        0,420,419,1,0,0,0,421,424,1,0,0,0,422,420,1,0,0,0,422,423,1,0,0,
        0,423,425,1,0,0,0,424,422,1,0,0,0,425,429,3,56,28,0,426,428,3,22,
        11,0,427,426,1,0,0,0,428,431,1,0,0,0,429,427,1,0,0,0,429,430,1,0,
        0,0,430,432,1,0,0,0,431,429,1,0,0,0,432,433,5,62,0,0,433,434,5,66,
        0,0,434,41,1,0,0,0,435,436,5,19,0,0,436,437,3,80,40,0,437,438,5,
        72,0,0,438,439,3,104,52,0,439,440,5,73,0,0,440,441,5,66,0,0,441,
        43,1,0,0,0,442,443,5,62,0,0,443,444,5,66,0,0,444,45,1,0,0,0,445,
        446,5,45,0,0,446,447,5,74,0,0,447,448,5,2,0,0,448,449,5,72,0,0,449,
        450,3,94,47,0,450,451,5,75,0,0,451,452,3,112,56,0,452,453,5,73,0,
        0,453,454,5,66,0,0,454,47,1,0,0,0,455,456,3,72,36,0,456,457,5,28,
        0,0,457,458,3,112,56,0,458,459,5,57,0,0,459,460,5,66,0,0,460,49,
        1,0,0,0,461,462,5,20,0,0,462,463,3,112,56,0,463,464,5,66,0,0,464,
        51,1,0,0,0,465,466,5,6,0,0,466,467,3,112,56,0,467,468,5,76,0,0,468,
        469,5,58,0,0,469,470,5,66,0,0,470,53,1,0,0,0,471,472,5,7,0,0,472,
        473,5,76,0,0,473,474,5,66,0,0,474,55,1,0,0,0,475,476,5,8,0,0,476,
        477,3,80,40,0,477,478,5,3,0,0,478,479,3,72,36,0,479,480,5,66,0,0,
        480,57,1,0,0,0,481,482,5,4,0,0,482,483,5,12,0,0,483,485,5,72,0,0,
        484,486,3,88,44,0,485,484,1,0,0,0,485,486,1,0,0,0,486,487,1,0,0,
        0,487,488,5,73,0,0,488,489,5,26,0,0,489,490,5,16,0,0,490,491,5,76,
        0,0,491,495,5,66,0,0,492,494,3,22,11,0,493,492,1,0,0,0,494,497,1,
        0,0,0,495,493,1,0,0,0,495,496,1,0,0,0,496,498,1,0,0,0,497,495,1,
        0,0,0,498,499,5,62,0,0,499,500,5,66,0,0,500,59,1,0,0,0,501,502,3,
        72,36,0,502,503,5,76,0,0,503,504,3,90,45,0,504,505,5,59,0,0,505,
        506,5,66,0,0,506,61,1,0,0,0,507,508,5,4,0,0,508,509,3,76,38,0,509,
        511,5,72,0,0,510,512,3,88,44,0,511,510,1,0,0,0,511,512,1,0,0,0,512,
        513,1,0,0,0,513,514,5,73,0,0,514,515,5,26,0,0,515,516,3,90,45,0,
        516,517,5,76,0,0,517,518,5,60,0,0,518,523,5,66,0,0,519,522,3,48,
        24,0,520,522,3,22,11,0,521,519,1,0,0,0,521,520,1,0,0,0,522,525,1,
        0,0,0,523,521,1,0,0,0,523,524,1,0,0,0,524,526,1,0,0,0,525,523,1,
        0,0,0,526,527,3,50,25,0,527,528,5,62,0,0,528,529,5,66,0,0,529,63,
        1,0,0,0,530,531,5,4,0,0,531,532,3,76,38,0,532,534,5,72,0,0,533,535,
        3,88,44,0,534,533,1,0,0,0,534,535,1,0,0,0,535,536,1,0,0,0,536,537,
        5,73,0,0,537,538,5,26,0,0,538,539,5,16,0,0,539,540,5,76,0,0,540,
        541,5,61,0,0,541,545,5,66,0,0,542,544,3,22,11,0,543,542,1,0,0,0,
        544,547,1,0,0,0,545,543,1,0,0,0,545,546,1,0,0,0,546,548,1,0,0,0,
        547,545,1,0,0,0,548,549,5,62,0,0,549,550,5,66,0,0,550,65,1,0,0,0,
        551,552,5,1,0,0,552,553,5,66,0,0,553,554,5,4,0,0,554,555,3,76,38,
        0,555,557,5,72,0,0,556,558,3,88,44,0,557,556,1,0,0,0,557,558,1,0,
        0,0,558,559,1,0,0,0,559,560,5,73,0,0,560,561,5,26,0,0,561,562,3,
        90,45,0,562,563,5,76,0,0,563,564,5,66,0,0,564,565,5,17,0,0,565,566,
        5,62,0,0,566,567,5,66,0,0,567,67,1,0,0,0,568,569,5,1,0,0,569,570,
        5,66,0,0,570,571,5,4,0,0,571,572,3,76,38,0,572,574,5,72,0,0,573,
        575,3,88,44,0,574,573,1,0,0,0,574,575,1,0,0,0,575,576,1,0,0,0,576,
        577,5,73,0,0,577,578,5,26,0,0,578,579,5,16,0,0,579,580,5,76,0,0,
        580,581,5,66,0,0,581,582,5,17,0,0,582,583,5,62,0,0,583,584,5,66,
        0,0,584,69,1,0,0,0,585,587,5,62,0,0,586,585,1,0,0,0,586,587,1,0,
        0,0,587,588,1,0,0,0,588,589,5,66,0,0,589,71,1,0,0,0,590,591,5,88,
        0,0,591,73,1,0,0,0,592,595,3,108,54,0,593,595,3,110,55,0,594,592,
        1,0,0,0,594,593,1,0,0,0,595,75,1,0,0,0,596,597,5,88,0,0,597,77,1,
        0,0,0,598,599,5,87,0,0,599,79,1,0,0,0,600,601,7,0,0,0,601,81,1,0,
        0,0,602,605,3,96,48,0,603,605,3,72,36,0,604,602,1,0,0,0,604,603,
        1,0,0,0,605,83,1,0,0,0,606,611,3,86,43,0,607,608,5,75,0,0,608,610,
        3,86,43,0,609,607,1,0,0,0,610,613,1,0,0,0,611,609,1,0,0,0,611,612,
        1,0,0,0,612,85,1,0,0,0,613,611,1,0,0,0,614,617,3,142,71,0,615,617,
        3,112,56,0,616,614,1,0,0,0,616,615,1,0,0,0,617,87,1,0,0,0,618,623,
        3,134,67,0,619,620,5,75,0,0,620,622,3,134,67,0,621,619,1,0,0,0,622,
        625,1,0,0,0,623,621,1,0,0,0,623,624,1,0,0,0,624,89,1,0,0,0,625,623,
        1,0,0,0,626,631,3,140,70,0,627,631,3,80,40,0,628,631,3,136,68,0,
        629,631,3,138,69,0,630,626,1,0,0,0,630,627,1,0,0,0,630,628,1,0,0,
        0,630,629,1,0,0,0,631,91,1,0,0,0,632,637,3,72,36,0,633,634,5,75,
        0,0,634,636,3,72,36,0,635,633,1,0,0,0,636,639,1,0,0,0,637,635,1,
        0,0,0,637,638,1,0,0,0,638,93,1,0,0,0,639,637,1,0,0,0,640,641,3,112,
        56,0,641,95,1,0,0,0,642,648,5,63,0,0,643,648,3,98,49,0,644,648,3,
        100,50,0,645,648,3,104,52,0,646,648,3,102,51,0,647,642,1,0,0,0,647,
        643,1,0,0,0,647,644,1,0,0,0,647,645,1,0,0,0,647,646,1,0,0,0,648,
        97,1,0,0,0,649,650,7,1,0,0,650,99,1,0,0,0,651,652,5,93,0,0,652,101,
        1,0,0,0,653,654,3,80,40,0,654,655,5,74,0,0,655,656,3,72,36,0,656,
        103,1,0,0,0,657,658,7,2,0,0,658,105,1,0,0,0,659,660,5,70,0,0,660,
        661,3,112,56,0,661,662,5,71,0,0,662,107,1,0,0,0,663,667,3,72,36,
        0,664,666,3,106,53,0,665,664,1,0,0,0,666,669,1,0,0,0,667,665,1,0,
        0,0,667,668,1,0,0,0,668,109,1,0,0,0,669,667,1,0,0,0,670,671,5,45,
        0,0,671,672,5,74,0,0,672,673,3,108,54,0,673,111,1,0,0,0,674,675,
        6,56,-1,0,675,688,3,132,66,0,676,688,3,122,61,0,677,688,3,114,57,
        0,678,679,5,86,0,0,679,680,5,72,0,0,680,681,3,112,56,0,681,682,5,
        75,0,0,682,683,3,112,56,0,683,684,5,75,0,0,684,685,3,112,56,0,685,
        686,5,73,0,0,686,688,1,0,0,0,687,674,1,0,0,0,687,676,1,0,0,0,687,
        677,1,0,0,0,687,678,1,0,0,0,688,695,1,0,0,0,689,690,10,2,0,0,690,
        691,3,130,65,0,691,692,3,112,56,3,692,694,1,0,0,0,693,689,1,0,0,
        0,694,697,1,0,0,0,695,693,1,0,0,0,695,696,1,0,0,0,696,113,1,0,0,
        0,697,695,1,0,0,0,698,703,3,116,58,0,699,700,5,74,0,0,700,702,3,
        118,59,0,701,699,1,0,0,0,702,705,1,0,0,0,703,701,1,0,0,0,703,704,
        1,0,0,0,704,115,1,0,0,0,705,703,1,0,0,0,706,713,5,45,0,0,707,713,
        3,120,60,0,708,713,3,126,63,0,709,713,3,96,48,0,710,713,3,144,72,
        0,711,713,3,118,59,0,712,706,1,0,0,0,712,707,1,0,0,0,712,708,1,0,
        0,0,712,709,1,0,0,0,712,710,1,0,0,0,712,711,1,0,0,0,713,117,1,0,
        0,0,714,717,3,72,36,0,715,717,3,128,64,0,716,714,1,0,0,0,716,715,
        1,0,0,0,717,721,1,0,0,0,718,720,3,106,53,0,719,718,1,0,0,0,720,723,
        1,0,0,0,721,719,1,0,0,0,721,722,1,0,0,0,722,119,1,0,0,0,723,721,
        1,0,0,0,724,725,5,72,0,0,725,726,3,112,56,0,726,727,5,73,0,0,727,
        121,1,0,0,0,728,729,7,3,0,0,729,730,3,114,57,0,730,123,1,0,0,0,731,
        732,3,114,57,0,732,733,3,130,65,0,733,734,3,112,56,0,734,125,1,0,
        0,0,735,736,5,72,0,0,736,737,3,112,56,0,737,738,5,75,0,0,738,743,
        3,112,56,0,739,740,5,75,0,0,740,742,3,112,56,0,741,739,1,0,0,0,742,
        745,1,0,0,0,743,741,1,0,0,0,743,744,1,0,0,0,744,746,1,0,0,0,745,
        743,1,0,0,0,746,747,5,73,0,0,747,127,1,0,0,0,748,749,3,76,38,0,749,
        751,5,72,0,0,750,752,3,84,42,0,751,750,1,0,0,0,751,752,1,0,0,0,752,
        753,1,0,0,0,753,754,5,73,0,0,754,129,1,0,0,0,755,756,7,4,0,0,756,
        131,1,0,0,0,757,758,3,90,45,0,758,760,5,72,0,0,759,761,3,84,42,0,
        760,759,1,0,0,0,760,761,1,0,0,0,761,762,1,0,0,0,762,763,5,73,0,0,
        763,133,1,0,0,0,764,765,3,72,36,0,765,766,5,76,0,0,766,767,3,90,
        45,0,767,135,1,0,0,0,768,769,3,80,40,0,769,770,5,70,0,0,770,775,
        3,90,45,0,771,772,5,75,0,0,772,774,3,90,45,0,773,771,1,0,0,0,774,
        777,1,0,0,0,775,773,1,0,0,0,775,776,1,0,0,0,776,778,1,0,0,0,777,
        775,1,0,0,0,778,779,5,71,0,0,779,137,1,0,0,0,780,781,5,40,0,0,781,
        782,5,70,0,0,782,783,5,70,0,0,783,788,3,90,45,0,784,785,5,75,0,0,
        785,787,3,90,45,0,786,784,1,0,0,0,787,790,1,0,0,0,788,786,1,0,0,
        0,788,789,1,0,0,0,789,791,1,0,0,0,790,788,1,0,0,0,791,792,5,71,0,
        0,792,793,3,90,45,0,793,794,5,71,0,0,794,139,1,0,0,0,795,796,5,46,
        0,0,796,797,5,70,0,0,797,800,3,90,45,0,798,799,5,75,0,0,799,801,
        3,90,45,0,800,798,1,0,0,0,801,802,1,0,0,0,802,800,1,0,0,0,802,803,
        1,0,0,0,803,804,1,0,0,0,804,805,5,71,0,0,805,141,1,0,0,0,806,807,
        5,14,0,0,807,808,3,84,42,0,808,809,5,76,0,0,809,810,3,112,56,0,810,
        143,1,0,0,0,811,812,5,70,0,0,812,817,3,112,56,0,813,814,5,75,0,0,
        814,816,3,112,56,0,815,813,1,0,0,0,816,819,1,0,0,0,817,815,1,0,0,
        0,817,818,1,0,0,0,818,820,1,0,0,0,819,817,1,0,0,0,820,821,5,71,0,
        0,821,145,1,0,0,0,822,823,5,34,0,0,823,824,5,95,0,0,824,147,1,0,
        0,0,825,826,3,114,57,0,826,827,5,64,0,0,827,828,3,114,57,0,828,149,
        1,0,0,0,58,151,156,162,176,190,200,210,212,230,232,242,253,283,293,
        295,307,317,319,339,344,377,379,392,407,422,429,485,495,511,521,
        523,534,545,557,574,586,594,604,611,616,623,630,637,647,667,687,
        695,703,712,716,721,743,751,760,775,788,802,817
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!PythonParser.__ATN) {
            PythonParser.__ATN = new antlr.ATNDeserializer().deserialize(PythonParser._serializedATN);
        }

        return PythonParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(PythonParser.literalNames, PythonParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return PythonParser.vocabulary;
    }

    private static readonly decisionsToDFA = PythonParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
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
        if(listener.enterFile) {
             listener.enterFile(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitFile) {
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
        if(listener.enterGlobal) {
             listener.enterGlobal(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitGlobal) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_main;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterMain) {
             listener.enterMain(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitMain) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_function;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitFunction) {
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
    public variableDefinition(i?: number): VariableDefinitionContext[] | VariableDefinitionContext | null {
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
        if(listener.enterTest) {
             listener.enterTest(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTest) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_procedure;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterProcedure) {
             listener.enterProcedure(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitProcedure) {
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
        if(listener.enterConstant) {
             listener.enterConstant(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitConstant) {
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
        if(listener.enterEnum) {
             listener.enterEnum(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitEnum) {
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
        if(listener.enterConcreteClass) {
             listener.enterConcreteClass(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitConcreteClass) {
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
    public abstractProcedure(i?: number): AbstractProcedureContext[] | AbstractProcedureContext | null {
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
        if(listener.enterAbstractClass) {
             listener.enterAbstractClass(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAbstractClass) {
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
        if(listener.enterCommentGlobal) {
             listener.enterCommentGlobal(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitCommentGlobal) {
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
        if(listener.enterOrdinaryStatement) {
             listener.enterOrdinaryStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitOrdinaryStatement) {
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
        if(listener.enterPrint) {
             listener.enterPrint(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitPrint) {
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
        if(listener.enterVariableDefinition) {
             listener.enterVariableDefinition(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitVariableDefinition) {
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
        if(listener.enterAssignment) {
             listener.enterAssignment(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAssignment) {
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
        if(listener.enterInputStatement) {
             listener.enterInputStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitInputStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_ifStatement;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterIfStatement) {
             listener.enterIfStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitIfStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_whileLoop;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterWhileLoop) {
             listener.enterWhileLoop(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitWhileLoop) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_forLoop;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterForLoop) {
             listener.enterForLoop(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitForLoop) {
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
        if(listener.enterProcedureCall) {
             listener.enterProcedureCall(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitProcedureCall) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_tryStatement;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterTryStatement) {
             listener.enterTryStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTryStatement) {
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
        if(listener.enterThrowStatement) {
             listener.enterThrowStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitThrowStatement) {
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
        if(listener.enterCommentStatement) {
             listener.enterCommentStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitCommentStatement) {
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
        if(listener.enterAssert) {
             listener.enterAssert(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAssert) {
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
        if(listener.enterLetStatement) {
             listener.enterLetStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLetStatement) {
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
        if(listener.enterReturnStatement) {
             listener.enterReturnStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitReturnStatement) {
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
        if(listener.enterElseIfClause) {
             listener.enterElseIfClause(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitElseIfClause) {
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
        if(listener.enterElseClause) {
             listener.enterElseClause(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitElseClause) {
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
        if(listener.enterCatchStatement) {
             listener.enterCatchStatement(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitCatchStatement) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_constructorMember;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterConstructorMember) {
             listener.enterConstructorMember(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitConstructorMember) {
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
        if(listener.enterProperty) {
             listener.enterProperty(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitProperty) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_functionMethod;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterFunctionMethod) {
             listener.enterFunctionMethod(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitFunctionMethod) {
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
    public ordinaryStatement(i?: number): OrdinaryStatementContext[] | OrdinaryStatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(OrdinaryStatementContext);
        }

        return this.getRuleContext(i, OrdinaryStatementContext);
    }
    public override get ruleIndex(): number {
        return PythonParser.RULE_procedureMethod;
    }
    public override enterRule(listener: PythonListener): void {
        if(listener.enterProcedureMethod) {
             listener.enterProcedureMethod(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitProcedureMethod) {
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
        if(listener.enterAbstractFunction) {
             listener.enterAbstractFunction(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAbstractFunction) {
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
        if(listener.enterAbstractProcedure) {
             listener.enterAbstractProcedure(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAbstractProcedure) {
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
        if(listener.enterCommentMember) {
             listener.enterCommentMember(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitCommentMember) {
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
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitIdentifier) {
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
        if(listener.enterAssignable) {
             listener.enterAssignable(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAssignable) {
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
        if(listener.enterMethodName) {
             listener.enterMethodName(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitMethodName) {
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
        if(listener.enterTestName) {
             listener.enterTestName(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTestName) {
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
        if(listener.enterTypeName) {
             listener.enterTypeName(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTypeName) {
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
        if(listener.enterConstantValue) {
             listener.enterConstantValue(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitConstantValue) {
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
        if(listener.enterArgList) {
             listener.enterArgList(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitArgList) {
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
        if(listener.enterArgument) {
             listener.enterArgument(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitArgument) {
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
        if(listener.enterParamsList) {
             listener.enterParamsList(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitParamsList) {
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
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitType) {
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
        if(listener.enterEnumValuesList) {
             listener.enterEnumValuesList(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitEnumValuesList) {
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
        if(listener.enterAssertActual) {
             listener.enterAssertActual(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitAssertActual) {
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
    public LIT_BOOLEAN(): antlr.TerminalNode | null {
        return this.getToken(PythonParser.LIT_BOOLEAN, 0);
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
        if(listener.enterLitValue) {
             listener.enterLitValue(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLitValue) {
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
        if(listener.enterLitInt) {
             listener.enterLitInt(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLitInt) {
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
        if(listener.enterLitFloat) {
             listener.enterLitFloat(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLitFloat) {
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
        if(listener.enterEnumValue) {
             listener.enterEnumValue(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitEnumValue) {
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
        if(listener.enterLitString) {
             listener.enterLitString(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLitString) {
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
        if(listener.enterIndex) {
             listener.enterIndex(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitIndex) {
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
        if(listener.enterIdentifierWithOptIndexes) {
             listener.enterIdentifierWithOptIndexes(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitIdentifierWithOptIndexes) {
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
        if(listener.enterPropertyRef) {
             listener.enterPropertyRef(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitPropertyRef) {
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
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitExpression) {
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
        if(listener.enterTerm) {
             listener.enterTerm(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTerm) {
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
        if(listener.enterChainHead) {
             listener.enterChainHead(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitChainHead) {
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
        if(listener.enterChainable) {
             listener.enterChainable(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitChainable) {
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
        if(listener.enterBracketedExpression) {
             listener.enterBracketedExpression(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitBracketedExpression) {
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
        if(listener.enterUnaryExpression) {
             listener.enterUnaryExpression(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitUnaryExpression) {
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
        if(listener.enterBinaryExpression) {
             listener.enterBinaryExpression(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitBinaryExpression) {
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
        if(listener.enterTuple) {
             listener.enterTuple(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTuple) {
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
        if(listener.enterMethodCall) {
             listener.enterMethodCall(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitMethodCall) {
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
        if(listener.enterBinaryOperator) {
             listener.enterBinaryOperator(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitBinaryOperator) {
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
        if(listener.enterNewInstance) {
             listener.enterNewInstance(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitNewInstance) {
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
        if(listener.enterParamDef) {
             listener.enterParamDef(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitParamDef) {
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
        if(listener.enterTypeGeneric) {
             listener.enterTypeGeneric(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTypeGeneric) {
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
        if(listener.enterTypeFunc) {
             listener.enterTypeFunc(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTypeFunc) {
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
        if(listener.enterTypeTuple) {
             listener.enterTypeTuple(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitTypeTuple) {
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
        if(listener.enterLambda) {
             listener.enterLambda(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitLambda) {
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
        if(listener.enterList) {
             listener.enterList(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitList) {
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
        if(listener.enterInterpolatedString) {
             listener.enterInterpolatedString(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitInterpolatedString) {
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
        if(listener.enterPower) {
             listener.enterPower(this);
        }
    }
    public override exitRule(listener: PythonListener): void {
        if(listener.exitPower) {
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
