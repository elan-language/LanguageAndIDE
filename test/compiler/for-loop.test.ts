import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertExportedCSIs,
  assertExportedJavaIs,
  assertExportedPythonIs,
  assertExportedVBis,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testCSHeader,
  testHash,
  testHeader,
  testJavaHeader,
  testPythonHeader,
  testVBHeader,
  transforms,
} from "./compiler-test-helpers";

suite("For Loop", () => {
  test("Pass_minimal", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 11)
    set tot to tot + i
  end each
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 10 + 1;
  for (let i = 1; i < _tofor6; i = i + 1) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "55");
    const pythonCode = `${testPythonHeader}

def main(): None:
  tot = 0 # variable
  each i in range(1, 11, 1):
    tot = tot + i # set
  printNoLine(tot) # call
`;

    const csCode = `${testCSHeader}

static void main() {
  var tot = 0;
  for (int i = 1; i < 10 + 1; i = i + 1) {
    tot = tot + i; // set
  }
  printNoLine(tot); // call
}
`;

    const javaCode = `${testJavaHeader}

static void main() {
  var tot = 0;
  for (int i = 1; i < 10 + 1; i = i + 1) {
    tot = tot + i; // set
  }
  printNoLine(tot); // call
}
`;

    const vbCode = `${testVBHeader}

Sub main()
  Dim tot = 0 ' variable
  For i = 1 To 10 + 1 - 1 Step 1
    tot = tot + i ' set
  Next i
  printNoLine(tot) ' call
End Sub
`;

    await assertExportedPythonIs(fileImpl, pythonCode);
    await assertExportedCSIs(fileImpl, csCode);
    await assertExportedJavaIs(fileImpl, javaCode);
    await assertExportedVBis(fileImpl, vbCode);
  });

  test("Pass_reuseVariable", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  variable i set to 0
  each i in range(1, 11)
    set tot to tot + i
  end each
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  let i = 0;
  const _tofor9 = 10 + 1;
  for (i = 1; i < _tofor9; i = i + 1) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_withStep", async () => {
    const code = `${testHeader}

main
variable tot set to 0
each i in rangeInSteps(1, 11, 2)
  set tot to tot + i
end each
call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 10 + 1;
  for (let i = 1; i < _tofor6; i = i + 2) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_negativeStep", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in rangeInSteps(10, 2, -1)
    set tot to tot + i
  end each
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 2;
  for (let i = 10; i > _tofor6; i = i - 1) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "52");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 4)
    each j in range(1, 5)
      set tot to tot + 1
    end each
  end each
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const _tofor6 = 3 + 1;
  for (let i = 1; i < _tofor6; i = i + 1) {
    const _tofor12 = 4 + 1;
    for (let j = 1; j < _tofor12; j = j + 1) {
      tot = tot + 1;
    }
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_canUseExistingVariablesOfRightType", async () => {
    const code = `${testHeader}

main
  variable lower set to 1
  variable upper set to 10
  variable tot set to 0
  each i in rangeInSteps(lower, upper + 1, 2)
    set tot to tot + i
  end each
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let lower = 1;
  let upper = 10;
  let tot = 0;
  const _tofor12 = upper + 1;
  for (let i = lower; i < _tofor12; i = i + 2) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
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
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_forInProcedure", async () => {
    const code = `${testHeader}

main
  variable a set to createList(11, 0)
  call foo(a)
end main

procedure foo(arr as List<of Int>)
  each i in range(0, 11)
    call arr.put(i, 1)
  end each
  call printNoLine(arr[0])
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(11, 0);
  await foo(a);
}

async function foo(arr) {
  const _tofor13 = 10 + 1;
  for (let i = 0; i < _tofor13; i = i + 1) {
    arr.put(i, 1);
  }
  await _stdlib.printNoLine(system.safeIndex(arr, 0));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_updateLimit", async () => {
    const code = `${testHeader}

main
  variable limit set to 10
  each i in range(1, limit + 1)
    call printNoLine($"{i}")
    set limit to limit + 1
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let limit = 10;
  const _tofor6 = limit + 1;
  for (let i = 1; i < _tofor6; i = i + 1) {
    await _stdlib.printNoLine(\`\${await _stdlib.asString(i)}\`);
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
      false,
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
  each i in range(1, 11)
    set tot to tot + i
  end each
  call printNoLine(tot)
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Int.LangRef.html#TypeCompileError"]);
  });

  test("Fail_useOfFloat", async () => {
    const code = `${testHeader}

main
  variable tot set to 0.0
  each i in range(1.5, 11.1).0
    set tot to tot + i
  end each
  call printNoLine(tot)
end main
`;

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

  test("Fail_modifyingCounter", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 11)
    set i to 10
  end each
end main
`;

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
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the loop counter 'i'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_scopeOfCounter", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 11)
    set tot to 10
  end each
  call printNoLine(i)
end main
`;

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
    assertDoesNotCompile(fileImpl, ["'i' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_missingEnd", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 4)
    each j in range(1, 5)  set tot to tot + 1
    end each
end main
`;

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
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_break", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 11)  set tot to tot + i
    break
  end each
end main
`;

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

  test("Fail_continue", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  each i in range(1, 11)  set tot to tot + i
    continue
  end each
end main
`;

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

  test("Fail_duplicateId1", async () => {
    const code = `${testHeader}

main
  variable ids set to 10
  each id in range(id, 12)
    call printNoLine(id)
  end each
  call printNoLine(ids)
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_duplicateId2", async () => {
    const code = `${testHeader}

main
  variable ids set to 10
  each id in range(0, id + 1)
    call printNoLine(id)
  end each
  call printNoLine(ids)
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });
});
