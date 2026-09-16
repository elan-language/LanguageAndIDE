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

suite("Python While Loop", () => {
  test("Pass_minimal", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  c = CircleVG() # variable definition
  x = c.centreX # variable definition
  printNoLine(x) # procedure call
# end main

def main() -> None:
  x = 0 # variable definition
  while x < 10:
    x = x + 1 # assignment
  # end while
  printNoLine(x) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  while (x < 10) {
    x = x + 1;
  }
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
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 0 # variable definition
  while x < 10:
    x = x + 1 # assignment
  # end while
  printNoLine(x) # procedure call
# end main

def main() -> None:
  t = 0 # variable definition
  x = 0 # variable definition
  while x < 3:
    y = 0 # variable definition
    while y < 4:
      y = y + 1 # assignment
      t = t + 1 # assignment
    # end while
    x = x + 1 # assignment
  # end while
  printNoLine(t) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = 0;
  let x = 0;
  while (x < 3) {
    let y = 0;
    while (y < 4) {
      y = y + 1;
      t = t + 1;
    }
    x = x + 1;
  }
  await _stdlib.printNoLine(t);
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

  test("Fail_noEnd", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = 0 # variable definition
  x = 0 # variable definition
  while x < 3:
    y = 0 # variable definition
    while y < 4:
      y = y + 1 # assignment
      t = t + 1 # assignment
    # end while
    x = x + 1 # assignment
  # end while
  printNoLine(t) # procedure call
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

  test("Fail_variableNotPredefined", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  while x < 10:
    x = x + 1 # assignment
  # end while
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
    assertDoesNotCompile(fileImpl, ["'x' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_variableDefinedInWhile", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  while x < 10:
    x = x + 1 # assignment
  # end while
# end main

def main() -> None:
  while variable x < 10:

  # end while
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

  test("Fail_noCondition", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  while variable x < 10:

  # end while
# end main

def main() -> None:
  x = 0 # variable definition
  while :

  # end while
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

  test("Fail_while_do", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 0 # variable definition
  while :

  # end while
# end main

def main() -> None:
  x = 0 # variable definition
  while x < 10:
    x = x + 1 # assignment
  # end while
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

  test("Fail_WhileConditionNotBool", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 0 # variable definition
  while x < 10:
    x = x + 1 # assignment
  # end while
# end main

def main() -> None:
  a = 3 # variable definition
  while a:
    printNoLine(a) # procedure call
  # end while
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
      "Expression must be Boolean.ErrorMessages.html#TypeCompileError",
    ]);
  });

  test("Fail_WhileConditionUnknown", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  while a:
    printNoLine(a) # procedure call
  # end while
# end main

def main() -> None:
  while a:
    printNoLine(a) # procedure call
  # end while
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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.ErrorMessages.html#compile_error"]);
  });
});
