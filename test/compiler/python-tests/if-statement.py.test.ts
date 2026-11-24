import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "../compiler-test-helpers";

suite("Python If Statement", () => {
  test("Pass_1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True # variable definition
  if a:
    printNoLine("yes") 
  else:
    printNoLine("no") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = true;
  if (a) {
    await _stdlib.printNoLine("yes");
  } else {
    await _stdlib.printNoLine("no");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False # variable definition
  if a:
    printNoLine("yes") 
  else:
    printNoLine("no") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = false;
  if (a) {
    await _stdlib.printNoLine("yes");
  } else {
    await _stdlib.printNoLine("no");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "no");
  });

  test("Pass_3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    printNoLine("two") 
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await _stdlib.printNoLine("one");
  } else if (a === 2) {
    await _stdlib.printNoLine("two");
  } else {
    await _stdlib.printNoLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "two");
  });

  test("Pass_4", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    printNoLine("two") 
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("one");
  } else if (a === 2) {
    await _stdlib.printNoLine("two");
  } else {
    await _stdlib.printNoLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "neither");
  });

  test("Pass_5", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True # variable definition
  if a:
    printNoLine("yes") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = true;
  if (a) {
    await _stdlib.printNoLine("yes");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_6", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    printNoLine("two") 
  elif a == 3: # else if
    printNoLine("three") 
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("one");
  } else if (a === 2) {
    await _stdlib.printNoLine("two");
  } else if (a === 3) {
    await _stdlib.printNoLine("three");
  } else {
    await _stdlib.printNoLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Pass_7_end_with_else_if", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    printNoLine("two") 
  elif a == 3: # else if
    printNoLine("three") 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("one");
  } else if (a === 2) {
    await _stdlib.printNoLine("two");
  } else if (a === 3) {
    await _stdlib.printNoLine("three");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Pass_variableInIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    a = 2 # assignment
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    a = 2;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    b = a # variable definition
    b = 2 # assignment
    printNoLine(b) 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    let b = a;
    b = 2;
    await _stdlib.printNoLine(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_variableInElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("") 
  else:
    a = 3 # assignment
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else {
    a = 3;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("") 
  else:
    b = a # variable definition
    b = 2 # assignment
    printNoLine(b) 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else {
    let b = a;
    b = 2;
    await _stdlib.printNoLine(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_reusevariableInElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    b = 1 # variable definition
    printNoLine(b) 
  else:
    b = a # variable definition
    printNoLine(b) 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    let b = 1;
    await _stdlib.printNoLine(b);
  } else {
    let b = a;
    await _stdlib.printNoLine(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_variableInElseIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("") 
  elif a == 2: # else if
    a = 3 # assignment
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else if (a === 2) {
    a = 3;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInElseIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("") 
  elif a == 2: # else if
    b = a # variable definition
    b = 2 # assignment
    printNoLine(b) 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else if (a === 2) {
    let b = a;
    b = 2;
    await _stdlib.printNoLine(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  // triage: (not sure why this test is *here*, but doesn't like the [ghosted] annotation)
  ignore_test("Pass_ghostedVariableInElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("") 
  else:
    [ghosted] b = 2 # variable definition
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else {

  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_NestedlocalVariableInElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("") 
  elif a == 2: # else if
    b = a # variable definition
    for i in range(0, 6):
      b = b + i # assignment
    # end for
    printNoLine(b) 
  # end if
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await _stdlib.printNoLine("");
  } else if (a === 2) {
    let b = a;
    const elan_iterpython_for21 = [..._stdlib.range(0, 6)];
    for (const i of elan_iterpython_for21) {
      b = b + i;
    }
    await _stdlib.printNoLine(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "17");
  });

  test("Fail_noEndIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True # variable definition
  if a:
    printNoLine(a)
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TwoElses", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("one") 
  else:
    printNoLine("not one") 
  else:
    printNoLine("two") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ElseIfAfterElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a == 1:
    printNoLine("one") 
  else:
    printNoLine("not one") 
  elif a == 2: # else if
    printNoLine("two") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_IfConditionNotBool", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  if a:
    printNoLine("yes") 
  else:
    printNoLine("no") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be bool.ErrorMessages.html#TypeCompileError"]);
  });

  test("Fail_ElseConditionNotBool", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a: # else if
    printNoLine("two") 
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be bool.ErrorMessages.html#TypeCompileError"]);
  });

  test("Fail_RedefineVariable in if", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    a = 3 # variable definition
  elif a == 2: # else if
    printNoLine("two") 
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
      "The identifier 'a' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_RedefineVariable in elif", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    a = 3 # variable definition
  else:
    printNoLine("neither") 
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
      "The identifier 'a' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_RedefineVariable in else", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    printNoLine("one") 
  elif a == 2: # else if
    printNoLine("two") 
  else:
    a = 3 # variable definition
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
      "The identifier 'a' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_useOutOfScopeVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    b = 2 # variable definition
  elif a == 2: # else if
    printNoLine(b) 
  else:
    c = 2 # variable definition
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'b' is not defined.ErrorMessages.html#compile_error"]);
  });
});
