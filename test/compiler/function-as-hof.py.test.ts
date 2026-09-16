import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Function as HOF", () => {
  test("Pass_PassAsParam", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  ids = 10 # variable definition
  for id in range(0, id + 1):
    printNoLine(id) # procedure call
  # end for
  printNoLine(ids) # procedure call
# end main

def main() -> None:
  printModified(3, twice) # procedure call
# end main

def printModified(i: float, f: Callable[[float]float]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def twice(x: float) -> float: # function
  return x*2
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(3, global.twice);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  // no longer supported
  ignore_test("Pass_PassAsParam1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(3, twice) # procedure call
# end main

def twice(x: float) -> float: # function
  return x*2
# end function

def main() -> None:
  printModified(3, twice) # procedure call
# end main

def printModified(i as Float, f as Func<of => Float>) -> None: # procedure

# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(3, global.twice);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f()));
}
global["printModified"] = printModified;

async function twice() {
  return 2;
}
global["twice"] = twice;
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

  test("Pass_PassAsParam2", async () => {
    const code = `${testPythonHeader}

def twice(x: float) -> float: # function
  return x*2
# end function

def printModified(i as Float, f as Func<of => Float>) -> None: # procedure

# end procedure

def main() -> None:
  printIt("Hello", "e", find) # procedure call
# end main

def printIt(s: str, c: str, f: Callable[[str, str]int]) -> None: # procedure
  printNoLine(f(s, c)) # procedure call
# end procedure

def find(x: str, y: str) -> int: # function
  return x.indexOf(y)
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printIt("Hello", "e", global.find);
}

async function printIt(s, c, f) {
  await _stdlib.printNoLine((await f(s, c)));
}
global["printIt"] = printIt;

async function find(x, y) {
  return _stdlib.indexOf(x, y);
}
global["find"] = find;
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

  test("Fail_ReturnAFunction", async () => {
    const code = `${testPythonHeader}

def printModified(i as Float, f as Func<of => Float>) -> None: # procedure

# end procedure

def printIt(s: str, c: str, f: Callable[[str, str]int]) -> None: # procedure
  printNoLine(f(s, c)) # procedure call
# end procedure

def main() -> None:
  f = getFunc() # variable definition
  printNoLine(f(5)) # procedure call
# end main

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def twice(x: float) -> float: # function
  return x*2
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = (await global.getFunc());
  await _stdlib.printNoLine((await f(5)));
}

async function getFunc() {
  return global.twice;
}
global["getFunc"] = getFunc;

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
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
  });

  test("Fail_SetAsVariable", async () => {
    const code = `${testPythonHeader}

def printIt(s: str, c: str, f: Callable[[str, str]int]) -> None: # procedure
  printNoLine(f(s, c)) # procedure call
# end procedure

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def main() -> None:
  f = twice # variable definition
  printNoLine(f(5)) # procedure call
# end main

def twice(x: float) -> float: # function
  return x*2
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

  test("Pass_SetAsProperty", async () => {
    const code = `${testPythonHeader}

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def twice(x: float) -> float: # function
  return x*2
# end function

def main() -> None:
  f = Foo(ff) # variable definition
  printNoLine(f.pf(5)) # procedure call
# end main

def ff(a: int) -> int: # function
  return a
# end function

class Foo: # concrete class

  def __init__(self: Foo, f: Callable[[int]int]) -> None:
    self.pf = f # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  pf: Callable[[int]int] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise(global.ff));
  await _stdlib.printNoLine((await f.pf(5)));
}

async function ff(a) {
  return a;
}
global["ff"] = ff;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["pf", system.emptyFunc(0)]]);};

  async _initialise(f) {
    this.pf = f;
    return this;
  }

  async toString() {
    return "";
  }

  pf = system.emptyFunc(0);

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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_Print", async () => {
    const code = `${testPythonHeader}

def twice(x: float) -> float: # function
  return x*2
# end function

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  printNoLine(ff) # procedure call
# end main

def ff(a: int) -> int: # function
  return a
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(global.ff);
}

async function ff(a) {
  return a;
}
global["ff"] = ff;
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
    await assertObjectCodeExecutes(fileImpl, "function ff");
  });

  test("Fail_SetAsVariableWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def ff(a: int) -> int: # function
  return a
# end function

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  f = twice # variable definition
  printNoLine(f(5)) # procedure call
# end main

def twice(x: float) -> float: # function
  return x*2
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

  test("Fail_FunctionSignatureDoesntMatch1", async () => {
    const code = `${testPythonHeader}

def ff(a: int) -> int: # function
  return a
# end function

def twice(x: float) -> float: # function
  return x*2
# end function

def main() -> None:
  printModified(3, pow2) # procedure call
# end main

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def pow2(x: int, y: int) -> int: # function
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
      "Argument types. Expected: i (Int), f (function that takes parameter - Int - returning a Int), Provided: Int, function that takes parameters - Int, Int - returning a Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionSignatureDoesntMatch2", async () => {
    const code = `${testPythonHeader}

def twice(x: float) -> float: # function
  return x*2
# end function

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  printModified(3, pow) # procedure call
# end main

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def pow(x: int) -> str: # function
  return "one"
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
      "Argument types. Expected: i (Int), f (function that takes parameter - Int - returning a Int), Provided: Int, function that takes parameter - Int - returning a String.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UsingReturnedFuncWithoutArgs", async () => {
    const code = `${testPythonHeader}

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  a = getFunc() # variable definition
  printNoLine(a()) # procedure call
# end main

def getFunc() -> Callable[[int]int]: # function
  return twice
# end function

def twice(x: int) -> int: # function
  return x*2
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

  test("Pass_PassAsParamWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def getFunc() -> Callable[[int]int]: # function
  return twice
# end function

def main() -> None:
  printModified(3, twice) # procedure call
# end main

def printModified(i: float, f: Callable[[float]float]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def twice(x: float) -> float: # function
  return x*2
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(3, global.twice);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Fail_ReturnAFunctionWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def getFunc() -> Callable[[int]int]: # function
  return twice
# end function

def printModified(i: float, f: Callable[[float]float]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  f = getFunc() # variable definition
  printNoLine(f(5)) # procedure call
# end main

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def twice(x: float) -> float: # function
  return x*2
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

  test("Pass_SetAsPropertyWithoutRefKeyword", async () => {
    const code = `${testPythonHeader}

def printModified(i: float, f: Callable[[float]float]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def main() -> None:
  f = Foo(ff) # variable definition
  printNoLine(f.pf(5)) # procedure call
# end main

def ff(a: int) -> int: # function
  return a
# end function

class Foo: # concrete class

  def __init__(self: Foo, f: Callable[[int]int]) -> None:
    self.pf = f # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  pf: Callable[[int]int] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise(global.ff));
  await _stdlib.printNoLine((await f.pf(5)));
}

async function ff(a) {
  return a;
}
global["ff"] = ff;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["pf", system.emptyFunc(0)]]);};

  async _initialise(f) {
    this.pf = f;
    return this;
  }

  async toString() {
    return "";
  }

  pf = system.emptyFunc(0);

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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Fail_InExpression1", async () => {
    const code = `${testPythonHeader}

def getFunc() -> Callable[[float]float]: # function
  return twice
# end function

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  f = 1 + ff # variable definition
# end main

def ff(a: int) -> int: # function
  return a
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes parameter - Int - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_InExpression2", async () => {
    const code = `${testPythonHeader}

def ff(a: int) -> int: # function
  return a
# end function

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  f = 1 + ff # variable definition
# end main

def ff(a: int) -> int: # function
  return a
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
      "Incompatible types. Expected: Float or Int, Provided: function that takes parameter - Int - returning a Int.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
