import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
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
    assertObjectCodeIsWithAdvisories,
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
  for i in range(1, 11)
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterfor6 = [..._stdlib.range(1, 11)];
  for (const i of elan_iterfor6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # change variable
  printNoLine(tot) # call procedure

main()
`;

    const csCode = `${testCSHeader}

static void main() {
  var tot = 0;
  foreach (i in range(1, 11)) {
    tot = tot + i; // change variable
  }
  printNoLine(tot); // call procedure
}
`;

    const javaCode = `${testJavaHeader}

static void main() {
  var tot = 0;
  foreach (i in range(1, 11)) {
    tot = tot + i; // change variable
  }
  printNoLine(tot); // call procedure
}
`;

    const vbCode = `${testVBHeader}

Sub main()
  Dim tot = 0 ' variable definition
  For Each i In range(1, 11)
    tot = tot + i ' change variable
  Next i
  printNoLine(tot) ' call procedure
End Sub
`;

    await assertExportedPythonIs(fileImpl, pythonCode);
    await assertExportedCSIs(fileImpl, csCode);
    await assertExportedJavaIs(fileImpl, javaCode);
    await assertExportedVBis(fileImpl, vbCode);
  });

  test("Pass_cannotReuseVariable", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  variable i set to 0
  for i in range(1, 11)
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      `The identifier 'i' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error`,
    ]);
  });

  test("Pass_withStep", async () => {
    const code = `${testHeader}

main
variable tot set to 0
for i in rangeInSteps(1, 11, 2)
  set tot to tot + i
end for
call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterfor6 = [..._stdlib.rangeInSteps(1, 11, 2)];
  for (const i of elan_iterfor6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in rangeInSteps(10, 3, -1)
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterfor6 = [..._stdlib.rangeInSteps(10, 3, (-1))];
  for (const i of elan_iterfor6) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "49");
  });

  test("Pass_innerLoop", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i in range(1, 4)
    for j in range(1, 5)
      set tot to tot + 1
    end for
  end for
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tot = 0;
  const elan_iterfor6 = [..._stdlib.range(1, 4)];
  for (const i of elan_iterfor6) {
    const elan_iterfor10 = [..._stdlib.range(1, 5)];
    for (const j of elan_iterfor10) {
      tot = tot + 1;
    }
  }
  await _stdlib.printNoLine(tot);
}
return [main, _tests];}`;
    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in rangeInSteps(lower, upper + 1, 2)
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let lower = 1;
  let upper = 10;
  let tot = 0;
  const elan_iterfor12 = [..._stdlib.rangeInSteps(lower, upper + 1, 2)];
  for (const i of elan_iterfor12) {
    tot = tot + i;
  }
  await _stdlib.printNoLine(tot);
}
return [main, _tests];}`;
    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(0, 11)
    call arr.put(i, 1)
  end for
  call printNoLine(arr[0])
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(11, 0);
  await foo(a);
}

async function foo(arr) {
  const elan_iterfor13 = [..._stdlib.range(0, 11)];
  for (const i of elan_iterfor13) {
    arr.put(i, 1);
  }
  await _stdlib.printNoLine(system.safeIndex(arr, 0));
}
global["foo"] = foo;
return [main, _tests];}`;
    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_updateLimit", async () => {
    const code = `${testHeader}

main
  variable limit set to 10
  for i in range(1, limit + 1)
    call printNoLine($"{i}")
    set limit to limit + 1
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let limit = 10;
  const elan_iterfor6 = [..._stdlib.range(1, limit + 1)];
  for (const i of elan_iterfor6) {
    await _stdlib.printNoLine(\`\${await _stdlib.toString(i)}\`);
    limit = limit + 1;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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

  test("Fail_reuseVariableDifferentType", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  variable i set to ""
  for i in range(1, 11)
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'i' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_useOfFloat", async () => {
    const code = `${testHeader}

main
  variable tot set to 0.0
  for i in range(1.5, 11.1).0
    set tot to tot + i
  end for
  call printNoLine(tot)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(1, 11)
    set i to 10
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(1, 11)
    set tot to 10
  end for
  call printNoLine(i)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(1, 4)
    for j in range(1, 5)  set tot to tot + 1
    end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  forfor i in range(1, 11)
  next i
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(1, 11)  set tot to tot + i
    break
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for i in range(1, 11)  set tot to tot + i
    continue
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for id in range(id, 12)
    call printNoLine(id)
  end for
  call printNoLine(ids)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
  for id in range(0, id + 1)
    call printNoLine(id)
  end for
  call printNoLine(ids)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
