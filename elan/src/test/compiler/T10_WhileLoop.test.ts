import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T10_WhileLoop', () => {

  test('Pass_minimal', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 0
  while x < 10
    set x to x + 1
  end while
  print x
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  var x = 0;
  while (x < 10) {
    x = x + 1;
  }
  system.print(system.asString(x));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test('Pass_innerLoop', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var t set to 0
  var x set to 0
  while x < 3
    var y set to 0
      while y < 4
        set y to y + 1
        set t to t + 1
      end while
      set x to x + 1
  end while
  print t
end main`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  var t = 0;
  var x = 0;
  while (x < 3) {
    var y = 0;
    while (y < 4) {
      y = y + 1;
      t = t + 1;
    }
    x = x + 1;
  }
  system.print(system.asString(t));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test('Fail_noEnd', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x = 0
  while x < 10
    set x to x + 1
 end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_variableNotPredefined', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  while x < 10
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_variableDefinedInWhile', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  while var x < 10
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_noCondition', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 0
  while
    set x to x + 1
  end while
 end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_while_do', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 0
  while x < 10
    set x to x + 1
  do
 end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

});