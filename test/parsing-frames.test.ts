import assert from "assert";
import { CodeSourceFromString } from "../src/frames/code-source";
import { DefaultProfile } from "../src/frames/default-profile";
import { FileImpl } from "../src/frames/file-impl";
import { MainFrame } from "../src/frames/globals/main-frame";
import { TestFrame } from "../src/frames/globals/test-frame";
import { AssertStatement } from "../src/frames/statements/assert-statement";
import { CallStatement } from "../src/frames/statements/call-statement";
import { LetStatement } from "../src/frames/statements/let-statement";
import { Print } from "../src/frames/statements/print";
import { SetStatement } from "../src/frames/statements/set-statement";
import { StatementSelector } from "../src/frames/statements/statement-selector";
import { Throw } from "../src/frames/statements/throw";
import { VarStatement } from "../src/frames/statements/var-statement";
import { hash } from "../src/util";
import { transforms } from "./compiler/compiler-test-helpers";

suite("Parsing Frame Tests", async () => {
  test("parse Frames - set statement", () => {
    const code = "  set fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });

  test("parse Frames - set statement 2", () => {
    const code = "  set tot to tot";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - set statement 3", () => {
    const code = "  set result to 3 + 4";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new SetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });

  test("parse Frames - let statement 1", () => {
    const code = "  let result be 3 + 4";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new LetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });

  test("parse Frames - let statement 2", () => {
    const code = "  let attemptAfterGreens, targetAfterGreens be evaluateGreens(attempt, target)";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new LetStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });

  test("parse Frames - assert statement 3", () => {
    const code = "  assert foo is 7";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const t = new TestFrame(fl);
    const ass = new AssertStatement(t);
    ass.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(ass.renderAsSource(), code);
  });

  test("parse Frames - variable", () => {
    const code = "  var fooBar set to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const v = new VarStatement(m);
    v.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(v.renderAsSource(), code);
  });

  test("parse Frames - print", () => {
    const code = `  print "Hello World!"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const p = new Print(m);
    p.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(p.renderAsSource(), code);
  });
  test("parse Frames - throw", () => {
    const code = `  throw exception "Failure"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new Throw(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - throw with variable", () => {
    const code = `  throw exception message1`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new Throw(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - call", () => {
    const code = `  call foo()`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new CallStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - call with args", () => {
    const code = `  call foo(3, a, "hello")`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new CallStatement(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - StatementSelector", () => {
    const code = "set fooBar to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const ss = new StatementSelector(m);
    ss.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("parse Frames - header file", async () => {
    const code = `# 1dc086eb8b691180011e8d9ee006f53c7b007b7384938d2299debe54e85ea82c Elan Beta 5 valid

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `# d8046a10da2bc3fb569bb82f21e35791f0bd5b1765e136e427c67119c4746a2e Elan Beta 5 valid

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `# 7e76f6fae8b6bcae41a7877f60493eef848dd043cd330d3655e57e853d3b190c Elan Beta 5 valid

constant pi set to 3.142

constant e set to 2.718
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - main only", async () => {
    const code = `# ad9b968a437c3ef9a60f555a92a4df2faa0bf1250a7e4cbd33e52cb842c09b8c Elan Beta 5 valid

main

end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - hello world", async () => {
    const code = `# 9cc2dcdf8e74b9cea2ad3dd5316e743cd822263e87f32c3f58fc74ab9871df73 Elan Beta 5 valid

# my comment
main
  # My first program
  print "Hello World!"
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    if (fl.parseError) {
      throw new Error(fl.parseError);
    }
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - main with all single-line statements", async () => {
    const code = `# a9686ed015064c428f8d8308d5fd3eccc09a86f7895e5212cc21c2d4096f601b Elan Beta 5 valid

main
  var name set to value or expression
  set a to 3 + 4
  throw exception "message"
  call signIn(rwp, password)
  print "Hello World!"
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - all globals except class", async () => {
    const code = `# ff38c4271c1309faad88e14566c077d60eabaf044668a53fcd33d22e820ecec3 Elan Beta 5 valid

constant phi set to 1.618

main

end main

procedure signIn(password as String)

end procedure

function hypotenuse(sideB as Float, sideC as Float) return Float
  return 0.0
end function

enum Fruit apple, orange, pear
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - class", async () => {
    const code = `# a4935f7f52acf736c8f9bca459b026d12b81d42320a40fe1ab12f8e7fafb34dc Elan Beta 5 valid

class Player inherits Foo, Bar
  constructor()

  end constructor

  property score as Int

  procedure foo()
    print 1
  end procedure

  function bar() return Int
    return 1
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - record", async () => {
    const code = `# 19baae4fc366a37ffb8cbede2b63e3e9ef63391cefe0472229bbc992fc3beb80 Elan Beta 5 valid

record Foo
  property bar as Int

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - abstract class", async () => {
    const code = `# 852a5393849cd631a717912809d5d54c8274e4449a3c3581dc54afd337584305 Elan Beta 5 valid

abstract class Foo
  abstract property p1 as Int

  abstract property p2 as Int

  abstract procedure setP1(v as Int)

  abstract function product() return Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - switch 1", async () => {
    const code = `# e0f1844895a81d069d47d598e29813b2b93414bf92ebe34bd9ae96a42172e96c Elan Beta 5 valid

main
  switch i
    case 1
      print "a"
    default

  end switch
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
  test("parse Frames - switch 2", async () => {
    const code = `# 4af0095badc1fd16c6084fbf7c072405bc56eae2255e154ebec67e57a4c516e5 Elan Beta 5 valid

main
  switch i
    case 1
      print "a"
    default
      print "b"
  end switch
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - else with and without if", async () => {
    const code = `# f42e22b9449738144fde17e6e22adb32982d2c5e89fa55d393b590abad966292 Elan Beta 5 valid

main
  if true
    then

    else if true

    else

  end if
end main
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("#367 abstract class cannot contain concrete property", async () => {
    const code = `# FFFF Elan Beta 5 valid

abstract class Card
  property value as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at property value as Int`), true);
  });

  test("#367 abstract class cannot contain concrete method", async () => {
    const code = `# FFFF Elan Beta 5 valid

abstract class Card
  function bar() return Int
    return 0
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at function bar() return Int`), true);
  });
  test("record cannot contain any method", async () => {
    const code = `# FFFF Elan Beta 5 valid

record Card
  function foo() return Int
    return 0
  end procedure
end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at function foo()`), true);
  });

  test("#367 abstract class cannot contain constructor", async () => {
    const code = `# FFFF Elan Beta 5 valid

abstract class Card
  constructor()

  end constructor
	  
 end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at constructor()`), true);
  });
});
