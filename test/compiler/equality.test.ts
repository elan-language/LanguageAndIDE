import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Equality", () => {
  test("Pass_DifferentInstancesWithSameValuesAreEqual", async () => {
    const code = `${testHeader}

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = system.initialise(await new Foo()._initialise(7, "Orange"));
  let z = system.initialise(await new Foo()._initialise(7, "Orange"));
  await system.printLine(system.objectEquals(x, x));
  await system.printLine(system.objectEquals(x, y));
  await system.printLine(system.objectEquals(y, z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    return this;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  async asString() {
    return \`\${await _stdlib.asString(this.p1)} \${await _stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_EmptyDoesEqualDefault", async () => {
    const code = `${testHeader}

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await system.printLine(system.objectEquals(x, Foo.emptyInstance()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  async asString() {
    return \`\${await _stdlib.asString(this.p1)} \${await _stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ActuallyTheSameReference", async () => {
    const code = `${testHeader}

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = x;
  await y.setP1(3);
  let z = system.initialise(await new Foo()._initialise(8, "Orange"));
  await system.printLine(system.objectEquals(x, x));
  await system.printLine(system.objectEquals(x, y));
  await system.printLine(system.objectEquals(x, z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    return this;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  async asString() {
    return \`\${await _stdlib.asString(this.p1)} \${await _stdlib.asString(this.p2)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_CompareLambdas", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  print x.p1 is x.p1
end main

class Foo
  constructor()
  end constructor

  property p1 as Func<of Int => Int>
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Library or class function 'p1' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
      "Library or class function 'p1' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
    ]);
  });

  test("Pass_ListEquality", async () => {
    const code = `${testHeader}

main
  variable f1 set to new Foo(1)
  variable f2 set to new Foo(2)
  let l1 be [f1, f2]
  let l2 be [f1, f2]
  print l1 is l2
  let l3 be [f2, f1]
  print l1 is l3
  let l4 be [new Foo(1), new Foo(2)]
  print  l4 is l1
  call l4[0].setP(3)
  print l4 is l1
end main

class Foo
  constructor(p as Int)
    set property.p to p
  end constructor

  property p as Int

  procedure setP(value as Int)
    set property.p to value
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = system.initialise(await new Foo()._initialise(1));
  let f2 = system.initialise(await new Foo()._initialise(2));
  const l1 = system.list([f1, f2]);
  const l2 = system.list([f1, f2]);
  await system.printLine(system.objectEquals(l1, l2));
  const l3 = system.list([f2, f1]);
  await system.printLine(system.objectEquals(l1, l3));
  const l4 = system.list([system.initialise(await new Foo()._initialise(1)), system.initialise(await new Foo()._initialise(2))]);
  await system.printLine(system.objectEquals(l4, l1));
  await system.safeIndex(l4, 0).setP(3);
  await system.printLine(system.objectEquals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};

  async _initialise(p) {
    this.p = p;
    return this;
  }

  p = 0;

  async setP(value) {
    this.p = value;
  }

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalse");
  });

  test("Pass_ListEquality", async () => {
    const code = `${testHeader}

main
  variable f1 set to new Foo() with p set to 1
  variable f2 set to new Foo() with p set to 2
  let l1 be {f1, f2}
  let l2 be {f1, f2}
  print l1 is l2
  let l3 be {f2, f1}
  print l1 is l3
  let l4 be {new Foo() with p set to 1, new Foo() with p set to 2}
  print  l4 is l1
end main

record Foo
  property p as Int

end record`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p = 1; return _a;})();
  let f2 = await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p = 2; return _a;})();
  const l1 = system.listImmutable([f1, f2]);
  const l2 = system.listImmutable([f1, f2]);
  await system.printLine(system.objectEquals(l1, l2));
  const l3 = system.listImmutable([f2, f1]);
  await system.printLine(system.objectEquals(l1, l3));
  const l4 = system.listImmutable([await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p = 1; return _a;})(), await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p = 2; return _a;})()]);
  await system.printLine(system.objectEquals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};
  async _initialise() { return this; }
  p = 0;

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });
});
