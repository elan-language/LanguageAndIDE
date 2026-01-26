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
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Procedure Statement", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `${testHeader}

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  print 2
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(1);
  await foo();
  await system.print(3);
}

async function foo() {
  await system.print(2);
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
  variable b set to {3, 4}
  variable c set to ["a":true, "b":false]
  variable d set to {"a":true, "b":false}
  call foo(a, b, c, d)
end main

procedure foo(x as List<of Int>, y as ListImmutable<of Int>, z as Dictionary<of String, Boolean>, t as DictionaryImmutable<of String, Boolean>)
  print x
  print y
  print z
  print t
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.listImmutable([3, 4]);
  let c = system.dictionary([["a", _stdlib.true], ["b", _stdlib.false]]);
  let d = system.dictionaryImmutable([["a", _stdlib.true], ["b", _stdlib.false]]);
  await foo(a, b, c, d);
}

async function foo(x, y, z, t) {
  await system.print(x);
  await system.print(y);
  await system.print(z);
  await system.print(t);
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2]{3, 4}[a:true, b:false]{a:true, b:false}");
  });

  test("Pass_ExternalCall", async () => {
    const code = `${testHeader}

main
  call pause(1)
  print 1
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.pause(1);
  await system.print(1);
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
  print a
  print b
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  let b = "hello";
  await foo(a, b);
}

async function foo(a, b) {
  await system.print(a);
  await system.print(b);
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
  print a
end main

procedure changeFirst(out a as List<of Int>)
    call a.put(0, 5)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([2, 3]);
  let _a0 = [a];
  await changeFirst(_a0);
  a = _a0[0];
  await system.print(a);
}

async function changeFirst(a) {
  a[0].put(0, 5);
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
  print a
  print b
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  await foo(a + 1, "hello");
}

async function foo(a, b) {
  await system.print(a);
  await system.print(b);
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
  print 3
end main

procedure foo()
  print 1
  call bar()
end procedure

procedure bar()
  print 2
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
  await system.print(3);
}

async function foo() {
  await system.print(1);
  await bar();
}
global["foo"] = foo;

async function bar() {
  await system.print(2);
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
  print x * x
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await square(3);
  await square(5);
}

async function square(x) {
  await system.print(x * x);
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
      print a
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
    await system.print(a);
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
      print property.p1 + plus
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
    await system.print(this.p1 + plus);
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

  test("Pass_OutParameters", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  variable b set to "hello"
  call foo(a, b)
  print a
  print b
end main

procedure foo(out x as Float, out y as String)
  set x to 3
  set y to "goodbye"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  let b = "hello";
  let _a0 = [a]; let _b0 = [b];
  await foo(_a0, _b0);
  a = _a0[0]; b = _b0[0];
  await system.print(a);
  await system.print(b);
}

async function foo(x, y) {
  x[0] = 3;
  y[0] = "goodbye";
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
  variable a set to 2
  variable b set to 3
  call foo(a, b)
  print a
  print b
end main

procedure foo(out x as Float, out y as Float)
  variable c set to x
  set x to y
  set y to c
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  let b = 3;
  let _a0 = [a]; let _b0 = [b];
  await foo(_a0, _b0);
  a = _a0[0]; b = _b0[0];
  await system.print(a);
  await system.print(b);
}

async function foo(x, y) {
  let c = x[0];
  x[0] = y[0];
  y[0] = c;
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
  variable a set to 2
  variable b set to 3
  call foo(a, b)
  print a
  print b
end main

procedure foo(out a as Float, out b as Float)
  call bar(a, b)
end procedure

procedure bar(out a as Float, out b as Float)
  variable c set to a
  set a to b
  set b to c
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  let b = 3;
  let _a0 = [a]; let _b0 = [b];
  await foo(_a0, _b0);
  a = _a0[0]; b = _b0[0];
  await system.print(a);
  await system.print(b);
}

async function foo(a, b) {
  let _a1 = [a[0]]; let _b1 = [b[0]];
  await bar(_a1, _b1);
  a[0] = _a1[0]; b[0] = _b1[0];
}
global["foo"] = foo;

async function bar(a, b) {
  let c = a[0];
  a[0] = b[0];
  b[0] = c;
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
  variable a set to new Foo()
  variable b set to 0
  call foo(a, b)
  print b
end main

procedure foo(out f as Foo, out y as Int)
  call f.bar(y)
end procedure

class Foo
  constructor()
  end constructor

  procedure bar(out z as Int)
    set z to 1
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = 0;
  let _a0 = [a]; let _b0 = [b];
  await foo(_a0, _b0);
  a = _a0[0]; b = _b0[0];
  await system.print(b);
}

async function foo(f, y) {
  let _y1 = [y[0]];
  await f[0].bar(_y1);
  y[0] = _y1[0];
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async bar(z) {
    z[0] = 1;
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
  variable a set to new Foo()
  variable b set to 100
  call foo(a, b)
  print b
end main

procedure foo(out f as Foo, out y as Int)
  set y to f.ff + y
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
  let a = system.initialise(await new Foo()._initialise());
  let b = 100;
  let _a0 = [a]; let _b0 = [b];
  await foo(_a0, _b0);
  a = _a0[0]; b = _b0[0];
  await system.print(b);
}

async function foo(f, y) {
  y[0] = f[0].ff + y[0];
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
  variable x set to 1
  call addOne(x)
  print x
  call addOne(x)
  print x
end main

procedure addOne(out n as Int)
  set n to n + 1
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 1;
  let _x0 = [x];
  await addOne(_x0);
  x = _x0[0];
  await system.print(x);
  let _x1 = [x];
  await addOne(_x1);
  x = _x1[0];
  await system.print(x);
}

async function addOne(n) {
  n[0] = n[0] + 1;
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
  variable x set to 1
  call printParameter(x)
end main

procedure printParameter(out n as Int)
  print n
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 1;
  let _x0 = [x];
  await printParameter(_x0);
  x = _x0[0];
}

async function printParameter(n) {
  await system.print(n[0]);
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
  print a
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
  print 1
  call foo()
  print 3
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
  print 1
  call foo(3)
  print 3
end main

procedure foo()
  print 2
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
  print a
  print b
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
  print a
  print b
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
  variable a set to {2, 3}
  call changeAll(a)
  print a
end main

procedure changeAll(a as ListImmutable<of Int>)
    set a to {1, 2, 3}
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
  print a
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
  print a
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

  test("Fail_OperatorsAndProcedures", async () => {
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

  test("Fail_PassLiteralAsOut", async () => {
    const code = `${testHeader}

main
  call foo(0)
end main

procedure foo(out a as Int)
  set a to 1
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
      "Cannot pass '0' as an out parameter.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassExpressionAsOut", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to 2
  call foo(a + b)
end main

procedure foo(out a as Int)
  set a to 1
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
      "Cannot pass 'a + b' as an out parameter.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassConstantAsOut", async () => {
    const code = `${testHeader}

main
  constant a set to 1
  call foo(a)
end main

procedure foo(out a as Int)
  set a to 1
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
      "Cannot pass 'let a' as an out parameter.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassFuncCall", async () => {
    const code = `${testHeader}

main
  call foo(bar())
end main

procedure foo(out a as Int)
  set a to 1
end procedure

function bar() returns Int
  return 0
end function`;

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
      "Cannot pass 'bar()' as an out parameter.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassProperty", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call foo(f.ff)
end main

procedure foo(out a as Int)
  set a to 1
end procedure

class Foo
  constructor()
    set property.ff to 1
  end constructor

  property ff as Int
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
      "Cannot pass 'f.ff' as an out parameter.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassIndex", async () => {
    const code = `${testHeader}

main
  variable f set to [1,2]
  call foo(f[0])
end main

procedure foo(out a as Int)
  set a to 1
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
      "Cannot pass 'f[0]' as an out parameter.LangRef.html#compile_error",
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

  test("Fail_ParameterListOfMutableType", async () => {
    const code = `${testHeader}

procedure p1(a as ListImmutable<of List<of Int>>)
  
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
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
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
