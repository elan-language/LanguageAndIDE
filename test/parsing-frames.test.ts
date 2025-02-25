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
import { VariableStatement } from "../src/frames/statements/variable-statement";
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
    const code = "  variable fooBar set to 3.141";
    const source = new CodeSourceFromString(code + "\n");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    const m = new MainFrame(fl);
    const v = new VariableStatement(m);
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
    const code = `# 9a81c6ebcc4a6c9a3e8224fcaefc4d5d8145b628049b282c7eda482e1cc5f63d Elan Beta 8 valid

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `# a2bc99d0455bbd246ff0fcaf80293052e78bf45514476cd5b15a65c09dda4ce2 Elan Beta 8 valid

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `# 904fe710371e38a794b2b0f131679e0f8677fe61a36b83d7cb137e698aa2fce0 Elan Beta 8 valid

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
    const code = `# 42217e8aae41c58f42e19cf5d0d16c6599ab997e1e033c21b4c3d2d7c2154750 Elan Beta 8 valid

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
    const code = `# 66b92ab0fe5f588e842e02010636830c23e39e74d056f10d2ba60b3bbf523362 Elan Beta 8 valid

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
    const code = `# 3fda4a92794c99c79ca1fd740e72ce5dd10d353f6ae04651b7f6397be546147c Elan Beta 8 valid

main
  variable name set to value or expression
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
    const code = `# fce5261d288ba102d383832d1979eb109368c81f7f7b61da04dd7a5d0148c2cc Elan Beta 8 valid

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
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - class", async () => {
    const code = `# 908a3c25109d62b4a6ce30b0b6749ff6b509ee8382c86cf1eda2fe15cf8e9170 Elan Beta 8 valid

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
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - record", async () => {
    const code = `# d5824580e8d9d9fee51187fd881eb3b2dd5fba617dec1d4046b23b3d3a2bd523 Elan Beta 8 valid

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
    const code = `# 171edd2415415f04b9c381c1472a04c840626e6f7f7430ba189f4ad80ba6c14b Elan Beta 8 valid

abstract class Foo
  abstract property p1 as Int

  abstract property p2 as Int

  abstract procedure setP1(v as Int)

  abstract function product() returns Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - else with and without if", async () => {
    const code = `# 3e238bc53342006c59d8afa234ef485598a619fe5634374ee21c37d4c88a0424 Elan Beta 8 valid

main
  if true then
  else if true then
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

  test("abstract class can contain concrete property", async () => {
    const code = `# FFFF Elan Beta 8 valid

abstract class Card
  property value as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("abstract class can contain concrete method", async () => {
    const code = `# FFFF Elan Beta 8 valid

abstract class Card
  function bar() returns Int
    return 0
  end function

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });
  test("record can contain a function method", async () => {
    const code = `# FFFF Elan Beta 8 valid

record Card
  function foo() returns Int
    return 0
  end function

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("record can use 'this' in a function method", async () => {
    const code = `# FFFF Elan Beta 8 valid

record Card
  property value as Int

  function doubled() returns Card
    return copy this with x set to property.x * 2
  end function

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(source.getRemainingCode(), "");
  });

  test("record cannot contain a procedure", async () => {
    const code = `# FFFF Elan Beta 8 valid

record Card
  procedure foo()
    print
  end procedure

end record
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at procedure foo()`), true);
  });

  test("#367 abstract class cannot contain constructor", async () => {
    const code = `# FFFF Elan Beta 8 valid

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
  test("#927 parse test and ignored test", async () => {
    const code = `# ab35a092009a3efa43a2413994bdb7b8361e66ebd8eb8399396771480eac35e9 Elan Beta 8 valid

ignore test bar

end test
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
  test("#927 - 2", async () => {
    const code = `# 6dc455816060b91057d8aeb4f0264f48aada2b3e91a3298efef7f1d6374c4daa Elan Beta 8 valid

ignore test foo

end test

test bar

end test
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
  test("#927 - 3", async () => {
    const code = `# 74c676ddd10412ce374da135f8208bbef5775a4c0ab712dc378bf1bb9d24232b Elan Beta 8 valid

test foo

end test

ignore test bar

end test
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
  test("#942 private members", async () => {
    const code = `# 1998d9de5d99bf0e52ca11d2728113f28c0fb29273898516ca591e1593ea2164 Elan Beta 8 valid

class Foo
  constructor()

  end constructor

  private property bar as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});
