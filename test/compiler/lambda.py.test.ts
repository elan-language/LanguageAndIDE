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

suite("Python Lambda", () => {
  test("Pass_PassAsParam", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(f"{Fruit.apple}") # procedure call
# end main

def main() -> None:
  printModified(4, lambda x: int: x*3) # procedure call
# end main

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(4, async (x) => x * 3);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
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

  test("Pass_TupleArg", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(4, lambda x: int: x*3) # procedure call
# end main

def main() -> None:
  printModified((4, 5), lambda t: tuple[int, int]: first(t)) # procedure call
# end main

def first(t: tuple[int, int]) -> int: # function
  a = t.item_0 # variable definition
  return a
# end function

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => (await global.first(t)));
}

async function first(t) {
  let a = t[0];
  return a;
}
global["first"] = first;

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
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

  test("Pass_TupleArg1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified((4, 5), lambda t: tuple[int, int]: first(t)) # procedure call
# end main

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  printModified((4, 5), lambda t: tuple[int, int]: t.item_0) # procedure call
# end main

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => t[0]);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
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

  test("Fail_AssignALambdaToAVariable", async () => {
    const code = `${testPythonHeader}

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  l = lambda x => x * 5 # variable definition
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

  test("Fail_AssignALambdaToAProperty", async () => {
    const code = `${testPythonHeader}

def printModified(i: tuple[int, int], f: Callable[[tuple[int, int]]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
# end procedure

def main() -> None:
  foo = Foo() # variable definition
  foo.setP1(lambda x => x) # procedure call
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

  test("Fail_lambdaInExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  foo.setP1(lambda x => x) # procedure call
# end main

def main() -> None:
  l = lambda x => x * 5 # variable definition
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

  test("Fail_ReturnALambda", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = lambda x => x * 5 # variable definition
# end main

def main() -> None:
  l = getFunc() # variable definition
  printNoLine(l(5)) # procedure call
# end main

def getFunc() -> Callable[[int]int]: # function
  return lambda x => x * 5
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

  test("Fail_ParameterlessLambda", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = getFunc() # variable definition
  printNoLine(l(5)) # procedure call
# end main

def main() -> None:
  x = 3 # variable definition
  l = lambda => x * 5 # variable definition
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

  test("Fail ReturnAParameterLessLambda", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 3 # variable definition
  l = lambda => x * 5 # variable definition
# end main

def main() -> None:
  l = getFunc(5) # variable definition
  printNoLine(l()) # procedure call
# end main

def getFunc(x: int) -> Func<of => Int>: # function
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

  test("Fail_FuncOfMutableType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = getFunc(5) # variable definition
  printNoLine(l()) # procedure call
# end main

def main() -> None:
  l = getFunc(5) # variable definition
  printNoLine(l([5])) # procedure call
# end main

def getFunc(x: int) -> Callable[[list[int]]list[int]]: # function
  return lambda y<of Int> => [x * y[0]]
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

  test("Fail_Lambda WithLambdaParam", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = getFunc(5) # variable definition
  printNoLine(l([5])) # procedure call
# end main

def main() -> None:
  l = lambda x<of Int => Int> => x(2) # variable definition
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

  test("Fail_ImmediateInvoke", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = lambda x<of Int => Int> => x(2) # variable definition
# end main

def main() -> None:
  l = getFunc()(5) # variable definition
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

  test("Fail_PassLambdaWithWrongTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = getFunc()(5) # variable definition
# end main

def main() -> None:
  printModified(4, lambda x: int: x.toString()) # procedure call
# end main

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
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
      "Argument types. Expected: i (Int), f (function that takes parameter - Int - returning a Int), Provided: Int, lambda that takes parameter - Int - returning a String.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InvokeLambdaWithWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(4, lambda x: int: x.toString()) # procedure call
# end main

def main() -> None:
  printModified("4", lambda x: int: x + 3) # procedure call
# end main

def printModified(i: str, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(i)) # procedure call
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
      "Argument types. Expected: parameter0 (Int), Provided: String.ErrorMessages.html#compile_error",
    ]);
  });

  // no longer supported
  ignore_test("Fail_PassLambdaWithWrongTypes1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified("4", lambda x: int: x + 3) # procedure call
# end main

def main() -> None:
  printModified(4, lambda x: int: x) # procedure call
# end main

def printModified(i as Int, f as Func<of => Int>) -> None: # procedure

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
      "Argument types. Expected: i (Int), f (function that takes no parameters - returning a Int), Provided: Int, lambda that takes parameter - Int - returning a Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PassLambdaWithWrongTypes2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(4, lambda x: int: x) # procedure call
# end main

def main() -> None:
  printModified(4, lambda : 0) # procedure call
# end main

def printModified(i: int, f: Callable[[int]int]) -> None: # procedure
  printNoLine(f(5)) # procedure call
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
      "Argument types. Expected: i (Int), f (function that takes parameter - Int - returning a Int), Provided: Int, lambda that takes no parameters - returning a Int.ErrorMessages.html#compile_error",
    ]);
  });

  // no longer supported
  ignore_test("Fail_InvokeLambdaWithWrongTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(4, lambda : 0) # procedure call
# end main

def main() -> None:
  printModified(4, lambda : 0) # procedure call
# end main

def printModified(i as Int, f as Func<of => Int>) -> None: # procedure

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

  test("Fail_ReturnSameNameAsVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printModified(4, lambda : 0) # procedure call
# end main

def main() -> None:
  aa = lambda x => aa # variable definition
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

  test("Fail_ReturnSameNameAsVariable1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  aa = lambda x => aa # variable definition
# end main

def main() -> None:
  l = lambda x => if_(x is 1, x, l(x-1)) # variable definition
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
});
