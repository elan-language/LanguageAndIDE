import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
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
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Procedure Statement", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, foo: int) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:
  printNoLine(1) # procedure call
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def foo() -> None: # procedure
  printNoLine(2) # procedure call
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_PassingInListsUsingShortFormTypeNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(1) # procedure call
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  foo(a, b) # procedure call
# end main

def foo(x: list[int], y: list[int]) -> None: # procedure
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  await foo(a, b);
}

async function foo(x, y) {
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2][3, 4]");
  });

  test("Pass_ExternalCall", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  foo(a, b) # procedure call
# end main

def main() -> None:
  sleep_ms(1) # procedure call
  printNoLine(1) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.sleep_ms(1);
  await _stdlib.printNoLine(1);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_WithParamsPassingVariables", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  sleep_ms(1) # procedure call
  printNoLine(1) # procedure call
# end main

def main() -> None:
  a = 2 # variable definition
  b = "hello" # variable definition
  foo(a, b) # procedure call
# end main

def foo(a: float, b: str) -> None: # procedure
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_ReferenceTypesCanBeMutated", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  b = "hello" # variable definition
  foo(a, b) # procedure call
# end main

def main() -> None:
  a = [2, 3] # variable definition
  changeFirst(a) # procedure call
  printNoLine(a) # procedure call
# end main

def changeFirst(a: list[int]) -> None: # procedure
  a[0] = 5 # assignment
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([2, 3]);
  await changeFirst(a);
  await _stdlib.printNoLine(a);
}

async function changeFirst(a) {
  system.safeSet(a, 5, [0]);
}
global["changeFirst"] = changeFirst;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[5, 3]");
  });

  test("Pass_WithParamsPassingLiteralsOrExpressions", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [2, 3] # variable definition
  changeFirst(a) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 1 # variable definition
  foo(a + 1, "hello") # procedure call
# end main

def foo(a: int, b: str) -> None: # procedure
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_NestedCalls", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  foo(a + 1, "hello") # procedure call
# end main

def main() -> None:
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def foo() -> None: # procedure
  printNoLine(1) # procedure call
  bar() # procedure call
# end procedure

def bar() -> None: # procedure
  printNoLine(2) # procedure call
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_RepeatedCallToProcedureWithLiteralArgument", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def bar() -> None: # procedure
  printNoLine(2) # procedure call
# end procedure

def main() -> None:
  square(3) # procedure call
  square(5) # procedure call
# end main

def square(x: int) -> None: # procedure
  printNoLine(x*x) # procedure call
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "925");
  });

  test("Pass_Recursion", async () => {
    const code = `${testPythonHeader}

def bar() -> None: # procedure
  printNoLine(2) # procedure call
# end procedure

def square(x: int) -> None: # procedure
  printNoLine(x*x) # procedure call
# end procedure

def main() -> None:
  foo(3) # procedure call
# end main

def foo(a: int) -> None: # procedure
  if a > 0:
    printNoLine(a) # procedure call
    b = a - 1 # variable definition
    foo(b) # procedure call
  # end if
# end procedure

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "321");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureViaProperty", async () => {
    const code = `${testPythonHeader}

def square(x: int) -> None: # procedure
  printNoLine(x*x) # procedure call
# end procedure

def foo(a: int) -> None: # procedure
  if a > 0:
    printNoLine(a) # procedure call
    b = a - 1 # variable definition
    foo(b) # procedure call
  # end if
# end procedure

def main() -> None:
  f = Foo() # variable definition
  f.length() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  p1: Bar # property

  def length(self: Foo) -> None: # procedure method
    p1 = self.p1 # variable definition
    p1.length(2) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def length(self: Bar, plus: float) -> None: # procedure method
    printNoLine(self.p1 + plus) # procedure call
  # end procedure method

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

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

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async length() {
    let p1 = this.p1;
    await p1.length(2);
  }

  async toString() {
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

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_RefParameters", async () => {
    const code = `${testPythonHeader}

def foo(a: int) -> None: # procedure
  if a > 0:
    printNoLine(a) # procedure call
    b = a - 1 # variable definition
    foo(b) # procedure call
  # end if
# end procedure

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  p1: Bar # property

  def length(self: Foo) -> None: # procedure method
    p1 = self.p1 # variable definition
    p1.length(2) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  a = AsRef[int](2) # variable definition
  b = AsRef[str]("hello") # variable definition
  foo(a, b) # procedure call
  printNoLine(a.value()) # procedure call
  printNoLine(b.value()) # procedure call
# end main

def foo(x: AsRef[float], y: AsRef[str]) -> None: # procedure
  x.put(3) # procedure call
  y.put("goodbye") # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.AsRef()._initialise(2));
  let b = system.initialise(await new _stdlib.AsRef()._initialise("hello"));
  await foo(a, b);
  await _stdlib.printNoLine(a.value());
  await _stdlib.printNoLine(b.value());
}

async function foo(x, y) {
  x.put(3);
  y.put("goodbye");
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "3goodbye");
  });

  test("Pass_SetFromOutParameters", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  p1: Bar # property

  def length(self: Foo) -> None: # procedure method
    p1 = self.p1 # variable definition
    p1.length(2) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def foo(x: AsRef[float], y: AsRef[str]) -> None: # procedure
  x.put(3) # procedure call
  y.put("goodbye") # procedure call
# end procedure

def main() -> None:
  a = AsRef[float](2) # variable definition
  b = AsRef[float](3) # variable definition
  foo(a, b) # procedure call
  printNoLine(a.value()) # procedure call
  printNoLine(b.value()) # procedure call
# end main

def foo(x: AsRef[float], y: AsRef[float]) -> None: # procedure
  c = x.value() # variable definition
  x.put(y.value()) # procedure call
  y.put(c) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.AsRef()._initialise(2));
  let b = system.initialise(await new _stdlib.AsRef()._initialise(3));
  await foo(a, b);
  await _stdlib.printNoLine(a.value());
  await _stdlib.printNoLine(b.value());
}

async function foo(x, y) {
  let c = x.value();
  x.put(y.value());
  y.put(c);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_NestedOutParameters", async () => {
    const code = `${testPythonHeader}

def foo(x: AsRef[float], y: AsRef[str]) -> None: # procedure
  x.put(3) # procedure call
  y.put("goodbye") # procedure call
# end procedure

def foo(x: AsRef[float], y: AsRef[float]) -> None: # procedure
  c = x.value() # variable definition
  x.put(y.value()) # procedure call
  y.put(c) # procedure call
# end procedure

def main() -> None:
  a = AsRef[float](2) # variable definition
  b = AsRef[float](3) # variable definition
  foo(a, b) # procedure call
  printNoLine(a.value()) # procedure call
  printNoLine(b.value()) # procedure call
# end main

def foo(a: AsRef[float], b: AsRef[float]) -> None: # procedure
  bar(a, b) # procedure call
# end procedure

def bar(a: AsRef[float], b: AsRef[float]) -> None: # procedure
  c = a.value() # variable definition
  a.put(b.value()) # procedure call
  b.put(c) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.AsRef()._initialise(2));
  let b = system.initialise(await new _stdlib.AsRef()._initialise(3));
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
  a.put(b.value());
  b.put(c);
}
global["bar"] = bar;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_CallOnOutParameters", async () => {
    const code = `${testPythonHeader}

def foo(x: AsRef[float], y: AsRef[float]) -> None: # procedure
  c = x.value() # variable definition
  x.put(y.value()) # procedure call
  y.put(c) # procedure call
# end procedure

def foo(a: AsRef[float], b: AsRef[float]) -> None: # procedure
  bar(a, b) # procedure call
# end procedure

def main() -> None:
  a = AsRef[Foo](Foo()) # variable definition
  b = AsRef[int](0) # variable definition
  foo(a, b) # procedure call
  printNoLine(b.value()) # procedure call
# end main

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  ff = f.value() # variable definition
  ff.bar(y) # procedure call
# end procedure

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def bar(self: Foo, z: AsRef[int]) -> None: # procedure method
    z.put(1) # procedure call
  # end procedure method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.AsRef()._initialise(system.initialise(await new Foo()._initialise())));
  let b = system.initialise(await new _stdlib.AsRef()._initialise(0));
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

  async toString() {
    return "";
  }

  async bar(z) {
    z.put(1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ExpressionOnOutParameters", async () => {
    const code = `${testPythonHeader}

def foo(a: AsRef[float], b: AsRef[float]) -> None: # procedure
  bar(a, b) # procedure call
# end procedure

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  ff = f.value() # variable definition
  ff.bar(y) # procedure call
# end procedure

def main() -> None:
  a = AsRef[Foo](Foo()) # variable definition
  b = AsRef[int](100) # variable definition
  foo(a, b) # procedure call
  printNoLine(b.value()) # procedure call
# end main

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  y.put(f.value().ff + y.value()) # procedure call
# end procedure

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.ff = 1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  ff: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.AsRef()._initialise(system.initialise(await new Foo()._initialise())));
  let b = system.initialise(await new _stdlib.AsRef()._initialise(100));
  await foo(a, b);
  await _stdlib.printNoLine(b.value());
}

async function foo(f, y) {
  y.put(f.value().ff + y.value());
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["ff", 0]]);};

  async _initialise() {
    this.ff = 1;
    return this;
  }

  async toString() {
    return "";
  }

  ff = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "101");
  });

  test("Pass_MultipleCallsWithOutParameters", async () => {
    const code = `${testPythonHeader}

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  ff = f.value() # variable definition
  ff.bar(y) # procedure call
# end procedure

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  y.put(f.value().ff + y.value()) # procedure call
# end procedure

def main() -> None:
  x = AsRef[int](1) # variable definition
  addOne(x) # procedure call
  printNoLine(x.value()) # procedure call
  addOne(x) # procedure call
  printNoLine(x.value()) # procedure call
# end main

def addOne(n: AsRef[int]) -> None: # procedure
  n.put(n.value() + 1) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new _stdlib.AsRef()._initialise(1));
  await addOne(x);
  await _stdlib.printNoLine(x.value());
  await addOne(x);
  await _stdlib.printNoLine(x.value());
}

async function addOne(n) {
  n.put(n.value() + 1);
}
global["addOne"] = addOne;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "23");
  });

  test("Pass_PrintOutParameter", async () => {
    const code = `${testPythonHeader}

def foo(f: AsRef[Foo], y: AsRef[int]) -> None: # procedure
  y.put(f.value().ff + y.value()) # procedure call
# end procedure

def addOne(n: AsRef[int]) -> None: # procedure
  n.put(n.value() + 1) # procedure call
# end procedure

def main() -> None:
  x = AsRef[int](1) # variable definition
  printParameter(x) # procedure call
# end main

def printParameter(n: AsRef[int]) -> None: # procedure
  printNoLine(n.value()) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new _stdlib.AsRef()._initialise(1));
  await printParameter(x);
}

async function printParameter(n) {
  await _stdlib.printNoLine(n.value());
}
global["printParameter"] = printParameter;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_CallingUndeclaredProc", async () => {
    const code = `${testPythonHeader}

def addOne(n: AsRef[int]) -> None: # procedure
  n.put(n.value() + 1) # procedure call
# end procedure

def printParameter(n: AsRef[int]) -> None: # procedure
  printNoLine(n.value()) # procedure call
# end procedure

def main() -> None:
  bar() # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_TypeSpecifiedBeforeParamName", async () => {
    const code = `${testPythonHeader}

def printParameter(n: AsRef[int]) -> None: # procedure
  printNoLine(n.value()) # procedure call
# end procedure

def main() -> None:

# end main

def foo(Int a) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotCallMain", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  printNoLine(1) # procedure call
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def foo() -> None: # procedure
  main() # procedure call
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'main' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_PassingUnnecessaryParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(1) # procedure call
  foo() # procedure call
  printNoLine(3) # procedure call
# end main

def main() -> None:
  printNoLine(1) # procedure call
  foo(3) # procedure call
  printNoLine(3) # procedure call
# end main

def foo() -> None: # procedure
  printNoLine(2) # procedure call
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PassingTooFewParams", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(1) # procedure call
  foo(3) # procedure call
  printNoLine(3) # procedure call
# end main

def main() -> None:
  a = 1 # variable definition
  foo(a + 1) # procedure call
# end main

def foo(a: int, b: str) -> None: # procedure
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: a (Int), b (String).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  foo(a + 1) # procedure call
# end main

def main() -> None:
  a = [1] # variable definition
  a.append() # procedure call
  a.append(1, 2) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: value (Int).ErrorMessages.html#compile_error",
      "Too many argument(s). Expected: value (Int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PassingWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1] # variable definition
  a.append() # procedure call
  a.append(1, 2) # procedure call
# end main

def main() -> None:
  foo(1, 2) # procedure call
# end main

def foo(a: int, b: str) -> None: # procedure
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: a (Int), b (String), Provided: Int, Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UnterminatedRecursion", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo(1, 2) # procedure call
# end main

def main() -> None:
  foo(3) # procedure call
# end main

def foo(a: int) -> None: # procedure
  foo(a) # procedure call
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Maximum call stack size exceeded");
  });

  test("Fail_CannotCallPrintAsAProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo(3) # procedure call
# end main

def main() -> None:
  printNoLine(""Hello World!"") # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterCount", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(""Hello World!"") # procedure call
# end main

def f(p: float) -> None: # procedure

# end procedure

def main() -> None:
  f(1, 2) # procedure call
  f() # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: p (Float).ErrorMessages.html#compile_error",
      "Missing argument(s). Expected: p (Float).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `${testPythonHeader}

def f(p: float) -> None: # procedure

# end procedure

def f(p: int) -> None: # procedure

# end procedure

def main() -> None:
  f(True) # procedure call
  f(1.0) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: p (Int), Provided: Boolean.ErrorMessages.html#compile_error",
      "Argument types. Expected: p (Int), Provided: Float.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ReferenceTypeParamMayNotBeReassigned", async () => {
    const code = `${testPythonHeader}

def f(p: int) -> None: # procedure

# end procedure

def main() -> None:
  a = [2, 3] # variable definition
  changeAll(a) # procedure call
  printNoLine(a) # procedure call
# end main

def changeAll(a: list[int]) -> None: # procedure
  a = [1, 2, 3] # assignment
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not reassign the parameter 'a'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fai_ListParamMayNotBeReassigned", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [2, 3] # variable definition
  changeAll(a) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [2, 3] # variable definition
  changeAll(a) # procedure call
  printNoLine(a) # procedure call
# end main

def changeAll(a: list[int]) -> None: # procedure
  a = [1, 2, 3] # assignment
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not reassign the parameter 'a'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ValueTypeParamMayNotBeReassigned", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [2, 3] # variable definition
  changeAll(a) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 4 # variable definition
  changeValue(a) # procedure call
  printNoLine(a) # procedure call
# end main

def changeValue(a: int) -> None: # procedure
  a = 3 # assignment
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not reassign the parameter 'a'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 4 # variable definition
  changeValue(a) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:

# end main

def changeValue(a: Bar) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def if_() -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def break(a: int) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });
  test("Fail_UseOfLangTypeAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def float(a: int) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'float' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def fun(if as Int) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedwordAsParamName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def fun(break: int) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def foo() -> None: # procedure

# end procedure

def foo() -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'foo' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testPythonHeader}

def foo() -> None: # procedure

# end procedure

def foo(a: int, b: str, a: int) -> None: # procedure

# end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  ignore_test("Fail_OperatorsAndProcedures", async () => {
    const code = `${testPythonHeader}

def foo(a: int, b: str, a: int) -> None: # procedure

# end procedure

def main() -> None:
  a = p2.equals(p2) # variable definition
  b = p1 + p2 # variable definition
  c = -p1 # variable definition
# end main

def p1() -> None: # procedure

# end procedure

def p2() -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
      "Incompatible types. Expected: Float or Int, Provided: Procedure ().ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Procedure ().ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_ProcedureInExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = p2.equals(p2) # variable definition
  b = p1 + p2 # variable definition
  c = -p1 # variable definition
# end main

def p2() -> None: # procedure

# end procedure

def main() -> None:
  a = [1, 2] # variable definition
  a = a.append(3) # assignment
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot call procedure 'append' within an expression.ErrorMessages.html#compile_error",
      "Incompatible types. Expected: List<of Int>, Provided: Procedure (Int).ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_IncorrectScope", async () => {
    const code = `${testPythonHeader}

def p2() -> None: # procedure

# end procedure

def main() -> None:
  f = Foo() # variable definition
  f.bar() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

def bar() -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'bar' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.bar() # procedure call
# end main

def bar() -> None: # procedure

# end procedure

def main() -> None:
  s = "hello" # variable definition
  s.reverse() # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'reverse' is not defined for type 'String'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_onUndefined", async () => {
    const code = `${testPythonHeader}

def bar() -> None: # procedure

# end procedure

def main() -> None:
  s.reverse() # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'s' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s.reverse() # procedure call
# end main

def foo(foo: int) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testPythonHeader}

def foo(foo: int) -> None: # procedure

# end procedure

def foo(a: int, foo: int) -> None: # procedure

# end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });
});
