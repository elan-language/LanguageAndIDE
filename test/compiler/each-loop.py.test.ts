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

suite("Python Each Loop", () => {
  test("Pass_List1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = list[list[int]]() # variable definition
  y = list[list[str]]() # variable definition
  x.initialiseExt(2, 2, 2) # procedure call
  y.initialiseExt(2, 2, "") # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const elan_iterelan_for9 = [...a];
  for (const x of elan_iterelan_for9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
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
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_List2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const elan_iterelan_for9 = [...a];
  for (const x of elan_iterelan_for9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
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
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_String", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

def main() -> None:
  a = "hello" # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "hello";
  const elan_iterelan_for6 = [...a];
  for (const x of elan_iterelan_for6) {
    await _stdlib.printNoLine(x);
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
    await assertObjectCodeExecutes(fileImpl, "hello");
  });

  test("Pass_DoubleLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "hello" # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
# end main

def main() -> None:
  for x in "12":
    for y in "34":
      printNoLine(f"{x}{y}") # procedure call
    # end for
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const elan_iterelan_for3 = [..."12"];
  for (const x of elan_iterelan_for3) {
    const elan_iterelan_for7 = [..."34"];
    for (const y of elan_iterelan_for7) {
      await _stdlib.printNoLine(\`\${await _stdlib.toString(x)}\${await _stdlib.toString(y)}\`);
    }
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
    await assertObjectCodeExecutes(fileImpl, "13142324");
  });

  test("Pass_functionProvidingList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  for x in "12":
    for y in "34":
      printNoLine(f"{x}{y}") # procedure call
    # end for
  # end for
# end main

def main() -> None:
  for x in fruit():
    printNoLine(x) # procedure call
  # end for
# end main

def fruit() -> list[str]: # function
  return ["apple", "orange", "pear"]
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const elan_iterelan_for3 = [...(await global.fruit())];
  for (const x of elan_iterelan_for3) {
    await _stdlib.printNoLine(x);
  }
}

async function fruit() {
  return system.list(["apple", "orange", "pear"]);
}
global["fruit"] = fruit;
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
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_EachOfVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  for x in fruit():
    printNoLine(x) # procedure call
  # end for
# end main

def main() -> None:
  ints = [1, 2, 3] # variable definition
  for i1 in ints:

  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let ints = system.list([1, 2, 3]);
  const elan_iterelan_for6 = [...ints];
  for (const i1 of elan_iterelan_for6) {

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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_UpdateCollection", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  ints = [1, 2, 3] # variable definition
  for i1 in ints:

  # end for
# end main

def main() -> None:
  a = [1, 2, 3] # variable definition
  for item in a:
    a.append(item) # procedure call
    printNoLine(item) # procedure call
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  const elan_iterelan_for6 = [...a];
  for (const item of elan_iterelan_for6) {
    a.append(item);
    await _stdlib.printNoLine(item);
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Fail_UndefinedIterable1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3] # variable definition
  for item in a:
    a.append(item) # procedure call
    printNoLine(item) # procedure call
  # end for
# end main

def main() -> None:
  for i1 in ints:

  # end for
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
    assertDoesNotCompile(fileImpl, ["'ints' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UndefinedIterable2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  for i1 in ints:

  # end for
# end main

def main() -> None:
  bar = Bar([1, 2]) # variable definition
  bar.display() # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar, li: list[int]) -> None:
    self.l = li # assignment
  # end constructor

  l: list[int] # private property

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def display(self: Bar) -> None: # procedure method
    for item in li:
      printNoLine(item) # procedure call
    # end for
  # end procedure method

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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'li' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_variableIsScoped", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  bar = Bar([1, 2]) # variable definition
  bar.display() # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  x = "hello" # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
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
      "The identifier 'x' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_variableIsScoped2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  x = "hello" # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
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

  test("Fail_variableIsScoped3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  xx = "hello" # variable definition
  for xX in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
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
      "'xx' already exists. Identifiers must be distinct by more than just case. Either rename 'xX' or extend it e.g. by adding underscore.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_duplicateId", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  xx = "hello" # variable definition
  for xX in a:
    printNoLine(x) # procedure call
  # end for
  printNoLine(x) # procedure call
# end main

def main() -> None:
  ids = [7, 8, 9] # variable definition
  for id in id:
    printNoLine(id) # procedure call
  # end for
  printNoLine(ids) # procedure call
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
    assertDoesNotCompile(fileImpl, ["'id' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_NoEndeach", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  ids = [7, 8, 9] # variable definition
  for id in id:
    printNoLine(id) # procedure call
  # end for
  printNoLine(ids) # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
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

  test("Fail_applyToANonIterable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  for x in a:
    printNoLine(x) # procedure call
  # end for
# end main

def main() -> None:
  y = 10 # variable definition
  for x in y:
    printNoLine(x) # procedure call
  # end for
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
      "Source must evaluate to a list or string.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_ReassignTheIterableWithinLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  y = 10 # variable definition
  for x in y:
    printNoLine(x) # procedure call
  # end for
# end main

def main() -> None:
  s = "hello" # variable definition
  for ch in s:
    printNoLine(ch) # procedure call
    s = "fred" # assignment
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "hello";
  const elan_iterelan_for6 = [...s];
  for (const ch of elan_iterelan_for6) {
    await _stdlib.printNoLine(ch);
    s = "fred";
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
    await assertObjectCodeExecutes(fileImpl, "hello");
  });

  test("Pass_AlterTheIterableWithinLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s = "hello" # variable definition
  for ch in s:
    printNoLine(ch) # procedure call
    s = "fred" # assignment
  # end for
# end main

def main() -> None:
  a = [1, 2, 3, 4, 5] # variable definition
  for x in a:
    a = a.withAppend(x) # assignment
    printNoLine(x) # procedure call
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5]);
  const elan_iterelan_for6 = [...a];
  for (const x of elan_iterelan_for6) {
    a = a.withAppend(x);
    await _stdlib.printNoLine(x);
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
    await assertObjectCodeExecutes(fileImpl, "12345");
  });

  test("Fail_undefinedCollection", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4, 5] # variable definition
  for x in a:
    a = a.withAppend(x) # assignment
    printNoLine(x) # procedure call
  # end for
# end main

def main() -> None:
  for x in a:
    b = x.z # variable definition
  # end for
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
      "'a' is not defined.ErrorMessages.html#compile_error",
      "'x' is not defined.ErrorMessages.html#compile_error",
    ]);
  });
});
