import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Impure Function", () => {
  test("Pass_CanUseImpureMethodsWithinExpressionsInMainOrProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 # variable definition
  if a == 1:
    b = 2 # variable definition
  elif a == 2: # else if
    printNoLine(b) # procedure call
  else:
    c = 2 # variable definition
  # end if
# end main

def main() -> None:
  k = getKey() # variable definition
  r = randint(1, 6) # variable definition
  r = randint(1, 6)*10 # assignment
  bar(randint(1, 6)) # procedure call
# end main

def foo() -> None: # procedure
  k = getKey() # variable definition
  r = randint(1, 6) # variable definition
  r = randint(1, 6)*10 # assignment
# end procedure

def bar(x: int) -> None: # procedure

# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let k = (await _stdlib.getKey());
  let r = _stdlib.randint(1, 6);
  r = _stdlib.randint(1, 6) * 10;
  await bar(_stdlib.randint(1, 6));
}

async function foo() {
  let k = (await _stdlib.getKey());
  let r = _stdlib.randint(1, 6);
  r = _stdlib.randint(1, 6) * 10;
}
global["foo"] = foo;

async function bar(x) {

}
global["bar"] = bar;
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

  test("Fail_CannotCallAProcedureWithinAnExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  k = getKey() # variable definition
  r = randint(1, 6) # variable definition
  r = randint(1, 6)*10 # assignment
  bar(randint(1, 6)) # procedure call
# end main

def bar(x: int) -> None: # procedure

# end procedure

def main() -> None:
  k = foo() # variable definition
# end main

def foo() -> None: # procedure

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
      "Cannot call procedure 'foo' within an expression.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotCallAFunctionLikeAProcedure", async () => {
    const code = `${testPythonHeader}

def bar(x: int) -> None: # procedure

# end procedure

def foo() -> None: # procedure

# end procedure

def main() -> None:
  square(3) # procedure call
# end main

def square(x: int) -> int: # function
  return x*x
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot call a function as a procedure.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotCallAProcedureWithinAFunction", async () => {
    const code = `${testPythonHeader}

def foo() -> None: # procedure

# end procedure

def square(x: int) -> int: # function
  return x*x
# end function

def main() -> None:
  k = foo() # variable definition
# end main

def foo(x: int) -> None: # procedure

# end procedure

def square(x: int) -> int: # function
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

  test("Fail_CannotUseAnImpureMethodWithinAFunction", async () => {
    const code = `${testPythonHeader}

def square(x: int) -> int: # function
  return x*x
# end function

def foo(x: int) -> None: # procedure

# end procedure

def main() -> None:

# end main

def square(z: int) -> int: # function
  x = randint(1, 6) # variable definition
  return x*x
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot use a system method in a function.ErrorMessages.html#compile_error",
    ]);
  });
});
