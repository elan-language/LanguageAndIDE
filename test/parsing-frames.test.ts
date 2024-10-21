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
    const code = `  throw "Failure"`;
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const setTo = new Throw(m);
    setTo.parseFrom(source);
    assert.equal(source.hasMoreCode(), false);
    assert.equal(setTo.renderAsSource(), code);
  });
  test("parse Frames - throw with variable", () => {
    const code = `  throw message1`;
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
    const code = `# 162755a8cc8038573a75b384a9d168010942b776cfe9dc48524b58444f12b57a Elan Beta 3 valid

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `# 42019e35596916059f3ae371e1e7b56336107e2295ddd583a7721c170cd932d9 Elan Beta 3 valid

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `# 8cac9a366396ef5805e6ac64b99e1ccc9deebdbc903adc0c67e7d447da37c72a Elan Beta 3 valid

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
    const code = `# a1822db3703589d88ff1c3400f86ff546c7dc5918d0948ddc7b8b927f9fe5e86 Elan Beta 3 valid

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
    const code = `# 7d5f1d02d0555369015821659ff5b053bfde54204a4d792dcd595c21f5f906ad Elan Beta 3 valid

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
    const code = `# 7117ff6da159edc961444b3b755980977b83137697571b19bf204d1602425cca Elan Beta 3 valid

main
  var name set to value or expression
  set a to 3 + 4
  throw "message"
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
    const code = `# 55cb480863087788f7bfe84b63b7d13ff5e6d44efa3491f8741e7360c7a1cc0f Elan Beta 3 valid

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
    const code = `# 1fdf48d63459e6af99f6d0505921f7ac411cefc3e39fa3c8ccb6e06cecae2815 Elan Beta 3 valid

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
    const code = `# 5bd61b1253e540f7098c3ac3fbb87e74842f1ffb60b09007f92d0864577b45fb Elan Beta 3 valid

record Card
  constructor()

  end constructor

  property value as Int

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - abstract class", async () => {
    const code = `# c19885dd43d856db60dddc601fff7d3c1fd23569c43e9dfc64a0197335607bc7 Elan Beta 3 valid

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
    const code = `# 2156145b0b4feec8f3a7dd65f1ef550b91cf58a41c1e1a2bc183e4c9b6abe0b3 Elan Beta 3 valid

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
    const code = `# 480bc9eb6d785364a8a2d5a12b4469e4fcbec33f7934687d5e27e53ad407c830 Elan Beta 3 valid

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
    const code = `# c047e74fd79e344d9336f03846d0bc6e1457796a2aa05e7906e7d5dabbc34e5a Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

record Card
  constructor()

  end constructor

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
    const code = `# FFFF Elan Beta 3 valid

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
