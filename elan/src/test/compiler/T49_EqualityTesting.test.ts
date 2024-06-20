import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T49_EqualityTesting", () => {
  test("Pass_DifferentInstancesWithSameValuesAreEqual", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7, "Apple")
  var y set to new Foo(7, "Orange")
  var z set to new Foo(7, "Orange")
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
        set p1 to v
    end procedure

    function asString() return String
      return "{p1} {p2}"
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7, "Apple"));
  var y = system.initialise(new Foo(7, "Orange"));
  var z = system.initialise(new Foo(7, "Orange"));
  system.print(_stdlib.asString(system.objectEquals(x, x)));
  system.print(_stdlib.asString(system.objectEquals(x, y)));
  system.print(_stdlib.asString(system.objectEquals(y, z)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  print x is empty Foo
end main

class Foo
    constructor()
    end constructor
    property p1 as Int
    property p2 as String

    procedure setP1(v as Int)
        set p1 to v
    end procedure

    function asString() return String
      return "{p1} {p2}"
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.print(_stdlib.asString(system.objectEquals(x, Foo.emptyInstance())));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7, "Apple")
  var y set to x
  call y.setP1(3)
  var z set to new Foo(8, "Orange")
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
    set p1 to v
  end procedure

  function asString() return String
    return "{p1} {p2}"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7, "Apple"));
  var y = x;
  await y.setP1(3);
  var z = system.initialise(new Foo(8, "Orange"));
  system.print(_stdlib.asString(system.objectEquals(x, x)));
  system.print(_stdlib.asString(system.objectEquals(x, y)));
  system.print(_stdlib.asString(system.objectEquals(x, z)));
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

  ignore_test("Pass_CompareLambdas", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.print(_stdlib.asString(system.objectEquals(x.p1, x.p1)));
  system.print(_stdlib.asString(system.objectEquals(x.p1, x.p2)));
  system.print(_stdlib.asString(system.objectEquals(x.p1, x.p3)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", system.emptyFunc(0)], ["p2", system.emptyFunc(0)], ["p3", system.emptyFunc(0)]]);};
  constructor() {

  }

  p1 = system.emptyFunc(0);

  p2 = system.emptyFunc(0);

  p3 = system.emptyFunc(0);

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  // Fails TODO
});
