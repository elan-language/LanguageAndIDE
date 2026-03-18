import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Strings", () => {
  test("Pass_SingleInsideDoubleQuotes", async () => {
    const code = `${testHeader}

main
  call printNoLine("'Hello,' she said.")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("'Hello,' she said.");
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
    await assertObjectCodeExecutes(fileImpl, `'Hello,' she said.`);
  });
  test("Pass_InterpolatedAndNonInterpolatedString", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to [1,2,3]
  call printNoLine($"{a} {b} {c}")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  let b = "Apple";
  let c = system.list([1, 2, 3]);
  await _stdlib.printNoLine(\`\${await _stdlib.toString(a)} \${await _stdlib.toString(b)} \${await _stdlib.toString(c)}\`);
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
    await assertObjectCodeExecutes(fileImpl, "1 Apple [1, 2, 3]");
  });

  test("Fail_missingBrace", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to [1,2,3]
  call printNoLine($"{a {b} {c}")
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_extraBrace", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to [1,2,3]
  call printNoLine($"{a} {b} {{c}")
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

    assertDoesNotParse(fileImpl);
  });

  test("Pass_InterpolatedEmpty", async () => {
    const code = `${testHeader}

main
  variable a set to $""
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "";
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
  test("Pass_InterpolatedOneSpace", async () => {
    const code = `${testHeader}

main
  variable a set to $" "
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = " ";
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, " ");
  });
});
