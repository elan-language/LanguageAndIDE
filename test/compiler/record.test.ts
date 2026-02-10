import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Record", () => {
  test("Pass_BasicRecord", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(f.p1)
end main

record Foo
    property p1 as Float
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Fail_NewWithParam", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo(3)
end main

record Foo
  property p1 as Float
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Pass_instantiateUsingWith", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo() with p1 set to 3, p2 set to "hello"
  call printNoLine(f.p1)
  call printNoLine(f.p2)
end main

record Foo
    property p1 as Float
    property p2 as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p1 = 3; _a.p2 = "hello"; return _a;})();
  await _stdlib.printNoLine(f.p1);
  await _stdlib.printNoLine(f.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  async _initialise() { return this; }
  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "3hello");
  });

  test("Pass_withFunctionMethods", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo() with p1 set to 3, p2 set to "hello"
  call printNoLine(f)
  call printNoLine(f.doubled())
end main

record Foo
    property p1 as Float
    property p2 as String

    function asString() returns String
      return property.p1.asString() + property.p2.asString()
    end function

    function doubled() returns Foo
      return copy this with p1 set to property.p1*2
    end function

end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = await (async () => {const _a = {...system.initialise(await new Foo()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise()))); _a.p1 = 3; _a.p2 = "hello"; return _a;})();
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine((await f.doubled()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  async _initialise() { return this; }
  p1 = 0;

  p2 = "";

  async asString() {
    return (await _stdlib.asString(this.p1)) + (await _stdlib.asString(this.p2));
  }

  async doubled() {
    return await (async () => {const _a = {...this}; Object.setPrototypeOf(_a, Object.getPrototypeOf(this)); _a.p1 = this.p1 * 2; return _a;})();
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
    await assertObjectCodeExecutes(fileImpl, "3hello6hello");
  });

  test("Fail_AbstractRecord", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo(3)
  call printNoLine(f.p1)
  call printNoLine(f.square())
end main

abstract record Bar

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ProcedureOnRecord", async () => {
    const code = `${testHeader}

record Foo
  procedure setP1(p1 as Int)
    set property.p1 to p1
  end procedure

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

    assertDoesNotParse(fileImpl);
  });

  test("Pass_RecordAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(fun(f))
end main

record Foo
  property p1 as Int
end record

function fun(foo as Foo) returns Int
    return foo.p1
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await global.fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_RecordAsProcedureParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call proc(f)
end main

record Foo
  property p1 as Int
end record

procedure proc(foo as Foo)
    call printNoLine(foo.p1)
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

}

async function proc(foo) {
  await _stdlib.printNoLine(foo.p1);
}
global["proc"] = proc;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ImmutableProperties", async () => {
    const code = `${testHeader}

main
 
end main

record Foo
  property p1 as Int
  property p2 as Float
  property p3 as String
  property p4 as Boolean
  property p5 as RegExp
  property p6 as List<of Int>
  property p7 as Dictionary<of String, Int>
  property p8 as Bar
end record

record Bar
  property p1 as Int
end record
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0], ["p3", ""], ["p4", false], ["p5", system.emptyRegExp()], ["p6", system.initialise(_stdlib.List.emptyInstance())], ["p7", system.initialise(_stdlib.Dictionary.emptyInstance())]]);};
  async _initialise() { return this; }
  p1 = 0;

  p2 = 0;

  p3 = "";

  p4 = false;

  p5 = system.emptyRegExp();

  p6 = system.initialise(_stdlib.List.emptyInstance());

  p7 = system.initialise(_stdlib.Dictionary.emptyInstance());

  _p8;
  get p8() {
    return this._p8 ??= Bar.emptyInstance();
  }
  set p8(p8) {
    this._p8 = p8;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_PrivateProperty", async () => {
    const code = `${testHeader}

record Foo
  private property p1 as Int

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NotImmutableProperty", async () => {
    const code = `${testHeader}

record Foo
  property p1 as List<of Int> 
  property p2 as Dictionary<of String, Int> 
  property p3 as Bar
end record

class Bar
  constructor()
  end constructor
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
      "Property p1 is not of an immutable type.LangRef.html#compile_error",
      "Property p2 is not of an immutable type.LangRef.html#compile_error",
      "Property p3 is not of an immutable type.LangRef.html#compile_error",
    ]);
  });
});
