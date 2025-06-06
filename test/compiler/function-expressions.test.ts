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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Function Expressions", () => {
  test("Pass_LibraryConst", async () => {
    const code = `${testHeader}

main
  print pi
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.pi);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_SingleFunctionCall", async () => {
    const code = `${testHeader}

main
  variable x set to sin(pi / 180 * 30)
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.sin(_stdlib.pi / 180 * 30);
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_Sin", async () => {
    const code = `${testHeader}

main
  variable x set to  pi/180*30
  variable y set to sin(x)
  print y
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.pi / 180 * 30;
  let y = _stdlib.sin(x);
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_FunctionsInExpression", async () => {
    const code = `${testHeader}

main
  variable x set to pi/180*30
  variable y set to sin(x) + cos(x)
  print y
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.pi / 180 * 30;
  let y = _stdlib.sin(x) + _stdlib.cos(x);
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1.3660254037844386");
  });

  test("Pass_MoreComplexExpression", async () => {
    const code = `${testHeader}

main
  variable x set to 0.7
  variable y set to sin(x) ^ 2 + cos(x) ^ 2
  print y
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0.7;
  let y = _stdlib.sin(x) ** 2 + _stdlib.cos(x) ** 2;
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_MultiParamCall", async () => {
    const code = `${testHeader}

main
  variable x set to minFloat([3.1, 3])
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = _stdlib.minFloat(system.list([3.1, 3]));
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_MultiParamCallUsingDotSyntax", async () => {
    const code = `${testHeader}

main
  variable i set to ["a", "b"]
  variable x set to i.contains("b")
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let i = system.list(["a", "b"]);
  let x = i.contains("b");
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Fail_IncorrectType", async () => {
    const code = `${testHeader}

main
  variable x set to "hello".max()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'max' is not defined for type 'String'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnconsumedExpressionResult1", async () => {
    const code = `${testHeader}

main
  call sin(1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot call a function as a procedure.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnconsumedExpressionResult2", async () => {
    const code = `${testHeader}

main
  1 + 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UnconsumedExpressionResult3", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  call maxInt(a)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot call a function as a procedure.LangRef.html#compile_error",
    ]);
  });
});
