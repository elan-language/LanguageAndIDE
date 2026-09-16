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

suite("Python Input", () => {
  test("Pass_InputString", async () => {
    const code = `${testPythonHeader}

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

class Foo(Bar): # abstract class


# end class

def main() -> None:
  a = input("") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.input(""));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "\nFelicity", "Felicity");
  });

  test("Pass_InputStringWithPrompt", async () => {
    const code = `${testPythonHeader}

class Foo(Bar): # abstract class


# end class

def main() -> None:
  a = input("Your name") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.input("Your name"));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "Your name\nFred", "Fred");
  });

  test("Pass_InputInt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = input("Your name") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0 # variable definition
  a = inputInt("") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputInt(""));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "\n123", "123");
  });

  test("Pass_InputFloat", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0 # variable definition
  a = inputInt("") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloat("") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputFloat(""));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "\n123.4", "123.4");
  });

  test("Pass_ReuseVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloat("") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "value" # variable definition
  b = "value1" # variable definition
  a = input("") # assignment
  b = a # assignment
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "value";
  let b = "value1";
  a = (await _stdlib.input(""));
  b = a;
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "\nFred", "Fred");
  });

  test("Pass_InputStringWithLimits", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "value" # variable definition
  b = "value1" # variable definition
  a = input("") # assignment
  b = a # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = inputStringWithLimits("aprompt", 3, 7) # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.inputStringWithLimits("aprompt", 3, 7));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\nxxx", "xxx");
  });

  test("Pass_InputStringFromOptions", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = inputStringWithLimits("aprompt", 3, 7) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = inputStringFromOptions("aprompt", ["y", "n"]) # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.inputStringFromOptions("aprompt", system.list(["y", "n"])));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\ny", "y");
  });

  test("Pass_InputInt1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = inputStringFromOptions("aprompt", ["y", "n"]) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0 # variable definition
  a = inputInt("aprompt") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputInt("aprompt"));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\n101", "101");
  });

  test("Pass_InputIntBetween", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0 # variable definition
  a = inputInt("aprompt") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0 # variable definition
  a = inputIntBetween("aprompt", 3, 7) # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputIntBetween("aprompt", 3, 7));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\n5", "5");
  });

  test("Pass_InputFloat1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0 # variable definition
  a = inputIntBetween("aprompt", 3, 7) # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloat("aprompt") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputFloat("aprompt"));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\n1.01", "1.01");
  });

  test("Pass_InputFloatBetween", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloat("aprompt") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloatBetween("aprompt", 0, 1) # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.inputFloatBetween("aprompt", 0, 1));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "aprompt\n0.5", "0.5");
  });

  test("Fail_ReuseVariableWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0.0 # variable definition
  a = inputFloatBetween("aprompt", 0, 1) # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "" # variable definition
  a = inputInt("") # assignment
  printNoLine(a) # procedure call
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
      "Incompatible types. Expected: String, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Pass_InputInExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "" # variable definition
  a = inputInt("") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "Hello " + input("") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "Hello " + (await _stdlib.input(""));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "\nHello Fred", "Fred");
  });
});
