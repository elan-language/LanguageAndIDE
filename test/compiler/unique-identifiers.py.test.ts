import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Unique Identifiers", () => {
  test("Pass_CanHaveIdentiferSameAsTypeExceptCase", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.show() # procedure call
  t.moveTo(20, 30) # procedure call
  printNoLine(t.asHtml()) # procedure call
# end main

def main() -> None:
  foo = Foo() # variable definition
  printNoLine(foo) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "Hello World!"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(foo);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "Hello World!";
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
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Fail_KeywordWithDifferentCaseAsIdentifier", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  printNoLine(foo) # procedure call
# end main

def main() -> None:
  bReak = 1 # variable definition
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
    assertDoesNotCompile(fileImpl, [
      "'bReak' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SameVariableNameInScope", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  bReak = 1 # variable definition
# end main

def main() -> None:
  id = 1 # variable definition
  id = 1 # variable definition
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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'id' is already used for a variable and cannot be re-defined here.ErrorMessages.html#compile_error",
    ]);
  });
});
