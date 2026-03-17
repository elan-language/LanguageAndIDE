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
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Throw Catch", () => {
  test("Pass_ThrowExceptionInMain", async () => {
    const code = `${testHeader}

main
    throw ElanRuntimeError "Foo"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  throw new _stdlib.ElanRuntimeError("Foo");
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

  ignore_test("Pass_ThrowExceptionInMainUsingVariableForMessage", async () => {
    const code = `${testHeader}

main
  variable msg set to "Foo"
  throw ElanRuntimeError msg
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let msg = "Foo";
  throw new _stdlib.ElanRuntimeError(msg);
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

  ignore_test("Pass_ThrowExceptionUsingInterpolatedStringForMessage", async () => {
    const code = `${testHeader}

main
  variable bar set to 1
  throw ElanRuntimeError $"{bar}"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = 1;
  throw new _stdlib.ElanRuntimeError(\`\${await _stdlib.asString(bar)}\`);
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
  throw ElanRuntimeError "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  throw new _stdlib.ElanRuntimeError("Foo");
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
  catch ElanException
    call printNoLine("Foo")
  end try
end main

procedure foo()
  throw ElanRuntimeError "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {
    await _stdlib.printNoLine("Foo");
    }
  }
}

async function foo() {
  throw new _stdlib.ElanRuntimeError("Foo");
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
  catch ElanException
    call printNoLine("Out of range index: 1 size: 0")
  end try
end main

class Foo
    constructor()
    end constructor
  function asString() returns String
    return ""
  end function

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
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {
    await _stdlib.printNoLine("Out of range index: 1 size: 0");
    }
  }
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  async asString() {
    return "";
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

  test("Pass_CatchUserException", async () => {
    const code = `${testHeader}

main
  try
    throw FooException "foo"
  catch FooException
    call printNoLine("Foo Caught")
  end try
end main

class FooException inherits ElanException
  constructor(msg as String)
  end constructor

  function asString() returns String
    return "Foo"
  end function
 
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    throw new FooException("foo");
  } catch (e) {
    if (e instanceof FooException) {
    await _stdlib.printNoLine("Foo Caught");
    }
  }
}

class FooException extends ElanException {
  static emptyInstance() { return system.emptyClass(FooException, []);};

  async _initialise(msg) {

    return this;
  }

  async asString() {
    return "Foo";
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
    await assertObjectCodeExecutes(fileImpl, "Out of range index: 1 size: 0");
  });

  test("Pass_UseException", async () => {
    const code = `${testHeader}

main
  try
    call foo()
    call printNoLine("not caught")
  catch ElanException
    variable s set to "Foo"
    call printNoLine(s)
  end try
end main
  
procedure foo()
  throw ElanRuntimeError "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {
    let s = "Foo";
    await _stdlib.printNoLine(s);
    }
  }
}

async function foo() {
  throw new _stdlib.ElanRuntimeError("Foo");
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
    throw ElanRuntimeError "fail"
  catch ElanException
    variable a set to "fail"
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw ElanRuntimeError "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let a = 1;
    throw new _stdlib.ElanRuntimeError("fail");
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {
    let a = "fail";
    await _stdlib.printNoLine(a);
    }
  }
}

async function foo() {
  throw new _stdlib.ElanRuntimeError("Foo");
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
    throw ElanRuntimeError "fail"
  catch ElanException
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw ElanRuntimeError "Foo"
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw new _stdlib.ElanRuntimeError("fail");
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {
    await _stdlib.printNoLine(a);
    }
  }
}

async function foo() {
  throw new _stdlib.ElanRuntimeError("Foo");
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
    throw ElanRuntimeError "fail"
  catch ElanException
    [ghosted] constant a set to 1
  end try
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw new _stdlib.ElanRuntimeError("fail");
  } catch (e) {
    if (e instanceof _stdlib.ElanException) {

    }
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

  ignore_test("Pass_MultipleCatches", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  try
    throw exception "fail"
  catch ElanRuntimeError in e
    constant b set to 2

  catch ElanRuntimeError in e
    constant a set to 1
  end try
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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
  throw ElanRuntimeError x
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
  throw ElanRuntimeError "Foo"
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
  throw ElanRuntimeError msg + bar
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
    throw ElanRuntimeError "fail"
  catch ElanRuntimeError
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw ElanRuntimeError "Foo"
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
    throw ElanRuntimeError "fail"
  catch ElanRuntimeError
    variable a set to e
    call printNoLine(a)
  end try
end main
  
procedure foo()
  throw ElanRuntimeError "Foo"
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
    assertDoesNotCompile(fileImpl, ["'e' is not defined.LangRef.html#compile_error"]);
  });
});
