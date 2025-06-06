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

suite("Logical Operators", () => {
  test("Pass_and", async () => {
    const code = `${testHeader}

main
  variable a set to false and false
  variable b set to false and true
  variable c set to true and false
  variable d set to true and true
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.false && _stdlib.false;
  let b = _stdlib.false && _stdlib.true;
  let c = _stdlib.true && _stdlib.false;
  let d = _stdlib.true && _stdlib.true;
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(c);
  await system.printLine(d);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsetrue");
  });

  test("Pass_or", async () => {
    const code = `${testHeader}

main
  variable a set to false or false
  variable b set to false or true
  variable c set to true or false
  variable d set to true or true
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.false || _stdlib.false;
  let b = _stdlib.false || _stdlib.true;
  let c = _stdlib.true || _stdlib.false;
  let d = _stdlib.true || _stdlib.true;
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(c);
  await system.printLine(d);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetrue");
  });

  test("Pass_not", async () => {
    const code = `${testHeader}

main
  variable a set to not false
  variable b set to not true
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = !_stdlib.false;
  let b = !_stdlib.true;
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_Precedence", async () => {
    const code = `${testHeader}

main
  variable a set to not false and true
  variable b set to not (false and true)
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = !_stdlib.false && _stdlib.true;
  let b = !(_stdlib.false && _stdlib.true);
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });
  test("Pass_CombineLogicalOpsWithComparison1", async () => {
    const code = `${testHeader}

main 
  variable a set to (4 > 3) and (6 > 5)
  variable b set to (3 > 4) or (6 is 6)
  variable c set to not (4 > 3)
  print a
  print b
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (4 > 3) && (6 > 5);
  let b = (3 > 4) || (6 === 6);
  let c = !(4 > 3);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });
  test("Pass_CombineLogicalOpsWithComparison2", async () => {
    const code = `${testHeader}

main 
  variable a set to (true and false) is (true or false)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (_stdlib.true && _stdlib.false) === (_stdlib.true || _stdlib.false);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Fail_TypeCheck", async () => {
    const code = `${testHeader}

main
  variable a set to false and 1
  variable b set to 1 and true
  variable c set to 1 and 1
  variable d set to true or 0
  variable e set to 0 or true
  variable f set to 0 or 0
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets", async () => {
    const code = `${testHeader}

main 
  variable a set to 4 > 3 and 6 > 5
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Boolean.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets2", async () => {
    const code = `${testHeader}

main 
  variable a set to not 4 > 3
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Boolean.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparison2WithoutBrackets", async () => {
    const code = `${testHeader}

main 
  variable a set to true and false is true or false
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.true && _stdlib.false === _stdlib.true || _stdlib.false;
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Fail_UseNotWithTwoArgs", async () => {
    const code = `${testHeader}

main
  variable a set to true not false
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_xor", async () => {
    const code = `${testHeader}

main
  variable a set to false xor false
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_notOnNonBoolean1", async () => {
    const code = `${testHeader}

main
  variable a set to not 1
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_notOnNonBoolean2", async () => {
    const code = `${testHeader}

main
  variable a set to "fred"
  variable b set to not a
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_minusOnNonNumber1", async () => {
    const code = `${testHeader}

main
  variable a set to - true
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Boolean.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_minusOnNonNumber2", async () => {
    const code = `${testHeader}

main
  variable a set to "fred"
  variable b set to -a
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });
});
