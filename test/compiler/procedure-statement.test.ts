import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Procedure Statement", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `${testHeader}

main
  call printNoLine(1)
  call foo()
  call printNoLine(3)
end main

procedure foo()
  call printNoLine(2)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(1);
  await foo();
  await _stdlib.printNoLine(3);
}

async function foo() {
  await _stdlib.printNoLine(2);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });
  test("Pass_PassingInListsUsingShortFormTypeNames", async () => {
    const code = `${testHeader}

main
  variable a set to [1, 2]
  variable b set to [3, 4]
  variable c set to ["a":true, "b":false]
  variable d set to ["a":true, "b":false]
  call foo(a, b, c, d)
end main

procedure foo(x as List<of Int>, y as List<of Int>, z as Dictionary<of String, Boolean>, t as Dictionary<of String, Boolean>)
  call printNoLine(x)
  call printNoLine(y)
  call printNoLine(z)
  call printNoLine(t)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  let c = system.dictionary([["a", _stdlib.true], ["b", _stdlib.false]]);
  let d = system.dictionary([["a", _stdlib.true], ["b", _stdlib.false]]);
  await foo(a, b, c, d);
}

async function foo(x, y, z, t) {
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
  await _stdlib.printNoLine(t);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2][3, 4][a:true, b:false][a:true, b:false]");
  });

  test("Pass_ExternalCall", async () => {
    const code = `${testHeader}

main
  call pause(1)
  call printNoLine(1)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.pause(1);
  await _stdlib.printNoLine(1);
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_WithParamsPassingVariables", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  variable b set to "hello"
  call foo(a, b)
end main

procedure foo(a as Float, b as String)
  call printNoLine(a)
  call printNoLine(b)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  let b = "hello";
  await foo(a, b);
}

async function foo(a, b) {
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_ReferenceTypesCanBeMutated", async () => {
    const code = `${testHeader}

main
  variable a set to [2, 3]
  call changeFirst(a)
  call printNoLine(a)
end main

procedure changeFirst(a as List<of Int>)
    call a.put(0, 5)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([2, 3]);
  await changeFirst(a);
  await _stdlib.printNoLine(a);
}

async function changeFirst(a) {
  a.put(0, 5);
}
global["changeFirst"] = changeFirst;
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
    await assertObjectCodeExecutes(fileImpl, "[5, 3]");
  });

  test("Pass_WithParamsPassingLiteralsOrExpressions", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  call foo(a + 1, "hello")
end main

procedure foo(a as Int, b as String)
  call printNoLine(a)
  call printNoLine(b)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  await foo(a + 1, "hello");
}

async function foo(a, b) {
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_NestedCalls", async () => {
    const code = `${testHeader}

main
  call foo()
  call printNoLine(3)
end main

procedure foo()
  call printNoLine(1)
  call bar()
end procedure

procedure bar()
  call printNoLine(2)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
  await _stdlib.printNoLine(3);
}

async function foo() {
  await _stdlib.printNoLine(1);
  await bar();
}
global["foo"] = foo;

async function bar() {
  await _stdlib.printNoLine(2);
}
global["bar"] = bar;
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_RepeatedCallToProcedureWithLiteralArgument", async () => {
    const code = `${testHeader}

main
  call square(3)
  call square(5)
end main

procedure square(x as Int)
  call printNoLine(x * x)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await square(3);
  await square(5);
}

async function square(x) {
  await _stdlib.printNoLine(x * x);
}
global["square"] = square;
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
    await assertObjectCodeExecutes(fileImpl, "925");
  });

  test("Pass_Recursion", async () => {
    const code = `${testHeader}

main
  call foo(3)
end main

procedure foo(a as Int)
  if a > 0 then
      call printNoLine(a)
      variable b set to a - 1
      call foo(b)
  end if
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo(3);
}

async function foo(a) {
  if (a > 0) {
    await _stdlib.printNoLine(a);
    let b = a - 1;
    await foo(b);
  }
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "321");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureViaProperty", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.length()
end main

class Foo
    constructor()
      set property.p1 to new Bar()
    end constructor

    property p1 as Bar

    procedure length()
      call property.p1.length(2)
    end procedure

    function asString() returns String
      return ""
    end function

end class

class Bar
    constructor()
      set property.p1 to 5
    end constructor

    property p1 as Float

    procedure length(plus as Float)
      call printNoLine(property.p1 + plus)
    end procedure

    function asString() returns String
      return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.length();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Bar()._initialise());
    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async length() {
    await this.p1.length(2);
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async length(plus) {
    await _stdlib.printNoLine(this.p1 + plus);
  }

  async asString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_RefParameters", async () => {
    const code = `${testHeader}

main
  variable a set to new Ref<of Int>(2)
  variable b set to new Ref<of String>("hello")
  call foo(a, b)
  call printNoLine(a.value())
  call printNoLine(b.value())
end main

procedure foo(x as Ref<of Float>, y as Ref<of String>)
  call x.set(3)
  call y.set("goodbye")
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Ref()._initialise(2));
  let b = system.initialise(await new _stdlib.Ref()._initialise("hello"));
  await foo(a, b);
  await _stdlib.printNoLine(a.value());
  await _stdlib.printNoLine(b.value());
}

async function foo(x, y) {
  x.set(3);
  y.set("goodbye");
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "3goodbye");
  });

  test("Pass_SetFromOutParameters", async () => {
    const code = `${testHeader}

main
  variable a set to new Ref<of Float>(2)
  variable b set to new Ref<of Float>(3)
  call foo(a, b)
  call printNoLine(a.value())
  call printNoLine(b.value())
end main

procedure foo(x as Ref<of Float>, y as Ref<of Float>)
  variable c set to x.value()
  call x.set(y.value())
  call y.set(c)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Ref()._initialise(2));
  let b = system.initialise(await new _stdlib.Ref()._initialise(3));
  await foo(a, b);
  await _stdlib.printNoLine(a.value());
  await _stdlib.printNoLine(b.value());
}

async function foo(x, y) {
  let c = x.value();
  x.set(y.value());
  y.set(c);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_NestedOutParameters", async () => {
    const code = `${testHeader}

main
  variable a set to new Ref<of Float>(2)
  variable b set to new Ref<of Float>(3)
  call foo(a, b)
  call printNoLine(a.value())
  call printNoLine(b.value())
end main

procedure foo(a as Ref<of Float>, b as Ref<of Float>)
  call bar(a, b)
end procedure

procedure bar(a as Ref<of Float>, b as Ref<of Float>)
  variable c set to a.value()
  call a.set(b.value())
  call b.set(c)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Ref()._initialise(2));
  let b = system.initialise(await new _stdlib.Ref()._initialise(3));
  await foo(a, b);
  await _stdlib.printNoLine(a.value());
  await _stdlib.printNoLine(b.value());
}

async function foo(a, b) {
  await bar(a, b);
}
global["foo"] = foo;

async function bar(a, b) {
  let c = a.value();
  a.set(b.value());
  b.set(c);
}
global["bar"] = bar;
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
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_CallOnOutParameters", async () => {
    const code = `${testHeader}

main
  variable a set to new Ref<of Foo>(new Foo())
  variable b set to new Ref<of Int>(0)
  call foo(a, b)
  call printNoLine(b.value())
end main

procedure foo(f as Ref<of Foo>, y as Ref<of Int>)
  variable ff set to f.value()
  call ff.bar(y)
end procedure

class Foo
  constructor()
  end constructor

  procedure bar(z as Ref<of Int>)
    call z.set(1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Ref()._initialise(system.initialise(await new Foo()._initialise())));
  let b = system.initialise(await new _stdlib.Ref()._initialise(0));
  await foo(a, b);
  await _stdlib.printNoLine(b.value());
}

async function foo(f, y) {
  let ff = f.value();
  await ff.bar(y);
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async bar(z) {
    z.set(1);
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ExpressionOnOutParameters", async () => {
    const code = `${testHeader}

main
  variable a set to new Ref<of Foo>(new Foo())
  variable b set to new Ref<of Int>(100)
  call foo(a, b)
  call printNoLine(b.value())
end main

procedure foo(f as  Ref<of Foo>, y as  Ref<of Int>)
  call y.set(f.value().ff + y.value())
end procedure

class Foo
  constructor()
    set property.ff to 1
  end constructor

  property ff as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Ref()._initialise(system.initialise(await new Foo()._initialise())));
  let b = system.initialise(await new _stdlib.Ref()._initialise(100));
  await foo(a, b);
  await _stdlib.printNoLine(b.value());
}

async function foo(f, y) {
  y.set(f.value().ff + y.value());
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["ff", 0]]);};

  async _initialise() {
    this.ff = 1;
    return this;
  }

  ff = 0;

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
    await assertObjectCodeExecutes(fileImpl, "101");
  });

  test("Pass_MultipleCallsWithOutParameters", async () => {
    const code = `${testHeader}

main
  variable x set to new Ref<of Int>(1)
  call addOne(x)
  call printNoLine(x.value())
  call addOne(x)
  call printNoLine(x.value())
end main

procedure addOne(n as Ref<of Int>)
  call n.set(n.value() + 1)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new _stdlib.Ref()._initialise(1));
  await addOne(x);
  await _stdlib.printNoLine(x.value());
  await addOne(x);
  await _stdlib.printNoLine(x.value());
}

async function addOne(n) {
  n.set(n.value() + 1);
}
global["addOne"] = addOne;
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
    await assertObjectCodeExecutes(fileImpl, "23");
  });

  test("Pass_PrintOutParameter", async () => {
    const code = `${testHeader}

main
  variable x set to new Ref<of Int>(1)
  call printParameter(x)
end main

procedure printParameter(n as Ref<of Int>)
  call printNoLine(n.value())
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new _stdlib.Ref()._initialise(1));
  await printParameter(x);
}

async function printParameter(n) {
  await _stdlib.printNoLine(n.value());
}
global["printParameter"] = printParameter;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_CallingUndeclaredProc", async () => {
    const code = `${testHeader}

main
  call bar()
end main
`;

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
    assertDoesNotCompile(fileImpl, ["'bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_TypeSpecifiedBeforeParamName", async () => {
    const code = `${testHeader}

main
end main
    
procedure foo(Int a) 
  call printNoLine(a)
end procedure
`;

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

  test("Fail_CannotCallMain", async () => {
    const code = `${testHeader}

main
  call printNoLine(1)
  call foo()
  call printNoLine(3)
end main

procedure foo()
  call main()
end procedure
`;

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
    assertDoesNotCompile(fileImpl, ["'main' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_PassingUnnecessaryParameter", async () => {
    const code = `${testHeader}

main
  call printNoLine(1)
  call foo(3)
  call printNoLine(3)
end main

procedure foo()
  call printNoLine(2)
end procedure
`;

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
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassingTooFewParams", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  call foo(a + 1)
end main

procedure foo(a as Int, b as String)
  call printNoLine(a)
  call printNoLine(b)
end procedure
`;

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
      "Missing argument(s). Expected: a (Int), b (String).LangRef.html#compile_error",
    ]);
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `${testHeader}

main
  variable a set to [1]
  call a.append()
  call a.append(1, 2)
end main`;

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
      "Missing argument(s). Expected: value (Int).LangRef.html#compile_error",
      "Too many argument(s). Expected: value (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassingWrongType", async () => {
    const code = `${testHeader}

main
  call foo(1, 2)
end main

procedure foo(a as Int, b as String)
  call printNoLine(a)
  call printNoLine(b)
end procedure
`;

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
      "Argument types. Expected: a (Int), b (String), Provided: Int, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnterminatedRecursion", async () => {
    const code = `${testHeader}

main
  call foo(3)
end main

procedure foo(a as Int)
  call foo(a)
end procedure
`;

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
    await assertObjectCodeDoesNotExecute(fileImpl, "Maximum call stack size exceeded");
  });

  test("Fail_CannotCallPrintAsAProcedure", async () => {
    const code = `${testHeader}

main
  call printNoLine(""Hello World!"")
end main
`;

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

  test("Fail_ParameterCount", async () => {
    const code = `${testHeader}

procedure f(p as Float)

end procedure

main
  call f(1, 2)
  call f()
end main`;

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
      "Too many argument(s). Expected: p (Float).LangRef.html#compile_error",
      "Missing argument(s). Expected: p (Float).LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `${testHeader}

procedure f(p as Int)

end procedure

main
  call f(true)
  call f(1.0)
end main`;

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
      "Argument types. Expected: p (Int), Provided: Boolean.LangRef.html#compile_error",
      "Argument types. Expected: p (Int), Provided: Float.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReferenceTypeParamMayNotBeReassigned", async () => {
    const code = `${testHeader}

main
  variable a set to [2, 3]
  call changeAll(a)
  call printNoLine(a)
end main

procedure changeAll(a as List<of Int>)
  set a to [1, 2, 3]
end procedure`;

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
      "May not re-assign the parameter 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fai_ListParamMayNotBeReassigned", async () => {
    const code = `${testHeader}

main
  variable a set to [2, 3]
  call changeAll(a)
  call printNoLine(a)
end main

procedure changeAll(a as List<of Int>)
  set a to [1, 2, 3]
end procedure`;

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
      "May not re-assign the parameter 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ValueTypeParamMayNotBeReassigned", async () => {
    const code = `${testHeader}

main
  variable a set to 4
  call changeValue(a)
  call printNoLine(a)
end main

procedure changeValue(a as Int)
    set a to 3
end procedure`;

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
      "May not re-assign the parameter 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

procedure changeValue(a as Bar)

end procedure`;

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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
  
end main

procedure if(a as Int)

end procedure`;

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
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testHeader}

main
  
end main

procedure break(a as Int)

end procedure`;

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
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `${testHeader}

main
  
end main

procedure fun(if as Int)

end procedure`;

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

  test("Fail_UseOfReservedwordAsParamName", async () => {
    const code = `${testHeader}

main
  
end main

procedure fun(break as Int)

end procedure`;

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
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `${testHeader}

procedure foo()

end procedure

procedure foo()

end procedure
`;

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
    assertDoesNotCompile(fileImpl, ["Name 'foo' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testHeader}

procedure foo(a as Int, b as String, a as Int)

end procedure`;

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
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope.LangRef.html#compile_error"]);
  });

  ignore_test("Fail_OperatorsAndProcedures", async () => {
    const code = `${testHeader}

main
  variable a set to p2.isSameValueAs(p2)
  variable b set to p1 + p2
  variable c set to -p1
end main

procedure p1()

end procedure
procedure p2()

end procedure`;

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
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
      "Incompatible types. Expected: Float or Int, Provided: Procedure ().LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Procedure ().LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_ProcedureInExpression", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  set a to a.append(3)
end main`;

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
      "Cannot call procedure 'append' within an expression.LangRef.html#compile_error",
      "Incompatible types. Expected: List<of Int>, Provided: Procedure (Int).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_IncorrectScope", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.bar()
end main

class Foo
end class

procedure bar()
end procedure`;

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
      "'bar' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension2", async () => {
    const code = `${testHeader}

main
  variable s set to "hello"
  call s.reverse()
end main`;

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
      "'reverse' is not defined for type 'String'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_onUndefined", async () => {
    const code = `${testHeader}

main
  call s.reverse()
end main`;

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
    assertDoesNotCompile(fileImpl, ["'s' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testHeader}

procedure foo(foo as Int)

end procedure`;

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
      "Parameter 'foo' may not have the same name as the method in which it is defined.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testHeader}

procedure foo(a as Int, foo as Int)

end procedure`;

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
      "Parameter 'foo' may not have the same name as the method in which it is defined.LangRef.html#compile_error",
    ]);
  });
});
