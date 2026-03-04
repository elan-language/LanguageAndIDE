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
  test("Pass_DifferentInstancesWithSameValuesAreValueEqual", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7, "Apple")
  variable y set to new Foo(7, "Orange")
  variable z set to new Foo(7, "Orange")
  call printNoLine(x.equals(x))
  call printNoLine(x.equals(y))
  call printNoLine(y.equals(z))
end main

class Foo
    constructor(p1 as Float, p2 as String)
        set this.p1 to p1
        set this.p2 to p2
    end constructor

    property p1 as Float
    property p2 as String

    procedure setP1(v as Float)
        set this.p1 to v
    end procedure

    function asString() returns String
      return $"{this.p1} {this.p2}"
    end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = system.initialise(await new Foo()._initialise(7, "Orange"));
  let z = system.initialise(await new Foo()._initialise(7, "Orange"));
  await _stdlib.printNoLine(_stdlib.equals(x, x));
  await _stdlib.printNoLine(_stdlib.equals(x, y));
  await _stdlib.printNoLine(_stdlib.equals(y, z));
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
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_ActuallyTheSameReference", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7, "Apple")
  variable y set to x
  call y.setP1(3)
  variable z set to new Foo(8, "Orange")
  call printNoLine(x.equals(x))
  call printNoLine(x.equals(y))
  call printNoLine(x.equals(z))
end main

class Foo
  constructor(p1 as Int, p2 as String)
    set this.p1 to p1
    set this.p2 to p2
  end constructor

  property p1 as Int
  property p2 as String

  procedure setP1(v as Int)
    set this.p1 to v
  end procedure

  function asString() returns String
    return $"{this.p1} {this.p2}"
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = x;
  await y.setP1(3);
  let z = system.initialise(await new Foo()._initialise(8, "Orange"));
  await _stdlib.printNoLine(_stdlib.equals(x, x));
  await _stdlib.printNoLine(_stdlib.equals(x, y));
  await _stdlib.printNoLine(_stdlib.equals(x, z));
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
      false,
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
  call printNoLine((x.p1).equals(x.p1))
end main

class Foo
  constructor()
  end constructor
  function asString() returns String
    return ""
  end function

  property p1 as Func<of Int => Int>
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Library or class function 'p1' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
      "Library or class function 'p1' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
      "Library or class function 'p1' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Pass_ListValueEquality1", async () => {
    const code = `${testHeader}

main
  variable f1 set to new Foo(1)
  variable f2 set to new Foo(2)
  variable l1 set to [f1, f2]
  variable l2 set to [f1, f2]
  call printNoLine(l1.equals(l2))
  variable l3 set to [f2, f1]
  call printNoLine(l1.equals(l3))
  variable l4 set to [new Foo(1), new Foo(2)]
  call printNoLine( l4.equals(l1))
  call l4[0].setP(3)
  call printNoLine(l4.equals(l1))
end main

class Foo
  constructor(p as Int)
    set this.p to p
  end constructor
  function asString() returns String
    return ""
  end function

  property p as Int

  procedure setP(value as Int)
    set this.p to value
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = system.initialise(await new Foo()._initialise(1));
  let f2 = system.initialise(await new Foo()._initialise(2));
  let l1 = system.list([f1, f2]);
  let l2 = system.list([f1, f2]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l2));
  let l3 = system.list([f2, f1]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l3));
  let l4 = system.list([system.initialise(await new Foo()._initialise(1)), system.initialise(await new Foo()._initialise(2))]);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
  await system.safeIndex(l4, 0).setP(3);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};

  async _initialise(p) {
    this.p = p;
    return this;
  }

  async asString() {
    return "";
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

  test("Pass_ListValueEquality2", async () => {
    const code = `${testHeader}

main
  variable f1 set to new Foo(1)
  variable f2 set to new Foo(2)
  variable l1 set to [f1, f2]
  variable l2 set to [f1, f2]
  call printNoLine(l1.equals(l2))
  variable l3 set to [f2, f1]
  call printNoLine(l1.equals(l3))
  variable l4 set to [new Foo(1), new Foo(2)]
  call printNoLine( l4.equals(l1))
end main

class Foo
  property p as Int

  constructor(p as Int)
    set this.p to p
  end constructor
  function asString() returns String
    return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = system.initialise(await new Foo()._initialise(1));
  let f2 = system.initialise(await new Foo()._initialise(2));
  let l1 = system.list([f1, f2]);
  let l2 = system.list([f1, f2]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l2));
  let l3 = system.list([f2, f1]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l3));
  let l4 = system.list([system.initialise(await new Foo()._initialise(1)), system.initialise(await new Foo()._initialise(2))]);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};

  p = 0;

  async _initialise(p) {
    this.p = p;
    return this;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });
});
