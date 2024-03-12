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

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  system.print(system.asString(3 < 4));
  system.print(system.asString(3 < 2));
  system.print(system.asString(3 < 3));
}
`;

    const fileImpl = new FileImpl(() => "", true);
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

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  system.print(system.asString(3 > 4));
  system.print(system.asString(3 > 2));
  system.print(system.asString(3 > 3));
}
`;

    const fileImpl = new FileImpl(() => "", true);
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

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  system.print(system.asString(3 <= 4));
  system.print(system.asString(3 <= 2));
  system.print(system.asString(3 <= 3));
}
`;

    const fileImpl = new FileImpl(() => "", true);
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

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  system.print(system.asString(3 >= 4));
  system.print(system.asString(3 >= 2));
  system.print(system.asString(3 >= 3));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetrue");
  });
});