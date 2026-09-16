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

suite("Python For Loop", () => {
  test("Pass_minimal", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p: int # property

  def setP(self: Foo, value: int) -> None: # procedure method
    self.p = value # assignment
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  p: int # property

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterelan_for6 = [..._stdlib.range(1, 11)];
  for (const i of elan_iterelan_for6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_cannotReuseVariable", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  p: int # property

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  tot = 0 # variable definition
  i = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
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
      `The identifier 'i' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error`,
    ]);
  });

  test("Pass_withStep", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  i = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in rangeInSteps(1, 11, 2):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterelan_for6 = [..._stdlib.rangeInSteps(1, 11, 2)];
  for (const i of elan_iterelan_for6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_negativeStep", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in rangeInSteps(1, 11, 2):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in rangeInSteps(10, 3, -1):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterelan_for6 = [..._stdlib.rangeInSteps(10, 3, (-1))];
  for (const i of elan_iterelan_for6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "49");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in rangeInSteps(10, 3, -1):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 4):
    for j in range(1, 5):
      tot = tot + 1 # assignment
    # end for
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterelan_for6 = [..._stdlib.range(1, 4)];
  for (const i of elan_iterelan_for6) {
    const elan_iterelan_for10 = [..._stdlib.range(1, 5)];
    for (const j of elan_iterelan_for10) {
      tot = tot + 1;
    }
  }
  await _stdlib.printNoLine(tot);
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

  test("Pass_canUseExistingVariablesOfRightType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 4):
    for j in range(1, 5):
      tot = tot + 1 # assignment
    # end for
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  lower = 1 # variable definition
  upper = 10 # variable definition
  tot = 0 # variable definition
  for i in rangeInSteps(lower, upper + 1, 2):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let lower = 1;
  let upper = 10;
  let tot = 0;
  const elan_iterelan_for12 = [..._stdlib.rangeInSteps(lower, upper + 1, 2)];
  for (const i of elan_iterelan_for12) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_forInProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  lower = 1 # variable definition
  upper = 10 # variable definition
  tot = 0 # variable definition
  for i in rangeInSteps(lower, upper + 1, 2):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(11, 0) # variable definition
  foo(a) # procedure call
# end main

def foo(arr: list[int]) -> None: # procedure
  for i in range(0, 11):
    arr[i] = 1 # assignment
  # end for
  printNoLine(arr[0]) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(11, 0);
  await foo(a);
}

async function foo(arr) {
  const elan_iterelan_for13 = [..._stdlib.range(0, 11)];
  for (const i of elan_iterelan_for13) {
    arr.put(i, 1);
  }
  await _stdlib.printNoLine(system.safeIndex(arr, 0));
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_updateLimit", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(11, 0) # variable definition
  foo(a) # procedure call
# end main

def main() -> None:
  limit = 10 # variable definition
  for i in range(1, limit + 1):
    printNoLine(f"{i}") # procedure call
    limit = limit + 1 # assignment
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let limit = 10;
  const elan_iterelan_for6 = [..._stdlib.range(1, limit + 1)];
  for (const i of elan_iterelan_for6) {
    await _stdlib.printNoLine(\`\${await _stdlib.toString(i)}\`);
    limit = limit + 1;
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
    await assertObjectCodeExecutes(fileImpl, "12345678910");
  });

  test("Fail_reuseVariableDifferentType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  limit = 10 # variable definition
  for i in range(1, limit + 1):
    printNoLine(f"{i}") # procedure call
    limit = limit + 1 # assignment
  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  i = "" # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
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
      "The identifier 'i' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_useOfFloat", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  i = "" # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  tot = 0.0 # variable definition
  for i in range(1.5, 11.1).0:

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

  test("Fail_modifyingCounter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0.0 # variable definition
  for i in range(1.5, 11.1).0:

  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    i = 10 # assignment
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
      "May not reassign the loop counter 'i'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_scopeOfCounter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    i = 10 # assignment
  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = 10 # assignment
  # end for
  printNoLine(i) # procedure call
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
    assertDoesNotCompile(fileImpl, ["'i' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_missingEnd", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = 10 # assignment
  # end for
  printNoLine(i) # procedure call
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 4):
    for j in range(1, 5)  assign tot to tot + 1:

    # end for
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

  test("Fail_nextVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 4):
    for j in range(1, 5)  assign tot to tot + 1:

    # end for
  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  for  in :

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

  test("Fail_break", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for  in :

  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11)  assign tot to tot + i:

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

  test("Fail_continue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11)  assign tot to tot + i:

  # end for
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11)  assign tot to tot + i:

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

  test("Fail_duplicateId1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11)  assign tot to tot + i:

  # end for
# end main

def main() -> None:
  ids = 10 # variable definition
  for id in range(id, 12):
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

  test("Fail_duplicateId2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  ids = 10 # variable definition
  for id in range(id, 12):
    printNoLine(id) # procedure call
  # end for
  printNoLine(ids) # procedure call
# end main

def main() -> None:
  ids = 10 # variable definition
  for id in range(0, id + 1):
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
});
