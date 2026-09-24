import { ParserRuleContext } from "antlr4ng";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { PythonParser } from "../../src/generated/python/PythonParser";
import { RefLangParser } from "../../src/generated/ref-lang/RefLangParser";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Language } from "../../src/ide/frames/frame-interfaces/language";
import { LanguageElan } from "../../src/ide/frames/language-elan";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import { transforms } from "../compiler/compiler-test-helpers";
import { testAntlrParse } from "../testHelpers";

type Parser = RefLangParser | PythonParser;

suite("Parsing Antlr Rules RefLang", () => {
  const f = new FileImpl(
    hash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
  //   test("UnaryExpression", () => {
  //     testAntlrParse(getUnaryExpressionRule(), "", false);
  //     testAntlrParse(getUnaryExpressionRule(), "-3", true, "-3", "", "-3", "");
  //     testAntlrParse(
  //       getUnaryExpressionRule(),
  //       " not foo",
  //       true,
  //       " not foo",
  //       "",
  //       "not foo",
  //       "",
  //     );
  //     testAntlrParse(getUnaryExpressionRule(), "-", false);
  //     testAntlrParse(getUnaryExpressionRule(), "+4", false);
  //   });
  //   test("IndexableTerm", () => {
  //     testAntlrParse(getTermRule(), "a", true, "a", "", "a", "");
  //   });
  //   test("Term2", () => {
  //     testAntlrParse(getTermRule(), "", false);
  //     testAntlrParse(getTermRule(), "a", true, "a", "", "a", "");
  //   });
  //   test("Expression", () => {
  //     testAntlrParse(getExprRule(), "", false);
  //     testAntlrParse(getExprRule(), "", false);
  //     testAntlrParse(getExprRule(), "a", true, "a", "", "a", "");
  //     testAntlrParse(getExprRule(), "a + b", true, "a + b", "", "a + b", "");
  //     testAntlrParse(getExprRule(), "a * -b", true, "a * -b", "", "a*-b", "");
  //     testAntlrParse(getExprRule(), "a + b- c", true, "", "", "a + b - c", "");
  //     testAntlrParse(getExprRule(), "+", false);
  //     testAntlrParse(getExprRule(), "+b", false);
  //     testAntlrParse(getExprRule(), "a +", false);
  //     testAntlrParse(getExprRule(), "a %", true, "a", " %", "a");
  //     testAntlrParse(getExprRule(), "3 * 4 + x", true, "3 * 4 + x", "", "3*4 + x", "");
  //     testAntlrParse(getExprRule(), "3* foo(5)", true, "", "", "3*foo(5)", "");
  //     testAntlrParse(
  //       getExprRule(),
  //       "new List<of String>()",
  //       true,
  //       "new List<of String>()",
  //       "",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       "points.foo(0.0)",
  //       true,
  //       "points.foo(0.0)",
  //       "",
  //       "points.foo(0.0)",
  //       "",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       "this",
  //       true,
  //       "this",
  //       "",
  //       "this",
  //       "<el-kw>this</el-kw>",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       "thisWidget",
  //       true,
  //       "thisWidget",
  //       "",
  //       "thisWidget",
  //       "<el-id>thisWidget</el-id>",
  //     );
  //     // empty data structures
  //     testAntlrParse(
  //       getExprRule(),
  //       "new List<of Int>()",
  //       true,
  //       "new List<of Int>()",
  //       "",
  //       "",
  //       "<el-kw>new</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;()",
  //     );
  //     testAntlrParse(getExprRule(), `""`, true, `""`, "", "", `""`);
  //     testAntlrParse(
  //       getExprRule(),
  //       "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //       false,
  //       "",
  //       "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //       "",
  //       "",
  //     );
  //   });
  //   test("Lambda as argument", () => {
  //     testAntlrParse(
  //       getArgumentRule(),
  //       "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //       true,
  //       "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //       "",
  //       "",
  //       "",
  //     );
  //   });

  function getIdRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.identifier()];
  }

  test("Identifier", () => {
    testAntlrParse(getIdRule(), ``, false);
    testAntlrParse(getIdRule(), `  `, false);
    testAntlrParse(getIdRule(), `a`, true, `a`, "a", "<el-id>a</el-id>", "a", "a");
    testAntlrParse(
      getIdRule(),
      `aB_d`,
      true,
      `aB_d`,
      "aB_d",
      "<el-id>aB_d</el-id>",
      "aB_d",
      "aB_d",
    );
    testAntlrParse(getIdRule(), `abc `, true, `abc`, "abc", "<el-id>abc</el-id>", "abc", "abc");
    testAntlrParse(getIdRule(), `Abc`, false);
    testAntlrParse(getIdRule(), `abc-de`, true, `abc`, "abc", "<el-id>abc</el-id>", "abc", "abc");
    // Can be a keyword - because that will be RefLangParser | PythonParserompile stage, not parse stage
    testAntlrParse(getIdRule(), `new`, false);
    testAntlrParse(
      getIdRule(),
      `global`,
      true,
      `global`,
      "global",
      "<el-id>global</el-id>",
      "global",
      "global",
    );
    testAntlrParse(getIdRule(), `x as`, true, `x`, "x", "<el-id>x</el-id>", "x", "x");
    testAntlrParse(getIdRule(), `_a`, false);
    testAntlrParse(getIdRule(), `_`, false);
    testAntlrParse(getIdRule(), `()_a`, false);
  });

  function getLitStringRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.litString()];
  }

  test("LitString - single chars", () => {
    testAntlrParse(getLitStringRule(), "", false);
    testAntlrParse(getLitStringRule(), `"a"`, true, `"a"`, "", `"<el-lit>a</el-lit>"`, "");
    testAntlrParse(getLitStringRule(), `"a`, false);
    testAntlrParse(getLitStringRule(), `"9"`, true, `"9"`, "", `"<el-lit>9</el-lit>"`, "");
    testAntlrParse(getLitStringRule(), `" "`, true, `" "`, "", `"<el-lit> </el-lit>"`, "");
    testAntlrParse(getLitStringRule(), `" `, false);
    testAntlrParse(getLitStringRule(), `$"{a} `, false);
    testAntlrParse(getLitStringRule(), `""`, true, `""`, "", "", `""`);
    testAntlrParse(getLitStringRule(), `"abc`, false);
    testAntlrParse(getLitStringRule(), `"`, false);
    testAntlrParse(getLitStringRule(), `abc`, false);
    testAntlrParse(getLitStringRule(), `'abc'`, false);
    testAntlrParse(getLitStringRule(), `'abc"`, false);
    testAntlrParse(getLitStringRule(), `"abc'`, false);
  });

  test("Interpolated strings", () => {
    testAntlrParse(getLitStringRule(), `$""`, true, "", "");
    testAntlrParse(getLitStringRule(), `$"x"`, true, "", "");
    testAntlrParse(getLitStringRule(), `$" "`, true, "", "");
    testAntlrParse(getLitStringRule(), `$"{x}"`, true, "", "");
    testAntlrParse(getLitStringRule(), `$"{a} times {b} equals{c}"`, true, "", "");
    // testAntlrParse(getLitStringRule(), `$"{}"`, false);
    //     testAntlrParse(
    //       getLitStringInterpolatedRule(),
    //       `$"{curly}"`,
    //       true,
    //       `$"{curly}"`,
    //       "",
    //       `$"{curly}"`,
    //       `$"{<el-id>curly</el-id>}"`,
    //     );
    //     testAntlrParse(
    //       getLitStringInterpolatedRule(), // but with braces
    //       `$"&#123;curly braces&#125;"`,
    //       true,
    //       `$"&#123;curly braces&#125;"`,
    //       "",
    //       `$"&#123;curly braces&#125;"`,
    //       `$"<el-lit>&#123;curly braces&#125;</el-lit>"`,
    //     );
  });

  function getLitIntRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.litInt()];
  }

  test("LitInt", () => {
    testAntlrParse(getLitIntRule(), "", false);
    testAntlrParse(getLitIntRule(), "   ", false);
    testAntlrParse(
      getLitIntRule(),
      "123",
      true,
      "123",
      "123",
      "<el-lit>123</el-lit>",
      "123",
      "123",
    );
    testAntlrParse(
      getLitIntRule(),
      "007",
      true,
      "007",
      "007",
      "<el-lit>007</el-lit>",
      "007",
      "007",
    );
    testAntlrParse(getLitIntRule(), "-123", false); //Should parse as unaryExpression
    testAntlrParse(getLitIntRule(), "- 123", false);
    testAntlrParse(getLitIntRule(), "1-23", true, "1", "", "");
    testAntlrParse(getLitIntRule(), "456  ", true, "456", "456", "");
    testAntlrParse(getLitIntRule(), " 123a", true, "123", "123", "");
    testAntlrParse(getLitIntRule(), "1.23", false);
    testAntlrParse(getLitIntRule(), "a", false);
  });

  test("LitInt_Hex", () => {
    testAntlrParse(
      getLitIntRule(),
      "0xfa3c",
      true,
      "0xfa3c",
      "0xfa3c",
      "<el-lit>0xfa3c</el-lit>",
      "0xfa3c",
    );
    testAntlrParse(
      getLitIntRule(),
      "0xfa3C",
      true,
      "0xfa3C",
      "0xfa3c",
      "<el-lit>0xfa3c</el-lit>",
      "0xfa3c",
    );
    testAntlrParse(getLitIntRule(), "0Xfffe", true, "0");

    testAntlrParse(getLitIntRule(), "0x", false);
    testAntlrParse(getLitIntRule(), "xfa3a", false);
    testAntlrParse(getLitIntRule(), "fa3c", false);
    testAntlrParse(getLitIntRule(), "0xfa3g", true, "0xfa3");
    testAntlrParse(getLitIntRule(), "&Hfa3", false); //VB format
  });
  test("LitInt_Binary", () => {
    testAntlrParse(
      getLitIntRule(),
      "0b01101",
      true,
      "0b01101",
      "0b01101",
      "<el-lit>0b01101</el-lit>",
    );
    testAntlrParse(getLitIntRule(), "0b0", true, "0b0", "0b0", "<el-lit>0b0</el-lit>");
    testAntlrParse(getLitIntRule(), "0b", false);
    testAntlrParse(getLitIntRule(), "0b01102", true, "0b0110");
    testAntlrParse(getLitIntRule(), "b01101", false);
    testAntlrParse(getLitIntRule(), "&B0110", false); //VB syntax
  });

  function getLitFloatRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.litFloat()];
  }
  test("LitFloat", () => {
    testAntlrParse(getLitFloatRule(), "", false);
    testAntlrParse(getLitFloatRule(), "1.0", true, "1.0", "1.0", "<el-lit>1.0</el-lit>");
    testAntlrParse(getLitFloatRule(), "-1.0", false); // Should parse as a unaryExpression
    testAntlrParse(getLitFloatRule(), "- 1.0", false);
    testAntlrParse(getLitFloatRule(), "1.-0", false);
    testAntlrParse(getLitFloatRule(), " 1.0a", true, " 1.0", "1.0");
    testAntlrParse(getLitFloatRule(), "1", false);
    testAntlrParse(getLitFloatRule(), "1.", false);
    testAntlrParse(getLitFloatRule(), "1. ", false);
    testAntlrParse(getLitFloatRule(), "1.1e5", true, "1.1e5", "1.1e5", "<el-lit>1.1e5</el-lit>");
    testAntlrParse(
      getLitFloatRule(),
      "1.1e-5",
      true,
      "1.1e-5",
      "1.1e-5",
      "<el-lit>1.1e-5</el-lit>",
    );
    //Cap E not in the accepted text for some reason
    testAntlrParse(getLitFloatRule(), "1.1E5", true, "1.1E5", "1.1e5", "<el-lit>1.1e5</el-lit>");
    testAntlrParse(
      getLitFloatRule(),
      "1.1E-5",
      true,
      "1.1E-5",
      "1.1e-5",
      "<el-lit>1.1e-5</el-lit>",
    );
  });
  function getLitBooleanRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.litBoolean()];
  }

  test("LitBoolean", () => {
    testAntlrParse(
      getLitBooleanRule(),
      `true`,
      true,
      `true`,
      `true`,
      "<el-kw>true</el-kw>",
      `true`,
    );
    testAntlrParse(
      getLitBooleanRule(),
      `false`,
      true,
      `false`,
      `false`,
      "<el-kw>false</el-kw>",
      `false`,
    );
    testAntlrParse(getLitBooleanRule(), `True`, false);
  });

  function getEnumValueRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.enumValue()];
  }

  test("EnumValue", () => {
    testAntlrParse(
      getEnumValueRule(),
      `Foo.bar`,
      true,
      `Foo.bar`,
      `Foo.bar`,
      "<el-type>Foo</el-type>.<el-id>bar</el-id>",
      ``,
    );
    testAntlrParse(getEnumValueRule(), `foo.bar`, false);
    testAntlrParse(getEnumValueRule(), `Foo.Bar`, false);
  });

  function LitValueRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.litValue()];
  }

  test("LitValue", () => {
    testAntlrParse(LitValueRule(), "123", true);
    testAntlrParse(LitValueRule(), "1.0", true);
    testAntlrParse(LitValueRule(), "true", true);
    testAntlrParse(LitValueRule(), `"hello"`, true);
    testAntlrParse(LitValueRule(), "Foo.bar", true);
  });

  //   test("BracketedExpression", () => {
  //     testAntlrParse(
  //       getBracketedExpressionRule(),
  //       "(3 + 4)",
  //       true,
  //       "(3 + 4)",
  //       "",
  //       "(3 + 4)",
  //       "",
  //     );

  //     testAntlrParse(getBracketedExpressionRule(), "", false);
  //     testAntlrParse(getBracketedExpressionRule(), "(3)", true, "(3)", "", "(3)", "");

  //     testAntlrParse(
  //       getBracketedExpressionRule(),
  //       "(a and not b)",
  //       true,
  //       "(a and not b)",
  //       "",
  //       "(a and not b)",
  //       "",
  //     );
  //     testAntlrParse(
  //       getBracketedExpressionRule(),
  //       "(3 * 4 + x)",
  //       true,
  //       "(3 * 4 + x)",
  //       "",
  //       "(3*4 + x)",
  //       "",
  //     );
  //     testAntlrParse(
  //       getBracketedExpressionRule(),
  //       "(3 * (4 + x))",
  //       true,
  //       "(3 * (4 + x))",
  //       "",
  //       "(3*(4 + x))",
  //       "",
  //     );
  //     testAntlrParse(
  //       getBracketedExpressionRule(),
  //       "(a and not b",
  //       false,
  //       "(a and not b",
  //       "",
  //       "(a and not b",
  //     );
  //     //testAntlrParse(new BracketedExpression(), "(a and not b  ", false); TODO
  //     testAntlrParse(getBracketedExpressionRule(), "(", false);
  //     testAntlrParse(getBracketedExpressionRule(), "()", false);
  //   });
  //   test("Optional", () => {
  //     testAntlrParse(
  //       new OptionalNode(f, getLitIntRule()),
  //       "123 a",
  //       true,
  //       "123",
  //       " a",
  //       "123",
  //     );
  //     testAntlrParse(new OptionalNode(f, getLitIntRule()), "abc", true, "", "abc", "");
  //     testAntlrParse(
  //       new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
  //       " abstract",
  //       true,
  //       " abstract",
  //       "",
  //       "abstract",
  //       "<el-kw>abstract</el-kw>",
  //     );
  //     testAntlrParse(
  //       new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
  //       "abs",
  //       false,
  //       "abs",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
  //       "abscract",
  //       true,
  //       "",
  //       "abscract",
  //       "",
  //     );
  //     testAntlrParse(
  //       new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
  //       "",
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new OptionalNode(f, new KeywordNode(f, abstractKeyword)),
  //       "  ",
  //       false,
  //       "  ",
  //       "",
  //       "",
  //     );
  //   });

  //   test("Multiple", () => {
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 0), ``, true, ``, "", "");
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 1), ``, false);
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 0), `)`, true, ``, ")", "");
  //     testAntlrParse(
  //       new Multiple(f, () => getLitIntRule(), 1),
  //       `1 0 33`,
  //       true,
  //       `1 0 33`,
  //       "",
  //       "",
  //     );
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 1), `1`, true, `1`, "", "");
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 0), ``, true, ``, "", "");
  //     testAntlrParse(new Multiple(f, () => getLitIntRule(), 1), ``, false);
  //     testAntlrParse(
  //       new Multiple(f, () => getLitIntRule(), 1),
  //       `5 6 a`,
  //       true,
  //       `5 6`,
  //       " a",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => getLitIntRule(), 1),
  //       `7   `,
  //       true,
  //       `7`,
  //       "   ",
  //       "",
  //     );

  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "foo"), 1),
  //       `foo foo`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "bar"), 1),
  //       `bar ba`,
  //       false,
  //       "bar ba",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "foo"), 1),
  //       `foo`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "foo"), 1),
  //       `fo`,
  //       false,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "foo"), 1),
  //       `foo,foo`,
  //       true,
  //       "",
  //       ",foo",
  //       "",
  //     );
  //     testAntlrParse(
  //       new Multiple(f, () => new KeywordNode(f, "foo"), 1),
  //       `foofoo`,
  //       false,
  //       "",
  //       "foofoo",
  //       "",
  //     );
  //   });
  //   test("CommaNode", () => {
  //     testAntlrParse(getCommaRule(), ``, false);
  //     testAntlrParse(getCommaRule(), `,`, true, ``, "", ", ");
  //     testAntlrParse(getCommaRule(), ` ,`, true, `,`, "", ", ");
  //     testAntlrParse(getCommaRule(), `,    `, true, ``, "", ", ");
  //     testAntlrParse(getCommaRule(), `.`, false);
  //     testAntlrParse(getCommaRule(), `,,`, true, `,`, ",", "");
  //   });
  //   test("CSV", () => {
  //     testAntlrParse(
  //       new CSV(f, () => new PunctuationNode(f, "a"), 0),
  //       `a,a,a`,
  //       true,
  //       `a,a,a`,
  //       "",
  //       "a, a, a",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new PunctuationNode(f, "a"), 0),
  //       `a,`,
  //       false,
  //       `a,`,
  //       "",
  //       "a, ",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new PunctuationNode(f, "a"), 0),
  //       `x`,
  //       true,
  //       ``,
  //       "x",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new PunctuationNode(f, "a"), 1),
  //       `x`,
  //       false,
  //       ``,
  //       "x",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new PunctuationNode(f, "a"), 0),
  //       `a,a,x`,
  //       true,
  //       `a,a`,
  //       ",x",
  //       "a, a",
  //     );
  //     testAntlrParse(new CSV(f, () => getLitIntRule(), 0), ``, true, ``, "", "");
  //     testAntlrParse(new CSV(f, () => getLitIntRule(), 1), ``, false);
  //     testAntlrParse(new CSV(f, () => getLitIntRule(), 0), `2`, true, `2`, "", "");
  //     testAntlrParse(new CSV(f, () => getLitIntRule(), 1), `2`, true, `2`, "", "");
  //     testAntlrParse(
  //       new CSV(f, () => getLitStringRule(), 0),
  //       `"apple","orange", "pear"`,
  //       true,
  //       `"apple","orange", "pear"`,
  //       "",
  //       `"apple", "orange", "pear"`,
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getIdentifierRule(), 0),
  //       `a,b,c`,
  //       true,
  //       `a,b,c`,
  //       "",
  //       "a, b, c",
  //     );
  //     testAntlrParse(new CSV(f, () => getIdentifierRule(), 0), `1`, true, ``, "1", "");
  //     testAntlrParse(
  //       new CSV(f, () => getIdentifierRule(), 1),
  //       `1`,
  //       false,
  //       ``,
  //       "1",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getIdentifierRule(), 0),
  //       `a,1`,
  //       true,
  //       `a`,
  //       ",1",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getIdentifierRule(), 0),
  //       `a,b,1`,
  //       true,
  //       `a,b`,
  //       ",1",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getExprRule(), 0),
  //       `a + b, c, 1`,
  //       true,
  //       `a + b, c, 1`,
  //       "",
  //       "",
  //     );
  //     testAntlrParse(new CSV(f, () => getExprRule(), 0), `)`, true, ``, ")", "");

  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 0),
  //       `foo, foo`,
  //       true,
  //       "",
  //       "",
  //     );
  //     testAntlrParse(new CSV(f, () => new KeywordNode(f, "foo"), 0), `foo`, true, "", "");
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 1),
  //       `fook`,
  //       false,
  //       "",
  //       "fook",
  //     );
  //     testAntlrParse(new CSV(f, () => new KeywordNode(f, "foo"), 0), ``, true, "", "");
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 1),
  //       `fo`,
  //       false,
  //       "fo",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 0),
  //       `fo`,
  //       false,
  //       "fo",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 2),
  //       `foo, fo`,
  //       false,
  //       "foo, fo",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 2),
  //       `foo,`,
  //       false,
  //       "foo,",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 2),
  //       `foo, `,
  //       false,
  //       "foo, ",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => new KeywordNode(f, "foo"), 2),
  //       `foo,fo`,
  //       false,
  //       "foo,fo",
  //       "",
  //       "foo, fo",
  //     );

  //     testAntlrParse(new CSV(f, () => getExprRule(), 0), ``, true, "", "");
  //   });
  //   test("IdentifierWithOptIndexes", () => {
  //     testAntlrParse(getIdentifierWithOptIndexesRule(), ``, false);
  //     testAntlrParse(getIdentifierWithOptIndexesRule(), `bar`, true, `bar`, "", "");
  //     testAntlrParse(
  //       getIdentifierWithOptIndexesRule(),
  //       `bar[foo]`,
  //       true,
  //       `bar[foo]`,
  //       "",
  //       "",
  //     );
  //     //testAntlrParse(new InstanceNode(), `bar[foo][0]`, true, `bar[foo][0]`, "", "");
  //   });

  function getMethodCallRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.methodCall()];
  }

  test("Function Call", () => {
    testAntlrParse(getMethodCallRule(), ``, false);
    testAntlrParse(getMethodCallRule(), `  `, false);
    testAntlrParse(
      getMethodCallRule(),
      `foo()`,
      true,
      `foo()`,
      "foo()",
      "<el-method>foo</el-method>()",
      "foo()",
      "foo()",
    );
    testAntlrParse(
      getMethodCallRule(),
      `bar(x, 1, "hello")`,
      true,
      `bar(x, 1, "hello")`,
      `bar(x, 1, "hello")`,
      `<el-method>bar</el-method>(<el-id>x</el-id>, <el-lit>1</el-lit>, "<el-lit>hello</el-lit>")`,
      `bar(x, 1, "hello")`,
      `bar(x, 1, "hello")`,
    );
    testAntlrParse(getMethodCallRule(), `yon`, false);
    testAntlrParse(getMethodCallRule(), `yon `, false);
    testAntlrParse(getMethodCallRule(), `yon(`, false);
    testAntlrParse(getMethodCallRule(), `yon(a`, false);
    testAntlrParse(getMethodCallRule(), `yon(a,`, false);
    testAntlrParse(getMethodCallRule(), `Foo()`, false);
    testAntlrParse(getMethodCallRule(), `foo[]`, false);
    testAntlrParse(
      getMethodCallRule(),
      `foo(a)`,
      true,
      ``,
      "foo(a)",
      "<el-method>foo</el-method>(<el-id>a</el-id>)",
    );
    testAntlrParse(getMethodCallRule(), `isBefore(b[0])`, true, ``, "", "");
  });

  //   test("TypeSimpleName", () => {
  //     testAntlrParse(
  //       getTypeSimpleNameRule(),
  //       `Foo`,
  //       true,
  //       "Foo",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>",
  //     );
  //     testAntlrParse(getTypeSimpleNameRule(), `foo`, false);
  //   });
  //   test("TypeSimpleOrGeneric", () => {
  //     testAntlrParse(getTypeSimpleOrGenericRule(), `Foo`, true, "Foo", "", "", "");
  //     testAntlrParse(getTypeSimpleOrGenericRule(), `foo`, false);
  //     testAntlrParse(getTypeSimpleOrGenericRule(), `Foo<`, false);
  //     testAntlrParse(getTypeSimpleOrGenericRule(), `Foo<of`, false);
  //     testAntlrParse(
  //       getTypeSimpleOrGenericRule(),
  //       `Foo<of Bar`,
  //       false,
  //       "Foo<of Bar",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getTypeSimpleOrGenericRule(), `Foo<ofBar`, true, "", "<ofBar", "");
  //     testAntlrParse(
  //       getTypeSimpleOrGenericRule(),
  //       `Foo<of Bar>`,
  //       true,
  //       "Foo<of Bar>",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;",
  //     );
  //     testAntlrParse(
  //       getTypeSimpleOrGenericRule(),
  //       `Dictionary<of Bar, Yon>`,
  //       true,
  //       "Dictionary<of Bar, Yon>",
  //       "",
  //       "",
  //       "<el-type>Dictionary</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>, <el-type>Yon</el-type>&gt;",
  //     );
  //   });
  //   test("TypeSimpleOrGeneric_Languages", () => {
  //     testAntlrParse(
  //       new TypeSimpleOrGeneric(fileWithPython()),
  //       `Foo[Bar]`,
  //       true,
  //       "Foo[Bar]",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>[<el-type>Bar</el-type>]",
  //       "Foo[Bar]",
  //     );
  //     testAntlrParse(
  //       new TypeSimpleOrGeneric(fileWithPython()),
  //       `list[int]`,
  //       true,
  //       "list[int]",
  //       "",
  //       "",
  //       "<el-type>list</el-type>[<el-type>int</el-type>]",
  //       "list[int]",
  //     );
  //     testAntlrParse(
  //       new TypeSimpleOrGeneric(fileWithVB()),
  //       `Foo(Of Bar)`, //This should properly be 'Of'
  //       true,
  //       "Foo(Of Bar)",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>(<el-kw>Of</el-kw> <el-type>Bar</el-type>)",
  //     );
  //     testAntlrParse(
  //       new TypeSimpleOrGeneric(fileWithCS()),
  //       `Foo<Bar>`,
  //       true,
  //       "Foo<Bar>",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>&lt;<el-type>Bar</el-type>&gt;",
  //     );
  //     testAntlrParse(
  //       new TypeSimpleOrGeneric(fileWithJava()),
  //       `Foo<Bar>`,
  //       true,
  //       "Foo<Bar>",
  //       "",
  //       "",
  //       "<el-type>Foo</el-type>&lt;<el-type>Bar</el-type>&gt;",
  //     );
  //   });
  //   test("TypeNode", () => {
  //     //Single
  //     testAntlrParse(getTypeRule(), `(Foo, Bar)`, true, "(Foo, Bar)", "", "");
  //     testAntlrParse(getTypeRule(), `(Foo)`, false);
  //     testAntlrParse(
  //       getTypeRule(),
  //       `(Foo, Bar, Yon`,
  //       false,
  //       "(Foo, Bar, Yon",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getTypeRule(),
  //       `(Foo, (Bar, Yon, Qux))`,
  //       true,
  //       "(Foo, (Bar, Yon, Qux))",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getTypeRule(),
  //       `(Foo, Bar< of Yon>)`,
  //       true,
  //       "(Foo, Bar< of Yon>)",
  //       "",
  //       "",
  //     );
  //   });
  //   test("TypeNode - Func", () => {
  //     testAntlrParse(
  //       getTypeRule(),
  //       `Func<of Foo, Bar => Yon>`,
  //       true,
  //       "Func<of Foo, Bar => Yon>",
  //       "",
  //       "",
  //     ); //Single
  //   });
  //   test("TypeNode - library qualifier", () => {
  //     testAntlrParse(getTypeRule(), `library.Random`, false); //Single
  //   });
  //   test("TypeNode - other qualifier", () => {
  //     testAntlrParse(getTypeRule(), `global.Random`, false); //Single
  //   });
  //   test("TupleNode", () => {
  //     testAntlrParse(getTupleRule(), `(3,4)`, true, "", "", "");
  //     testAntlrParse(getTupleRule(), `(3,"a", "hello", 4.1, true)`, true, "", "", "");
  //     testAntlrParse(getTupleRule(), `((3,4), ("a", true))`, true, "", "", "");
  //     testAntlrParse(
  //       getTupleRule(),
  //       `(3,"a", "hello", 4.1, true`,
  //       false,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getTupleRule(), `(3,"a", "hello", 4.1,`, false);
  //     testAntlrParse(getTupleRule(), `tuple[3,4]`, false);
  //     testAntlrParse(getTupleRule(), `(a,b)`, true, "(a,b)", "", "");
  //     testAntlrParse(getTupleRule(), `(`, false);
  //     testAntlrParse(getTupleRule(), `(3`, false);
  //     testAntlrParse(getTupleRule(), `(3)`, false);
  //     testAntlrParse(getTupleRule(), `()`, false);
  //     testAntlrParse(getTupleRule(), `("foo", 3)`, true, '("foo", 3)', "", "", "");
  //     testAntlrParse(
  //       getTupleRule(),
  //       `(foo, 3, bar(a), x)`,
  //       true,
  //       "(foo, 3, bar(a), x)",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getTupleRule(), `(foo)`, false);
  //     testAntlrParse(
  //       getTupleRule(),
  //       `(foo, 3, bar(a), x`,
  //       false,
  //       "(foo, 3, bar(a), x",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getTupleRule(),
  //       `(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
  //       true,
  //       "",
  //       "",
  //       "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //     );
  //   });
  //   test("Lambda", () => {
  //     testAntlrParse(
  //       getLambdaRule(),
  //       `lambda x as Int => x * x`,
  //       true,
  //       "lambda x as Int => x * x",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getLambdaRule(), `lambda x`, false);
  //     testAntlrParse(
  //       getLambdaRule(),
  //       `lambda x => x * x`,
  //       false,
  //       "",
  //       "lambda x => x * x",
  //       "",
  //     );
  //     testAntlrParse(
  //       getLambdaRule(),
  //       `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getLambdaRule(),
  //       `lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
  //       true,
  //       "",
  //       "",
  //       "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //     );
  //   });
  //   test("IfExpr", () => {
  //     testAntlrParse(
  //       getIfExprRule(),
  //       `if_(cell, Colour.green, Colour.black)`,
  //       true,
  //       "",
  //       "",
  //       "",
  //       "<el-method>if_</el-method>(<el-id>cell</el-id>, <el-type>Colour</el-type>.<el-id>green</el-id>, <el-type>Colour</el-type>.<el-id>black</el-id>)",
  //     );
  //     testAntlrParse(
  //       getIfExprRule(),
  //       `if_(cell, Colour.green, Colour.black) + 1`,
  //       true,
  //       "if_(cell, Colour.green, Colour.black)",
  //       " + 1",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       `if_(cell, Colour.red, Colour.blue) + 1`,
  //       true,
  //       "if_(cell, Colour.red, Colour.blue) + 1",
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getIfExprRule(), `if_(cell, Colour.amber`, false);
  //     testAntlrParse(
  //       getIfExprRule(),
  //       `if_(attempt[n] is "*", attempt, if_(attempt.isYellow(target, n), attempt.setChar(n, "+"), attempt.setChar(n, "_")))`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getIfExprRule(),
  //       `if_(attempt.isAlreadyMarkedGreen(n), target, if_(attempt.isYellow(target, n), target.setChar(target.indexOf(attempt[n]), "."), target))`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getIfExprRule(),
  //       `if_(score > 80, "Distinction", if_(score > 60, "Merit", if_(score > 40, "Pass", "Fail")))`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //   });
  //   test("ParamDefNode", () => {
  //     testAntlrParse(
  //       getParamDefRule(),
  //       `x as String`,
  //       true,
  //       "x as String",
  //       "",
  //       "x as String",
  //       "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
  //     );
  //     testAntlrParse(getParamDefRule(), `z`, false);
  //     testAntlrParse(getParamDefRule(), `w as`, false);
  //     testAntlrParse(getParamDefRule(), `A`, false);
  //     testAntlrParse(getParamDefRule(), `v String`, false);
  //   });
  //   test("ParamDefNode_Python", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithPython()),
  //       `x: str`,
  //       true,
  //       "x: str",
  //       "",
  //       "",
  //       "<el-id>x</el-id>: <el-type>str</el-type>",
  //       "x: str",
  //     );
  //   });
  //   test("ParamDefNode_VB", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithVB()),
  //       `x As String`,
  //       true,
  //       "x As String",
  //       "",
  //       "",
  //       "<el-id>x</el-id><el-kw> As </el-kw><el-type>String</el-type>",
  //       "x As String",
  //     );
  //   });
  //   test("ParamDefNode_CS", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithCS()),
  //       `string x`,
  //       true,
  //       `string x`,
  //       "",
  //       "",
  //       `<el-type>string</el-type> <el-id>x</el-id>`,
  //       `string x`,
  //     );
  //   });
  //   test("ParamDefNode_Java", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithJava()),
  //       `String x`,
  //       true,
  //       `String x`,
  //       "",
  //       "",
  //       `<el-type>String</el-type> <el-id>x</el-id>`,
  //       `String x`,
  //     );
  //   });
  //   test("Param List", () => {
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `A as string`,
  //       true,
  //       "",
  //       "A as string",
  //       "",
  //     ); //i.e. all leftover
  //     testAntlrParse(new CSV(f, () => getParamDefRule(), 0), ``, true, "", "", "");
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `a as String`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `a as String, bb as Int, foo as Bar`,
  //       true,
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `a`,
  //       false,
  //       "a",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `a as String,`,
  //       false,
  //       "a as String,",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       new CSV(f, () => getParamDefRule(), 0),
  //       `a as String, bb as`,
  //       false,
  //       "",
  //       "",
  //       "",
  //     );
  //   });
  //   test("Literal", () => {
  //     testAntlrParse(getLitValueRule(), `"hello"`, true, "", "", "");
  //     testAntlrParse(getLitValueRule(), `123`, true, "", "", "");
  //   });
  //   test("SpaceNode", () => {
  //     testAntlrParse(new SpaceNode(f, Space.ignored), ``, true, "", "", "", "");
  //     testAntlrParse(new SpaceNode(f, Space.ignored), ` `, true, "", "", "", "");
  //     testAntlrParse(new SpaceNode(f, Space.ignored), `  `, true, "", "", "", "");
  //     testAntlrParse(new SpaceNode(f, Space.added), ``, true, "", "", " ", " ");
  //     testAntlrParse(new SpaceNode(f, Space.added), ` `, true, "", "", " ", " ");
  //     testAntlrParse(new SpaceNode(f, Space.added), `  `, true, "", "", " ", " ");
  //     testAntlrParse(new SpaceNode(f, Space.required), ``, false);
  //     testAntlrParse(new SpaceNode(f, Space.required), ` `, true, "", "", " ", " ");
  //     testAntlrParse(new SpaceNode(f, Space.required), `  `, true, "", "", " ", " ");
  //   });
  //   test("New Instance", () => {
  //     testAntlrParse(getNewInstanceRule(), ``, false);
  //     testAntlrParse(getNewInstanceRule(), `new Foo()`, true, "", "", "new Foo()", "");
  //     testAntlrParse(getNewInstanceRule(), `newFoo()`, false);
  //     testAntlrParse(
  //       getNewInstanceRule(),
  //       "new List<of String>()",
  //       true,
  //       "new List<of String>()",
  //       "",
  //     );
  //     testAntlrParse(
  //       new NewInstance(fileWithPython()),
  //       `Foo()`,
  //       true,
  //       "Foo()",
  //       "",
  //       "new Foo()",
  //       "<el-type>Foo</el-type>()",
  //       `Foo()`,
  //     );
  //     testAntlrParse(
  //       new NewInstance(fileWithCS()),
  //       `new Foo()`,
  //       true,
  //       "",
  //       "",
  //       "new Foo()",
  //       "",
  //     );
  //     testAntlrParse(
  //       new NewInstance(fileWithJava()),
  //       `new Foo()`,
  //       true,
  //       "",
  //       "",
  //       "new Foo()",
  //       "",
  //     );
  //     testAntlrParse(
  //       new NewInstance(fileWithVB()),
  //       `New Foo()`,
  //       true,
  //       "New Foo()",
  //       "",
  //       "new Foo()",
  //       "<el-kw>New</el-kw> <el-type>Foo</el-type>()",
  //       "New Foo()",
  //     );
  //   });
  //   test("String Interpolation", () => {
  //     testAntlrParse(getLitStringInterpolatedInsertRule(), ``, false);
  //     testAntlrParse(
  //       getLitStringInterpolatedInsertRule(),
  //       "{x + 1}",
  //       true,
  //       "{x + 1}",
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getLitStringInterpolatedInsertRule(),
  //       "{x",
  //       false,
  //       "{x",
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getLitStringInterpolatedInsertRule(), "{}", false);
  //   });
  //     testAntlrParse(
  //       getLitStringOrdinaryRule(),
  //       `"{curly braces}"`,
  //       true,
  //       `"{curly braces}"`,
  //       "",
  //       `"{curly braces}"`,
  //       `"<el-lit>{curly braces}</el-lit>"`,
  //     );
  //     testAntlrParse(
  //       getLitStringOrdinaryRule(),
  //       `"&#123;curly braces&#125;"`,
  //       true,
  //       `"&#123;curly braces&#125;"`,
  //       "",
  //       `"&#123;curly braces&#125;"`,
  //       `"<el-lit>&#123;curly braces&#125;</el-lit>"`,
  //     );
  //   });
  //   test("Embedded Html tags", () => {
  //     testAntlrParse(
  //       getLitStringOrdinaryRule(),
  //       `"<p>abc</p>"`,
  //       true,
  //       `"<p>abc</p>"`,
  //       "",
  //       `"<p>abc</p>"`,
  //       `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
  //     );
  //     testAntlrParse(
  //       new LitStringText(f, /^[^"]*/),
  //       `<p>`,
  //       true,
  //       `<p>`,
  //       "",
  //       `<p>`,
  //       `<el-lit>&lt;p&gt;</el-lit>`,
  //       `<p>`,
  //     );
  //     testAntlrParse(
  //       getLitStringInterpolatedRule(),
  //       `$"<p>{2 + 3}</p>"`,
  //       true,
  //       `$"<p>{2 + 3}</p>"`,
  //       "",
  //       `$"<p>{2 + 3}</p>"`,
  //       `$"<el-lit>&lt;p&gt;</el-lit>{<el-lit>2</el-lit> + <el-lit>3</el-lit>}<el-lit>&lt;/p&gt;</el-lit>"`,
  //       `$"<p>{2 + 3}</p>"`,
  //     );
  //     // In other langs
  //     testAntlrParse(
  //       new LitStringOrdinary(fileWithPython()),
  //       `"<p>abc</p>"`,
  //       true,
  //       `"<p>abc</p>"`,
  //       "",
  //       `"<p>abc</p>"`,
  //       `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
  //       `"<p>abc</p>"`,
  //     );
  //     testAntlrParse(
  //       new LitStringOrdinary(fileWithVB()),
  //       `"<p>abc</p>"`,
  //       true,
  //       `"<p>abc</p>"`,
  //       "",
  //       `"<p>abc</p>"`,
  //       `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
  //       `"<p>abc</p>"`,
  //     );
  //     testAntlrParse(
  //       new LitStringOrdinary(fileWithCS()),
  //       `"<p>abc</p>"`,
  //       true,
  //       `"<p>abc</p>"`,
  //       "",
  //       `"<p>abc</p>"`,
  //       `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
  //       `"<p>abc</p>"`,
  //     );
  //     testAntlrParse(
  //       new LitStringOrdinary(fileWithJava()),
  //       `"<p>abc</p>"`,
  //       true,
  //       `"<p>abc</p>"`,
  //       "",
  //       `"<p>abc</p>"`,
  //       `"<el-lit>&lt;p&gt;abc&lt;/p&gt;</el-lit>"`,
  //       `"<p>abc</p>"`,
  //     );
  //     testAntlrParse(
  //       new LitStringInterpolated(fileWithPython()),
  //       `f"<p>{2 + 3}</p>"`,
  //       true,
  //       `f"<p>{2 + 3}</p>"`,
  //       "",
  //       `$"<p>{2 + 3}</p>"`,
  //       `f"<el-lit>&lt;p&gt;</el-lit>{<el-lit>2</el-lit> + <el-lit>3</el-lit>}<el-lit>&lt;/p&gt;</el-lit>"`,
  //       `f"<p>{2 + 3}</p>"`,
  //     );
  //   });
  //   test("Bug #290", () => {
  //     testAntlrParse(getLitIntRule(), `3`, true, "3", "");
  //     testAntlrParse(getLitIntRule(), `3 `, true, "3", " ");

  //     testAntlrParse(getLitValueRule(), `3 `, true, "3", " ");
  //     testAntlrParse(getBinaryExpressionRule(), `3 `, false);

  //     testAntlrParse(getExprRule(), `3 `, false);
  //   });

  //   test("InstanceProcRef", () => {
  //     testAntlrParse(getInstanceProcRefRule(), `bar.foo`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule(), `bar.`, false);
  //     testAntlrParse(getInstanceProcRefRule(), `bar.foo.yon`, true, "", ".yon");
  //     testAntlrParse(getInstanceProcRefRule(), `bar.foo[2]`, true, "", "[2]");
  //     testAntlrParse(getInstanceProcRefRule(), `bar`, false);
  //     testAntlrParse(getInstanceProcRefRule(), `global.bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule(), `library.bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule(), `x[3].bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule(), `this.bar`, false); //As that would be picked up by ThisProcRef
  //   });
  //   test("ThisProcRef", () => {
  //     testAntlrParse(getThisProcRefRule(), `this.bar`, true, "", "");
  //   });
  //   test("ProcRefNode", () => {
  //     testAntlrParse(getProcRefRule(), `foo`, true, "", "");
  //     testAntlrParse(getProcRefRule(), `bar.foo`, true, "", "");
  //     testAntlrParse(getProcRefRule(), `this.foo`, true, "", "");
  //     testAntlrParse(getProcRefRule(), `this.foo.bar`, true, "", ".bar");
  //   });

  // test("#339 call dot function on a literal", () => {
  //   testAntlrParse(getMethodCallRule(), `length(bar)`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `bar.length()`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `bar.asList()`, true, "", "");
  //   testAntlrParse(new LiteralNode(), `{1,2,3,4,5}`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `{1,2,3,4,5}.asList()`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `"Hello World".length()`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `12.3.toString()`, true, "", "");
  //   testAntlrParse(getMethodCallRule(), `bar.`, false);
  //   testAntlrParse(getMethodCallRule(), `bar`, false);
  // });
  //   test("#670 new parse node structure for terms & expressions", () => {
  //     testAntlrParse(getTermSimpleRule(), `abc`, true, "abc", "");
  //     testAntlrParse(getTermSimpleRule(), `abc()`, true, "abc()", "");
  //     testAntlrParse(getTermSimpleRule(), `this`, true, "this", "");
  //     testAntlrParse(getTermSimpleRule(), `abc(defg, hi)`, true, "abc(defg, hi)", "");
  //     testAntlrParse(getTermSimpleWithOptIndexRule(), `abc[1]`, true, "abc[1]", "");
  //     testAntlrParse(getTermSimpleWithOptIndexRule(), `abc[1][2]`, true, "abc[1]", "[2]");
  //     // testAntlrParse(
  //     //   getTermSimpleWithOptIndexRule(),
  //     //   `abc.subList(1, 2)`,
  //     //   true,
  //     //   "abc.subList(1, 2)",
  //     //   "",
  //     // );
  //     testAntlrParse(getTermSimpleWithOptIndexRule(), `abc[1, 2]`, true, "abc", "[1, 2]");
  //     testAntlrParse(
  //       getTermSimpleWithOptIndexRule(),
  //       `abc(defg, hi)[0]`,
  //       true,
  //       "abc(defg, hi)[0]",
  //       "",
  //     );
  //     testAntlrParse(getExprRule(), `(defg, hi)`, true, "(defg, hi)", ""); // tuple
  //     testAntlrParse(getTermSimpleRule(), `[defg, hi]`, true, "[defg, hi]", "");
  //     testAntlrParse(getTermSimpleRule(), `345`, true, "345", "");
  //     testAntlrParse(getTermSimpleRule(), `-345`, true, "-345", "");
  //     testAntlrParse(getTermSimpleRule(), `not a`, true, "not a", "");
  //     testAntlrParse(getTermSimpleRule(), `(3 + a)`, true, "(3 + a)", "");
  //     testAntlrParse(getTermSimpleRule(), `this`, true, `this`, "");
  //     testAntlrParse(new PunctuationNode(f, DOT), `.`, true, `.`, "");
  //     testAntlrParse(getTermSimpleRule(), `a`, true, `a`, "");
  //     testAntlrParse(getDottedTermRule(), `.a`, true, `.a`, "");
  //     testAntlrParse(new DotAfter(f, getTermSimpleRule()), `.a`, false);
  //     testAntlrParse(getTermChainedRule(), `this.a`, true, `this.a`, "");
  //     testAntlrParse(
  //       getTermChainedRule(),
  //       `a[1].b().subList(1, 2).c(d)[e][f]`,
  //       true,
  //       `a[1].b().subList(1, 2).c(d)[e][f]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       getTermChainedRule(),
  //       `this.a[1].b().c(d)[e]`,
  //       true,
  //       `this.a[1].b().c(d)[e]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       getTermChainedRule(),
  //       `this.a.b()`,
  //       true,
  //       `this.a.b()`,
  //       "",
  //       "this.a.b()",
  //       "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       `a[1].b().subList(1, 2).c(d).e.f[g]`,
  //       true,
  //       `a[1].b().subList(1, 2).c(d).e.f[g]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       getExprRule(),
  //       `this.a[1].b().c(d)[e]`,
  //       true,
  //       `this.a[1].b().c(d)[e]`,
  //       "",
  //     );
  //     testAntlrParse(getExprRule(), `ref foo`, true, `ref`, " foo");
  //     testAntlrParse(getExprRule(), `ref `, false);
  //   });
  //   test("OperatorAmbiguity#728", () => {
  //     //Test operations
  //     testAntlrParse(getBinaryOperationRule(), ``, false);
  //     testAntlrParse(getBinaryOperationRule(), ` `, false);
  //     testAntlrParse(getBinaryOperationRule(), `+`, true, "+", "", " + ", " + ");
  //     testAntlrParse(getBinaryOperationRule(), ` +`, true, " +", "", " + ", " + ");
  //     testAntlrParse(getBinaryOperationRule(), ` + `, true, " + ", "", " + ", " + ");
  //     testAntlrParse(getBinaryOperationRule(), `*`, true, "*", "", "*", "*");
  //     testAntlrParse(getBinaryOperationRule(), ` *`, true, " *", "", "*", "*");
  //     testAntlrParse(getBinaryOperationRule(), ` * `, true, " * ", "", "*", "*");
  //     testAntlrParse(getBinaryOperationRule(), `>=`, true, ">=", "", " >= ", " &gt;= ");
  //     testAntlrParse(getBinaryOperationRule(), ` >=`, true, " >=", "", " >= ", " &gt;= ");
  //     testAntlrParse(getBinaryOperationRule(), ` >= `, true, " >= ", "", " >= ", " &gt;= ");
  //     testAntlrParse(getBinaryOperationRule(), `>`, true, ">", "", " > ", " &gt; ");
  //     testAntlrParse(getBinaryOperationRule(), ` >`, true, " >", "", " > ", " &gt; ");
  //     testAntlrParse(getBinaryOperationRule(), `> `, true, "> ", "", " > ", " &gt; ");
  //     testAntlrParse(getBinaryOperationRule(), ` > `, true, " > ", "", " > ", " &gt; ");
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       `is`,
  //       true,
  //       "is",
  //       "",
  //       " is ",
  //       "<el-kw> is </el-kw>",
  //     );
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       `is `,
  //       true,
  //       "is ",
  //       "",
  //       " is ",
  //       "<el-kw> is </el-kw>",
  //     );
  //     testAntlrParse(getBinaryOperationRule(), `isn`, false);
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       `isnt`,
  //       true,
  //       "isnt",
  //       "",
  //       " isnt ",
  //       "<el-kw> isnt </el-kw>",
  //     );
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       ` and `,
  //       true,
  //       " and ",
  //       "",
  //       " and ",
  //       "<el-kw> and </el-kw>",
  //     );
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       `and`,
  //       true,
  //       "and",
  //       "",
  //       " and ",
  //       "<el-kw> and </el-kw>",
  //     );
  //     testAntlrParse(
  //       getBinaryOperationRule(),
  //       `anda`,
  //       true,
  //       "and",
  //       "a",
  //       " and ",
  //       "<el-kw> and </el-kw>",
  //     );

  //     testAntlrParse(getBinaryOperationRule(), `an`, false);
  //     testAntlrParse(getBinaryOperationRule(), `not`, false);

  //     //test expressions
  //     testAntlrParse(
  //       getBinaryExpressionRule(),
  //       `true and false`,
  //       true,
  //       `true and false`,
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getBinaryExpressionRule(),
  //       `"a"+  "b"`,
  //       true,
  //       `"a"+  "b"`,
  //       "",
  //       `"a" + "b"`,
  //     );
  //     testAntlrParse(getBinaryExpressionRule(), `3+`, false);
  //     testAntlrParse(getBinaryExpressionRule(), `3 +`, false);
  //     testAntlrParse(getBinaryExpressionRule(), `3 `, false);
  //     testAntlrParse(
  //       getBinaryExpressionRule(),
  //       `3+4`,
  //       true,
  //       "3+4",
  //       "",
  //       "3 + 4",
  //       "<el-lit>3</el-lit> + <el-lit>4</el-lit>",
  //     );
  //     testAntlrParse(
  //       getBinaryExpressionRule(),
  //       `3>=4`,
  //       true,
  //       "3>=4",
  //       "",
  //       "3 >= 4",
  //       "<el-lit>3</el-lit> &gt;= <el-lit>4</el-lit>",
  //     );
  //     testAntlrParse(getBinaryExpressionRule(), `3>`, false);
  //     testAntlrParse(getBinaryExpressionRule(), `3> `, false);
  //     testAntlrParse(getBinaryExpressionRule(), `3> 4`, true, "3> 4", "", "3 > 4");
  //     testAntlrParse(getBinaryExpressionRule(), `3>4`, true, "3>4", "", "3 > 4");
  //     testAntlrParse(getBinaryExpressionRule(), `3 > 4`, true, "3 > 4", "", "3 > 4");
  //     testAntlrParse(getBinaryExpressionRule(), `3>=`, false);
  //     testAntlrParse(getBinaryExpressionRule(), `3>=4`, true, "3>=4", "", "3 >= 4");
  //     testAntlrParse(
  //       getBinaryExpressionRule(),
  //       `3 is 4`,
  //       true,
  //       "3 is 4",
  //       "",
  //       "3 is 4",
  //       "<el-lit>3</el-lit><el-kw> is </el-kw><el-lit>4</el-lit>",
  //     );
  //   });
  //   test("BinaryExpression_Python", () => {
  //     testAntlrParse(
  //       new BinaryExpression(fileWithPython()),
  //       `10 % 3`,
  //       true,
  //       `10 % 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> % <el-lit>3</el-lit>",
  //       `10 % 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithPython()),
  //       `10 == 3`,
  //       true,
  //       `10 == 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> == <el-lit>3</el-lit>",
  //       `10 == 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithPython()),
  //       `10 != 3`,
  //       true,
  //       `10 != 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> != <el-lit>3</el-lit>",
  //       `10 != 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithPython()),
  //       `a and b`,
  //       true,
  //       `a and b`,
  //       "",
  //       "",
  //       "<el-id>a</el-id><el-kw> and </el-kw><el-id>b</el-id>",
  //       `a and b`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithPython()),
  //       `a or b`,
  //       true,
  //       `a or b`,
  //       "",
  //       "",
  //       "<el-id>a</el-id><el-kw> or </el-kw><el-id>b</el-id>",
  //       `a or b`,
  //     );
  //   });
  //   test("BinaryExpression_VB", () => {
  //     testAntlrParse(
  //       new BinaryExpression(fileWithVB()),
  //       `10 Mod 3`,
  //       true,
  //       `10 Mod 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit><el-kw> Mod </el-kw><el-lit>3</el-lit>",
  //       `10 Mod 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithVB()),
  //       `10 = 3`,
  //       true,
  //       `10 = 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> = <el-lit>3</el-lit>",
  //       `10 = 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithVB()),
  //       `10 <> 3`,
  //       true,
  //       `10 <> 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> &lt;&gt; <el-lit>3</el-lit>",
  //       `10 <> 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithVB()),
  //       `a And b`,
  //       true,
  //       `a And b`,
  //       "",
  //       "",
  //       "<el-id>a</el-id><el-kw> And </el-kw><el-id>b</el-id>",
  //       `a And b`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithVB()),
  //       `a Or b`,
  //       true,
  //       `a Or b`,
  //       "",
  //       "",
  //       "<el-id>a</el-id><el-kw> Or </el-kw><el-id>b</el-id>",
  //       `a Or b`,
  //     );
  //   });
  //   test("BinaryExpression_C#", () => {
  //     testAntlrParse(
  //       new BinaryExpression(fileWithCS()),
  //       `10 % 3`,
  //       true,
  //       `10 % 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> % <el-lit>3</el-lit>",
  //       `10 % 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithCS()),
  //       `10 % 3`,
  //       true,
  //       `10 % 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> % <el-lit>3</el-lit>",
  //       `10 % 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithCS()),
  //       `10 != 3`,
  //       true,
  //       `10 != 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> != <el-lit>3</el-lit>",
  //       `10 != 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithCS()),
  //       `10 && 3`,
  //       true,
  //       `10 && 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> && <el-lit>3</el-lit>",
  //       `10 && 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithCS()),
  //       `10 || 3`,
  //       true,
  //       `10 || 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> || <el-lit>3</el-lit>",
  //       `10 || 3`,
  //     );
  //   });
  //   test("BinaryExpression_Java", () => {
  //     testAntlrParse(
  //       new BinaryExpression(fileWithJava()),
  //       `10 % 3`,
  //       true,
  //       `10 % 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> % <el-lit>3</el-lit>",
  //       `10 % 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithJava()),
  //       `10 % 3`,
  //       true,
  //       `10 % 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> % <el-lit>3</el-lit>",
  //       `10 % 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithJava()),
  //       `10 != 3`,
  //       true,
  //       `10 != 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> != <el-lit>3</el-lit>",
  //       `10 != 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithJava()),
  //       `10 && 3`,
  //       true,
  //       `10 && 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> && <el-lit>3</el-lit>",
  //       `10 && 3`,
  //     );
  //     testAntlrParse(
  //       new BinaryExpression(fileWithJava()),
  //       `10 || 3`,
  //       true,
  //       `10 || 3`,
  //       "",
  //       "",
  //       "<el-lit>10</el-lit> || <el-lit>3</el-lit>",
  //       `10 || 3`,
  //     );
  //   });
  //   test("RevisedParseMethodForAbstractSequence#857", () => {
  //     testActiveNodeAndDone(new test_seq1(f), `foo 45`, true, LitInt.name, false);
  //     testActiveNodeAndDone(new test_seq1(f), `foo `, false);
  //     testActiveNodeAndDone(new test_seq1(f), `foo`, false);
  //     testActiveNodeAndDone(new test_seq2(f), `3.1 end`, true, KeywordNode.name, true);
  //     testActiveNodeAndDone(
  //       new test_seq2(f),
  //       `3.1 en`,
  //       false,
  //       KeywordNode.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       getLitFloatRule(),
  //       `3.`,
  //       false,
  //       RegExMatchNode.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(getLitFloatRule(), `3.1`, true, RegExMatchNode.name, false);
  //     testActiveNodeAndDone(
  //       new test_seq2(f),
  //       `3.1`,
  //       false,
  //       RegExMatchNode.name, //for exponent. Should technically still be the RegexMatchNode for fractional part
  //       // since it could be extended. But unimportand as there is no symbol completion for any literal
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule(), 2),
  //       `12,34`,
  //       true,
  //       LitInt.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule(), 1),
  //       `12`,
  //       true,
  //       LitInt.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule(), 1),
  //       `12,`,
  //       false,
  //       LitInt.name,
  //       false,
  //     );
  //   });
  //   test("LitRegExp", () => {
  //     testAntlrParse(
  //       getLitRegExpRule(),
  //       `/abc+.*/`,
  //       true,
  //       `/abc+.*/`,
  //       "",
  //       "/abc+.*/",
  //       `/<el-regex>abc+.*</el-regex>/`,
  //     );
  //   });
  //   test("LitRegExp with flags", () => {
  //     testAntlrParse(
  //       getLitRegExpRule(),
  //       `/abc+.*/gm`,
  //       true,
  //       `/abc+.*/gm`,
  //       "",
  //       "/abc+.*/gm",
  //       `/<el-regex>abc+.*</el-regex>/<el-regex>gm</el-regex>`,
  //     );
  //   });
  //   test("LitRegExp with invalid flags", () => {
  //     testAntlrParse(
  //       getLitRegExpRule(),
  //       `/abc+.*/x`,
  //       true,
  //       `/abc+.*/`,
  //       "x",
  //       "/abc+.*/",
  //       `/<el-regex>abc+.*</el-regex>/`,
  //     );
  //   });
  //   test("not(a+b)", () => {
  //     testAntlrParse(
  //       getExprRule(),
  //       `not (a+b)`,
  //       true,
  //       `not (a+b)`,
  //       "",
  //       "not (a + b)",
  //       `<el-kw>not</el-kw> (<el-id>a</el-id> + <el-id>b</el-id>)`,
  //     );
  //     testAntlrParse(getExprRule(), `not(a+b)`, false);
  //     testAntlrParse(getExprRule(), `not (a+b)`, true, `not (a+b)`, "", "", ``);
  //   });
  //   test("Parse list of list of floats", () => {
  //     testAntlrParse(
  //       getExprRule(),
  //       `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
  //       true,
  //       `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
  //       "",
  //     );
  //   });
  //   test("Parse list of floats 2", () => {
  //     testAntlrParse(getExprRule(), `[0.0]`, true, `[0.0]`, "");
  //   });

  //   ignore_test("Six open brackets", () => {
  //     testAntlrParse(getExprRule(), `((((((3))))))`, true, `((((((3))))))`, "");
  //   });
  //   test("Image", () => {
  //     testAntlrParse(
  //       new RegExMatchNode(f, Regexes.url),
  //       "http://website.com/images/image1.png",
  //       true,
  //       "http://website.com/images/image1.png",
  //       "",
  //       "",
  //       "",
  //     );
  //   });
  //   test("UnaryExpression_VB", () => {
  //     testAntlrParse(
  //       new UnaryExpression(fileWithVB()),
  //       `Not a`,
  //       true,
  //       `Not a`,
  //       "",
  //       "",
  //       "<el-kw>Not</el-kw> <el-id>a</el-id>",
  //       `Not a`,
  //     );
  //     testAntlrParse(
  //       new UnaryExpression(fileWithVB()),
  //       `N`,
  //       false,
  //       `N`,
  //       "",
  //       "",
  //       "N",
  //       ``,
  //     );
  //     testAntlrParse(
  //       new ExprNode(fileWithVB()),
  //       `Not a`,
  //       true,
  //       `Not a`,
  //       "",
  //       "",
  //       "<el-kw>Not</el-kw> <el-id>a</el-id>",
  //       `Not a`,
  //     );
  //   });
  //   test("TypeTupleNode", () => {
  //     testAntlrParse(
  //       getTypeTupleRule(),
  //       "(Int, String)",
  //       true,
  //       "(Int, String)",
  //       "",
  //       "(Int, String)",
  //       "(<el-type>Int</el-type>, <el-type>String</el-type>)",
  //       "(Int, String)",
  //     );
  //     testAntlrParse(
  //       new TypeTupleNode(fileWithPython()),
  //       "tuple[int, str]",
  //       true,
  //       "tuple[int, str]",
  //       "",
  //       "",
  //       "<el-kw>tuple</el-kw>[<el-type>int</el-type>, <el-type>str</el-type>]",
  //       "tuple[int, str]",
  //     );
  //     testAntlrParse(
  //       new TypeNode(fileWithPython()),
  //       "tuple[int, str]",
  //       true,
  //       "tuple[int, str]",
  //       "",
  //       "",
  //       "<el-kw>tuple</el-kw>[<el-type>int</el-type>, <el-type>str</el-type>]",
  //       "tuple[int, str]",
  //     );
  //     testAntlrParse(
  //       new TypeTupleNode(fileWithVB()),
  //       "(Integer, String)",
  //       true,
  //       "(Integer, String)",
  //       "",
  //       "",
  //       "(<el-type>Integer</el-type>, <el-type>String</el-type>)",
  //       "(Integer, String)",
  //     );
  //     testAntlrParse(
  //       new TypeTupleNode(fileWithCS()),
  //       "(int, string)",
  //       true,
  //       "(int, string)",
  //       "",
  //       "",
  //       "(<el-type>int</el-type>, <el-type>string</el-type>)",
  //       "(int, string)",
  //     );
  //     testAntlrParse(
  //       new TypeTupleNode(fileWithJava()),
  //       "(int, String)",
  //       true,
  //       "(int, String)",
  //       "",
  //       "",
  //       "(<el-type>int</el-type>, <el-type>String</el-type>)",
  //       "(int, String)",
  //     );
  //   });
  //   test("LitStringInterpolated", () => {
  //     testAntlrParse(
  //       getLitStringInterpolatedRule(),
  //       `$"{a} plus {b} equals {a + b}"`,
  //       true,
  //       '$"{a} plus {b} equals {a + b}"',
  //       "",
  //       '$"{a} plus {b} equals {a + b}"',
  //       "",
  //       '$"{a} plus {b} equals {a + b}"',
  //     );
  //   });
  //   test("CSV expression", () => {
  //     return testAntlrParse(
  //       new CSV(fileWithJava(), () => getExprRule(), 3),
  //       `a, b, a + b)`,
  //       true,
  //       "a, b, a + b",
  //       ")",
  //       "a, b, a + b",
  //       "",
  //       "a, b, a + b",
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java1", () => {
  //     return testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("%", a)`,
  //       true,
  //       '$"{a}"',
  //       "",
  //       '$"{a}"',
  //       "",
  //       "",
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java2", () => {
  //     return testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("%", 1)`,
  //       true,
  //       '$"{1}"',
  //       "",
  //       '$"{1}"',
  //       "",
  //       "",
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java3", () => {
  //     return testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("% plus % equals %", a, b, a + b)`,
  //       true,
  //       '$"{a} plus {b} equals {a + b}"',
  //       "",
  //       '$"{a} plus {b} equals {a + b}"',
  //       '<el-type>String</el-type>.<el-method>format</el-method>("<el-lit>%<el-lit> plus </el-lit>%<el-lit> equals </el-lit>%</el-lit>", <el-id>a</el-id>, <el-id>b</el-id>, <el-id>a</el-id> + <el-id>b</el-id>)',
  //       'String.format("% plus % equals %", a, b, a + b)',
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java4", () => {
  //     testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("max %, % equals %", a, b, max(a, b))`,
  //       true,
  //       '$"max {a}, {b} equals {max(a, b)}"',
  //       "",
  //       '$"max {a}, {b} equals {max(a, b)}"',
  //       "",
  //       `String.format("max %, % equals %", a, b, max(a, b))`,
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java5", () => {
  //     testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("result % %", 50)`,
  //       false,
  //       "",
  //       `String.format("result % %", 50)`,
  //       "",
  //       "",
  //     );
  //   });
  //   test("LitStringInterpolated_in_Java6", () => {
  //     testAntlrParse(
  //       new LitStringInterpolated(fileWithJava()),
  //       `String.format("result % %", 50, percent)`,
  //       true,
  //       '$"result {50} {percent}"',
  //       "",
  //       "",
  //       "",
  //       'String.format("result % %", 50, percent)',
  //     );
  //   });
  //   test("List", () => {
  //     testAntlrParse(
  //       new ListNode(f, () => getLitIntRule()),
  //       `[1, 2, 3]`,
  //       true,
  //       `[1, 2, 3]`,
  //       "",
  //       `[1, 2, 3]`,
  //       `[<el-lit>1</el-lit>, <el-lit>2</el-lit>, <el-lit>3</el-lit>]`,
  //       `[1, 2, 3]`,
  //     );
  //   });
  //   test("List incomplete", () => {
  //     testAntlrParse(
  //       new ListNode(f, () => getLitIntRule()),
  //       `[`,
  //       false,
  //       `[`,
  //       "",
  //       `[`,
  //       "[",
  //       `[`,
  //     );
  //   });
  //   test("List incomplete VB", () => {
  //     testAntlrParse(
  //       new ListNode(fileWithVB(), () => new LitInt(fileWithVB())),
  //       `{`,
  //       false,
  //       `{`,
  //       "",
  //       ``,
  //       "{",
  //       `{`,
  //     );
  //   });
  //   test("List incomplete VB 2", () => {
  //     testAntlrParse(
  //       new ListNode(fileWithVB(), () => new LitInt(fileWithVB())),
  //       `{1, 2`,
  //       false,
  //       `{1, 2`,
  //       "",
  //       `{1, 2`,
  //       `{1, 2`,
  //       `{1, 2`,
  //     );
  //   });
  //   test("List complete VB", () => {
  //     testAntlrParse(
  //       new ListNode(fileWithVB(), () => new LitInt(fileWithVB())),
  //       `{1, 2, 3}`,
  //       true,
  //       `{1, 2, 3}`,
  //       "",
  //       `[1, 2, 3]`,
  //       "{<el-lit>1</el-lit>, <el-lit>2</el-lit>, <el-lit>3</el-lit>}",
  //       `{1, 2, 3}`,
  //     );
  //   });
  //   test("LitStringOrdinary VB", () => {
  //     testAntlrParse(
  //       new LitStringOrdinary(fileWithVB()),
  //       `"`,
  //       false,
  //       `"`,
  //       "",
  //       `"`,
  //       `"`,
  //       '"',
  //     );
  //   });
  //   test("ParamDef VB", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithVB()),
  //       `a As Integer`,
  //       true,
  //       `a As Integer`,
  //       "",
  //       `a as Int`,
  //       "<el-id>a</el-id><el-kw> As </el-kw><el-type>Integer</el-type>",
  //       `a As Integer`,
  //     );
  //   });
  //   test("ParamDef VB incomplete", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithVB()),
  //       `a A`,
  //       false,
  //       `a A`,
  //       "",
  //       `a A`,
  //       `<el-id>a</el-id><el-kw> As </el-kw>`,
  //       `a A`,
  //     );
  //   });
  //   test("ParamDef C# valid", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithCS()),
  //       `List<int> a`,
  //       true,
  //       `List<int> a`,
  //       "",
  //       `a as List<of Int>`,
  //       `<el-type>List</el-type>&lt;<el-type>int</el-type>&gt; <el-id>a</el-id>`,
  //       `List<int> a`,
  //     );
  //   });
  //   test("ParamDef C# incomplete 1", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithCS()),
  //       `List<int>`,
  //       false,
  //       `List<int>`,
  //       "",
  //       `List<int>`,
  //       `<el-type>List</el-type>&lt;<el-type>int</el-type>&gt; `,
  //       `List<int>`,
  //     );
  //   });
  //   test("ParamDef C# incomplete 2", () => {
  //     testAntlrParse(
  //       new ParamDefNode(fileWithCS()),
  //       `List<int> `,
  //       false,
  //       `List<int> `,
  //       "",
  //       `List<int> `,
  //       `<el-type>List</el-type>&lt;<el-type>int</el-type>&gt; `,
  //       `List<int> `,
  //     );
  //   });
  //   test("Type VB", () => {
  //     testAntlrParse(
  //       new TypeNode(fileWithVB()),
  //       `Integer`,
  //       true,
  //       `Integer`,
  //       "",
  //       `Int`,
  //       "<el-type>Integer</el-type>",
  //       `Integer`,
  //     );
  //   });
  //   test("Type VB2", () => {
  //     testAntlrParse(
  //       new TypeNode(fileWithVB()),
  //       `Inte`,
  //       true,
  //       `Inte`,
  //       "",
  //       `Inte`,
  //       "<el-type>Inte</el-type>",
  //       `Inte`,
  //     );
  //   });
  //   test("Type incomplete Elan", () => {
  //     testAntlrParse(
  //       getTypeSimpleNameRule(),
  //       `Inte`,
  //       true,
  //       `Inte`,
  //       "",
  //       `Inte`,
  //       "<el-type>Inte</el-type>",
  //       `Inte`,
  //     );
  //   });
  //   test("ParamList VB", () => {
  //     testAntlrParse(
  //       new ParamListNode(fileWithVB()),
  //       `a As Integer, b As Integer`,
  //       true,
  //       `a As Integer, b As Integer`,
  //       "",
  //       `a as Int, b as Int`,
  //       "",
  //       `a As Integer, b As Integer`,
  //     );
  //   });
  //   test("ParamList VB incomplete", () => {
  //     testAntlrParse(
  //       new ParamListNode(fileWithVB()),
  //       `a As Integer, b`,
  //       false,
  //       `a As Integer, b`,
  //       "",
  //       `a as Int, b`,
  //       "",
  //       `a As Integer, b`,
  //     );
  //   });
  //   test("ParamList VB incomplete 2", () => {
  //     testAntlrParse(
  //       new ParamListNode(fileWithVB()),
  //       `a As Integer, b A`,
  //       false,
  //       `a As Integer, b A`,
  //       "",
  //       `a as Int, b A`,
  //       "",
  //       `a As Integer, b A`,
  //     );
  //   });

  //   test("Expr - i in type C#  - #2737", () => {
  //     testAntlrParse(
  //       new TypeSimpleName(fileWithCS()),
  //       `i`,
  //       false,
  //       `i`,
  //       "",
  //       `i`,
  //       "<el-type>i</el-type>",
  //       `i`,
  //     );
  //     testAntlrParse(new TypeSimpleName(fileWithCS()), `j`, false);
  //     testAntlrParse(
  //       new TypeSimpleName(fileWithCS()),
  //       `int`,
  //       true,
  //       `int`,
  //       "",
  //       `Int`,
  //       "<el-type>int</el-type>",
  //       `int`,
  //     );
  //   });
  //   test("ThisInstance", () => {
  //     testAntlrParse(
  //       getThisInstanceRule(),
  //       `this`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //     testAntlrParse(
  //       getThisInstanceRule(),
  //       `This`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //     testAntlrParse(getThisInstanceRule(), `th`, false);
  //     testAntlrParse(getThisInstanceRule(), `Th`, false);
  //     testAntlrParse(
  //       new ThisInstance(fileWithPython()),
  //       `self`,
  //       true,
  //       `self`,
  //       "",
  //       `this`,
  //       "<el-kw>self</el-kw>",
  //       `self`,
  //     );
  //     testAntlrParse(
  //       new ThisInstance(fileWithVB()),
  //       `Me`,
  //       true,
  //       `Me`,
  //       "",
  //       `this`,
  //       "<el-kw>Me</el-kw>",
  //       `Me`,
  //     );
  //     testAntlrParse(
  //       new ThisInstance(fileWithVB()),
  //       `me`,
  //       true,
  //       `Me`,
  //       "",
  //       `this`,
  //       "<el-kw>Me</el-kw>",
  //       `Me`,
  //     );
  //     testAntlrParse(
  //       new ThisInstance(fileWithCS()),
  //       `this`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //     testAntlrParse(
  //       new ThisInstance(fileWithJava()),
  //       `this`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //   });

  function getIndexRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.index()];
  }

  test("index", () => {
    testAntlrParse(getIndexRule(), ``, false);
    testAntlrParse(getIndexRule(), ` `, false);
    testAntlrParse(getIndexRule(), `[]`, false);
    testAntlrParse(getIndexRule(), `[1]`, true, "[1]", "[1]", "[<el-lit>1</el-lit>]", "[1]", "1");
    testAntlrParse(getIndexRule(), `[a]`, true, "[a]", "[a]", "[<el-id>a</el-id>]", "[a]", "a");
  });

  function getChainableRule(): [Language, rule: (parser: Parser) => ParserRuleContext] {
    return [LanguageElan.Instance, (p: Parser) => p.chainable()];
  }

  test("chainable", () => {
    testAntlrParse(getChainableRule(), ``, false);
    testAntlrParse(getChainableRule(), ` `, false);
    testAntlrParse(getChainableRule(), `a[]`, false);
    testAntlrParse(
      getChainableRule(),
      `a[1]`,
      true,
      "a[1]",
      "a[1]",
      "<el-id>a</el-id>[<el-lit>1</el-lit>]",
      "a[1]",
    );
    testAntlrParse(
      getChainableRule(),
      `a[b]`,
      true,
      "a[b]",
      "a[b]",
      "<el-id>a</el-id>[<el-id>b</el-id>]",
      "a[b]",
    );
  });
});

// class test_seq1 extends AbstractSequence {
//   parseText(text: string): void {
//     this.addElement(new KeywordNode(this.file, "foo"));
//     this.addElement(new SpaceNode(this.file, Space.required));
//     this.addElement(new LitInt(this.file));
//     super.parseText(text);
//   }
// }

// class test_seq2 extends AbstractSequence {
//   parseText(text: string): void {
//     this.addElement(new LitFloat(this.file));
//     this.addElement(new SpaceNode(this.file, Space.required));
//     this.addElement(new KeywordNode(this.file, "end"));
//     super.parseText(text);
//   }
// }
