import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
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
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Throw Catch", () => {
  test("Pass_ThrowExceptionInMain", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    p1 = p1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

def main() -> None:
  raise ElanRuntimeError("Foo")
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test("Pass_ThrowExceptionInMainUsingVariableForMessage", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  raise ElanRuntimeError("Foo")
# end main

def main() -> None:
  msg = "Foo" # variable definition
  raise ElanRuntimeError(msg)
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let msg = "Foo";
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise(msg));
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test("Pass_ThrowExceptionUsingInterpolatedStringForMessage", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  msg = "Foo" # variable definition
  raise ElanRuntimeError(msg)
# end main

def main() -> None:
  bar = 1 # variable definition
  raise ElanRuntimeError(f"{bar}")
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = 1;
  throw new _stdlib.ElanRuntimeError(\`\${await _stdlib.toString(bar)}\`);
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
    await assertObjectCodeDoesNotExecute(fileImpl, "1");
  });

  test("Pass_ThrowExceptionInProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  bar = 1 # variable definition
  raise ElanRuntimeError(f"{bar}")
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_CatchException", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    printNoLine("Foo") # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {
    await _stdlib.printNoLine("Foo");
    }
    else {
      throw e;
    }
  }
}

async function foo() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_CatchUserException", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    printNoLine("Foo") # procedure call
  # end try
# end main

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except CustomError as e: # catch
    printNoLine(e) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise CustomError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.CustomError) {
    await _stdlib.printNoLine(e);
    }
    else {
      throw e;
    }
  }
}

async function foo() {
  throw system.initialise(await new _stdlib.CustomError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_CatchSystemGeneratedException", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except CustomError as e: # catch
    printNoLine(e) # procedure call
  # end try
# end main

def main() -> None:
  try:
    x = list[Foo]() # variable definition
    y = x[1] # variable definition
    z = y.p1 # variable definition
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    printNoLine(e) # procedure call
  # end try
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let x = system.initialise(await new _stdlib.List()._initialise());
    let y = system.safeIndex(x, 1);
    let z = y.p1;
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {
    await _stdlib.printNoLine(e);
    }
    else {
      throw e;
    }
  }
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "Out of range index: 1 size: 0");
  });

  test("Pass_UseException", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    x = list[Foo]() # variable definition
    y = x[1] # variable definition
    z = y.p1 # variable definition
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    printNoLine(e) # procedure call
  # end try
# end main

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    s = e.toString() # variable definition
    printNoLine(s) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    await _stdlib.printNoLine("not caught");
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {
    let s = (await _stdlib.toString(e));
    await _stdlib.printNoLine(s);
    }
    else {
      throw e;
    }
  }
}

async function foo() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_RedefineVariableinCatch", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except ElanRuntimeError as e: # catch
    s = e.toString() # variable definition
    printNoLine(s) # procedure call
  # end try
# end main

def main() -> None:
  try:
    a = 1 # variable definition
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = "fail" # variable definition
    printNoLine(a) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let a = 1;
    throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("fail"));
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {
    let a = "fail";
    await _stdlib.printNoLine(a);
    }
    else {
      throw e;
    }
  }
}

async function foo() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "fail");
  });

  test("Pass_UseOuterScopeVariableInCatch", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    a = 1 # variable definition
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = "fail" # variable definition
    printNoLine(a) # procedure call
  # end try
# end main

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine(a) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("fail"));
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {
    await _stdlib.printNoLine(a);
    }
    else {
      throw e;
    }
  }
}

async function foo() {
  throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("Foo"));
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_GhostedVariableInCatch", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine(a) # procedure call
  # end try
# end main

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = 1 # variable definition
  # end try
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  try {
    throw system.initialise(await new _stdlib.ElanRuntimeError()._initialise("fail"));
  } catch (e) {
    if (e instanceof _stdlib.ElanRuntimeError) {

    }
    else {
      throw e;
    }
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

  ignore_test("Pass_MultipleCatches", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = 1 # variable definition
  # end try
# end main

def main() -> None:
  a = 1 # variable definition
  try:
    raise exception()
  except CustomError as e: # catch
  # end try
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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

  test("Fail_ThrowExceptionInFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  try:
    raise exception()
  except CustomError as e: # catch
  # end try
# end main

def main() -> None:
  s = foo("s") # variable definition
# end main

def foo(x String) -> : # function
  return 
# end function

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

  test("Fail_catchMissingVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s = foo("s") # variable definition
# end main

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except CustomError as e: # catch
  # end try
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

  test("Fail_UseExpressionForMessage", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    foo() # procedure call
    printNoLine("not caught") # procedure call
  except CustomError as e: # catch
  # end try
# end main

def main() -> None:
  msg = "Foo" # variable definition
  raise ElanRuntimeError(msg + bar)
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

  test("Fail_TryVariableOutOfScopeInCatch", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  msg = "Foo" # variable definition
  raise ElanRuntimeError(msg + bar)
# end main

def main() -> None:
  try:
    a = 1 # variable definition
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine(a) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_RedefineVariableinCatch1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    a = 1 # variable definition
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine(a) # procedure call
  # end try
# end main

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = e # variable definition
    printNoLine(a) # procedure call
  # end try
# end main

def foo() -> None: # procedure
  raise ElanRuntimeError("Foo")
# end procedure

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

  test("Fail_ThrowWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  try:
    raise ElanRuntimeError("fail")
  except ElanRuntimeError as e: # catch
    a = e # variable definition
    printNoLine(a) # procedure call
  # end try
# end main

def main() -> None:
  try:
    raise FooException("fail")
  except ElanRuntimeError as e: # catch
    printNoLine("") # procedure call
  # end try
# end main

class FooException: # concrete class

  def __init__(self: FooException) -> None:

  # end constructor

  def toString(self: FooException) -> str: # function method
    return "Foo"
  # end function method

# end class

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
      "Can only throw or catch CustomError or ElanRuntimeErrorErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CatchWrongType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    raise FooException("fail")
  except ElanRuntimeError as e: # catch
    printNoLine("") # procedure call
  # end try
# end main

def main() -> None:
  try:
    raise CustomError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine("caught") # procedure call
  # end try
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
    assertObjectCodeDoesNotExecute(fileImpl, "a");
  });

  test("Fail_CatchWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    raise CustomError("fail")
  except ElanRuntimeError as e: # catch
    printNoLine("caught") # procedure call
  # end try
# end main

def main() -> None:
  try:
    raise CustomError("fail")
  except FooException as e: # catch
    printNoLine("") # procedure call
  # end try
# end main

class FooException: # concrete class

  def __init__(self: FooException) -> None:

  # end constructor

  def toString(self: FooException) -> str: # function method
    return "Foo"
  # end function method

# end class

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
      "Can only throw or catch CustomError or ElanRuntimeErrorErrorMessages.html#compile_error",
    ]);
  });
});
