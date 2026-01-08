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
  test("Pass_SingleAndDoubleQuotes", async () => {
    const code = `${testHeader}

main
  print "'Hello,' she said."
  print '"Hello," she said.'
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print("'Hello,' she said.");
  await system.print('"Hello," she said.');
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `'Hello,' she said."Hello," she said.`);
  });
  test("Pass_InterpolatedAndNonInterpolatedString", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to {1,2,3}
  print "{a} {b} {c}"
  print '{a} {b} {c}'
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  let b = "Apple";
  let c = system.listImmutable([1, 2, 3]);
  await system.print(\`\${await _stdlib.asString(a)} \${await _stdlib.asString(b)} \${await _stdlib.asString(c)}\`);
  await system.print('{a} {b} {c}');
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1 Apple {1, 2, 3}{a} {b} {c}");
  });

  test("Fail_missingBrace", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to {1,2,3}
  print "{a {b} {c}"
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  variable c set to {1,2,3}
  print "{a} {b} {{c}"
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
