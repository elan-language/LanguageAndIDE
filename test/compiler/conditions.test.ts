import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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

suite("Conditions", () => {
  test("Pass_lessThan", async () => {
    const code = `${testHeader}

main
  print 3 < 4
  print 3 < 2
  print 3 < 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 < 4);
  await system.print(3 < 2);
  await system.print(3 < 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsefalse");
  });

  test("Pass_greaterThan", async () => {
    const code = `${testHeader}

main
  print 3 > 4
  print 3 > 2
  print 3 > 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 > 4);
  await system.print(3 > 2);
  await system.print(3 > 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_lessThanOrEqual", async () => {
    const code = `${testHeader}

main
  print 3 <= 4
  print 3 <= 2
  print 3 <= 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 <= 4);
  await system.print(3 <= 2);
  await system.print(3 <= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_greaterThanOrEqual", async () => {
    const code = `${testHeader}

main
  print 3 >= 4
  print 3 >= 2
  print 3 >= 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 >= 4);
  await system.print(3 >= 2);
  await system.print(3 >= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetrue");
  });

  test("Pass_isnt", async () => {
    const code = `${testHeader}

main
  print 3 isnt 4
  print 3 isnt 2
  print 3 isnt 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 !== 4);
  await system.print(3 !== 2);
  await system.print(3 !== 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Pass_is", async () => {
    const code = `${testHeader}

main
  print 3 is 4
  print 3 is 2
  print 3 is 3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print(3 === 4);
  await system.print(3 === 2);
  await system.print(3 === 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsetrue");
  });

  test("Pass_canCompareCoercibleTypes", async () => {
    const code = `${testHeader}

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
  await system.print(3 < 3.1);
  await system.print(3 <= 3.1);
  await system.print(3 > 3.1);
  await system.print(3 >= 3.1);
  await system.print(3 === 3);
  await system.print(3 !== 3);
  await system.print(3.1 < 3);
  await system.print(3.1 <= 3);
  await system.print(3.1 > 3);
  await system.print(3.1 >= 3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalsefalsetruefalsefalsefalsetruetrue");
  });

  test("Pass_combineComparisonWithArithmetic", async () => {
    const code = `${testHeader}

main
  print (5 + 3) > (4 + 2)
  print (5 + 3) is (4 + 4)
  print (5 + 3) > (4 + 6)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print((5 + 3) > (4 + 2));
  await system.print((5 + 3) === (4 + 4));
  await system.print((5 + 3) > (4 + 6));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_not_is", async () => {
    const code = `${testHeader}

main
  print 3 not is 3
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_not", async () => {
    const code = `${testHeader}

main
  print 3 not 3
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_notEqual", async () => {
    const code = `${testHeader}

main
  print 3 != 3
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_EqualToOrLessThan", async () => {
    const code = `${testHeader}

main
  print 3 =< 3
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Greater_Or_Equal", async () => {
    const code = `${testHeader}

main
  print 3 > or = 3
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_SingleEquals", async () => {
    const code = `${testHeader}

main
  print 3 = 4
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_compareDifferentTypes", async () => {
    const code = `${testHeader}

main
  print 3.isSameValueAs("3")
  print not 3.isSameValueAs("3")
  print 3 < "3"
  print 3 <= "3"
  print 3 > "3"
  print 3 >= "3"
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: parameter1 (Int), Provided: String.LangRef.html#compile_error",
      "Argument types. Expected: parameter1 (Int), Provided: String.LangRef.html#compile_error",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_greaterOrLessThan", async () => {
    const code = `${testHeader}

main
  print 3 <> 3  
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_doubleEquals", async () => {
    const code = `${testHeader}

main
  print 3 == 3  
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_combineComparisonWithArithmeticWithoutBrackets", async () => {
    const code = `${testHeader}

main
  print 5 + 3 > 4 + 2
end main`;
    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Boolean.LangRef.html#TypesCompileError",
    ]);
  });
});
