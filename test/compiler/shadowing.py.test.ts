import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Shadowing", () => {
  test("Pass_LocalVariableShadowsLibConstant", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = HashSet[Foo]() # variable definition
# end main

def main() -> None:
  pi = 4 # variable definition
  printNoLine(pi) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let pi = 4;
  await _stdlib.printNoLine(pi);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_LocalVariableFromGlobalConstant", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  pi = 4 # variable definition
  printNoLine(pi) # procedure call
# end main

f = 1 # constant

def main() -> None:
  f = 2 # variable definition
  printNoLine(f) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  f = 1;

};
async function main() {
  let f = 2;
  await _stdlib.printNoLine(f);
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_GlobalAndInstanceFunctionsShadowGlobals", async () => {
    const code = `${testPythonHeader}

f = 1 # constant

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.sin(1)) # procedure call
  printNoLine(sin(1)) # procedure call
# end main

def sin(x: float) -> float: # function
  return 111
# end function

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def sin(self: Foo, x: float) -> float: # function method
    return 222
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.sin(1)));
  await _stdlib.printNoLine((await global.sin(1)));
}

async function sin(x) {
  return 111;
}
global["sin"] = sin;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async sin(x) {
    return 222;
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
    await assertObjectCodeExecutes(fileImpl, "222111");
  });

  test("Pass_DisambiguateLibProcedureFromLocalAndInstanceProcedures", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.sin(1)) # procedure call
  printNoLine(sin(1)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def sin(self: Foo, x: float) -> float: # function method
    return 222
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  f.sleep_ms(1) # procedure call
  sleep_ms(1) # procedure call
# end main

def sleep_ms(x: float) -> None: # procedure
  printNoLine(111) # procedure call
# end procedure

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def sleep_ms(self: Foo, x: float) -> None: # procedure method
    printNoLine(222) # procedure call
  # end procedure method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.sleep_ms(1);
  await sleep_ms(1);
}

async function sleep_ms(x) {
  await _stdlib.printNoLine(111);
}
global["sleep_ms"] = sleep_ms;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async sleep_ms(x) {
    await _stdlib.printNoLine(222);
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
    await assertObjectCodeExecutes(fileImpl, "222111");
  });

  test("Pass_Can'tDisambiguateGlobalFunctionFromLocalVar", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def sin(self: Foo, x: float) -> float: # function method
    return 222
  # end function method

# end class

def sleep_ms(x: float) -> None: # procedure
  printNoLine(111) # procedure call
# end procedure

def main() -> None:
  sin = 2 # variable definition
  printNoLine(sin) # procedure call
  printNoLine(sin(1)) # procedure call
# end main

def sin(x: float) -> float: # function
  return 111
# end function

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
      "Cannot invoke identifier 'sin' as a method.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_LocalVarShadowsGlobalFunction", async () => {
    const code = `${testPythonHeader}

def sleep_ms(x: float) -> None: # procedure
  printNoLine(111) # procedure call
# end procedure

def sin(x: float) -> float: # function
  return 111
# end function

def main() -> None:
  add2 = add2(1) # variable definition
  printNoLine(add2) # procedure call
# end main

def add2(x: float) -> float: # function
  return x + 2
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let add2 = (await global.add2(1));
  await _stdlib.printNoLine(add2);
}

async function add2(x) {
  return x + 2;
}
global["add2"] = add2;
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_LocalShadowsConstant", async () => {
    const code = `${testPythonHeader}

def sin(x: float) -> float: # function
  return 111
# end function

def add2(x: float) -> float: # function
  return x + 2
# end function

a = 4 # constant

def main() -> None:
  a = 3 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 4;

};
async function main() {
  let a = 3;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_IdShadowsFunction", async () => {
    const code = `${testPythonHeader}

def add2(x: float) -> float: # function
  return x + 2
# end function

def main() -> None:
  a = 3 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  printNoLine(foo()) # procedure call
# end main

def foo() -> int: # function
  return 1
# end function

def bar() -> int: # function
  foo = foo() # variable definition
  return foo
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.foo()));
}

async function foo() {
  return 1;
}
global["foo"] = foo;

async function bar() {
  let foo = (await global.foo());
  return foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_IdShadowsProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  printNoLine(a) # procedure call
# end main

def foo() -> int: # function
  return 1
# end function

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  printNoLine(1) # procedure call
# end procedure

def bar() -> int: # function
  foo = 1 # variable definition
  return foo
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  await _stdlib.printNoLine(1);
}
global["foo"] = foo;

async function bar() {
  let foo = 1;
  return foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_IdShadowsParameter", async () => {
    const code = `${testPythonHeader}

def foo() -> int: # function
  return 1
# end function

def foo() -> None: # procedure
  printNoLine(1) # procedure call
# end procedure

def main() -> None:
  foo(1) # procedure call
# end main

def foo(a: int) -> None: # procedure
  a = a # variable definition
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
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IdShadowsVariable", async () => {
    const code = `${testPythonHeader}

def foo() -> None: # procedure
  printNoLine(1) # procedure call
# end procedure

def foo(a: int) -> None: # procedure
  a = a # variable definition
# end procedure

def main() -> None:
  a = 1 # variable definition
  a = 2 # variable definition
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
      "The identifier 'a' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_ParameterShadowsConst", async () => {
    const code = `${testPythonHeader}

def foo(a: int) -> None: # procedure
  a = a # variable definition
# end procedure

x = 1 # constant

def main() -> None:
  printNoLine(foo(1)) # procedure call
# end main

def foo(x: int) -> int: # function
  return x
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  x = 1;

};
async function main() {
  await _stdlib.printNoLine((await global.foo(1)));
}

async function foo(x) {
  return x;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_global", async () => {
    const code = `${testPythonHeader}

x = 1 # constant

def foo(x: int) -> int: # function
  return x
# end function
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

  test("Fail_ShadowParameter1", async () => {
    const code = `${testPythonHeader}

def foo(x: int) -> int: # function
  return x
# end function

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
  a = 1 # variable definition
  return a*b
# end function

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
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ShadowParameter2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
  a = 1 # variable definition
  return a*b
# end function

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
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });
});
