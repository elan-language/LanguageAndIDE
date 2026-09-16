import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Stack", () => {
  test("Pass Stack using conventional methods", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  result = foo(3, 4) # variable definition
  printNoLine(result) # procedure call
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.length()) # procedure call
  st.push("apple") # procedure call
  st.push("pear") # procedure call
  printNoLine(st) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st.peek()) # procedure call
  fruit = st.pop() # variable definition
  printNoLine(fruit) # procedure call
  fruit = st.pop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Stack()._initialise());
  await _stdlib.printNoLine(st.length());
  st.push("apple");
  st.push("pear");
  await _stdlib.printNoLine(st);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st.peek());
  let fruit = st.pop();
  await _stdlib.printNoLine(fruit);
  fruit = st.pop();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st);
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
    await assertObjectCodeExecutes(fileImpl, "0[pear, apple]2pearpearapple0[]");
  });

  test("Pass Stack using functional approach", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.length()) # procedure call
  st.push("apple") # procedure call
  st.push("pear") # procedure call
  printNoLine(st) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st.peek()) # procedure call
  fruit = st.pop() # variable definition
  printNoLine(fruit) # procedure call
  fruit = st.pop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.length()) # procedure call
  st = st.withPush("apple") # assignment
  st = st.withPush("pear") # assignment
  printNoLine(st) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st.peek()) # procedure call
  fruit = st.peek() # variable definition
  st = st.withPop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
  fruit = st.peek() # assignment
  st = st.withPop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Stack()._initialise());
  await _stdlib.printNoLine(st.length());
  st = st.withPush("apple");
  st = st.withPush("pear");
  await _stdlib.printNoLine(st);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st.peek());
  let fruit = st.peek();
  st = st.withPop();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st);
  fruit = st.peek();
  st = st.withPop();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st);
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
    await assertObjectCodeExecutes(fileImpl, "0[pear, apple]2pearpear1[apple]apple0[]");
  });

  test("Fail_Stack_adding_incompatible_type1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.length()) # procedure call
  st = st.withPush("apple") # assignment
  st = st.withPush("pear") # assignment
  printNoLine(st) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st.peek()) # procedure call
  fruit = st.peek() # variable definition
  st = st.withPop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
  fruit = st.peek() # assignment
  st = st.withPop() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  st = st.withPush("apple") # assignment
  st = st.withPush(3) # assignment
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
      "Argument types. Expected: parameter0 (String), Provided: Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_Stack_peek_incompatible_type", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  st = st.withPush("apple") # assignment
  st = st.withPush(3) # assignment
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  st.push("apple") # procedure call
  a = 1 # variable definition
  a = st.peek() # assignment
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
      "Incompatible types. Expected: Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_Stack_peek_empty_stack", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  st.push("apple") # procedure call
  a = 1 # variable definition
  a = st.peek() # assignment
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.peek()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Stack()._initialise());
  await _stdlib.printNoLine(st.peek());
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Cannot peek an empty Stack - check using length()",
    );
  });

  test("Fail_Stack_pop_empty_stack", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.peek()) # procedure call
# end main

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.pop()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Stack()._initialise());
  await _stdlib.printNoLine(st.pop());
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Cannot pop an empty Stack - check using length()",
    );
  });

  test("Fail_StackWithoutGenericParm", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack[str]() # variable definition
  printNoLine(st.pop()) # procedure call
# end main

def main() -> None:
  st = Stack() # variable definition
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
      "Expected: generic type specifier.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_StackOfMutable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Stack() # variable definition
# end main

def main() -> None:
  st = Stack[Foo]() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
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
      "Stack cannot be of mutable type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });
});
