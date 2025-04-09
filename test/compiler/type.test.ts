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

suite("Type", () => {
  test("Pass_VariableType", async () => {
    const code = `${testHeader}

main
  variable x set to typeof Float
  print foo(x)
end main

function foo(t as Type) returns Type
  return t
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = "Float";
  await system.printLine((await global.foo(x)));
}

async function foo(t) {
  return t;
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Float");
  });

  test("Pass_TypeOfValueTypes", async () => {
    const code = `${testHeader}

main
  variable x set to [1,2,3]
  variable y set to [1.1, 2.2, 3.3]
  set y to x.asListOf(typeof Float)
  print y
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.list([1, 2, 3]);
  let y = system.list([1.1, 2.2, 3.3]);
  y = x.asListOf("Float");
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3]");
  });

  test("Pass_asVariableTypes", async () => {
    const code = `${testHeader}

main
  variable t set to typeof Float
  variable x set to [1,2,3]
  variable y set to [1.1, 2.2, 3.3]
  set y to x.asListOf(t)
  print y
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = "Float";
  let x = system.list([1, 2, 3]);
  let y = system.list([1.1, 2.2, 3.3]);
  y = x.asListOf(t);
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3]");
  });

  test("Fail_WrongTypeOfValueTypes", async () => {
    const code = `${testHeader}

main
  variable x set to [1,2,3]
  variable y set to [1.1, 2.2, 3.3]
  set x to x.asListOf(typeof Float)
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of Int> Provided: List<of Float>",
    ]);
  });

  test("Fail_TypeOfViaFunc", async () => {
    const code = `${testHeader}

main
  variable x set to [1,2,3]
  variable y set to [1.1, 2.2, 3.3]
  set y to x.asListOf(foo())
  print y
end main

function foo() returns Type
  return typeof Float
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of Float> Provided: List<of Unknown>",
    ]);
  });

  test("Fail_MissingTypeOf", async () => {
    const code = `${testHeader}

main
  print foo(Int)
end main

function foo(t as Type) returns Type
  return t
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
    // assertParses(fileImpl);
    // assertStatusIsValid(fileImpl);
    // assertDoesNotCompile(fileImpl, [""]);
  });

  test("Fail_TypeOfNotType", async () => {
    const code = `${testHeader}

main
  print foo(typeof 0)
end main

function foo(t as Type) returns Type
  return t
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TypeOfInExpression1", async () => {
    const code = `${testHeader}

main
  print typeof Int + ""
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
    // assertParses(fileImpl);
    // assertStatusIsValid(fileImpl);
    // assertDoesNotCompile(fileImpl, [""]);
  });

  test("Fail_TypeOfInExpression2", async () => {
    const code = `${testHeader}

main
  print 1 + typeof Int
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Float or Int Provided: Type"]);
  });
});
