import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Repeat Loop", () => {
  test("Pass_minimal", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x >= 10
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  do {
    x = x + 1;
  } while (!(x >= 10));
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testHeader}

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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
  await system.printLine(t);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "20");
  });

  test("Fail_variableRedeclaredInTest", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when var x >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_variableDefinedInLoop", async () => {
    const code = `${testHeader}

main
  repeat
    variable x set to  1
  end repeat when  x >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_testPutOnRepeat", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat x >= 10
    set x to x + 1
  end repeat 
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noCondition", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when 
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_invalidCondition", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when >= 10
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_RepeatConditionNotBool", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean.LangRef.html#TypeCompileError"]);
  });
});
