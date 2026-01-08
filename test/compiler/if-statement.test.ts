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

suite("If Statement", () => {
  test("Pass_1", async () => {
    const code = `${testHeader}

main
  variable a set to true
  if a then
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.true;
  if (a) {
    await system.print("yes");
  } else {
    await system.print("no");
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
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_2", async () => {
    const code = `${testHeader}

main
  variable a set to false
  if a then
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.false;
  if (a) {
    await system.print("yes");
  } else {
    await system.print("no");
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
    await assertObjectCodeExecutes(fileImpl, "no");
  });

  test("Pass_3", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await system.print("one");
  } else if (a === 2) {
    await system.print("two");
  } else {
    await system.print("neither");
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
    await assertObjectCodeExecutes(fileImpl, "two");
  });

  test("Pass_4", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("one");
  } else if (a === 2) {
    await system.print("two");
  } else {
    await system.print("neither");
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
    await assertObjectCodeExecutes(fileImpl, "neither");
  });

  test("Pass_5", async () => {
    const code = `${testHeader}

main
  variable a set to true
  if a then
    print "yes"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.true;
  if (a) {
    await system.print("yes");
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
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_6", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else if a is 3 then
    print "three"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("one");
  } else if (a === 2) {
    await system.print("two");
  } else if (a === 3) {
    await system.print("three");
  } else {
    await system.print("neither");
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
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Pass_7_end_with_else_if", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else if a is 3 then
    print "three"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("one");
  } else if (a === 2) {
    await system.print("two");
  } else if (a === 3) {
    await system.print("three");
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
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Pass_variableInIf", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    set a to 2
  end if
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInIf", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    variable b set to a
    set b to 2
    print b
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    let b = a;
    b = 2;
    await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_variableInElse", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print ""
  else
    set a to 3
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("");
  } else {
    a = 3;
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInElse", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print ""
  else
    variable b set to a
    set b to 2
    print b
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("");
  } else {
    let b = a;
    b = 2;
    await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_reusevariableInElse", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    let b be 1
    print b
  else
    let b be a
    print b
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    const b = 1;
    await system.print(b);
  } else {
    const b = a;
    await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_variableInElseIf", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print ""
  else if a is 2 then 
    set a to 3
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    await system.print("");
  } else if (a === 2) {
    a = 3;
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_localVariableInElseIf", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  if a is 1 then
    print ""
  else if a is 2 then
    variable b set to a
    set b to 2
    print b
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await system.print("");
  } else if (a === 2) {
    let b = a;
    b = 2;
    await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_ghostedVariableInElse", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  if a is 1 then
    print ""
  else 
    [ghosted] let b be 2
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await system.print("");
  } else {

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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_NestedlocalVariableInElse", async () => {
    const code = `${testHeader}

main
  variable a set to 2
  if a is 1 then
    print ""
  else if a is 2 then
    variable b set to a
    for i from 0 to 5 step 1
      set b to b + i
    end for
    print b
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    await system.print("");
  } else if (a === 2) {
    let b = a;
    const _tofor17 = 5;
    for (let i = 0; i <= _tofor17; i = i + 1) {
      b = b + i;
    }
    await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "17");
  });

  test("Fail_noEndIf", async () => {
    const code = `${testHeader}

main
  variable a set to true
  if a
    print "yes"
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TwoElses", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print "one"
  else
    print "not one"
  else
    print "two"
  end if
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
      "Cannot have any clause after unconditional 'else'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ElseIfAfterElse", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a is 1 then
    print "one"
  else
    print "not one"
  else if a is 2 then
    print "two"
  end if
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
      "Cannot have any clause after unconditional 'else'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IfConditionNotBool", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  if a then
    print "yes"
  else
    print "no"
  end if
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
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean.LangRef.html#TypeCompileError"]);
  });

  test("Fail_ElseConditionNotBool", async () => {
    const code = `${testHeader}

  main
    variable a set to 2
    if a is 1 then
      print "one"
    else if a then
      print "two"
    else
      print "neither"
    end if
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
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean.LangRef.html#TypeCompileError"]);
  });

  test("Fail_RedefineVariable in if", async () => {
    const code = `${testHeader}

  main
    variable a set to 2
    if a is 1 then
      variable a set to 3
    else if a is 2 then
      print "two"
    else
      print "neither"
    end if
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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_RedefineVariable in else if", async () => {
    const code = `${testHeader}

  main
    variable a set to 2
    if a is 1 then
      print "one"
    else if a is 2 then
      variable a set to 3
    else
      print "neither"
    end if
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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_RedefineVariable in else", async () => {
    const code = `${testHeader}

  main
    variable a set to 2
    if a is 1 then
      print "one"
    else if a is 2 then
      print "two"
    else
      variable a set to 3
    end if
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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_useOutOfScopeVariable", async () => {
    const code = `${testHeader}

  main
    variable a set to 2
    if a is 1 then
      variable b set to 2
    else if a is 2 then
      print b
    else
      variable c set to 2
    end if
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
    assertDoesNotCompile(fileImpl, ["'b' is not defined.LangRef.html#compile_error"]);
  });
});
