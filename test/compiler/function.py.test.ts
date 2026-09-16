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
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Function", () => {
  test("Pass_SimpleCase", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, foo: int) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  printNoLine(foo(3, 4)) # procedure call
# end main

def foo(a: float, b: float) -> float: # function
  return a*b
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return a * b;
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_IndexResult", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(foo(3, 4)) # procedure call
# end main

def main() -> None:
  a = foo(1, 2)[0] # variable definition
  printNoLine(a) # procedure call
# end main

def foo(a: int, b: int) -> list[int]: # function
  return [a, b]
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.safeIndex((await global.foo(1, 2)), 0);
  await _stdlib.printNoLine(a);
}

async function foo(a, b) {
  return system.list([a, b]);
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

  test("Pass_RangeResult", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = foo(1, 2)[0] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = foo(1, 2).subList(0, 1) # variable definition
  printNoLine(a) # procedure call
# end main

def foo(a: int, b: int) -> list[int]: # function
  return [a, b]
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await global.foo(1, 2)).subList(0, 1);
  await _stdlib.printNoLine(a);
}

async function foo(a, b) {
  return system.list([a, b]);
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
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Pass_ReturnCollectionDefault", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = foo(1, 2).subList(0, 1) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  printNoLine(foo(3, 4)) # procedure call
# end main

def foo(a: int, b: int) -> list[int]: # function
  return list[int]()
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return system.initialise(await new _stdlib.List()._initialise());
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_Recursive", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(foo(3, 4)) # procedure call
# end main

def main() -> None:
  printNoLine(factorial(5)) # procedure call
# end main

def factorial(a: int) -> int: # function
  result = 0 # variable definition
  if a > 2:
    result = a*factorial(a - 1) # assignment
  else:
    result = a # assignment
  # end if
  return result
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.factorial(5)));
}

async function factorial(a) {
  let result = 0;
  if (a > 2) {
    result = a * (await global.factorial(a - 1));
  } else {
    result = a;
  }
  return result;
}
global["factorial"] = factorial;
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
    await assertObjectCodeExecutes(fileImpl, "120");
  });

  test("Pass_GlobalFunctionOnClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(factorial(5)) # procedure call
# end main

def main() -> None:
  b = Bar() # variable definition
  printNoLine(foo(b)) # procedure call
# end main

def foo(bar: Bar) -> str: # function
  return bar.toString()
# end function

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "bar"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await global.foo(b)));
}

async function foo(bar) {
  return (await bar.toString());
}
global["foo"] = foo;

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "bar";
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
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  test("Fail_LibraryClassParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = Bar() # variable definition
  printNoLine(foo(b)) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "bar"
  # end function method

# end class

def main() -> None:
  b = new library.List<of Int>() # variable definition
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

  test("Fail_ExtensionParameterCount", async () => {
    const code = `${testPythonHeader}

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "bar"
  # end function method

# end class

a = "" # constant

def main() -> None:
  b = a.contains() # variable definition
  c = a.contains("a", 1, 2) # variable definition
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
      "Missing argument(s). Expected: item (String).ErrorMessages.html#compile_error",
      "Too many argument(s). Expected: item (String).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterCount", async () => {
    const code = `${testPythonHeader}

a = "" # constant

def f(p: float) -> float: # function
  return 0
# end function

def main() -> None:
  a = f(1, 2) # variable definition
  b = f() # variable definition
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

def f(p: float) -> float: # function
  return 0
# end function

def f(p: int) -> float: # function
  return 0.0
# end function

def main() -> None:
  a = f(True) # variable definition
  b = f(1.0) # variable definition
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

  test("Fail_ReturnType", async () => {
    const code = `${testPythonHeader}

def f(p: int) -> float: # function
  return 0.0
# end function

def f(p: bool) -> int: # function
  return p
# end function

def main() -> None:
  a = f(True) # variable definition
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
      "Incompatible types. Expected: Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_noReturnType", async () => {
    const code = `${testPythonHeader}

def f(p: bool) -> int: # function
  return p
# end function

def f(p: int) -> : # function
  return 
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

  test("Fail_noAs", async () => {
    const code = `${testPythonHeader}

def f(p: int) -> : # function
  return 
# end function

def f(p Int) -> : # function
  return 
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

  test("Fail_noReturn", async () => {
    const code = `${testPythonHeader}

def f(p Int) -> : # function
  return 
# end function

def f(p Int) -> : # function
  return 
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

  test("Fail_ReturnTypeIncompatible", async () => {
    const code = `${testPythonHeader}

def f(p Int) -> : # function
  return 
# end function

def main() -> None:
  a = "" # variable definition
  a = foo(3, 4) # assignment
# end main

def foo(a: int, b: int) -> int: # function
  c = a*b # variable definition
  return c
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
      "Incompatible types. Expected: String, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_NoReturn2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "" # variable definition
  a = foo(3, 4) # assignment
# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> int: # function
  c = a*b # variable definition
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_embeddedReturns", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> bool: # function
  if 2 > 1:

  # end if
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_nonMatchingReturn2", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> int: # function
  return a/b
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
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_statementAfterReturn", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> int: # function
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainPrint", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> int: # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainInput", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(a: int, b: int) -> int: # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotModifyParam", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
  a = 1 # assignment
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
      "May not mutate a parameter within a function or constructor.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotModifyParam1", async () => {
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
  a = a + 1 # assignment
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
      "May not mutate a parameter within a function or constructor.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotUpdateList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:

# end main

def foo(a: list[int]) -> int: # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPassInListMultipleParameters", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def foo(b: int, a: list[int]) -> int: # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TooManyParams", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  result = foo(3, 4, 5) # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
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
      "Too many argument(s). Expected: a (Int), b (Int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotEnoughParams", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3, 4, 5) # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:
  result = foo(3) # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
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
      "Missing argument(s). Expected: a (Int), b (Int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_WrongParamType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3) # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:
  result = foo(3, "b") # variable definition
  printNoLine(result) # procedure call
# end main

def foo(a: int, b: int) -> int: # function
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
      "Argument types. Expected: a (Int), b (Int), Provided: Int, String.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PassMutableTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3, "b") # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:

# end main

def foo(a: list[int], b: Dictionary[str, int], c: Foo) -> int: # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def changeValue(a: Bar) -> int: # function
  return 0
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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def changeValue(a: int) -> Bar: # function
  return 0
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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def if_() -> : # function
  return 
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
    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def break(a: int) -> int: # function
  return 0
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
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def fun(if as Int) -> : # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedWordAsParamName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def fun(break: int) -> int: # function
  return 0
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
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def foo() -> int: # function
  return 0
# end function

def foo() -> int: # function
  return 1
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
      "Name 'foo' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testPythonHeader}

def foo() -> int: # function
  return 0
# end function

def foo(a: int, b: str, a: int) -> int: # function
  return 0
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_OutOnParameter", async () => {
    const code = `${testPythonHeader}

def foo(a: int, b: str, a: int) -> int: # function
  return 0
# end function

def foo(out a as Int) -> : # function
  return 
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

  test("Fail_OperatorsAndProceduresWithFunctionKeyword2", async () => {
    const code = `${testPythonHeader}

def foo(out a as Int) -> : # function
  return 
# end function

def main() -> None:
  b = p1 + p2 # variable definition
# end main

def p1() -> int: # function
  return 0
# end function

def p2() -> int: # function
  return 0
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes no parameters - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = p1 + p2 # variable definition
# end main

def p2() -> int: # function
  return 0
# end function

def main() -> None:
  c = -p1 # variable definition
# end main

def p1() -> int: # function
  return 0
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes no parameters - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword4", async () => {
    const code = `${testPythonHeader}

def p2() -> int: # function
  return 0
# end function

def p1() -> int: # function
  return 0
# end function

def main() -> None:
  d = p1 # variable definition
  d = p3 # assignment
# end main

def p1() -> int: # function
  return 0
# end function

def p3(a: int) -> float: # function
  return 0
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
      "To evaluate a function in an expression it must have brackets and arguments for required parameters.ErrorMessages.html#compile_error",
    ]);
  });

  ignore_test("Fail_OperatorsAndProcedures1", async () => {
    const code = `${testPythonHeader}

def p1() -> int: # function
  return 0
# end function

def p1() -> int: # function
  return 0
# end function

def main() -> None:
  a = p1.equals(p2) # variable definition
# end main

def p1() -> int: # function
  return 0
# end function

def p2() -> int: # function
  return 0
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
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
    ]);
  });

  test("Fail_OperatorsAndProcedures2", async () => {
    const code = `${testPythonHeader}

def p1() -> int: # function
  return 0
# end function

def p1() -> int: # function
  return 0
# end function

def main() -> None:
  b = p1 + p2 # variable definition
# end main

def p1() -> int: # function
  return 0
# end function

def p2() -> int: # function
  return 0
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes no parameters - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProcedures3", async () => {
    const code = `${testPythonHeader}

def p1() -> int: # function
  return 0
# end function

def p1() -> int: # function
  return 0
# end function

def main() -> None:
  c = -p1 # variable definition
# end main

def p1() -> int: # function
  return 0
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes no parameters - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AssignFunction", async () => {
    const code = `${testPythonHeader}

def p1() -> int: # function
  return 0
# end function

def p1() -> int: # function
  return 0
# end function

def main() -> None:
  foo = a # variable definition
# end main

def a() -> int: # function
  return 0
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
      "To evaluate a function in an expression it must have brackets and arguments for required parameters.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def p1() -> int: # function
  return 0
# end function

def a() -> int: # function
  return 0
# end function

def main() -> None:
  printNoLine(a.b) # procedure call
# end main

def a() -> int: # function
  return 0
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
      "'b' is not defined for type 'function that takes no parameters - returning a Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def a() -> int: # function
  return 0
# end function

def a() -> int: # function
  return 0
# end function

def main() -> None:
  g = "xxx" # variable definition
  g2 = g.length # variable definition
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
      "Library or class function 'length' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_LibFunctionWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def a() -> int: # function
  return 0
# end function

def main() -> None:
  printNoLine(abs.b) # procedure call
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
      "Library or class function 'abs' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_PrintLibFunctionWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(abs.b) # procedure call
# end main

def main() -> None:
  printNoLine(abs) # procedure call
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
      "Library or class function 'abs' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_NoIndexing", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(abs) # procedure call
# end main

def main() -> None:
  a = p1() # variable definition
# end main

def p1() -> int: # function
  a = [1, 2] # variable definition
  a[0] = 2 # assignment
  return a[0]
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

    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot set an indexed value within a function. Use .withPut... functionErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = p1() # variable definition
# end main

def main() -> None:
  s = "hello" # variable definition
  s1 = s.asBinary() # variable definition
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
      "'asBinary' is not defined for type 'String'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s = "hello" # variable definition
  s1 = s.asBinary() # variable definition
# end main

def main() -> None:
  s = "hello" # variable definition
  s1 = s.reverse() # variable definition
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

def main() -> None:
  s = "hello" # variable definition
  s1 = s.reverse() # variable definition
# end main

def main() -> None:
  a = s.reverse() # variable definition
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

  test("Fail_standaloneLibFunctionAsExtension", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = s.reverse() # variable definition
# end main

def main() -> None:
  x = 3 # variable definition
  printNoLine(x.bitShiftL(x, 2)) # procedure call
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
      "'bitShiftL' is not defined for type 'Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_standaloneFunctionAsExtension", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 3 # variable definition
  printNoLine(x.bitShiftL(x, 2)) # procedure call
# end main

def main() -> None:
  x = 3 # variable definition
  printNoLine(x.foo(x)) # procedure call
# end main

def foo(x: int) -> int: # function
  return x
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
      "'foo' is not defined for type 'Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_LibraryClassParameter2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 3 # variable definition
  printNoLine(x.foo(x)) # procedure call
# end main

def main() -> None:
  b = list() # variable definition
  printNoLine(foo(b)) # procedure call
# end main

def foo(bar as library.List<of Int>) -> : # function
  return 
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
    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = list() # variable definition
  printNoLine(foo(b)) # procedure call
# end main

def foo(foo: int) -> str: # function
  return ""
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
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testPythonHeader}

def foo(foo: int) -> str: # function
  return ""
# end function

def foo(a: int, foo: int) -> str: # function
  return ""
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });
});
