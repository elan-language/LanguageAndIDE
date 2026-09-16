import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python String Manipulation", () => {
  test("Pass_AppendStrings", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1.equals(1) # variable definition
  b = "".equals("") # variable definition
  c = True.equals(True) # variable definition
  d = 1.notEqualTo(2) # variable definition
  e = "".notEqualTo("1") # variable definition
  f = True.notEqualTo(False) # variable definition
  printNoLine(a and b and c and d and e and f) # procedure call
# end main

def main() -> None:
  a = "Hello" # variable definition
  b = "World!" # variable definition
  printNoLine(a + " " + b) # procedure call
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
  a = "Hello" # variable definition
  b = "World!" # variable definition
  printNoLine(a + " " + b) # procedure call
# end main

def main() -> None:
  printNoLine("_" + "Hello" + "!") # procedure call
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
  printNoLine("_" + "Hello" + "!") # procedure call
# end main

def main() -> None:
  printNoLine("Hello" + 3.1) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendInt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Hello" + 3.1) # procedure call
# end main

def main() -> None:
  printNoLine("Hello" + 3) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Pass_Indexing", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Hello" + 3) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a[2]) # procedure call
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
  printNoLine(a[2]) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  b = "z" # variable definition
  b = b + a[0] # assignment
  printNoLine(b) # procedure call
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
  b = b + a[0] # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  b = "z" # variable definition
  b = a[0] # assignment
  printNoLine(b) # procedure call
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
  b = "z" # variable definition
  b = a[0] # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a.subString(1, 3)) # procedure call
  printNoLine(a.subString(2, a.length())) # procedure call
  printNoLine(a.subString(0, 2)) # procedure call
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
  a = "abcde" # variable definition
  printNoLine(a.subString(1, 3)) # procedure call
  printNoLine(a.subString(2, a.length())) # procedure call
  printNoLine(a.subString(0, 2)) # procedure call
# end main

def main() -> None:
  printNoLine("abc".equals("abc")) # procedure call
  printNoLine("abc".equals("abcd")) # procedure call
  printNoLine("abc".equals("Abc")) # procedure call
  printNoLine("abc".equals("abc")) # procedure call
  printNoLine(not "abc".equals("abcd")) # procedure call
  printNoLine(not "abc".equals("abcd")) # procedure call
  printNoLine(not "abc".equals("Abc")) # procedure call
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
  printNoLine("abc".equals("abc")) # procedure call
  printNoLine("abc".equals("abcd")) # procedure call
  printNoLine("abc".equals("Abc")) # procedure call
  printNoLine("abc".equals("abc")) # procedure call
  printNoLine(not "abc".equals("abcd")) # procedure call
  printNoLine(not "abc".equals("abcd")) # procedure call
  printNoLine(not "abc".equals("Abc")) # procedure call
# end main

def main() -> None:
  printNoLine("abc".isBefore("abC")) # procedure call
  printNoLine("abcd".isAfter("abc")) # procedure call
  printNoLine("abc".isAfterOrSameAs("abc")) # procedure call
  printNoLine("abc".isBeforeOrSameAs("abc")) # procedure call
  printNoLine("abcd".isAfterOrSameAs("abc")) # procedure call
  printNoLine("abcd".isBeforeOrSameAs("abc")) # procedure call
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
  printNoLine("abc".isBefore("abC")) # procedure call
  printNoLine("abcd".isAfter("abc")) # procedure call
  printNoLine("abc".isAfterOrSameAs("abc")) # procedure call
  printNoLine("abc".isBeforeOrSameAs("abc")) # procedure call
  printNoLine("abcd".isAfterOrSameAs("abc")) # procedure call
  printNoLine("abcd".isBeforeOrSameAs("abc")) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  b = 2.1 + 3.4 # variable definition
  a = b.toString() # assignment
  printNoLine(a) # procedure call
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
  a = "abcde" # variable definition
  b = 2.1 + 3.4 # variable definition
  a = b.toString() # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3 # variable definition
  b = 4 # variable definition
  c = f"{a} x {b} = {a*b}" # variable definition
  printNoLine(c) # procedure call
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
  a = 3 # variable definition
  b = 4 # variable definition
  c = f"{a} x {b} = {a*b}" # variable definition
  printNoLine(c) # procedure call
# end main

def main() -> None:
  a = 3.1 + "Hello" # variable definition
  printNoLine(a) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendStringToInt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3.1 + "Hello" # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 3 + "Hello" # variable definition
  printNoLine(a) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexOutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 + "Hello" # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  printNoLine(a[5]) # procedure call
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
  printNoLine(a[5]) # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  a.put(0, "b") # procedure call
  printNoLine(a) # procedure call
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
      "'put' is not defined for type 'String'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ComparisonOperators", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "abcde" # variable definition
  a.put(0, "b") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  printNoLine("abc" < "abC") # procedure call
  printNoLine("abcd" > "abc") # procedure call
  printNoLine("abc" >= "abc") # procedure call
  printNoLine("abc" <= "abc") # procedure call
  printNoLine("abcd" >= "abc") # procedure call
  printNoLine("abcd" <= "abc") # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CoerceNumberToString", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("abc" < "abC") # procedure call
  printNoLine("abcd" > "abc") # procedure call
  printNoLine("abc" >= "abc") # procedure call
  printNoLine("abc" <= "abc") # procedure call
  printNoLine("abcd" >= "abc") # procedure call
  printNoLine("abcd" <= "abc") # procedure call
# end main

def main() -> None:
  a = "abcde" # variable definition
  a = 2.1 + 3.4 # assignment
  printNoLine(a) # procedure call
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
});
