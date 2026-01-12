import assert from "assert";

import { StdLib } from "../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { TestFrame } from "../src/ide/frames/globals/test-frame";
import { AssertStatement } from "../src/ide/frames/statements/assert-statement";
import { CallStatement } from "../src/ide/frames/statements/call-statement";
import { LetStatement } from "../src/ide/frames/statements/let-statement";
import { Print } from "../src/ide/frames/statements/print";
import { SetStatement } from "../src/ide/frames/statements/set-statement";
import { StatementSelector } from "../src/ide/frames/statements/statement-selector";
import { Throw } from "../src/ide/frames/statements/throw";
import { VariableStatement } from "../src/ide/frames/statements/variable-statement";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { testHeader, transforms } from "./compiler/compiler-test-helpers";

function hash() {
  return Promise.resolve("FFFF");
}

suite("Parsing Frame Tests", async () => {
  test("parse Frames - set statement", () => {
    const code = "  set fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - set statement 2", () => {
    const code = "  set tot to tot";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - set statement 3", () => {
    const code = "  set result to 3 + 4";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - let statement 1", () => {
    const code = "  let result be 3 + 4";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new LetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - let statement 2", () => {
    const code = "  let attemptAfterGreens, targetAfterGreens be evaluateGreens(attempt, target)";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new LetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });

  test("parse Frames - assert statement 3", () => {
    const code = "  assert foo is 7";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const v = new VariableStatement(m);
    v.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(v.renderAsElanSource(), code);
  });

  test("parse Frames - print", () => {
    const code = `  print "Hello World!"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const p = new Print(m);
    p.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(p.renderAsElanSource(), code);
  });
  test("parse Frames - throw", () => {
    const code = `  throw exception "Failure"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new Throw(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - throw with variable", () => {
    const code = `  throw exception message1`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new Throw(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - call", () => {
    const code = `  call foo()`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new CallStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - call with args", () => {
    const code = `  call foo(3, a, "hello")`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
    const setTo = new CallStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsElanSource(), code);
  });
  test("parse Frames - StatementSelector", () => {
    const code = "set fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    const m = new MainFrame(fl);
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  print "Hello World!"
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  set a to 3 + 4
  throw exception "message"
  call signIn(rwp, password)
  print "Hello World!"
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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

  property score as Int

  procedure foo()
    print 1
  end procedure

  function bar() returns Int
    return 1
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - record", async () => {
    const code = `${testHeader}

record Foo
  property bar as Int

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - abstract class", async () => {
    const code = `${testHeader}

abstract class Foo
  abstract property p1 as Int

  abstract property p2 as Int

  abstract procedure setP1(v as Int)

  abstract function product() returns Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });
  test("record can contain a function method", async () => {
    const code = `${testHeader}

record Card
  function foo() returns Int
    return 0
  end function

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("record can use 'this' in a function method", async () => {
    const code = `${testHeader}

record Card
  property value as Int

  function doubled() returns Card
    return copy this with x set to property.x * 2
  end function

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("record cannot contain a procedure", async () => {
    const code = `${testHeader}

record Card
  procedure foo()
    print
  end procedure

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at procedure foo()`), true);
  });

  test("#367 abstract class cannot contain constructor", async () => {
    const code = `${testHeader}

abstract class Card
  constructor()

  end constructor
	  
 end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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

  private property bar as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});
