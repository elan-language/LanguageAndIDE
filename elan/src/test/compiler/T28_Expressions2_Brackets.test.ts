import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T28_Expressions2_Brackets', () => {

  test('Pass_BracketsChangeOperatorEvaluation', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 2 + 3 * 5 + 1
  var y set to (2 + 3) * 5 + 1
  var z set to (2 + 3) * (5 + 1)
  print x
  print y
  print z
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 2 + 3 * 5 + 1;
  var y = (2 + 3) * 5 + 1;
  var z = (2 + 3) * (5 + 1);
  system.print(system.asString(x));
  system.print(system.asString(y));
  system.print(system.asString(z));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test('Pass_RedundantBracketsIgnored', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

    main
    var x set to 2 + (3 * 5) + 1
    var y set to ((2 + 3)) * 5 + (1)
    var z set to ((2 + 3) * (5 + 1))
    print x
    print y
    print z
  end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 2 + (3 * 5) + 1;
  var y = ((2 + 3)) * 5 + (1);
  var z = ((2 + 3) * (5 + 1));
  system.print(system.asString(x));
  system.print(system.asString(y));
  system.print(system.asString(z));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test('Pass_PowerHasHigherPrecedenceThatMultiply', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 2 + 3 ^ 2
  var y set to (2 + 3) ^ 2
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 2 + 3 ** 2;
  var y = (2 + 3) ** 2;
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1125");
  });

  test('Pass_PowerHasHigherPrecedenceThanFloatDivision', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 16.0 / 2 ^ 3
  var y set to (16.0/2) ^ 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 16 / 2 ** 3;
  var y = (16 / 2) ** 3;
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test('Pass_PowerHasHigherPrecedenceThanIntDivision', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 16 / 2 ^ 3
  var y set to (16 / 2) ^ 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 16 / 2 ** 3;
  var y = (16 / 2) ** 3;
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test('Pass_MinusAsAUnaryOperator', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to - 4.7
  var y set to 5 * -3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = -4.7;
  var y = 5 * -3;
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "-4.7-15");
  });

  test('Pass_OperatorPrecedenceForMod', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 11 mod 3
  var y set to 5 + 6 mod 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = 11 % 3;
  var y = 5 + 6 % 3;
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test('Pass_OperatorPrecedenceForDiv', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 11 div 3
  var y set to 5 + 6 div 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = Math.floor(11 / 3);
  var y = 5 + Math.floor(6 / 3);
  system.print(system.asString(x));
  system.print(system.asString(y));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

 

  // TODO fails

});