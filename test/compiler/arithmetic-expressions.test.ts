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

suite("Arithmetic Expressions", () => {
  test("Pass_BracketsChangeOperatorEvaluation", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 2 + 3 * 5 + 1
  variable y set to (2 + 3) * 5 + 1
  variable z set to (2 + 3) * (5 + 1)
  print x
  print y
  print z
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 2 + 3 * 5 + 1;
  var y = (2 + 3) * 5 + 1;
  var z = (2 + 3) * (5 + 1);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test("Pass_RedundantBracketsIgnored", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
    variable x set to 2 + (3 * 5) + 1
    variable y set to ((2 + 3)) * 5 + (1)
    variable z set to ((2 + 3) * (5 + 1))
    print x
    print y
    print z
  end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 2 + (3 * 5) + 1;
  var y = ((2 + 3)) * 5 + (1);
  var z = ((2 + 3) * (5 + 1));
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test("Pass_PowerHasHigherPrecedenceThatMultiply", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 2 + 3 ^ 2
  variable y set to (2 + 3) ^ 2
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 2 + 3 ** 2;
  var y = (2 + 3) ** 2;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1125");
  });

  test("Pass_PowerHasHigherPrecedenceThanFloatDivision", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 16.0 / 2 ^ 3
  variable y set to (16.0 / 2) ^ 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 16 / 2 ** 3;
  var y = (16 / 2) ** 3;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test("Pass_PowerHasHigherPrecedenceThanIntDivision", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 16 / 2 ^ 3
  variable y set to (16 / 2) ^ 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 16 / 2 ** 3;
  var y = (16 / 2) ** 3;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test("Pass_MinusAsAUnaryOperator", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0.0
  variable y set to 0
  set x to - 4.7
  set y to 5 * -3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 0;
  var y = 0;
  x = -4.7;
  y = 5 * -3;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "-4.7-15");
  });

  test("Pass_OperatorPrecedenceForMod", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 11 mod 3
  variable y set to (5 + 6) mod 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 11 % 3;
  var y = (5 + 6) % 3;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "22");
  });

  test("Pass_OperatorPrecedenceForDiv", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 11 div 3
  variable y set to (5 + 6) div 3
  print x
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = Math.floor(11 / 3);
  var y = Math.floor((5 + 6) / 3);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "33");
  });

  test("Fail_PlusIsNotUnary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3 * + 4
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MultiplyAfterMinus", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3 - * 4
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
