import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("While Loop", () => {
  test("Pass_minimal", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  while x < 10
    set x to x + 1
  end while
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  while (x < 10) {
    x = x + 1;
  }
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_innerLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable t set to 0
  variable x set to 0
  while x < 3
    variable y set to 0
      while y < 4
        set y to y + 1
        set t to t + 1
      end while
      set x to x + 1
  end while
  print t
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = 0;
  let x = 0;
  while (x < 3) {
    let y = 0;
    while (y < 4) {
      y = y + 1;
      t = t + 1;
    }
    x = x + 1;
  }
  system.printLine(_stdlib.asString(t));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Fail_noEnd", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let x = 0
  while x < 10
    set x to x + 1
 end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_variableNotPredefined", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  while x < 10
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined"]);
  });

  test("Fail_variableDefinedInWhile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  while var x < 10
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noCondition", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  while
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_while_do", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  while x < 10
    set x to x + 1
  do
 end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_WhileConditionNotBool", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  while a
    print a
  end while
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean"]);
  });
});
