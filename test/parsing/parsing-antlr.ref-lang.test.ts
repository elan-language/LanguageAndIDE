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
    testAntlrParse(
      expression,
      `foo.bar`,
      true,
      `foo.bar`,
      `foo.bar`,
      `<el-id>foo</el-id>.<el-id>bar</el-id>`,
    ); //property on a reference
    testAntlrParse(expression, `foo()[c].bar(3)[b]`, true, "foo()[c].bar(3)[b]"); // chainable
    testAntlrParse(expression, "", false);
    testAntlrParse(expression, "", false);
    testAntlrParse(expression, "a", true);
    testAntlrParse(expression, "a + b", true);
    testAntlrParse(expression, "a * -b", true, "a * -b");
    testAntlrParse(expression, "(a and not b)", true, "(a and not b)");
    testAntlrParse(expression, `-345`, true, "-345");
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
    testAntlrParse(expression, `this`, true, `this`, `this`, "<el-kw>this</el-kw>", `this`);
    testAntlrParse(
      expression,
      "a + b- c",
      true,
      "a + b- c",
      "a + b - c",
      "<el-id>a</el-id> + <el-id>b</el-id> - <el-id>c</el-id>",
    );
    testAntlrParse(expression, "+", false);
    testAntlrParse(expression, "+b", false);
    testAntlrParse(expression, "a +", false);
    testAntlrParse(expression, "a %", true, "a");
    testAntlrParse(expression, "3 * 4 + x", true, "3 * 4 + x", "3*4 + x");
    testAntlrParse(expression, "3* foo(5)", true, "3* foo(5)", "3*foo(5)", "");
    testAntlrParse(
      expression,
      "new List<of String>()",
      true,
      "new List<of String>()",
      "new List<of String>()",
    );
    testAntlrParse(
      expression,
      "points.foo(0.0)",
      true,
      "points.foo(0.0)",
      "points.foo(0.0)",
      "<el-id>points</el-id>.<el-method>foo</el-method>(<el-lit>0.0</el-lit>)",
    );
    testAntlrParse(expression, "this", true, "this", "this", "<el-kw>this</el-kw>");
    testAntlrParse(
      expression,
      "thisWidget",
      true,
      "thisWidget",
      "thisWidget",
      "<el-id>thisWidget</el-id>",
    );
    // empty data structures
    testAntlrParse(
      expression,
      "new List<of Int>()",
      true,
      "new List<of Int>()",
      "",
      "<el-kw>new</el-kw> <el-type>List</el-type>&lt;<el-kw>of</el-kw> <el-type>Int</el-type>&gt;()",
    );
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
    testAntlrParse(litString, `"a"`, true, `"a"`, "", `"<el-lit>a</el-lit>"`, "", '"a"');
    testAntlrParse(litString, `"a`, false);
    testAntlrParse(litString, `"9"`, true, `"9"`, "", `"<el-lit>9</el-lit>"`, "", '"9"');
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
    testAntlrParse(litInt, "007", true, "007", "007", "<el-lit>007</el-lit>", "007", "7");
    testAntlrParse(litInt, "-123", false); //Should parse as unaryExpression
    testAntlrParse(litInt, "- 123", false);
    testAntlrParse(litInt, "1-23", true, "1", "", "");
    testAntlrParse(litInt, "456  ", true, "456", "456", "");
    testAntlrParse(litInt, " 123a", true, "123", "123", "");
    testAntlrParse(litInt, "1.23", false);
    testAntlrParse(litInt, "a", false);
    testAntlrParse(litInt, `3 `, true, `3`);
    // Hex
    testAntlrParse(
      litInt,
      "0xfa3c",
      true,
      "0xfa3c",
      "0xfa3c",
      "<el-lit>0xfa3c</el-lit>",
      "0xfa3c",
      "64060",
    );
    testAntlrParse(
      litInt,
      "0xfa3C",
      true,
      "0xfa3C",
      "0xfa3c",
      "<el-lit>0xfa3c</el-lit>",
      "0xfa3c",
      "64060",
    );
    testAntlrParse(litInt, "0Xfffe", true, "0");

    testAntlrParse(litInt, "0x", false);
    testAntlrParse(litInt, "xfa3a", false);
    testAntlrParse(litInt, "fa3c", false);
    testAntlrParse(litInt, "0xfa3g", true, "0xfa3");
    testAntlrParse(litInt, "&Hfa3", false); //VB format
    // Binary
    testAntlrParse(
      litInt,
      "0b01101",
      true,
      "0b01101",
      "0b01101",
      "<el-lit>0b01101</el-lit>",
      "0b01101",
      "13",
    );
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
    testAntlrParse(unaryExpression, `-345`, true, "-345");
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
    testAntlrParse(chainable, `a[]`, false);
    testAntlrParse(
      chainable,
      `a[1]`,
      true,
      "a[1]",
      "a[1]",
      "<el-id>a</el-id>[<el-lit>1</el-lit>]",
      "a[1]",
      "system.safeIndex(a, 1)",
    );
    testAntlrParse(
      chainable,
      `a[b]`,
      true,
      "a[b]",
      "a[b]",
      "<el-id>a</el-id>[<el-id>b</el-id>]",
      "a[b]",
      "system.safeIndex(a, b)",
    );
    testAntlrParse(chainable, `a`, true, "a", "a", "<el-id>a</el-id>", "a", "a");
    testAntlrParse(
      chainable,
      `f()`,
      true,
      "f()",
      "f()",
      "<el-method>f</el-method>()",
      "f()",
      "f()",
    );
    testAntlrParse(
      chainable,
      `f()[1]`,
      true,
      "f()[1]",
      "f()[1]",
      "<el-method>f</el-method>()[<el-lit>1</el-lit>]",
      "f()[1]",
      "system.safeIndex(f(), 1)",
    );
    testAntlrParse(
      chainable,
      `f()[1][2]`,
      true,
      "f()[1][2]",
      "f()[1][2]",
      "<el-method>f</el-method>()[<el-lit>1</el-lit>][<el-lit>2</el-lit>]",
      "f()[1][2]",
      "system.safeIndex(system.safeIndex(f(), 1), 2)",
    );
  });

  test("ChainHead", () => {
    const chainHead: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.chainHead(),
    ];
    testAntlrParse(chainHead, ``, false);
    testAntlrParse(chainHead, ` `, false);
    testAntlrParse(chainHead, `this`, true, "this", "this", "<el-kw>this</el-kw>", "this", "this"); // pending html impl of <el-kw>this<el-kw>
    testAntlrParse(chainHead, `(1)`, true, "(1)", "(1)", "(<el-lit>1</el-lit>)", "(1)", "(1)");
    testAntlrParse(chainHead, `1`, true, "1", "1", "<el-lit>1</el-lit>", "1", "1");
    testAntlrParse(
      chainHead,
      `[1]`,
      true,
      "[1]",
      "[1]",
      "[<el-lit>1</el-lit>]",
      "[1]",
      "system.list([1])",
    );
    // testAntlrParse(
    //   chainHead,
    //   `[[1, 1]]`,
    //   true,
    //   `[[1, 1]]`,
    //   `[[1, 1]]`,
    //   "[[<el-lit>1</el-lit>, <el-lit>1</el-lit>]]",
    //   `[[1, 1]]`,
    //   "system.list([1])",
    // ); dictionary ?
    testAntlrParse(
      chainHead,
      `(1, a, "fred")`,
      true,
      `(1, a, "fred")`,
      `(1, a, "fred")`,
      `(<el-lit>1</el-lit>, <el-id>a</el-id>, "<el-lit>fred</el-lit>")`,
      `(1, a, "fred")`,
      'system.tuple([1, a, "fred"])',
    );
    testAntlrParse(
      chainHead,
      `a[1]`,
      true,
      `a[1]`,
      `a[1]`,
      `<el-id>a</el-id>[<el-lit>1</el-lit>]`,
      `a[1]`,
      `system.safeIndex(a, 1)`,
    );
    testAntlrParse(
      chainHead,
      `f()[1]`,
      true,
      "f()[1]",
      "f()[1]",
      "<el-method>f</el-method>()[<el-lit>1</el-lit>]",
      "f()[1]",
      "system.safeIndex(f(), 1)",
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

  test("New Instance", () => {
    const newInstance: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.newInstance(),
    ];
    testAntlrParse(newInstance, ``, false);
    testAntlrParse(
      newInstance,
      `new Foo(1)`,
      true,
      "new Foo(1)",
      "new Foo(1)",
      "<el-kw>new</el-kw> <el-type>Foo</el-type>(<el-lit>1</el-lit>)",
    );
    testAntlrParse(newInstance, `newFoo()`, false);
    testAntlrParse(
      newInstance,
      "new List<of String>()",
      true,
      "new List<of String>()",
      "new List<of String>()",
    );
  });

  test("List", () => {
    const list: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.list(),
    ];
    testAntlrParse(
      list,
      `[1, 2, 3]`,
      true,
      `[1, 2, 3]`,
      `[1, 2, 3]`,
      `[<el-lit>1</el-lit>, <el-lit>2</el-lit>, <el-lit>3</el-lit>]`,
      `[1, 2, 3]`,
    );
    testAntlrParse(
      list,
      `[a, b]`,
      true,
      `[a, b]`,
      `[a, b]`,
      `[<el-id>a</el-id>, <el-id>b</el-id>]`,
      `[a, b]`,
    );
    testAntlrParse(list, `[`, false);
    testAntlrParse(list, `[]`, false);
    testAntlrParse(list, `1, 2, 3`, false);
  });

  test("Tuple", () => {
    const tuple: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.tuple(),
    ];
    testAntlrParse(
      tuple,
      `(3,4)`,
      true,
      "(3,4)",
      "(3, 4)",
      "(<el-lit>3</el-lit>, <el-lit>4</el-lit>)",
    );
    testAntlrParse(tuple, `(3,"a", "hello", 4.1, true)`, true, `(3,"a", "hello", 4.1, true)`);
    testAntlrParse(tuple, `((3,4), ("a", true))`, true, `((3,4), ("a", true))`);
    testAntlrParse(tuple, `(3,"a", "hello", 4.1, true`, false);
    testAntlrParse(tuple, `(3,"a", "hello", 4.1,`, false);
    testAntlrParse(tuple, `tuple[3,4]`, false);
    testAntlrParse(tuple, `(a,b)`, true, "(a,b)");
    testAntlrParse(tuple, `(`, false);
    testAntlrParse(tuple, `(3`, false);
    testAntlrParse(tuple, `(3)`, false);
    testAntlrParse(tuple, `()`, false);
    testAntlrParse(tuple, `("foo", 3)`, true, '("foo", 3)');
    testAntlrParse(tuple, `(foo, 3, bar(a), x)`, true, "(foo, 3, bar(a), x)");
    testAntlrParse(tuple, `(foo, 3, bar(a), x`, false);
    testAntlrParse(tuple, `(`, false);
    testAntlrParse(tuple, `()`, false);
    testAntlrParse(tuple, `(foo)`, false);
    testAntlrParse(tuple, `foo, bar`, false);
    testAntlrParse(
      tuple,
      `(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))`,
      true,
      "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
      "(setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x))",
    );
  });

  test("Dictionary", () => {
    const dict: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.dictionary(),
    ];
    testAntlrParse(
      dict,
      `[["a",1],["b",3]]`,
      true,
      `[["a",1],["b",3]]`,
      `[["a", 1], ["b", 3]]`,
      `[["<el-lit>a</el-lit>", <el-lit>1</el-lit>], ["<el-lit>b</el-lit>", <el-lit>3</el-lit>]]`,
    );
    testAntlrParse(
      dict,
      `[["c",true]]`,
      true,
      `[["c",true]]`,
      `[["c", true]]`,
      `[["<el-lit>c</el-lit>", <el-kw>true</el-kw>]]`,
    );
    testAntlrParse(dict, `[`, false);
    testAntlrParse(dict, `[]`, false);
    testAntlrParse(dict, `["a",1],["b",3]`, false);
    testAntlrParse(dict, `["a",1,"b",3]`, false);
    testAntlrParse(dict, `["a":1,"b":3]`, false);
  });

  test("Chainable", () => {
    const chainable: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.chainable(),
    ];
    testAntlrParse(chainable, `b`, true, "b", "b", "<el-id>b</el-id>", "b");
    testAntlrParse(chainable, ``, false);
    testAntlrParse(chainable, ` `, false);
    testAntlrParse(chainable, `a[]`, false);

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
  test("ChainHead", () => {
    const chainHead: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.chainHead(),
    ];
    testAntlrParse(chainHead, `a`, true, `a`, `a`, `<el-id>a</el-id>`);
  });
  test("ChainTail", () => {
    const chainTail: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.chainTail(),
    ];
    testAntlrParse(chainTail, `.b`, true, `.b`, `.b`, `.<el-id>b</el-id>`);
  });
  test("Term", () => {
    const term: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.term(),
    ];
    testAntlrParse(term, `a.b`, true, `a.b`, `a.b`, `<el-id>a</el-id>.<el-id>b</el-id>`);
    testAntlrParse(term, `length(bar)`, true, `length(bar)`);
    testAntlrParse(term, `bar.length()`, true, `bar.length()`);
    testAntlrParse(term, `bar.asList()`, true, `bar.asList()`);
    testAntlrParse(term, `[1,2,3,4,5].asList()`, true, `[1,2,3,4,5].asList()`);
    testAntlrParse(term, `"Hello World".length()`, true, `"Hello World".length()`);
    testAntlrParse(term, `12.3.toString()`, true, `12.3.toString()`);
    testAntlrParse(term, `bar.`, false);
    testAntlrParse(term, `abc`, true, "abc", "");
    testAntlrParse(term, `abc()`, true, "abc()", "");
    testAntlrParse(term, `this`, true, "this", "");
    testAntlrParse(term, `abc(defg, hi)`, true, "abc(defg, hi)", "");
    testAntlrParse(term, `abc[1]`, true, "abc[1]", "");
    testAntlrParse(term, `abc[1][2]`, true, "abc[1][2]", "abc[1][2]");
    testAntlrParse(term, `abc.subList(1, 2)`, true, "abc.subList(1, 2)", "abc.subList(1, 2)");
    testAntlrParse(term, `abc[1, 2]`, false);
    testAntlrParse(term, `abc(defg, hi)[0]`, true, "abc(defg, hi)[0]", "");
    testAntlrParse(term, `(defg, hi)`, true, "(defg, hi)", ""); // tuple
    testAntlrParse(term, `[defg, hi]`, true, "[defg, hi]", "");
    testAntlrParse(term, `345`, true, "345", "");
    testAntlrParse(term, `-345`, false);
    testAntlrParse(term, `(-345)`, true);
    testAntlrParse(term, `not a`, false, "not a", "");
    testAntlrParse(term, `(not a)`, true, `(not a)`);
    testAntlrParse(term, `(3 + a)`, true, "(3 + a)", "");
    testAntlrParse(term, `this`, true, `this`, "");
    testAntlrParse(term, `a`, true, `a`, "");
    testAntlrParse(term, `this.a`, true, `this.a`, "");
    testAntlrParse(
      term,
      `a[1].b().subList(1, 2).c(d)[e][f]`,
      true,
      `a[1].b().subList(1, 2).c(d)[e][f]`,
      "",
    );
    testAntlrParse(term, `this.a[1].b().c(d)[e]`, true, `this.a[1].b().c(d)[e]`, "");
    testAntlrParse(
      term,
      `this.a.b()`,
      true,
      `this.a.b()`,
      "this.a.b()",
      "<el-kw>this</el-kw>.<el-id>a</el-id>.<el-method>b</el-method>()",
    );
    testAntlrParse(
      term,
      `a[1].b().subList(1, 2).c(d).e.f[g]`,
      true,
      `a[1].b().subList(1, 2).c(d).e.f[g]`,
    );
    testAntlrParse(term, `this.a[1].b().c(d)[e]`, true, `this.a[1].b().c(d)[e]`);
  });
  test("ThisInstance", () => {
    const thisInstance: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.thisInstance(),
    ];
    testAntlrParse(thisInstance, `this`, true, `this`, `this`, "<el-kw>this</el-kw>", `this`);
    testAntlrParse(thisInstance, `This`, false);
    testAntlrParse(thisInstance, `th`, false);
    testAntlrParse(thisInstance, `Th`, false);
  });

  test("LitRegExp", () => {
    const litRegExp: [Language, rule: (parser: Parser) => ParserRuleContext] = [
      LanguageElan.Instance,
      (p: Parser) => p.litRegExp(),
    ];
    testAntlrParse(
      litRegExp,
      `/abc+.*/`,
      true,
      `/abc+.*/`,
      "/abc+.*/",
      `/<el-regex>abc+.*</el-regex>/`,
    );
    // TODO
    // testAntlrParse(
    //   litRegExp,
    //   `/abc+.*/gm`,
    //   true,
    //   `/abc+.*/gm`,
    //   "/abc+.*/gm",
    //   `/<el-regex>abc+.*</el-regex>/<el-regex>gm</el-regex>`,
    // );
    // testAntlrParse(litRegExp, `/abc+.*/x`, true, `/abc+.*/`);
    testAntlrParse(litRegExp, `/abc+.*`, false);
    testAntlrParse(litRegExp, `//`, false);
  });

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
  //

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
  //  });

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
  //
});
