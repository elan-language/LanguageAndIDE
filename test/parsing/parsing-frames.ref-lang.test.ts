import assert from "assert";

import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { MainRoutine } from "../../src/ide/frames/globals/main-routine";
import { TestFrame } from "../../src/ide/frames/globals/test-frame";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { AssertStatement } from "../../src/ide/frames/statements/assert-statement";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { InputStatement } from "../../src/ide/frames/statements/input-statement";
import { PrintStatement } from "../../src/ide/frames/statements/print-statement";
import { ProcedureCall } from "../../src/ide/frames/statements/procedureCall";
import { StatementSelector } from "../../src/ide/frames/statements/statement-selector";
import { ThrowStatement } from "../../src/ide/frames/statements/throw-statement";
import { VariableStatement } from "../../src/ide/frames/statements/variable-statement";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { testHeader, transforms } from "../compiler/compiler-test-helpers";

function hash() {
  return Promise.resolve("FFFF");
}

suite("Parsing Frame Tests", async () => {
  test("parse Frames - set statement", () => {
    const code = "  assign fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new Assignment(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - set statement 2", () => {
    const code = "  assign tot to tot";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new Assignment(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - set statement 3", () => {
    const code = "  assign result to 3 + 4";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new Assignment(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - assert statement 3", () => {
    const code = "  assert foo evaluates to 7";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const t = new TestFrame(fl);
    const ass = new AssertStatement(t);
    ass.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(ass.renderAsElanSource(), code);
  });

  test("parse Frames - variable", () => {
    const code = "  variable fooBar set to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const v = new VariableStatement(m);
    v.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(v.renderAsElanSource(), code);
  });

  test("parse Frames - throw", () => {
    const code = `  throw ElanRuntimeError "Failure"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new ThrowStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - throw with variable", () => {
    const code = `  throw ElanRuntimeError message1`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new ThrowStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - input", () => {
    const code = `  input a set to inputString("Your name:")`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new InputStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - print", () => {
    const code = `  print(3 + 4)`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new PrintStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - call", () => {
    const code = `  call foo()`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new ProcedureCall(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - call with args", () => {
    const code = `  call foo(3, a, "hello")`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const setTo = new ProcedureCall(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - StatementSelector", () => {
    const code = "assign fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const m = new MainRoutine(fl);
    const ss = new StatementSelector(m);
    ss.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("parse Frames - header file", async () => {
    const code = `${testHeader}

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `${testHeader}

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `${testHeader}

constant pi set to 3.142

constant e set to 2.718
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - main only", async () => {
    const code = `${testHeader}

main

end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - hello world", async () => {
    const code = `${testHeader}

# my comment
main
  # My first program
  call printNoLine("Hello World!")
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    if (fl.parseError) {
      throw new Error(fl.parseError);
    }
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - main with all single-line statements", async () => {
    const code = `${testHeader}

main
  variable name set to value or expression
  assign a to 3 + 4
  throw ElanRuntimeError "message"
  call signIn(rwp, password)
  call printNoLine("Hello World!")
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - all globals except class", async () => {
    const code = `${testHeader}

constant phi set to 1.618

main

end main

procedure signIn(password as String)

end procedure

function hypotenuse(sideB as Float, sideC as Float) returns Float
  return 0.0
end function

enum Fruit apple, orange, pear
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - class", async () => {
    const code = `${testHeader}

class Player inherits Foo, Bar
  constructor()

  end constructor

  function toString() returns String
    return ""
  end function

  property score as Int

  procedure foo()
    call printNoLine(1)
  end procedure

  function bar() returns Int
    return 1
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - abstract class", async () => {
    const code = `${testHeader}

abstract class Foo
  property p1 as Int

  property p2 as Int

  abstract procedure setP1(v as Int)

  abstract function product() returns Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - with method", async () => {
    const code = `${testHeader}

class Player inherits Foo, Bar
  constructor()

  end constructor

  function toString() returns String
    return ""
  end function

  property score as Int

  function with_score(score as Int) returns Player
    return copyWith(this, "score", score)
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - else with and without if", async () => {
    const code = `${testHeader}

main
  if true then
  elif true then
  else
  end if
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - try catch", async () => {
    const code = `${testHeader}

main
  try
    print("")
  catch e as ElanRuntimeError
    print("")
  end try
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("abstract class can contain concrete property", async () => {
    const code = `${testHeader}

abstract class Card
  property value as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("abstract class can contain concrete method", async () => {
    const code = `${testHeader}

abstract class Card
  function bar() returns Int
    return 0
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("#367 abstract class cannot contain constructor", async () => {
    const code = `${testHeader}

abstract class Card
  constructor()

  end constructor
  function toString() returns String
    return ""
  end function
	  
 end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at constructor()`), true);
  });
  test("#942 private members", async () => {
    const code = `${testHeader}

class Foo
  constructor()

  end constructor

  function toString() returns String
    return ""
  end function

  private property bar as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});
