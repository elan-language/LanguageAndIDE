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

suite("Python Variables", () => {
  test("Pass_Int", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  id = 1 # variable definition
  id = 1 # variable definition
# end main

def main() -> None:
  a = 3 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_IntVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3 # variable definition
  b = a # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  let b = a;
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_Int_Expression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  b = a # variable definition
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = 3 + 4 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3 + 4;
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_Reassign", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 + 4 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3 # variable definition
  a = 4 # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  a = 4;
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

  test("Pass_CoerceFloatToIntVar", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  a = 4 # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3.1 # variable definition
  a = 4 # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3.1;
  a = 4;
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

  test("Pass_OperatorCoverage", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3.1 # variable definition
  a = 4 # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3 - 4 # variable definition
  b = 3 < 4 # variable definition
  c = 3 <= 4 # variable definition
  d = 3 > 4 # variable definition
  e = 3 >= 4 # variable definition
  f = 3 == 4 # variable definition
  g = 3 != 4 # variable definition
  h = not False # variable definition
  k = 4.0/3 # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
  printNoLine(e) # procedure call
  printNoLine(f) # procedure call
  printNoLine(g) # procedure call
  printNoLine(h) # procedure call
  printNoLine(k) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3 - 4;
  let b = 3 < 4;
  let c = 3 <= 4;
  let d = 3 > 4;
  let e = 3 >= 4;
  let f = 3 === 4;
  let g = 3 !== 4;
  let h = !false;
  let k = 4 / 3;
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(c);
  await _stdlib.printNoLine(d);
  await _stdlib.printNoLine(e);
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(g);
  await _stdlib.printNoLine(h);
  await _stdlib.printNoLine(k);
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
    await assertObjectCodeExecutes(fileImpl, "-1truetruefalsefalsefalsetruetrue1.3333333333333333");
  });

  test("Pass_Enum", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 - 4 # variable definition
  b = 3 < 4 # variable definition
  c = 3 <= 4 # variable definition
  d = 3 > 4 # variable definition
  e = 3 >= 4 # variable definition
  f = 3 == 4 # variable definition
  g = 3 != 4 # variable definition
  h = not False # variable definition
  k = 4.0/3 # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
  printNoLine(e) # procedure call
  printNoLine(f) # procedure call
  printNoLine(g) # procedure call
  printNoLine(h) # procedure call
  printNoLine(k) # procedure call
# end main

def main() -> None:
  a = Fruit.apple # variable definition
  printNoLine(enumToString(a)) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = Fruit.apple;
  await _stdlib.printNoLine((await _stdlib.enumToString(a)));
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
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_Iter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Fruit.apple # variable definition
  printNoLine(enumToString(a)) # procedure call
# end main

def main() -> None:
  a = [1, 2] # variable definition
  b = a.map(lambda x: int: x) # variable definition
  b = [1, 2] # assignment
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = (await a.map(async (x) => x));
  b = system.list([1, 2]);
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2]");
  });

  //   test("Pass_Security", async () => {
  //     const code = `${testPythonHeader}

  // def main() -> None:
  //   a = [1, 2] # variable definition
  //   b = a.map(lambda x: int: x) # variable definition
  //   b = [1, 2] # assignment
  //   printNoLine(b) # procedure call
  // # end main

  // main()
  // ` + eval('console.warn(\`fred\`)') + \`"
  // end main`;

  //     const objectCode = "let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
  // const global = new class {};
  // async function main() {
  //   let a = "";
  //   let b = \`\${await _stdlib.toString(a)}\\` + eval('console.warn(\\`fred\\`)') + \\`\`;
  // }
  // return [main, _tests];}";

  //     const fileImpl = new FileImpl(testHash, new Paradigm(""), "", transforms(), new StdLib(new StubInputOutput()),false, true);
  //     await fileImpl.parseFrom(new CodeSourceFromString(code));

  //     assertParses(fileImpl);
  //     assertStatusIsValid(fileImpl);
  //     assertObjectCodeIs(fileImpl, objectCode);
  //     await assertObjectCodeExecutes(fileImpl, "");
  //   });

  test("Fail_WrongKeyword", async () => {
    const code = `${testPythonHeader}

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

  test("Fail_GlobalVariable", async () => {
    const code = `${testPythonHeader}


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

  test("Fail_AssignIncompatibleType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "astring" # variable definition
  a = 4.1 # assignment
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
      "Incompatible types. Expected: String, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_NotInitialized", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a =  # variable definition
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

  test("Fail_InvalidVariableName1", async () => {
    const code = `${testPythonHeader}

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

  test("Fail_InvalidVariableName2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a =  # variable definition
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

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  if =  # variable definition
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

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  break = 4.1 # variable definition
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
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfLanguageTypeAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  int = 4.1 # variable definition
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
      "'int' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_TypeCheck1", async () => {
    const code = `${testPythonHeader}

def f() -> int: # function
  return 0
# end function

def main() -> None:
  a = True # variable definition
  b = 1 # variable definition
  c = "" # variable definition
  d = f() # variable definition
  a = 1.0 # assignment
  b = False # assignment
  c = [1.0, 2] # assignment
  d = 1.0 # assignment
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
      "Incompatible types. Expected: Boolean, Provided: Float.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: String, Provided: List<of Float>.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_TypeCheck2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True # variable definition
  b = 1 # variable definition
  c = "" # variable definition
  d = f() # variable definition
  a = 1.0 # assignment
  b = False # assignment
  c = [1.0, 2] # assignment
  d = 1.0 # assignment
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = [1.0, 2] # variable definition
  a = [1.0, 2] # assignment
  b = a # assignment
  c = b # assignment
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
      "Incompatible types. Expected: List<of String>, Provided: List<of Float>.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: List<of Float>, Provided: List<of String>.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = [1.0, 2] # variable definition
  a = [1.0, 2] # assignment
  b = a # assignment
  c = b # assignment
# end main

def main() -> None:
  x = x + 1 # variable definition
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

  test("Fail_referenceToExtensionFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = x + 1 # variable definition
# end main

def main() -> None:
  x = createFileForWriting # variable definition
  y = x("") # variable definition
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
      "Library or class function 'createFileForWriting' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_referenceToExtensionFunction1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = createFileForWriting # variable definition
  y = x("") # variable definition
# end main

def main() -> None:
  i = 1 # variable definition
  x = asList # variable definition
  y = i.x() # variable definition
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
      "'asList' is not defined.ErrorMessages.html#compile_error",
      "'x' is not defined for type 'Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_invalidCopyOfThisVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  i = 1 # variable definition
  x = asList # variable definition
  y = i.x() # variable definition
# end main

def main() -> None:
  copyOfThis = 1 # variable definition
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
      "'copyOfThis' is a restricted to use within the 'with...' instructionErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_differsByCase", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  copyOfThis = 1 # variable definition
# end main

def main() -> None:
  name = 1 # variable definition
  nAME = 2 # variable definition
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
      "'name' already exists. Identifiers must be distinct by more than just case. Either rename 'nAME' or extend it e.g. by adding underscore.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_Redefine", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  name = 1 # variable definition
  nAME = 2 # variable definition
# end main

def main() -> None:
  a = foo().item_0 # variable definition
  length = foo().item_1 # variable definition
# end main

def foo() -> tuple[int, int]: # function
  return (0, 0)
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await global.foo())[0];
  let length = (await global.foo())[1];
}

async function foo() {
  return system.tuple([0, 0]);
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_fourOpenBrackets", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = foo().item_0 # variable definition
  length = foo().item_1 # variable definition
# end main

def main() -> None:
  a = ((((3)))) # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = ((((3))));
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });
});
