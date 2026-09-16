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

suite("Python Conditions", () => {
  test("Pass_lessThan", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class


# end class

def main() -> None:
  score = Bar() # variable definition
  score = if_(False, cast(Bar()), Bar()) # assignment
  printNoLine(score) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "undefined"
  # end function method

# end class

def main() -> None:
  printNoLine(3 < 4) # procedure call
  printNoLine(3 < 2) # procedure call
  printNoLine(3 < 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 < 4);
  await _stdlib.printNoLine(3 < 2);
  await _stdlib.printNoLine(3 < 3);
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
    await assertObjectCodeExecutes(fileImpl, "truefalsefalse");
  });

  test("Pass_greaterThan", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = Bar() # variable definition
  score = if_(False, cast(Bar()), Bar()) # assignment
  printNoLine(score) # procedure call
# end main

def main() -> None:
  printNoLine(3 < 4) # procedure call
  printNoLine(3 < 2) # procedure call
  printNoLine(3 < 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 > 4) # procedure call
  printNoLine(3 > 2) # procedure call
  printNoLine(3 > 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 > 4);
  await _stdlib.printNoLine(3 > 2);
  await _stdlib.printNoLine(3 > 3);
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
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_lessThanOrEqual", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 < 4) # procedure call
  printNoLine(3 < 2) # procedure call
  printNoLine(3 < 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 <= 4) # procedure call
  printNoLine(3 <= 2) # procedure call
  printNoLine(3 <= 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 <= 4);
  await _stdlib.printNoLine(3 <= 2);
  await _stdlib.printNoLine(3 <= 3);
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_greaterThanOrEqual", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 <= 4) # procedure call
  printNoLine(3 <= 2) # procedure call
  printNoLine(3 <= 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 >= 4) # procedure call
  printNoLine(3 >= 2) # procedure call
  printNoLine(3 >= 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 >= 4);
  await _stdlib.printNoLine(3 >= 2);
  await _stdlib.printNoLine(3 >= 3);
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
    await assertObjectCodeExecutes(fileImpl, "falsetruetrue");
  });

  test("Pass_isnt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 >= 4) # procedure call
  printNoLine(3 >= 2) # procedure call
  printNoLine(3 >= 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 != 4) # procedure call
  printNoLine(3 != 2) # procedure call
  printNoLine(3 != 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 !== 4);
  await _stdlib.printNoLine(3 !== 2);
  await _stdlib.printNoLine(3 !== 3);
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Pass_is", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 != 4) # procedure call
  printNoLine(3 != 2) # procedure call
  printNoLine(3 != 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 == 4) # procedure call
  printNoLine(3 == 2) # procedure call
  printNoLine(3 == 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 === 4);
  await _stdlib.printNoLine(3 === 2);
  await _stdlib.printNoLine(3 === 3);
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
    await assertObjectCodeExecutes(fileImpl, "falsefalsetrue");
  });

  test("Pass_canCompareCoercibleTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 == 4) # procedure call
  printNoLine(3 == 2) # procedure call
  printNoLine(3 == 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 < 3.1) # procedure call
  printNoLine(3 <= 3.1) # procedure call
  printNoLine(3 > 3.1) # procedure call
  printNoLine(3 >= 3.1) # procedure call
  printNoLine(3 == 3.0) # procedure call
  printNoLine(3 != 3.0) # procedure call
  printNoLine(3.1 < 3) # procedure call
  printNoLine(3.1 <= 3) # procedure call
  printNoLine(3.1 > 3) # procedure call
  printNoLine(3.1 >= 3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(3 < 3.1);
  await _stdlib.printNoLine(3 <= 3.1);
  await _stdlib.printNoLine(3 > 3.1);
  await _stdlib.printNoLine(3 >= 3.1);
  await _stdlib.printNoLine(3 === 3);
  await _stdlib.printNoLine(3 !== 3);
  await _stdlib.printNoLine(3.1 < 3);
  await _stdlib.printNoLine(3.1 <= 3);
  await _stdlib.printNoLine(3.1 > 3);
  await _stdlib.printNoLine(3.1 >= 3);
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalsefalsetruefalsefalsefalsetruetrue");
  });

  test("Pass_combineComparisonWithArithmetic", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 < 3.1) # procedure call
  printNoLine(3 <= 3.1) # procedure call
  printNoLine(3 > 3.1) # procedure call
  printNoLine(3 >= 3.1) # procedure call
  printNoLine(3 == 3.0) # procedure call
  printNoLine(3 != 3.0) # procedure call
  printNoLine(3.1 < 3) # procedure call
  printNoLine(3.1 <= 3) # procedure call
  printNoLine(3.1 > 3) # procedure call
  printNoLine(3.1 >= 3) # procedure call
# end main

def main() -> None:
  printNoLine((5 + 3) > (4 + 2)) # procedure call
  printNoLine((5 + 3) == (4 + 4)) # procedure call
  printNoLine((5 + 3) > (4 + 6)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((5 + 3) > (4 + 2));
  await _stdlib.printNoLine((5 + 3) === (4 + 4));
  await _stdlib.printNoLine((5 + 3) > (4 + 6));
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_not_is", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine((5 + 3) > (4 + 2)) # procedure call
  printNoLine((5 + 3) == (4 + 4)) # procedure call
  printNoLine((5 + 3) > (4 + 6)) # procedure call
# end main

def main() -> None:
  printNoLine(3 not is 3) # procedure call
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

  test("Fail_not", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 not is 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 not 3) # procedure call
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

  test("Fail_notEqual", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 not 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 != 3) # procedure call
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

  test("Fail_EqualToOrLessThan", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 != 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 =< 3) # procedure call
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

  test("Fail_Greater_Or_Equal", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 =< 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 > or = 3) # procedure call
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

  test("Fail_SingleEquals", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 > or = 3) # procedure call
# end main

def main() -> None:
  printNoLine(3 = 4) # procedure call
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

  test("Fail_compareDifferentTypesByValue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 = 4) # procedure call
# end main

def main() -> None:
  printNoLine(3.equals("3")) # procedure call
  printNoLine(not 3.equals("3")) # procedure call
  printNoLine(3 < "3") # procedure call
  printNoLine(3 <= "3") # procedure call
  printNoLine(3 > "3") # procedure call
  printNoLine(3 >= "3") # procedure call
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
      "Argument types. Expected: parameter1 (Int), Provided: String.ErrorMessages.html#compile_error",
      "Argument types. Expected: parameter1 (Int), Provided: String.ErrorMessages.html#compile_error",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_greaterOrLessThan", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3.equals("3")) # procedure call
  printNoLine(not 3.equals("3")) # procedure call
  printNoLine(3 < "3") # procedure call
  printNoLine(3 <= "3") # procedure call
  printNoLine(3 > "3") # procedure call
  printNoLine(3 >= "3") # procedure call
# end main

def main() -> None:
  printNoLine(3 <> 3  ) # procedure call
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

  test("Fail_doubleEquals", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 <> 3  ) # procedure call
# end main

def main() -> None:
  printNoLine(3 == 3  ) # procedure call
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

  test("Fail_combineComparisonWithArithmeticWithoutBrackets", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(3 == 3  ) # procedure call
# end main

def main() -> None:
  printNoLine(5 + 3 > 4 + 2) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
