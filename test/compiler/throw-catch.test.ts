import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Throw Catch", () => {
  test("Pass_ThrowExceptionInMain", async () => {
    const code = `${testHeader}

main
    throw exception "Foo"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  throw new Error("Foo");
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_ThrowExceptionInMainUsingVariableForMessage", async () => {
    const code = `${testHeader}

main
  variable msg set to "Foo"
  throw exception msg
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let msg = "Foo";
  throw new Error(msg);
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_ThrowExceptionUsingInterpolatedStringForMessage", async () => {
    const code = `${testHeader}

main
  variable bar set to 1
  throw exception "{bar}"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = 1;
  throw new Error(\`\${await _stdlib.asString(bar)}\`);
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
    await assertObjectCodeDoesNotExecute(fileImpl, "1");
  });

  test("Pass_ThrowExceptionInProcedure", async () => {
    const code = `${testHeader}

main
  call foo()
end main
 
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  throw new Error("Foo");
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_CatchException", async () => {
    const code = `${testHeader}

main
  try
    call foo()
    call printNoLine("not caught")
  catch exception in e
    call printNoLine(e)
  end try
end main

procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (_e) {
    let e = _e.message;
    await _stdlib.printNoLine(e);
  }
}

async function foo() {
  throw new Error("Foo");
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_CatchSystemGeneratedException", async () => {
    const code = `${testHeader}

main
  try
    variable x set to new List<of Foo>()
    variable y set to x[1]
    variable z set to y.p1
    call printNoLine("not caught")
  catch exception in e
    call printNoLine(e)
  end try
end main

class Foo
    constructor()
    end constructor

    property p1 as Int

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let x = system.initialise(await new _stdlib.List()._initialise());
    let y = system.safeIndex(x, 1);
    let z = y.p1;
    await _stdlib.printNoLine("not caught");
  } catch (_e) {
    let e = _e.message;
    await _stdlib.printNoLine(e);
  }
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "Out of range index: 1 size: 0");
  });

  test("Pass_UseException", async () => {
    const code = `${testHeader}

main
  try
    call foo()
    call printNoLine("not caught")
  catch exception in e
    variable s set to ""
    set s to e
    call printNoLine(s)
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (_e) {
    let e = _e.message;
    let s = "";
    s = e;
    await _stdlib.printNoLine(s);
  }
}

async function foo() {
  throw new Error("Foo");
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_RedefineVariableinCatch", async () => {
    const code = `${testHeader}

main
  try
    variable a set to 1
    throw exception "fail"
  catch exception in e
    variable a set to e
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let a = 1;
    throw new Error("fail");
  } catch (_e) {
    let e = _e.message;
    let a = e;
    await _stdlib.printNoLine(a);
  }
}

async function foo() {
  throw new Error("Foo");
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
    await assertObjectCodeExecutes(fileImpl, "fail");
  });

  test("Pass_UseOuterScopeVariableInCatch", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  try
    throw exception "fail"
  catch exception in e
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw new Error("fail");
  } catch (_e) {
    let e = _e.message;
    await _stdlib.printNoLine(a);
  }
}

async function foo() {
  throw new Error("Foo");
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

  test("Pass_GhostedVariableInCatch", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  try
    throw exception "fail"
  catch exception in e
    [ghosted] constant a set to 1
  end try
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw new Error("fail");
  } catch (_e) {
    let e = _e.message;

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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_ThrowExceptionInFunction", async () => {
    const code = `${testHeader}

main
  variable s set to foo("s")
end main
 
function foo(x String) as String
  throw exception x
  return x
end function
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

  test("Fail_catchMissingVariable", async () => {
    const code = `${testHeader}

main
  try
    call foo()
    call printNoLine("not caught")
  catch
    call printNoLine("caught")
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure
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

  test("Fail_UseExpressionForMessage", async () => {
    const code = `${testHeader}

main
  variable msg set to "Foo"
  throw exception msg + bar
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

  test("Fail_TryVariableOutOfScopeInCatch", async () => {
    const code = `${testHeader}

main
  try
    variable a set to 1
    throw exception "fail"
  catch exception in e
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'a' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_RedefineVariableinCatch1", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  try
    throw exception "fail"
  catch exception in e
    variable a set to e
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure`;

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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });
});
