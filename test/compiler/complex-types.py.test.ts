import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Complex Types", () => {
  test("Fail_UnknownOfType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  a = foo.p # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = list[Foo]() # variable definition
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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UnknowNestedOfType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[Foo]() # variable definition
# end main

def main() -> None:
  a = list[list[Foo]]() # variable definition
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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_NotType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[list[Foo]]() # variable definition
# end main

def main() -> None:
  t = 1 # variable definition
  a = new List<of t>() # variable definition
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
});
