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

suite("Conditions", () => {
  test("Pass_lessThan", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 < 4
  print 3 < 2
  print 3 < 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 < 4);
  system.printLine(3 < 2);
  system.printLine(3 < 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsefalse");
  });

  test("Pass_greaterThan", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 > 4
  print 3 > 2
  print 3 > 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 > 4);
  system.printLine(3 > 2);
  system.printLine(3 > 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_lessThanOrEqual", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 <= 4
  print 3 <= 2
  print 3 <= 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 <= 4);
  system.printLine(3 <= 2);
  system.printLine(3 <= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_greaterThanOrEqual", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 >= 4
  print 3 >= 2
  print 3 >= 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 >= 4);
  system.printLine(3 >= 2);
  system.printLine(3 >= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetrue");
  });

  test("Pass_isnt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 isnt 4
  print 3 isnt 2
  print 3 isnt 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 !== 4);
  system.printLine(3 !== 2);
  system.printLine(3 !== 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Pass_is", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 is 4
  print 3 is 2
  print 3 is 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 === 4);
  system.printLine(3 === 2);
  system.printLine(3 === 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsetrue");
  });

  test("Pass_canCompareCoercibleTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 < 3.1
  print 3 <= 3.1
  print 3 > 3.1
  print 3 >= 3.1
  print 3 is 3.0
  print 3 isnt 3.0
  print 3.1 < 3
  print 3.1 <= 3
  print 3.1 > 3
  print 3.1 >= 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(3 < 3.1);
  system.printLine(3 <= 3.1);
  system.printLine(3 > 3.1);
  system.printLine(3 >= 3.1);
  system.printLine(3 === 3);
  system.printLine(3 !== 3);
  system.printLine(3.1 < 3);
  system.printLine(3.1 <= 3);
  system.printLine(3.1 > 3);
  system.printLine(3.1 >= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalsefalsetruefalsefalsefalsetruetrue");
  });

  test("Pass_combineComparisonWithArithmetic", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print (5 + 3) > (4 + 2)
  print (5 + 3) is (4 + 4)
  print (5 + 3) > (4 + 6)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine((5 + 3) > (4 + 2));
  system.printLine((5 + 3) === (4 + 4));
  system.printLine((5 + 3) > (4 + 6));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_not_is", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 not is 3
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_not", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 not 3
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_notEqual", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 != 3
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_EqualToOrLessThan", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 =< 3
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Greater_Or_Equal", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 > or = 3
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_SingleEquals", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 = 4
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_compareDifferentTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 is "3"
  print 3 isnt "3"
  print 3 < "3"
  print 3 <= "3"
  print 3 > "3"
  print 3 >= "3"
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types String to Int",
      "Incompatible types String to Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
    ]);
  });

  test("Fail_greaterOrLessThan", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 <> 3  
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_doubleEquals", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 == 3  
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_combineComparisonWithArithmeticWithoutBrackets", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 5 + 3 > 4 + 2
end main`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to Float or Int"]);
  });
});
