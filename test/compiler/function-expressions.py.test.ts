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

suite("Python Function Expressions", () => {
  test("Pass_LibraryConst", async () => {
    const code = `${testPythonHeader}

def ff(a: int) -> int: # function
  return a
# end function

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  printNoLine(pi) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.pi);
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
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_SingleFunctionCall", async () => {
    const code = `${testPythonHeader}

def ff(a: int) -> int: # function
  return a
# end function

def main() -> None:
  x = sin(pi/180*30) # variable definition
  printNoLine(x) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.sin(_stdlib.pi / 180 * 30);
  await _stdlib.printNoLine(x);
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
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_Sin", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = sin(pi/180*30) # variable definition
  printNoLine(x) # procedure call
# end main

def main() -> None:
  x = pi/180*30 # variable definition
  y = sin(x) # variable definition
  printNoLine(y) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.pi / 180 * 30;
  let y = _stdlib.sin(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_FunctionsInExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = pi/180*30 # variable definition
  y = sin(x) # variable definition
  printNoLine(y) # procedure call
# end main

def main() -> None:
  x = pi/180*30 # variable definition
  y = sin(x) + cos(x) # variable definition
  printNoLine(y) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.pi / 180 * 30;
  let y = _stdlib.sin(x) + _stdlib.cos(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "1.3660254037844386");
  });

  test("Pass_MoreComplexExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = pi/180*30 # variable definition
  y = sin(x) + cos(x) # variable definition
  printNoLine(y) # procedure call
# end main

def main() -> None:
  x = 0.7 # variable definition
  y = pow(sin(x), 2) + pow(cos(x), 2) # variable definition
  printNoLine(y) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0.7;
  let y = _stdlib.pow(_stdlib.sin(x), 2) + _stdlib.pow(_stdlib.cos(x), 2);
  await _stdlib.printNoLine(y);
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

  test("Pass_MultiParamCall", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 0.7 # variable definition
  y = pow(sin(x), 2) + pow(cos(x), 2) # variable definition
  printNoLine(y) # procedure call
# end main

def main() -> None:
  x = min([3.1, 3]) # variable definition
  printNoLine(x) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.min(system.list([3.1, 3]));
  await _stdlib.printNoLine(x);
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

  test("Pass_MultiParamCallUsingDotSyntax", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = min([3.1, 3]) # variable definition
  printNoLine(x) # procedure call
# end main

def main() -> None:
  i = ["a", "b"] # variable definition
  x = i.contains("b") # variable definition
  printNoLine(x) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let i = system.list(["a", "b"]);
  let x = i.contains("b");
  await _stdlib.printNoLine(x);
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Fail_IncorrectType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  i = ["a", "b"] # variable definition
  x = i.contains("b") # variable definition
  printNoLine(x) # procedure call
# end main

def main() -> None:
  x = "hello".max() # variable definition
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
      "'max' is not defined for type 'String'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UnconsumedExpressionResult1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = "hello".max() # variable definition
# end main

def main() -> None:
  sin(1) # procedure call
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
      "Cannot call a function as a procedure.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UnconsumedExpressionResult2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  sin(1) # procedure call
# end main

def main() -> None:

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

  test("Fail_UnconsumedExpressionResult3", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  a = [1, 2] # variable definition
  max(a) # procedure call
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
      "Cannot call a function as a procedure.ErrorMessages.html#compile_error",
    ]);
  });
});
