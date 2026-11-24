import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
import {
  assertCompiles,
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "../compiler-test-helpers";

suite("Python Global Constants", () => {
  test("Pass_Int", async () => {
    const code = `${testPythonHeader}

a = 3 # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 3;

};
async function main() {
  await _stdlib.printNoLine(global.a);
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

  test("Pass_Int_Hex", async () => {
    const code = `${testPythonHeader}

a = 0xFF # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 255;

};
async function main() {
  await _stdlib.printNoLine(global.a);
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
    await assertObjectCodeExecutes(fileImpl, "255");
  });

  test("Pass_Int_Binary", async () => {
    const code = `${testPythonHeader}

a = 0b10101 # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 21;

};
async function main() {
  await _stdlib.printNoLine(global.a);
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
    await assertObjectCodeExecutes(fileImpl, "21");
  });

  test("Pass_Float", async () => {
    const code = `${testPythonHeader}

a = 3.1 # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 3.1;

};
async function main() {
  await _stdlib.printNoLine(global.a);
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
    await assertObjectCodeExecutes(fileImpl, "3.1");
  });

  test("Pass_String", async () => {
    const code = `${testPythonHeader}

a = "hell0" # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = "hell0";

};
async function main() {
  await _stdlib.printNoLine(global.a);
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
    await assertObjectCodeExecutes(fileImpl, "hell0");
  });

  test("Pass_EmptyStringByValue", async () => {
    const code = `${testPythonHeader}

a = "" # constant

def main() -> None:
  printNoLine(a) 
  printNoLine(a.equals("")) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = "";

};
async function main() {
  await _stdlib.printNoLine(global.a);
  await _stdlib.printNoLine(_stdlib.equals(global.a, ""));
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

  test("Pass_SpaceAsString", async () => {
    const code = `${testPythonHeader}

a = " " # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = " ";

};
async function main() {
  await _stdlib.printNoLine(global.a);
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
    await assertObjectCodeExecutes(fileImpl, " ");
  });

  test("Pass_Bool", async () => {
    const code = `${testPythonHeader}

a = True # constant

def main() -> None:
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = true;

};
async function main() {
  await _stdlib.printNoLine(global.a);
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

  test("Fail_incorrectKeyword", async () => {
    const code = `${testPythonHeader}

a = Fruit.apple # constant

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3
# end enum
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

  test("Fail_reassignment", async () => {
    const code = `${testPythonHeader}

a = 3 # constant

def main() -> None:
  a = 4 # assignment
  printNoLine(a) 
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
      "May not reassign the constant 'a'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_libConstantReassignment", async () => {
    const code = `${testPythonHeader}

a = 3 # constant

def main() -> None:
  pi = 4 # assignment
  printNoLine(a) 
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
      "May not reassign the constant 'pi'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_expression", async () => {
    const code = `${testPythonHeader}

a = 3 + 4 # constant

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

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

if = 1 # constant

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

  test("Fail_UseOfReservedAsName", async () => {
    const code = `${testPythonHeader}

def = 3 # constant

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

  test("Fail_NotUniqueName", async () => {
    const code = `${testPythonHeader}

a = 1 # constant

a = 2 # constant

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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_UseConstantBeforeDefinition1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(a)
# end main

a = 3

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
    assertCompiles(fileImpl);
  });

  test("Fail_NotValueType", async () => {
    const code = `${testPythonHeader}

a = 1 + 2 # constant
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

  test("Fail_Expression", async () => {
    const code = `${testPythonHeader}

a = 1 + 2 # constant
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

  test("Fail_Function", async () => {
    const code = `${testPythonHeader}

a = foo() # constant
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
