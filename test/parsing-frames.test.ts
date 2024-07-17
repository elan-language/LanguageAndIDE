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
    const code = "  let (attemptAfterGreens, targetAfterGreens) be evaluateGreens(attempt, target)";
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
    const code = `# 3d5cc500bca56a6ef67992ad5ba558b08fcae4d47cb1c10d7487bdf2ec842b86 Elan Beta 1 valid

`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - constant only", async () => {
    const code = `# 310f1d83068ac9ff4816c9721be5afb62faa10ddf1fca12e603b5ad176e3d6ec Elan Beta 1 valid

constant pi set to 3.142
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - two constants", async () => {
    const code = `# 3f430b6b7b3ca6d84b7ea87feba0e29e9febc2eda6f3931f6a1ead6de309e1ac Elan Beta 1 valid

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
    const code = `# e68356a6d36851aa57929bf0af10d12543ec5d03379305cfd9194a3e9444cd7a Elan Beta 1 valid

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
    const code = `# c7398146918abc6b9ebf189bb394afcc0a42649da83c7a5f4cb1102fd5f5a130 Elan Beta 1 valid

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
    const code = `# ac293187de8ec2eccd77331be6d830e7ee398e7cba4284855d204c2015fd1834 Elan Beta 1 valid

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
    const code = `# d42e30f3e2fae50239f698d1df8d8ba0d45d3c21073ce4536018af90636a58ad Elan Beta 1 valid

constant phi set to 1.618

main

end main

procedure signIn(password as String)

end procedure

function hypotenuse(sideB as Float, sideC as Float) return Float
  return 0.0
end function

enum Fruit
  apple, orange, pear
end enum
`;
    const source = new CodeSourceFromString(code);
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  test("parse Frames - class", async () => {
    const code = `# 042309db601330031fd5630196ae80eeeb019689cc8b7d83a94af5ed371ebc72 Elan Beta 1 valid

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
    const code = `# 80b5755821cac2bc654b1efd4190044716fc74a1ccf395dc1e7110bb1550b697 Elan Beta 1 valid

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
    const code = `# 9a6f7f51bc012e41827de880e16107ee60dc10319dd26ff8d53cf17b7463f659 Elan Beta 1 valid

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
    const code = `# 5aaa481aabfcdbc413ba11a0c875d0a9cf516727a7f0a265803eed91a125efba Elan Beta 1 valid

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
    const code = `# be559a968a35319f2a662847449c2f1c8039559e87e4036803fe4df3adf9c3a2 Elan Beta 1 valid

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
    const code = `# 0f2176abe724bba7f88e23fdce7d02fb04c94817d2c2506899283bffeb985e9f Elan Beta 1 valid

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
    const code = `# b126924227c6a2c795c6332427fe352affd3b9ddf41362fe9d4a26c068ff5dee Elan Beta 1 valid

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
    const code = `# Elan Beta 1 valid

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
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 1 valid

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
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 1 valid

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
    const code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan Beta 1 valid

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
