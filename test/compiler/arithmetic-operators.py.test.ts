import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { FileImpl } from "../../src/ide/frames/file-impl";
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

suite("Python Arithmetic Operators", () => {
  test("Pass_IntAddition", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  h = 0xfffe # variable definition
  b = 0b111011 # variable definition
  printNoLine(h) # procedure call
  printNoLine(" ") # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  printNoLine(3 + 4) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 + 4);
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

  test("Pass_IntSubtraction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 + 4) # procedure call
# end main

def main() -> None:
  printNoLine(3 - 4) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 - 4);
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
    await assertObjectCodeExecutes(fileImpl, "-1");
  });

  test("Pass_IntMultiplication", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 - 4) # procedure call
# end main

def main() -> None:
  printNoLine(3*4) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 * 4);
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_IncludeVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3*4) # procedure call
# end main

def main() -> None:
  a = 3 # variable definition
  printNoLine(a + 4) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  await _stdlib.printNoLine(a + 4);
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

  test("Fail_DivideIntegersToFloat", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  printNoLine(a + 4) # procedure call
# end main

def main() -> None:
  printNoLine(3/2) # procedure call
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
      "Cannot apply / to two integer values. Use the function divAsInt or divAsFloat, or ensure that at least one value is a float.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_IntegerDivision1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3/2) # procedure call
# end main

def main() -> None:
  printNoLine(divAsFloat(7, 2).floor()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.floor(_stdlib.divAsFloat(7, 2)));
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

  test("Pass_IntegerDivision2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(divAsFloat(7, 2).floor()) # procedure call
# end main

def main() -> None:
  printNoLine(divAsInt(7, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.divAsInt(7, 2));
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

  test("Pass_IntegerDivision3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(divAsInt(7, 2)) # procedure call
# end main

def main() -> None:
  printNoLine(divAsFloat(7, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.divAsFloat(7, 2));
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
    await assertObjectCodeExecutes(fileImpl, "3.5");
  });

  test("Pass_Mod", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(divAsFloat(7, 2)) # procedure call
# end main

def main() -> None:
  printNoLine(11 % 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(11 % 3);
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

  test("Pass_ModWithComparison", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(11 % 3) # procedure call
# end main

def main() -> None:
  printNoLine(if_((25 % 20) < 19, 1, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(((25 % 20) < 19 ? 1 : 2));
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

  test("Pass_Power", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(if_((25 % 20) < 19, 1, 2)) # procedure call
# end main

def main() -> None:
  printNoLine(pow(3, 3)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.pow(3, 3));
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
    await assertObjectCodeExecutes(fileImpl, "27");
  });

  test("Pass_PowerTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(pow(3, 3)) # procedure call
# end main

def main() -> None:
  a = 1.0 # variable definition
  b = 1.1 # variable definition
  a = pow(2, 2) # assignment
  b = pow(2, 2) # assignment
  b = pow(2, 0.5) # assignment
  b = pow(0.5, 2) # assignment
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  let b = 1.1;
  a = _stdlib.pow(2, 2);
  b = _stdlib.pow(2, 2);
  b = _stdlib.pow(2, 0.5);
  b = _stdlib.pow(0.5, 2);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "40.25");
  });

  test("Pass_UseVariableBothSides", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1.0 # variable definition
  b = 1.1 # variable definition
  a = pow(2, 2) # assignment
  b = pow(2, 2) # assignment
  b = pow(2, 0.5) # assignment
  b = pow(0.5, 2) # assignment
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = 3 # variable definition
  a = a + 1 # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  a = a + 1;
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Fail_InvalidExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  a = a + 1 # assignment
  printNoLine(a) # procedure call
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

  test("Fail_PlusEquals", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  a = 3 # variable definition
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

  test("Fail_PlusPlus", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
# end main

def main() -> None:
  a = 3 # variable definition
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

  test("Fail_AddWrongTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
# end main

def main() -> None:
  a = 3 + True # variable definition
  b = True + 3 # variable definition
  c = 3 + Foo() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

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
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Foo.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_ModWithFloats1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 + True # variable definition
  b = True + 3 # variable definition
  c = 3 + Foo() # variable definition
# end main

def main() -> None:
  printNoLine(11 % 3.2) # procedure call
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
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_ModWithFloats2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(11 % 3.2) # procedure call
# end main

def main() -> None:
  printNoLine(11.7 % 3) # procedure call
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
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_DoubleMinus1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(11.7 % 3) # procedure call
# end main

def main() -> None:
  x = --4 # variable definition
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
    assertDoesNotCompile(fileImpl, ["Unsupported operation.ErrorMessages.html#compile_error"]);
  });

  test("Fail_DoubleMinus2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = --4 # variable definition
# end main

def main() -> None:
  x = 1 # variable definition
  y = --x # variable definition
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
    assertDoesNotCompile(fileImpl, ["Unsupported operation.ErrorMessages.html#compile_error"]);
  });

  test("Fail_DoubleNot1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 1 # variable definition
  y = --x # variable definition
# end main

def main() -> None:
  x = not not True # variable definition
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
    assertDoesNotCompile(fileImpl, ["Unsupported operation.ErrorMessages.html#compile_error"]);
  });

  test("Fail_DoubleNot2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = not not True # variable definition
# end main

def main() -> None:
  x = True # variable definition
  y = not not x # variable definition
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
    assertDoesNotCompile(fileImpl, ["Unsupported operation.ErrorMessages.html#compile_error"]);
  });

  test("Fail_PowerType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = True # variable definition
  y = not not x # variable definition
# end main

def main() -> None:
  x = 1 # variable definition
  x = pow(2, 0.5) # assignment
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
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_PowerType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 1 # variable definition
  x = pow(2, 0.5) # assignment
# end main

def main() -> None:
  x = 1 # variable definition
  x = pow(0.5, 2) # assignment
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
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
