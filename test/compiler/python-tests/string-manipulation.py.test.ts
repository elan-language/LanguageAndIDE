import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "../compiler-test-helpers";

suite("Python str Manipulation", () => {
  test("Pass_AppendStrings", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "Hello" # variable definition
  b = "World!" # variable definition
  printNoLine(a + " " + b) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "Hello";
  let b = "World!";
  await _stdlib.printNoLine(a + " " + b);
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
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_AppendOrPrependChar", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("_" + "Hello" + "!") 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("_" + "Hello" + "!");
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
    await assertObjectCodeExecutes(fileImpl, "_Hello!");
  });

  test("Fail_AppendFloat", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Hello" + 3.1) 
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
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendInt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Hello" + 3) 
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
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Pass_Indexing", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a[2]) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  await _stdlib.printNoLine(system.safeIndex(a, 2));
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
    await assertObjectCodeExecutes(fileImpl, "c");
  });

  test("Pass_IndexingAndAppend", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  b = "z" # variable definition
  b = b + a[0] # assignment
  printNoLine(b) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  let b = "z";
  b = b + system.safeIndex(a, 0);
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
    await assertObjectCodeExecutes(fileImpl, "za");
  });

  test("Pass_SetIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  b = "z" # variable definition
  b = a[0] # assignment
  printNoLine(b) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  let b = "z";
  b = system.safeIndex(a, 0);
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
    await assertObjectCodeExecutes(fileImpl, "a");
  });

  test("Pass_Ranges", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a.subString(1, 3)) 
  printNoLine(a.subString(2, a.length())) 
  printNoLine(a.subString(0, 2)) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  await _stdlib.printNoLine(_stdlib.subString(a, 1, 3));
  await _stdlib.printNoLine(_stdlib.subString(a, 2, _stdlib.length(a)));
  await _stdlib.printNoLine(_stdlib.subString(a, 0, 2));
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
    await assertObjectCodeExecutes(fileImpl, "bccdeab");
  });

  test("Pass_ValueEqualityTesting", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("abc".equals("abc")) 
  printNoLine("abc".equals("abcd")) 
  printNoLine("abc".equals("Abc")) 
  printNoLine("abc".equals("abc")) 
  printNoLine(not "abc".equals("abcd")) 
  printNoLine(not "abc".equals("abcd")) 
  printNoLine(not "abc".equals("Abc")) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.equals("abc", "abc"));
  await _stdlib.printNoLine(_stdlib.equals("abc", "abcd"));
  await _stdlib.printNoLine(_stdlib.equals("abc", "Abc"));
  await _stdlib.printNoLine(_stdlib.equals("abc", "abc"));
  await _stdlib.printNoLine(!_stdlib.equals("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.equals("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.equals("abc", "Abc"));
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
    await assertObjectCodeExecutes(fileImpl, "truefalsefalsetruetruetruetrue");
  });

  test("Pass_ComparisonMethods", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("abc".isBefore("abC")) 
  printNoLine("abcd".isAfter("abc")) 
  printNoLine("abc".isAfterOrSameAs("abc")) 
  printNoLine("abc".isBeforeOrSameAs("abc")) 
  printNoLine("abcd".isAfterOrSameAs("abc")) 
  printNoLine("abcd".isBeforeOrSameAs("abc")) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.isBefore("abc", "abC"));
  await _stdlib.printNoLine(_stdlib.isAfter("abcd", "abc"));
  await _stdlib.printNoLine(_stdlib.isAfterOrSameAs("abc", "abc"));
  await _stdlib.printNoLine(_stdlib.isBeforeOrSameAs("abc", "abc"));
  await _stdlib.printNoLine(_stdlib.isAfterOrSameAs("abcd", "abc"));
  await _stdlib.printNoLine(_stdlib.isBeforeOrSameAs("abcd", "abc"));
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
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetruetruefalse");
  });

  test("Pass_UseAsStringExplicitly", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  b = 2.1 + 3.4 # variable definition
  a = b.toString() # assignment
  printNoLine(a) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  let b = 2.1 + 3.4;
  a = (await _stdlib.toString(b));
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
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  test("Pass_Interpolation", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  b = 4 # variable definition
  c = f"{a} x {b} = {a*b}" # variable definition
  printNoLine(c) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  let b = 4;
  let c = \`\${await _stdlib.toString(a)} x \${await _stdlib.toString(b)} = \${await _stdlib.toString(a * b)}\`;
  await _stdlib.printNoLine(c);
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
    await assertObjectCodeExecutes(fileImpl, "3 x 4 = 12");
  });

  test("Fail_AppendStringToFloat", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3.1 + "Hello" # variable definition
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendStringToInt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 + "Hello" # variable definition
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexOutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a[5]) 
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_SetIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  a.put(0, "b") 
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'put' is not defined for type 'str'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ComparisonOperators", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("abc" < "abC") 
  printNoLine("abcd" > "abc") 
  printNoLine("abc" >= "abc") 
  printNoLine("abc" <= "abc") 
  printNoLine("abcd" >= "abc") 
  printNoLine("abcd" <= "abc") 
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
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: float or int, Provided: str.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CoerceNumberToString", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  a = 2.1 + 3.4 # assignment
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
      "Incompatible types. Expected: str, Provided: float.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
