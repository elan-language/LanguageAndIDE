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

suite("File Parsing Tests", async () => {
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
    const code = `# c9e7383d8f7428c7111dfc04d6af02fa9b9abf0d6d4d6036edd01b4d41af13db Elan Beta 2 valid

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `# a110c5d5f3d90235c575851babd791ef91b8e3466016ca28be8d565d5bc70853 Elan Beta 2 valid

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `# 754e67e7543a684a474a7b19fdf8f58ef14a0d38d312c1db54debf585e50874c Elan Beta 2 valid

constant pi set to 3.142

constant e set to 2.718
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - main", async () => {
    const code = `# d6e750b676a7125ea61b81d2d3687af5adc37191544a8b6294a9255a1dddcaab Elan Beta 2 valid

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
    const code = `# 32c39d45547325784d25f7e7444ba9ea7cd5ec9e41ce71152bc1660e2a016f4c Elan Beta 2 valid

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
    const code = `# fcce4fa5c05a8e7d3295082fed58b2093987d60ce7328ff1543e66bff8ee2ff8 Elan Beta 2 valid

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
    const code = `# 01cb0b719da5c4a5069557ebdd06567b70fe718a7d0ae9dc0152655ffa86c534 Elan Beta 2 valid

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
    const code = `# c9b8600da9d16e0529a19d50138b17fda8fabca9e8bb89efc6742093322e90e7 Elan Beta 2 valid

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

  test("parse Frames - immutable class", async () => {
    const code = `# a2b8ac1840ebf86b2c65f77300a5b443084d6dec30fd0de0cd2f3cdc5d72699e Elan Beta 2 valid

immutable class Card inherits Foo, Bar
  constructor()

  end constructor

  private property value as Int

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - abstract class", async () => {
    const code = `# 81a7985efca3bd0d483c582c8e2eaac29ef9bd962a2584bb678599e7377e6e0b Elan Beta 2 valid

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

  test("parse Frames - abstract immutable class", async () => {
    const code = `# bf4a220df6a426b17ab8daf73ac2f4b9657a43dd5e8742d9de3c00a31edee3f1 Elan Beta 2 valid

abstract immutable class Card
  abstract property value as Int

  abstract function bar() return Qux

end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - switch 1", async () => {
    const code = `# b5cce9dcd4c0e12574a010963106bab7d7e6f62f67a66e4c62961bdbb5e410ab Elan Beta 2 valid

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
    const code = `# 84115e06ac571a01f4c34f2095cc31c61f93630b11bcb407d8ff21903a8f0660 Elan Beta 2 valid

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
    const code = `# fdde78f08b7cda42415df5d6146b15671f2ff811def972eaaa63a672c9ce9762 Elan Beta 2 valid

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
    const code = `# Elan Beta 2 valid

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
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 2 valid

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
  test("#367 immutable class cannot contain procedure", async () => {
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 2 valid

immutable class Card
  constructor()

  end constructor

  procedure foo()

  end procedure
	  
end class
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms(), true);
    await await fl.parseFrom(source);
    assert.equal(fl.parseError!.includes(`0 matches found at procedure foo()`), true);
  });

  test("#367 abstract class cannot contain constructor", async () => {
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 2 valid

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
