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

suite("Python Queue", () => {
  test("Pass_Queue using conventional methods", async () => {
    const code = `${testPythonHeader}

def foo(a: int, foo: int) -> None: # procedure

# end procedure

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.length()) # procedure call
  q.enqueue("apple") # procedure call
  q.enqueue("pear") # procedure call
  printNoLine(q) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q.peek()) # procedure call
  fruit = q.dequeue() # variable definition
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
  fruit = q.dequeue() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.length());
  q.enqueue("apple");
  q.enqueue("pear");
  await _stdlib.printNoLine(q);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q.peek());
  let fruit = q.dequeue();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q);
  fruit = q.dequeue();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q);
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
    await assertObjectCodeExecutes(fileImpl, "0[apple, pear]2appleapple1[pear]pear0[]");
  });

  test("Pass_Queue using functional approach", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.length()) # procedure call
  q.enqueue("apple") # procedure call
  q.enqueue("pear") # procedure call
  printNoLine(q) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q.peek()) # procedure call
  fruit = q.dequeue() # variable definition
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
  fruit = q.dequeue() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
# end main

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.length()) # procedure call
  q = q.withEnqueue("apple") # assignment
  q = q.withEnqueue("pear") # assignment
  printNoLine(q) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q.peek()) # procedure call
  fruit = q.peek() # variable definition
  q = q.withDequeue() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
  q = q.withDequeue() # assignment
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.length());
  q = q.withEnqueue("apple");
  q = q.withEnqueue("pear");
  await _stdlib.printNoLine(q);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q.peek());
  let fruit = q.peek();
  q = q.withDequeue();
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q);
  q = q.withDequeue();
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q);
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
    await assertObjectCodeExecutes(fileImpl, "0[apple, pear]2appleapple1[pear]0[]");
  });

  test("Fail_Queue_adding_incompatible_type1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.length()) # procedure call
  q = q.withEnqueue("apple") # assignment
  q = q.withEnqueue("pear") # assignment
  printNoLine(q) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q.peek()) # procedure call
  fruit = q.peek() # variable definition
  q = q.withDequeue() # assignment
  printNoLine(fruit) # procedure call
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
  q = q.withDequeue() # assignment
  printNoLine(q.length()) # procedure call
  printNoLine(q) # procedure call
# end main

def main() -> None:
  q = Queue[str]() # variable definition
  q = q.withEnqueue("apple") # assignment
  q = q.withEnqueue(3) # assignment
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

  test("Fail_Queue_adding_incompatible_type2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  q = q.withEnqueue("apple") # assignment
  q = q.withEnqueue(3) # assignment
# end main

def main() -> None:
  q = Queue[str]() # variable definition
  q = q.withEnqueue(3) # assignment
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

  test("Fail_Queue_peek_empty_Queue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  q = q.withEnqueue(3) # assignment
# end main

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.peek()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.peek());
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
      "Cannot peek an empty Queue - check using length()",
    );
  });

  test("Fail_Queue_dequeue_empty_Queue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.peek()) # procedure call
# end main

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.dequeue()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.dequeue());
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
      "Cannot dequeue an empty Queue - check using length()",
    );
  });

  test("Fail_QueueWithoutGenericParm", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue[str]() # variable definition
  printNoLine(q.dequeue()) # procedure call
# end main

def main() -> None:
  q = Queue() # variable definition
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

  test("Fail_QueueOfMutable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  q = Queue() # variable definition
# end main

def main() -> None:
  st = Queue[Foo]() # variable definition
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
      "Queue cannot be of mutable type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });
});
