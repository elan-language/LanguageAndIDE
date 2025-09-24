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

suite("For Loop", () => {
  test("Pass_minimal", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 10;
  for (let i = 1; i <= _tofor6; i = i + 1) {
    tot = tot + i;
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_reuseVariable", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  variable i set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  let i = 0;
  const _tofor9 = 10;
  for (i = 1; i <= _tofor9; i = i + 1) {
    tot = tot + i;
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_withStep", async () => {
    const code = `${testHeader}

main
variable tot set to 0
for i from 1 to 10 step 2
  set tot to tot + i
end for
print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 10;
  for (let i = 1; i <= _tofor6; i = i + 2) {
    tot = tot + i;
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_negativeStep", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 10 to 3 step -1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 3;
  for (let i = 10; i >= _tofor6; i = i - 1) {
    tot = tot + i;
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "52");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1
      set tot to tot + 1
    end for
  end for
  print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 3;
  for (let i = 1; i <= _tofor6; i = i + 1) {
    const _tofor12 = 4;
    for (let j = 1; j <= _tofor12; j = j + 1) {
      tot = tot + 1;
    }
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_canUseExistingVariablesOfRightType", async () => {
    const code = `${testHeader}

main
  variable lower set to 1
  variable upper set to 10
  variable tot set to 0
  for i from lower to upper step 2
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let lower = 1;
  let upper = 10;
  let tot = 0;
  const _tofor12 = upper;
  for (let i = lower; i <= _tofor12; i = i + 2) {
    tot = tot + i;
  }
  await system.printLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_forInProcedure", async () => {
    const code = `${testHeader}

main
  variable a set to createList(11, 0)
  call foo(a)
end main

procedure foo(out arr as List<of Int>)
  for i from 0 to 10 step 1
    call arr.put(i, 1)
  end for
  print arr[0]
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(11, 0);
  let _a0 = [a];
  await foo(_a0);
  a = _a0[0];
}

async function foo(arr) {
  const _tofor13 = 10;
  for (let i = 0; i <= _tofor13; i = i + 1) {
    arr[0].put(i, 1);
  }
  await system.printLine(system.safeIndex(arr[0], 0));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_updateLimit", async () => {
    const code = `${testHeader}

main
  variable limit set to 10
  for i from 1 to limit step 1
    print "{i}"
    set limit to limit + 1
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let limit = 10;
  const _tofor6 = limit;
  for (let i = 1; i <= _tofor6; i = i + 1) {
    await system.printLine(\`\${await _stdlib.asString(i)}\`);
    limit = limit + 1;
  }
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
    await assertObjectCodeExecutes(fileImpl, "12345678910");
  });

  test("Fail_reuseVariableWrongType", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  variable i set to ""
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Int.LangRef.html#TypeCompileError"]);
  });

  test("Fail_useOfFloat", async () => {
    const code = `${testHeader}

main
  variable tot set to 0.0
  for i from 1.5 to 10.1 step 1.0
    set tot to tot + i
  end for
  print tot
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
      "Expression must be Int.LangRef.html#TypeCompileError",
      "Expression must be Int.LangRef.html#TypeCompileError",
      "Expression must be Int.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_modifyingCounter", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1
    set i to 10
  end for
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
      "May not re-assign the loop counter 'i'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_scopeOfCounter", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1
    set tot to 10
  end for
  print i
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
    assertDoesNotCompile(fileImpl, ["'i' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_missingEnd", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1  set tot to tot + 1
    end for
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

  test("Fail_nextVariable", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10  set tot to tot + i
  next i
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

  test("Fail_break", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1  set tot to tot + i
    break
  end for
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

  test("Fail_continue", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1  set tot to tot + i
    continue
  end for
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

  test("Fail_duplicateId1", async () => {
    const code = `${testHeader}

main
  variable ids set to 10
  for id from id to 11 step 1
    print id
  end for
  print ids
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
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_duplicateId2", async () => {
    const code = `${testHeader}

main
  variable ids set to 10
  for id from 0 to id step 1
    print id
  end for
  print ids
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
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });
});
