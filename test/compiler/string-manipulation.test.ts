import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("String Manipulation", () => {
  test("Pass_AppendStrings", async () => {
    const code = `${testHeader}

main
  variable a set to "Hello"
  variable b set to "World!"
  call printNoLine(a + " " + b)
end main`;

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
      new DefaultProfile(),
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

  test("Pass_AppendMixedStrings", async () => {
    const code = `${testHeader}

main
  variable a set to "Hello"
  variable b set to 'World!'
  call printNoLine(a + " " + b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "Hello";
  let b = 'World!';
  await _stdlib.printNoLine(a + " " + b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  call printNoLine("_" + "Hello" + "!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("_" + "Hello" + "!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  call printNoLine("Hello" + 3.1)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendInt", async () => {
    const code = `${testHeader}

main
  call printNoLine("Hello" + 3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Pass_Indexing", async () => {
    const code = `${testHeader}

main
  variable a set to "abcde"
  call printNoLine(a[2])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  await _stdlib.printNoLine(system.safeIndex(a, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to "abcde"
  variable b set to "z"
  set b to b + a[0]
  call printNoLine(b)
end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to "abcde"
  variable b set to "z"
  set b to a[0]
  call printNoLine(b)
end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to "abcde"
  call printNoLine(a.subString(1, 3))
  call printNoLine(a.subString(2, a.length()))
  call printNoLine(a.subString(0, 2))
end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
    call printNoLine("abc".isSameValueAs("abc"))
    call printNoLine("abc".isSameValueAs("abcd"))
    call printNoLine("abc".isSameValueAs("Abc"))
    call printNoLine("abc".isSameValueAs("abc"))
    call printNoLine(not "abc".isSameValueAs("abcd"))
    call printNoLine(not "abc".isSameValueAs("abcd"))
    call printNoLine(not "abc".isSameValueAs("Abc"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.isSameValueAs("abc", "abc"));
  await _stdlib.printNoLine(_stdlib.isSameValueAs("abc", "abcd"));
  await _stdlib.printNoLine(_stdlib.isSameValueAs("abc", "Abc"));
  await _stdlib.printNoLine(_stdlib.isSameValueAs("abc", "abc"));
  await _stdlib.printNoLine(!_stdlib.isSameValueAs("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.isSameValueAs("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.isSameValueAs("abc", "Abc"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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

  test("Pass_ReferenceEqualityTesting", async () => {
    const code = `${testHeader}

main
    call printNoLine("abc".isSameReferenceAs("abc"))
    call printNoLine("abc".isSameReferenceAs("abcd"))
    call printNoLine("abc".isSameReferenceAs("Abc"))
    call printNoLine("abc".isSameReferenceAs("abc"))
    call printNoLine(not "abc".isSameReferenceAs("abcd"))
    call printNoLine(not "abc".isSameReferenceAs("abcd"))
    call printNoLine(not "abc".isSameReferenceAs("Abc"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs("abc", "abc"));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs("abc", "abcd"));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs("abc", "Abc"));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs("abc", "abc"));
  await _stdlib.printNoLine(!_stdlib.isSameReferenceAs("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.isSameReferenceAs("abc", "abcd"));
  await _stdlib.printNoLine(!_stdlib.isSameReferenceAs("abc", "Abc"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  call printNoLine("abc".isBefore("abC"))
  call printNoLine("abcd".isAfter("abc"))
  call printNoLine("abc".isAfterOrSameAs("abc"))
  call printNoLine("abc".isBeforeOrSameAs("abc"))
  call printNoLine("abcd".isAfterOrSameAs("abc"))
  call printNoLine("abcd".isBeforeOrSameAs("abc"))
end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to "abcde"
  variable b set to 2.1 + 3.4
  set a to b.asString()
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "abcde";
  let b = 2.1 + 3.4;
  a = (await _stdlib.asString(b));
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to 3
  variable b set to 4
  variable c set to "{a} x {b} = {a * b}"
  call printNoLine(c)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  let b = 4;
  let c = \`\${await _stdlib.asString(a)} x \${await _stdlib.asString(b)} = \${await _stdlib.asString(a * b)}\`;
  await _stdlib.printNoLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to 3.1 + "Hello"
  call printNoLine(a)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_AppendStringToInt", async () => {
    const code = `${testHeader}

main
  variable a set to 3 + "Hello"
  call printNoLine(a)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexOutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to "abcde"
  call printNoLine(a[5])
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable a set to "abcde"
  call a.put(0, "b")
  call printNoLine(a)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "'put' is not defined for type 'String'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ComparisonOperators", async () => {
    const code = `${testHeader}

main
  call printNoLine("abc" < "abC")
  call printNoLine("abcd" > "abc")
  call printNoLine("abc" >= "abc")
  call printNoLine("abc" <= "abc")
  call printNoLine("abcd" >= "abc")
  call printNoLine("abcd" <= "abc")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CoerceNumberToString", async () => {
    const code = `${testHeader}

main
  variable a set to "abcde"
  set a to 2.1 + 3.4
  call printNoLine(a)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });
});
