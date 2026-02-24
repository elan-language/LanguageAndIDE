import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Arithmetic Expressions", () => {
  test("Pass_BracketsChangeOperatorEvaluation", async () => {
    const code = `${testHeader}

main
  variable x set to 2 + 3 * 5 + 1
  variable y set to (2 + 3) * 5 + 1
  variable z set to (2 + 3) * (5 + 1)
  call printNoLine(x)
  call printNoLine(y)
  call printNoLine(z)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + 3 * 5 + 1;
  let y = (2 + 3) * 5 + 1;
  let z = (2 + 3) * (5 + 1);
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test("Pass_RedundantBracketsIgnored", async () => {
    const code = `${testHeader}

    main
    variable x set to 2 + (3 * 5) + 1
    variable y set to ((2 + 3)) * 5 + (1)
    variable z set to ((2 + 3) * (5 + 1))
    call printNoLine(x)
    call printNoLine(y)
    call printNoLine(z)
  end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + (3 * 5) + 1;
  let y = ((2 + 3)) * 5 + (1);
  let z = ((2 + 3) * (5 + 1));
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThatMultiply", async () => {
    const code = `${testHeader}

main
  variable x set to 2 + 3 ^ 2
  variable y set to (2 + 3) ^ 2
  call printNoLine(x)
  call printNoLine(y)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + 3 ** 2;
  let y = (2 + 3) ** 2;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1125");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThanFloatDivision", async () => {
    const code = `${testHeader}

main
  variable x set to 16.0 / 2 ^ 3
  variable y set to (16.0 / 2) ^ 3
  call printNoLine(x)
  call printNoLine(y)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 16 / 2 ** 3;
  let y = (16 / 2) ** 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThanDivision", async () => {
    const code = `${testHeader}

main
  variable x set to 16.0 / 2 ^ 3
  variable y set to (16.0 / 2) ^ 3
  call printNoLine(x)
  call printNoLine(y)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 16 / 2 ** 3;
  let y = (16 / 2) ** 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test("Pass_MinusAsAUnaryOperator", async () => {
    const code = `${testHeader}

main
  variable x set to 0.0
  variable y set to 0
  set x to - 4.7
  set y to 5 * -3
  call printNoLine(x)
  call printNoLine(y)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  let y = 0;
  x = (-4.7);
  y = 5 * (-3);
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "-4.7-15");
  });

  test("Pass_OperatorPrecedenceForMod", async () => {
    const code = `${testHeader}

main
  variable x set to 11 mod 3
  variable y set to (5 + 6) mod 3
  call printNoLine(x)
  call printNoLine(y)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 11 % 3;
  let y = (5 + 6) % 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "22");
  });

  test("Fail_PlusIsNotUnary", async () => {
    const code = `${testHeader}

main
  variable a set to 3 * + 4
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MultiplyAfterMinus", async () => {
    const code = `${testHeader}

main
  variable a set to 3 - * 4
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_OperatorOrder#1167", async () => {
    const code = `${testHeader}

main
  call printNoLine(2*12/3.0 + 190)
  call printNoLine(24/6/2.0)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(2 * 12 / 3 + 190);
  await _stdlib.printNoLine(24 / 6 / 2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1982");
  });
  test("Pass_NaN#1167", async () => {
    const code = `${testHeader}

main
  call printNoLine(sqrt(-1))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.sqrt((-1)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "NaN");
  });
  test("Pass_Infinity#1167", async () => {
    const code = `${testHeader}

main
  call printNoLine(1.0/0)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(1 / 0);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Infinity");
  });
});
