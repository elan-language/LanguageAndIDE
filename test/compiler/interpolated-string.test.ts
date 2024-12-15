import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Interpolated String", () => {
  test("Pass_String", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to {1,2,3}
  print "{a} {b} {c}"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  var b = "Apple";
  var c = system.list([1, 2, 3]);
  system.printLine(_stdlib.asString(\`\${_stdlib.asString(a)} \${_stdlib.asString(b)} \${_stdlib.asString(c)}\`));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1 Apple {1, 2, 3}");
  });

  test("Fail_missingBrace", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to {1,2,3}
  print "{a {b} {c}"
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_extraBrace", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to "Apple"
  variable c set to {1,2,3}
  print "{a} {b} {{c}"
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
