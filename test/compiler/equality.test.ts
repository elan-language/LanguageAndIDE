import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Equality", () => {
  test("Pass_DifferentInstancesWithSameValuesAreEqual", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo(7, "Apple")
  variable y set to new Foo(7, "Orange")
  variable z set to new Foo(7, "Orange")
  print x is x
  print x is y
  print y is z
end main

class Foo
    constructor(p1 as Float, p2 as String)
        set property.p1 to p1
        set property.p2 to p2
    end constructor
    property p1 as Float
    property p2 as String

    procedure setP1(v as Float)
        set property.p1 to v
    end procedure

    function asString() returns String
      return "{property.p1} {property.p2}"
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Foo(7, "Apple"));
  let y = system.initialise(new Foo(7, "Orange"));
  let z = system.initialise(new Foo(7, "Orange"));
  system.printLine(_stdlib.asString(system.objectEquals(x, x)));
  system.printLine(_stdlib.asString(system.objectEquals(x, y)));
  system.printLine(_stdlib.asString(system.objectEquals(y, z)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  asString() {
    return \`\${_stdlib.asString(this.p1)} \${_stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_EmptyDoesEqualDefault", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
  print x is empty Foo
end main

class Foo
    constructor()
    end constructor
    property p1 as Int
    property p2 as String

    procedure setP1(v as Int)
        set property.p1 to v
    end procedure

    function asString() returns String
      return "{property.p1} {property.p2}"
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Foo());
  system.printLine(_stdlib.asString(system.objectEquals(x, Foo.emptyInstance())));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor() {

  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  asString() {
    return \`\${_stdlib.asString(this.p1)} \${_stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ActuallyTheSameReference", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo(7, "Apple")
  variable y set to x
  call y.setP1(3)
  variable z set to new Foo(8, "Orange")
  print x is x
  print x is y
  print x is z
end main

class Foo
  constructor(p1 as Int, p2 as String)
    set property.p1 to p1
    set property.p2 to p2
  end constructor

  property p1 as Int
  property p2 as String

  procedure setP1(v as Int)
    set property.p1 to v
  end procedure

  function asString() returns String
    return "{property.p1} {property.p2}"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Foo(7, "Apple"));
  let y = x;
  await y.setP1(3);
  let z = system.initialise(new Foo(8, "Orange"));
  system.printLine(_stdlib.asString(system.objectEquals(x, x)));
  system.printLine(_stdlib.asString(system.objectEquals(x, y)));
  system.printLine(_stdlib.asString(system.objectEquals(x, z)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  asString() {
    return \`\${_stdlib.asString(this.p1)} \${_stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Pass_CompareLambdas", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
  print x.p1 is x.p1
  print x.p1 is x.p2
  print x.p1 is x.p3
end main

class Foo
  constructor()
  end constructor

  property p1 as Func<of Int => Int>
  property p2 as Func<of Int => Int>
  property p3 as Func<of Int => Int>
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot do equality operations on Procedures or Functions"]);
  });
});
