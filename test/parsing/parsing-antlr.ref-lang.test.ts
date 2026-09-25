import { ParserRuleContext } from "antlr4ng";
import { RefLangParser } from "../../src/generated/ref-lang/RefLangParser";
import { Language } from "../../src/ide/frames/frame-interfaces/language";
import { LanguageElan } from "../../src/ide/frames/language-elan";
import { Parser, testAntlrParse } from "../testHelpers";

suite("Parsing Antlr Rules RefLang", () => {
  test("Expression", () => {
    const expression: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.expression(),
    ];
    testAntlrParse(expression, "bar1_foo", true); // identifier
    testAntlrParse(expression, "123", true); // litInt
    testAntlrParse(expression, "1.0e-4", true); // litFloat
    testAntlrParse(expression, "true", true); // litBoolean
    testAntlrParse(expression, `"hello"`, true); // litString
    testAntlrParse(expression, "Foo.bar", true); // enumValue
    testAntlrParse(expression, `foo(3, a)`, true); // methodCall
    testAntlrParse(expression, `-3`, true); // negateNumeric
    testAntlrParse(expression, `not foo()`, true); // unaryExpression
    testAntlrParse(expression, `3*a`, true); // binaryExpression
    testAntlrParse(expression, `foo()[c].bar(3)[b]`, true, "foo()[c].bar(3)[b]"); // chainable
    testAntlrParse(expression, "", false);
    testAntlrParse(expression, "", false);
    testAntlrParse(expression, "a", true);
    testAntlrParse(expression, "a + b", true);
    testAntlrParse(expression, "a * -b", true, "a * -b");
    testAntlrParse(expression, "(a and not b)", true, "(a and not b)");
    testAntlrParse(
      // using lambda as argument
      expression,
      `foo(lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers))`,
      true,
      `foo(lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers))`,
    );
    testAntlrParse(
      // if expression
      expression,
      `if_(attempt.isAlreadyMarkedGreen(n), target, if_(attempt.isYellow(target, n), target.setChar(target.indexOf(attempt[n]), "."), target))`,
      true,
      `if_(attempt.isAlreadyMarkedGreen(n), target, if_(attempt.isYellow(target, n), target.setChar(target.indexOf(attempt[n]), "."), target))`,
    );
    // testAntlrParse(expression, "a + b- c", true, "", "", "a + b - c", "");
    // testAntlrParse(expression, "+", false);
    // testAntlrParse(expression, "+b", false);
    // testAntlrParse(expression, "a +", false);
    // testAntlrParse(expression, "a %", true, "a", " %", "a");
    // testAntlrParse(expression, "3 * 4 + x", true, "3 * 4 + x", "3*4 + x", "");
    // testAntlrParse(expression, "3* foo(5)", true, "", "3*foo(5)", "");
    // testAntlrParse(expression, "new List<of String>()", true, "new List<of String>()", "");
    // testAntlrParse(
    //   expression,
    //   "points.foo(0.0)",
    //   true,
    //   "points.foo(0.0)",
    //   "",
    //   "points.foo(0.0)",
    //   "",
    // );
    // testAntlrParse(expression, "this", true, "this", "", "this", "<el-kw>this</el-kw>");
    // testAntlrParse(
    //   expression,
    //   "thisWidget",
    //   true,
    //   "thisWidget",
    //   "",
    //   "thisWidget",
    //   "<el-id>thisWidget</el-id>",
    // );
    // // empty data structures
    // testAntlrParse(
    //   expression,
    //   "new List<of Int>()",
    //   true,
    //   "new List<of Int>()",
    //   "",
    //   "",
    //   "<el-kw>new</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;()",
    // );

    //TODO add an example of each sub-rule, tested
  });

  test("Identifier", () => {
    const identifier: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.identifier(),
    ];
    testAntlrParse(identifier, ``, false);
    testAntlrParse(identifier, `  `, false);
    testAntlrParse(identifier, `a`, true, `a`, "a", "<el-id>a</el-id>", "a", "a");
    testAntlrParse(identifier, `aB_d`, true, `aB_d`, "aB_d", "<el-id>aB_d</el-id>", "aB_d", "aB_d");
    testAntlrParse(identifier, `abc `, true, `abc`, "abc", "<el-id>abc</el-id>", "abc", "abc");
    testAntlrParse(identifier, `Abc`, false);
    testAntlrParse(identifier, `abc-de`, true, `abc`, "abc", "<el-id>abc</el-id>", "abc", "abc");
    // Can be a keyword - because that will be RefLangParser | PythonParserompile stage, not parse stage
    testAntlrParse(identifier, `new`, false);
    testAntlrParse(
      identifier,
      `global`,
      true,
      `global`,
      "global",
      "<el-id>global</el-id>",
      "global",
      "global",
    );
    testAntlrParse(identifier, `x as`, true, `x`, "x", "<el-id>x</el-id>", "x", "x");
    testAntlrParse(identifier, `_a`, false);
    testAntlrParse(identifier, `_`, false);
    testAntlrParse(identifier, `()_a`, false);
  });

  test("Lit String", () => {
    const litString: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.litString(),
    ];
    testAntlrParse(litString, "", false);
    testAntlrParse(litString, `"a"`, true, `"a"`, "", `"<el-lit>a</el-lit>"`, "");
    testAntlrParse(litString, `"a`, false);
    testAntlrParse(litString, `"9"`, true, `"9"`, "", `"<el-lit>9</el-lit>"`, "");
    testAntlrParse(litString, `" "`, true, `" "`, "", `"<el-lit> </el-lit>"`, "");
    testAntlrParse(litString, `" `, false);
    testAntlrParse(litString, `$"{a} `, false);
    testAntlrParse(litString, `""`, true, `""`, "", "", `""`);
    testAntlrParse(litString, `"abc`, false);
    testAntlrParse(litString, `"`, false);
    testAntlrParse(litString, `abc`, false);
    testAntlrParse(litString, `'abc'`, false);
    testAntlrParse(litString, `'abc"`, false);
    testAntlrParse(litString, `"abc'`, false);
    // Interpolated strings
    testAntlrParse(litString, `$""`, true, "", "");
    testAntlrParse(litString, `$"x"`, true, "", "");
    testAntlrParse(litString, `$" "`, true, "", "");
    testAntlrParse(litString, `$"{x}"`, true, "", "");
    testAntlrParse(litString, `$"{a} times {b} equals{c}"`, true, "", "");
    // testAntlrParse(getLitStringRule, `$"{}"`, false);
    //     testAntlrParse(
    //       getLitStringInterpolatedRule,
    //       `$"{curly}"`,
    //       true,
    //       `$"{curly}"`,
    //       "",
    //       `$"{curly}"`,
    //       `$"{<el-id>curly</el-id>}"`,
    //     );
    //     testAntlrParse(
    //       getLitStringInterpolatedRule, // but with braces
    //       `$"&#123;curly braces&#125;"`,
    //       true,
    //       `$"&#123;curly braces&#125;"`,
    //       "",
    //       `$"&#123;curly braces&#125;"`,
    //       `$"<el-lit>&#123;curly braces&#125;</el-lit>"`,
    //     );
  });

  test("Lit Int", () => {
    const litInt: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.litInt(),
    ];
    testAntlrParse(litInt, "", false);
    testAntlrParse(litInt, "   ", false);
    testAntlrParse(litInt, "123", true, "123", "123", "<el-lit>123</el-lit>", "123", "123");
    testAntlrParse(litInt, "007", true, "007", "007", "<el-lit>007</el-lit>", "007", "007");
    testAntlrParse(litInt, "-123", false); //Should parse as unaryExpression
    testAntlrParse(litInt, "- 123", false);
    testAntlrParse(litInt, "1-23", true, "1", "", "");
    testAntlrParse(litInt, "456  ", true, "456", "456", "");
    testAntlrParse(litInt, " 123a", true, "123", "123", "");
    testAntlrParse(litInt, "1.23", false);
    testAntlrParse(litInt, "a", false);
    // Hex
    testAntlrParse(litInt, "0xfa3c", true, "0xfa3c", "0xfa3c", "<el-lit>0xfa3c</el-lit>", "0xfa3c");
    testAntlrParse(litInt, "0xfa3C", true, "0xfa3C", "0xfa3c", "<el-lit>0xfa3c</el-lit>", "0xfa3c");
    testAntlrParse(litInt, "0Xfffe", true, "0");

    testAntlrParse(litInt, "0x", false);
    testAntlrParse(litInt, "xfa3a", false);
    testAntlrParse(litInt, "fa3c", false);
    testAntlrParse(litInt, "0xfa3g", true, "0xfa3");
    testAntlrParse(litInt, "&Hfa3", false); //VB format
    // Binary
    testAntlrParse(litInt, "0b01101", true, "0b01101", "0b01101", "<el-lit>0b01101</el-lit>");
    testAntlrParse(litInt, "0b0", true, "0b0", "0b0", "<el-lit>0b0</el-lit>");
    testAntlrParse(litInt, "0b", false);
    testAntlrParse(litInt, "0b01102", true, "0b0110");
    testAntlrParse(litInt, "b01101", false);
    testAntlrParse(litInt, "&B0110", false); //VB syntax
  });

  test("Lit Float", () => {
    const litFloat: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.litFloat(),
    ];
    testAntlrParse(litFloat, "", false);
    testAntlrParse(litFloat, "1.0", true, "1.0", "1.0", "<el-lit>1.0</el-lit>");
    testAntlrParse(litFloat, "-1.0", false); // Should parse as a unaryExpression
    testAntlrParse(litFloat, "- 1.0", false);
    testAntlrParse(litFloat, "1.-0", false);
    testAntlrParse(litFloat, " 1.0a", true, " 1.0", "1.0");
    testAntlrParse(litFloat, "1", false);
    testAntlrParse(litFloat, "1.", false);
    testAntlrParse(litFloat, "1. ", false);
    // with exponent:
    testAntlrParse(litFloat, "1.1e5", true, "1.1e5", "1.1e5", "<el-lit>1.1e5</el-lit>");
    testAntlrParse(litFloat, "1.1e-5", true, "1.1e-5", "1.1e-5", "<el-lit>1.1e-5</el-lit>");
    testAntlrParse(litFloat, "1.1E5", true, "1.1E5", "1.1e5", "<el-lit>1.1e5</el-lit>");
    testAntlrParse(litFloat, "1.1E-5", true, "1.1E-5", "1.1e-5", "<el-lit>1.1e-5</el-lit>");
  });

  test("Lit Boolean", () => {
    const litBoolean: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.litBoolean(),
    ];
    testAntlrParse(litBoolean, `true`, true, `true`, `true`, "<el-kw>true</el-kw>", `true`);
    testAntlrParse(litBoolean, `false`, true, `false`, `false`, "<el-kw>false</el-kw>", `false`);
    testAntlrParse(litBoolean, `True`, false);
  });

  test("Enum Value", () => {
    const enumValue: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.enumValue(),
    ];
    testAntlrParse(
      enumValue,
      `Foo.bar`,
      true,
      `Foo.bar`,
      `Foo.bar`,
      "<el-type>Foo</el-type>.<el-id>bar</el-id>",
      ``,
    );
    testAntlrParse(enumValue, `foo.bar`, false);
    testAntlrParse(enumValue, `Foo.Bar`, false);
  });

  test("Method Call", () => {
    const methodCall: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.methodCall(),
    ];
    testAntlrParse(methodCall, ``, false);
    testAntlrParse(methodCall, `  `, false);
    testAntlrParse(
      methodCall,
      `foo()`,
      true,
      `foo()`,
      "foo()",
      "<el-method>foo</el-method>()",
      "foo()",
      "foo()",
    );
    testAntlrParse(
      methodCall,
      `bar(x, 1, "hello")`,
      true,
      `bar(x, 1, "hello")`,
      `bar(x, 1, "hello")`,
      `<el-method>bar</el-method>(<el-id>x</el-id>, <el-lit>1</el-lit>, "<el-lit>hello</el-lit>")`,
      `bar(x, 1, "hello")`,
      `bar(x, 1, "hello")`,
    );
    testAntlrParse(methodCall, `yon`, false);
    testAntlrParse(methodCall, `yon `, false);
    testAntlrParse(methodCall, `yon(`, false);
    testAntlrParse(methodCall, `yon(a`, false);
    testAntlrParse(methodCall, `yon(a,`, false);
    testAntlrParse(methodCall, `Foo()`, false);
    testAntlrParse(methodCall, `foo[]`, false);
    testAntlrParse(
      methodCall,
      `foo(a)`,
      true,
      ``,
      "foo(a)",
      "<el-method>foo</el-method>(<el-id>a</el-id>)",
    );
    testAntlrParse(methodCall, `isBefore(b[0])`, true, ``, "", "");
  });

  test("Unary Expression", () => {
    const unaryExpression: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.unaryExpression(),
    ];
    testAntlrParse(unaryExpression, "", false);
    testAntlrParse(unaryExpression, "-3", true, "-3", "-3", "-<el-lit>3</el-lit>");
    testAntlrParse(
      unaryExpression,
      " not foo",
      true,
      " not foo",
      "not foo",
      "<el-kw>not </el-kw><el-id>foo</el-id>",
    );
    testAntlrParse(unaryExpression, "-", false);
    testAntlrParse(unaryExpression, "+4", false);
  });

  test("BinaryOperator", () => {
    const binaryOperator: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.binaryOperator(),
    ];
    testAntlrParse(binaryOperator, "is", true, "is", " is ", "<el-kw> is </el-kw>");
    testAntlrParse(binaryOperator, "isnt", true, "isnt", " isnt ", "<el-kw> isnt </el-kw>");
    testAntlrParse(binaryOperator, ">", true, ">", " > ", " > ");
    testAntlrParse(binaryOperator, "<", true, "<", " < ", " < ");
    testAntlrParse(binaryOperator, ">=", true, ">=", " >= ", " >= ");
    testAntlrParse(binaryOperator, "<=", true, "<=", " <= ", " <= ");
    testAntlrParse(binaryOperator, "*", true, "*", "*", "*");
    testAntlrParse(binaryOperator, "/", true, "/", "/", "/");
    testAntlrParse(binaryOperator, "+", true, "+", " + ", " + ");
    testAntlrParse(binaryOperator, "-", true, "-", " - ", " - ");
    testAntlrParse(binaryOperator, "and", true, "and", " and ", "<el-kw> and </el-kw>");
    testAntlrParse(binaryOperator, "or", true, "or", " or ", "<el-kw> or </el-kw>");
    testAntlrParse(binaryOperator, "mod", true, "mod", " mod ", "<el-kw> mod </el-kw>");
  });

  test("BinaryExpression", () => {
    const binaryExpression: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.binaryExpression(),
    ];
    testAntlrParse(
      binaryExpression,
      `true and false`,
      true,
      `true and false`,
      `true and false`,
      "<el-kw>true</el-kw><el-kw> and </el-kw><el-kw>false</el-kw>",
    );
    testAntlrParse(
      binaryExpression,
      `a+3`,
      true,
      `a+3`,
      `a + 3`,
      "<el-id>a</el-id> + <el-lit>3</el-lit>",
    );
    testAntlrParse(
      binaryExpression,
      `a * 3`,
      true,
      `a * 3`,
      `a*3`,
      "<el-id>a</el-id>*<el-lit>3</el-lit>",
    );
    testAntlrParse(binaryExpression, `"a"+  "b"`, true);
    testAntlrParse(binaryExpression, `3+`, false);
    testAntlrParse(binaryExpression, `3 +`, false);
    testAntlrParse(binaryExpression, `3 `, false);
    testAntlrParse(
      binaryExpression,
      `3+4`,
      true,
      "3+4",
      "3 + 4",
      "<el-lit>3</el-lit> + <el-lit>4</el-lit>",
    );
    testAntlrParse(
      binaryExpression,
      `3>=4`,
      true,
      "3>=4",
      "3 >= 4",
      "<el-lit>3</el-lit> >= <el-lit>4</el-lit>",
    );
    testAntlrParse(binaryExpression, `3>`, false);
    testAntlrParse(binaryExpression, `3> `, false);
    testAntlrParse(binaryExpression, `3> 4`, true, "3> 4", "3 > 4");
    testAntlrParse(binaryExpression, `3>4`, true, "3>4", "3 > 4");
    testAntlrParse(binaryExpression, `3 > 4`, true, "3 > 4", "3 > 4");
    testAntlrParse(binaryExpression, `3>=`, false);
    testAntlrParse(binaryExpression, `3>=4`, true, "3>=4", "3 >= 4");
    testAntlrParse(
      binaryExpression,
      `3 is 4`,
      true,
      "3 is 4",
      "3 is 4",
      "<el-lit>3</el-lit><el-kw> is </el-kw><el-lit>4</el-lit>",
    );
    testAntlrParse(
      binaryExpression,
      "a and not b",
      true,
      "a and not b",
      "a and not b",
      "<el-id>a</el-id><el-kw> and </el-kw><el-kw>not </el-kw><el-id>b</el-id>",
    );
  });

  test("Index", () => {
    const index: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.index(),
    ];
    testAntlrParse(index, ``, false);
    testAntlrParse(index, ` `, false);
    testAntlrParse(index, `[]`, false);
    testAntlrParse(index, `[1]`, true, "[1]", "[1]", "[<el-lit>1</el-lit>]", "[1]", "1");
    testAntlrParse(index, `[a]`, true, "[a]", "[a]", "[<el-id>a</el-id>]", "[a]", "a");
  });

  test("Chainable", () => {
    const chainable: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.chainable(),
    ];
    testAntlrParse(chainable, ``, false);
    testAntlrParse(chainable, ` `, false);
    //testAntlrParse(chainable, `a[]`, false);
    testAntlrParse(
      chainable,
      `a[1]`,
      true,
      "a[1]",
      "a[1]",
      "<el-id>a</el-id>[<el-lit>1</el-lit>]",
      "a[1]",
    );
    testAntlrParse(
      chainable,
      `a[b]`,
      true,
      "a[b]",
      "a[b]",
      "<el-id>a</el-id>[<el-id>b</el-id>]",
      "a[b]",
    );
  });

  test("BracketedExpression", () => {
    const bracketedExpression: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.bracketedExpression(),
    ];
    testAntlrParse(bracketedExpression, "(3 + 4)", true, "(3 + 4)", "(3 + 4)", "");

    testAntlrParse(bracketedExpression, "", false);
    testAntlrParse(bracketedExpression, "(3)", true, "(3)", "(3)", "");

    testAntlrParse(
      bracketedExpression,
      "(a and not b)",
      true,
      "(a and not b)",
      "(a and not b)",
      "",
    );
    testAntlrParse(bracketedExpression, "(3 * 4 + x)", true, "(3 * 4 + x)", "(3*4 + x)", "");
    testAntlrParse(bracketedExpression, "(3 * (4 + x))", true, "(3 * (4 + x))", "(3*(4 + x))", "");
    testAntlrParse(
      bracketedExpression,
      "(a and not b)",
      true,
      "(a and not b)",
      "(a and not b)",
      "(<el-id>a</el-id><el-kw> and </el-kw><el-kw>not </el-kw><el-id>b</el-id>)",
    );
    testAntlrParse(bracketedExpression, "(", false);
    testAntlrParse(bracketedExpression, "()", false);
  });

  test("Type", () => {
    const type_: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.type_(),
    ];
    testAntlrParse(type_, `Foo`, true, "Foo", "Foo", "<el-type>Foo</el-type>");
    testAntlrParse(
      type_,
      `Foo<of Bar>`,
      true,
      "Foo<of Bar>",
      "Foo<of Bar>",
      "<el-type>Foo</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>&gt;",
    );
    testAntlrParse(
      type_,
      `Dictionary<of Bar, Yon>`,
      true,
      "Dictionary<of Bar, Yon>",
      "Dictionary<of Bar, Yon>",
      "<el-type>Dictionary</el-type>&lt;<el-kw>of</el-kw> <el-type>Bar</el-type>, <el-type>Yon</el-type>&gt;",
    );
    testAntlrParse(type_, `foo`, false);
    testAntlrParse(type_, `Foo<`, false);
    testAntlrParse(type_, `Foo<>`, false);
    testAntlrParse(type_, `Foo<of`, false);
    testAntlrParse(type_, `Foo<of Bar`, false);
    testAntlrParse(type_, `Foo<ofBar>`, false);
    testAntlrParse(type_, `(Foo, Bar)`, true, "(Foo, Bar)", "", "");
    testAntlrParse(type_, `(Foo)`, false);
    testAntlrParse(type_, `(Foo, Bar, Yon`, false);
    testAntlrParse(type_, `(Foo, (Bar, Yon, Qux))`, true, "(Foo, (Bar, Yon, Qux))", "", "");
    testAntlrParse(type_, `(Foo, Bar< of Yon>)`, true, "(Foo, Bar< of Yon>)", "", "");
    testAntlrParse(type_, `Func<of Foo, Bar => Yon>`, true, "Func<of Foo, Bar => Yon>", "", ""); //Single
  });

  test("lambda", () => {
    const lambda: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.lambda(),
    ];
    testAntlrParse(lambda, `lambda x as Int => x * x`, true, "lambda x as Int => x * x", "", "");
    testAntlrParse(lambda, `lambda x`, false);
    testAntlrParse(lambda, `lambda x => x * x`, true); // parameter types are optional!
    testAntlrParse(
      lambda,
      `lambda bestSoFar as String, newWord as String => betterOf(bestSoFar, newWord, possAnswers)`,
      true,
      "",
      "",
      "",
    );
    //TODO: pending parse of tuple (not tupleType)
    // testAntlrParse(
    //   lambda,
    //   `lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
    //   true,
    //   "",
    //   "",
    //   "lambda a as (String, String), x as Int => (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    // );
  });

  test("IfExpr", () => {
    const ifExpr: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => (p as RefLangParser).ifExpression(), // TODO: this rule exists only on RefLang
    ];
    testAntlrParse(
      ifExpr,
      `if_(cell, Colour.green, Colour.black)`,
      true,
      `if_(cell, Colour.green, Colour.black)`,
      `if_(cell, Colour.green, Colour.black)`,
      "<el-method>if_</el-method>(<el-id>cell</el-id>, <el-type>Colour</el-type>.<el-id>green</el-id>, <el-type>Colour</el-type>.<el-id>black</el-id>)",
    );
    testAntlrParse(
      ifExpr,
      `if_(attempt[n] is "*", attempt, if_(attempt.isYellow(target, n), attempt.setChar(n, "+"), attempt.setChar(n, "_")))`,
      true,
      `if_(attempt[n] is "*", attempt, if_(attempt.isYellow(target, n), attempt.setChar(n, "+"), attempt.setChar(n, "_")))`,
    );
    testAntlrParse(
      ifExpr,
      `if_(attempt.isAlreadyMarkedGreen(n), target, if_(attempt.isYellow(target, n), target.setChar(target.indexOf(attempt[n]), "."), target))`,
      true,
      `if_(attempt.isAlreadyMarkedGreen(n), target, if_(attempt.isYellow(target, n), target.setChar(target.indexOf(attempt[n]), "."), target))`,
    );
    testAntlrParse(
      ifExpr,
      `if_(score > 80, "Distinction", if_(score > 60, "Merit", if_(score > 40, "Pass", "Fail")))`,
      true,
      `if_(score > 80, "Distinction", if_(score > 60, "Merit", if_(score > 40, "Pass", "Fail")))`,
    );
    testAntlrParse(ifExpr, `if_(cell, Colour.amber)`, false);
    testAntlrParse(ifExpr, `if(cell, Colour.amber, Colour.green)`, false);
  });

  test("ParamDefNode", () => {
    const paramDef: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.paramDef(),
    ];
    testAntlrParse(
      paramDef,
      `x as String`,
      true,
      "x as String",
      "x as String",
      "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
    );
    testAntlrParse(paramDef, `z`, false);
    testAntlrParse(paramDef, `w as`, false);
    testAntlrParse(paramDef, `A`, false);
    testAntlrParse(paramDef, `v String`, false);
  });

  test("Param List", () => {
    const paramsList: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.paramsList(),
    ];
    testAntlrParse(paramsList, `a as String`, true);
    testAntlrParse(paramsList, `a as String, bb as Int, foo as Bar`, true);

    testAntlrParse(paramsList, `a as String,`, false);
    testAntlrParse(paramsList, `a as String, bb as`, false);
    testAntlrParse(paramsList, `a`, false, "");
    testAntlrParse(paramsList, `A as string`, false);
    testAntlrParse(paramsList, ``, false);
  });

  // test("Tuple", () => {
  //   testAntlrParse(getTupleRule, `(3,4)`, true, "", "", "");
  //   testAntlrParse(getTupleRule, `(3,"a", "hello", 4.1, true)`, true, "", "", "");
  //   testAntlrParse(getTupleRule, `((3,4), ("a", true))`, true, "", "", "");
  //   testAntlrParse(
  //     getTupleRule,
  //     `(3,"a", "hello", 4.1, true`,
  //     false,
  //     "",
  //     "",
  //     "",
  //   );
  //   testAntlrParse(getTupleRule, `(3,"a", "hello", 4.1,`, false);
  //   testAntlrParse(getTupleRule, `tuple[3,4]`, false);
  //   testAntlrParse(getTupleRule, `(a,b)`, true, "(a,b)", "", "");
  //   testAntlrParse(getTupleRule, `(`, false);
  //   testAntlrParse(getTupleRule, `(3`, false);
  //   testAntlrParse(getTupleRule, `(3)`, false);
  //   testAntlrParse(getTupleRule, `()`, false);
  //   testAntlrParse(getTupleRule, `("foo", 3)`, true, '("foo", 3)', "", "", "");
  //   testAntlrParse(
  //     getTupleRule,
  //     `(foo, 3, bar(a), x)`,
  //     true,
  //     "(foo, 3, bar(a), x)",
  //     "",
  //     "",
  //   );
  //   testAntlrParse(getTupleRule, `(foo)`, false);
  //   testAntlrParse(
  //     getTupleRule,
  //     `(foo, 3, bar(a), x`,
  //     false,
  //     "(foo, 3, bar(a), x",
  //     "",
  //     "",
  //   );
  //   testAntlrParse(
  //     getTupleRule,
  //     `(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
  //     true,
  //     "",
  //     "",
  //     "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
  //   );
  // });

  //   test("Literal", () => {
  //     testAntlrParse(getLitValueRule, `"hello"`, true, "", "", "");
  //     testAntlrParse(getLitValueRule, `123`, true, "", "", "");
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
  //     testAntlrParse(getNewInstanceRule, ``, false);
  //     testAntlrParse(getNewInstanceRule, `new Foo()`, true, "", "", "new Foo()", "");
  //     testAntlrParse(getNewInstanceRule, `newFoo()`, false);
  //     testAntlrParse(
  //       getNewInstanceRule,
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
  //     testAntlrParse(getLitStringInterpolatedInsertRule, ``, false);
  //     testAntlrParse(
  //       getLitStringInterpolatedInsertRule,
  //       "{x + 1}",
  //       true,
  //       "{x + 1}",
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(
  //       getLitStringInterpolatedInsertRule,
  //       "{x",
  //       false,
  //       "{x",
  //       "",
  //       "",
  //       "",
  //     );
  //     testAntlrParse(getLitStringInterpolatedInsertRule, "{}", false);
  //   });
  //     testAntlrParse(
  //       getLitStringOrdinaryRule,
  //       `"{curly braces}"`,
  //       true,
  //       `"{curly braces}"`,
  //       "",
  //       `"{curly braces}"`,
  //       `"<el-lit>{curly braces}</el-lit>"`,
  //     );
  //     testAntlrParse(
  //       getLitStringOrdinaryRule,
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
  //       getLitStringOrdinaryRule,
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
  //       getLitStringInterpolatedRule,
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
  //     testAntlrParse(getLitIntRule, `3`, true, "3", "");
  //     testAntlrParse(getLitIntRule, `3 `, true, "3", " ");

  //     testAntlrParse(getLitValueRule, `3 `, true, "3", " ");
  //     testAntlrParse(binaryExpression, `3 `, false);

  //     testAntlrParse(expression, `3 `, false);
  //   });

  //   test("InstanceProcRef", () => {
  //     testAntlrParse(getInstanceProcRefRule, `bar.foo`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule, `bar.`, false);
  //     testAntlrParse(getInstanceProcRefRule, `bar.foo.yon`, true, "", ".yon");
  //     testAntlrParse(getInstanceProcRefRule, `bar.foo[2]`, true, "", "[2]");
  //     testAntlrParse(getInstanceProcRefRule, `bar`, false);
  //     testAntlrParse(getInstanceProcRefRule, `global.bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule, `library.bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule, `x[3].bar`, true, "", "");
  //     testAntlrParse(getInstanceProcRefRule, `this.bar`, false); //As that would be picked up by ThisProcRef
  //   });
  //   test("ThisProcRef", () => {
  //     testAntlrParse(getThisProcRefRule, `this.bar`, true, "", "");
  //   });
  //   test("ProcRefNode", () => {
  //     testAntlrParse(getProcRefRule, `foo`, true, "", "");
  //     testAntlrParse(getProcRefRule, `bar.foo`, true, "", "");
  //     testAntlrParse(getProcRefRule, `this.foo`, true, "", "");
  //     testAntlrParse(getProcRefRule, `this.foo.bar`, true, "", ".bar");
  //   });

  // test("#339 call dot function on a literal", () => {
  //   testAntlrParse(getMethodCallRule, `length(bar)`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `bar.length()`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `bar.asList()`, true, "", "");
  //   testAntlrParse(new LiteralNode(), `{1,2,3,4,5}`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `{1,2,3,4,5}.asList()`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `"Hello World".length()`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `12.3.toString()`, true, "", "");
  //   testAntlrParse(getMethodCallRule, `bar.`, false);
  //   testAntlrParse(getMethodCallRule, `bar`, false);
  // });
  //   test("#670 new parse node structure for terms & expressions", () => {
  //     testAntlrParse(getTermSimpleRule, `abc`, true, "abc", "");
  //     testAntlrParse(getTermSimpleRule, `abc()`, true, "abc()", "");
  //     testAntlrParse(getTermSimpleRule, `this`, true, "this", "");
  //     testAntlrParse(getTermSimpleRule, `abc(defg, hi)`, true, "abc(defg, hi)", "");
  //     testAntlrParse(getTermSimpleWithOptIndexRule, `abc[1]`, true, "abc[1]", "");
  //     testAntlrParse(getTermSimpleWithOptIndexRule, `abc[1][2]`, true, "abc[1]", "[2]");
  //     // testAntlrParse(
  //     //   getTermSimpleWithOptIndexRule,
  //     //   `abc.subList(1, 2)`,
  //     //   true,
  //     //   "abc.subList(1, 2)",
  //     //   "",
  //     // );
  //     testAntlrParse(getTermSimpleWithOptIndexRule, `abc[1, 2]`, true, "abc", "[1, 2]");
  //     testAntlrParse(
  //       getTermSimpleWithOptIndexRule,
  //       `abc(defg, hi)[0]`,
  //       true,
  //       "abc(defg, hi)[0]",
  //       "",
  //     );
  //     testAntlrParse(expression, `(defg, hi)`, true, "(defg, hi)", ""); // tuple
  //     testAntlrParse(getTermSimpleRule, `[defg, hi]`, true, "[defg, hi]", "");
  //     testAntlrParse(getTermSimpleRule, `345`, true, "345", "");
  //     testAntlrParse(getTermSimpleRule, `-345`, true, "-345", "");
  //     testAntlrParse(getTermSimpleRule, `not a`, true, "not a", "");
  //     testAntlrParse(getTermSimpleRule, `(3 + a)`, true, "(3 + a)", "");
  //     testAntlrParse(getTermSimpleRule, `this`, true, `this`, "");
  //     testAntlrParse(new PunctuationNode(f, DOT), `.`, true, `.`, "");
  //     testAntlrParse(getTermSimpleRule, `a`, true, `a`, "");
  //     testAntlrParse(getDottedTermRule, `.a`, true, `.a`, "");
  //     testAntlrParse(new DotAfter(f, getTermSimpleRule), `.a`, false);
  //     testAntlrParse(getTermChainedRule, `this.a`, true, `this.a`, "");
  //     testAntlrParse(
  //       getTermChainedRule,
  //       `a[1].b().subList(1, 2).c(d)[e][f]`,
  //       true,
  //       `a[1].b().subList(1, 2).c(d)[e][f]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       getTermChainedRule,
  //       `this.a[1].b().c(d)[e]`,
  //       true,
  //       `this.a[1].b().c(d)[e]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       getTermChainedRule,
  //       `this.a.b()`,
  //       true,
  //       `this.a.b()`,
  //       "",
  //       "this.a.b()",
  //       "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
  //     );
  //     testAntlrParse(
  //       expression,
  //       `a[1].b().subList(1, 2).c(d).e.f[g]`,
  //       true,
  //       `a[1].b().subList(1, 2).c(d).e.f[g]`,
  //       "",
  //     );
  //     testAntlrParse(
  //       expression,
  //       `this.a[1].b().c(d)[e]`,
  //       true,
  //       `this.a[1].b().c(d)[e]`,
  //       "",
  //     );
  //     testAntlrParse(expression, `ref foo`, true, `ref`, " foo");
  //     testAntlrParse(expression, `ref `, false);
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
  //       getLitFloatRule,
  //       `3.`,
  //       false,
  //       RegExMatchNode.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(getLitFloatRule, `3.1`, true, RegExMatchNode.name, false);
  //     testActiveNodeAndDone(
  //       new test_seq2(f),
  //       `3.1`,
  //       false,
  //       RegExMatchNode.name, //for exponent. Should technically still be the RegexMatchNode for fractional part
  //       // since it could be extended. But unimportand as there is no symbol completion for any literal
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule, 2),
  //       `12,34`,
  //       true,
  //       LitInt.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule, 1),
  //       `12`,
  //       true,
  //       LitInt.name,
  //       false,
  //     );
  //     testActiveNodeAndDone(
  //       new CSV(f, () => getLitIntRule, 1),
  //       `12,`,
  //       false,
  //       LitInt.name,
  //       false,
  //     );
  //   });
  //   test("LitRegExp", () => {
  //     testAntlrParse(
  //       getLitRegExpRule,
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
  //       getLitRegExpRule,
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
  //       getLitRegExpRule,
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
  //       expression,
  //       `not (a+b)`,
  //       true,
  //       `not (a+b)`,
  //       "",
  //       "not (a + b)",
  //       `<el-kw>not</el-kw> (<el-id>a</el-id> + <el-id>b</el-id>)`,
  //     );
  //     testAntlrParse(expression, `not(a+b)`, false);
  //     testAntlrParse(expression, `not (a+b)`, true, `not (a+b)`, "", "", ``);
  //   });
  //   test("Parse list of list of floats", () => {
  //     testAntlrParse(
  //       expression,
  //       `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
  //       true,
  //       `[[0.0,0.0,0.0,0.16,0.0,0.0,0.01],[0.85,0.04,-0.04,0.85,0.0,1.60,0.85],[0.20,-0.26,0.23,0.22,0.0,1.60,0.07],[-0.15,0.28,0.26,0.24,0.0,0.44,0.07]]`,
  //       "",
  //     );
  //   });
  //   test("Parse list of floats 2", () => {
  //     testAntlrParse(expression, `[0.0]`, true, `[0.0]`, "");
  //   });

  //   ignore_test("Six open brackets", () => {
  //     testAntlrParse(expression, `((((((3))))))`, true, `((((((3))))))`, "");
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
  //       getTypeTupleRule,
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
  //       getLitStringInterpolatedRule,
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
  //       new CSV(fileWithJava(), () => expression, 3),
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
  //       new ListNode(f, () => getLitIntRule),
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
  //       new ListNode(f, () => getLitIntRule),
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
  //       typeName,
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
  //       getThisInstanceRule,
  //       `this`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //     testAntlrParse(
  //       getThisInstanceRule,
  //       `This`,
  //       true,
  //       `this`,
  //       "",
  //       `this`,
  //       "<el-kw>this</el-kw>",
  //       `this`,
  //     );
  //     testAntlrParse(getThisInstanceRule, `th`, false);
  //     testAntlrParse(getThisInstanceRule, `Th`, false);
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
});
