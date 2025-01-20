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

suite("Repeat Loop", () => {
  test("Pass_minimal", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x >= 10
  print x
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  do {
    x = x + 1;
  } while (!(x >= 10));
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
  repeat
    variable y set to 0
      repeat
        set y to y + 1
        set t to t + 1
      end repeat when y > 4
    set x to x + 1
  end repeat when x > 3
  print t
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = 0;
  let x = 0;
  do {
    let y = 0;
    do {
      y = y + 1;
      t = t + 1;
    } while (!(y > 4));
    x = x + 1;
  } while (!(x > 3));
  system.printLine(_stdlib.asString(t));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "20");
  });

  test("Fail_variableRedeclaredInTest", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when var x >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_variableDefinedInLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  repeat
    variable x set to  1
  end repeat when  x >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined"]);
  });

  test("Fail_testPutOnRepeat", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat x >= 10
    set x to x + 1
  end repeat 
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
  repeat
    set x to x + 1
  end repeat when 
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_invalidCondition", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_RepeatConditionNotBool", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean"]);
  });
});
