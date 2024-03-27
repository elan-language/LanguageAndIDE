import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_9_Conditions', () => {

  test('Pass_lessThan', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 < 4
  print 3 < 2
  print 3 < 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 < 4));
  system.print(system.asString(3 < 2));
  system.print(system.asString(3 < 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsefalse");
  });

  test('Pass_greaterThan', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 > 4
  print 3 > 2
  print 3 > 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 > 4));
  system.print(system.asString(3 > 2));
  system.print(system.asString(3 > 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test('Pass_lessThanOrEqual', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 <= 4
  print 3 <= 2
  print 3 <= 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 <= 4));
  system.print(system.asString(3 <= 2));
  system.print(system.asString(3 <= 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test('Pass_greaterThanOrEqual', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 >= 4
  print 3 >= 2
  print 3 >= 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 >= 4));
  system.print(system.asString(3 >= 2));
  system.print(system.asString(3 >= 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetrue");
  });

  test('Pass_isNot', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 is not 4
  print 3 is not 2
  print 3 is not 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 !== 4));
  system.print(system.asString(3 !== 2));
  system.print(system.asString(3 !== 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test('Pass_is', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 is 4
  print 3 is 2
  print 3 is 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 === 4));
  system.print(system.asString(3 === 2));
  system.print(system.asString(3 === 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsetrue");
  });

  test('Pass_canCompareCoercibleTypes', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 < 3.1
  print 3 is 3.0
  print 3.1 < 3
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(3 <  3.1));
  system.print(system.asString(3 ===  3.0));
  system.print(system.asString(3.1 < 3));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  ignore_test('Fail_not_is', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 not is 3
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_not', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 not 3
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_notEqual', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 != 3
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_EqualToOrLessThan', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 =< 3
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_Greater_Or_Equal', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 > or = 3
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_SingleEquals', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 = 4
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_compareDifferentTypes', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 is ""3""  
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_greaterOrLessThan', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 <> 3  
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_doubleEquals', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 3 == 3  
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});