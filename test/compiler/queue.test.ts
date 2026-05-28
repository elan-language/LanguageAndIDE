import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Queue", () => {
  test("Pass_Queue using conventional methods", async () => {
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  call printNoLine(q.length())
  call q.enqueue("apple")
  call q.enqueue("pear")
  call printNoLine(q)
  call printNoLine(q.length())
  call printNoLine(q.peek())
  variable fruit set to q.dequeue()
  call printNoLine(fruit)
  call printNoLine(q.length())
  call printNoLine(q)
  reassign fruit to q.dequeue()
  call printNoLine(fruit)
  call printNoLine(q.length())
  call printNoLine(q)
end main`;

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
      new Profile(""),
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
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  call printNoLine(q.length())
  reassign q to q.withEnqueue("apple")
  reassign q to q.withEnqueue("pear")
  call printNoLine(q)
  call printNoLine(q.length())
  call printNoLine(q.peek())
  variable fruit set to q.peek()
  reassign q to q.withDequeue()
  call printNoLine(fruit)
  call printNoLine(q.length())
  call printNoLine(q)
  reassign q to q.withDequeue()
  call printNoLine(q.length())
  call printNoLine(q)
end main`;

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
      new Profile(""),
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
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  reassign q to q.withEnqueue("apple")
  reassign q to q.withEnqueue(3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Argument types. Expected: parameter0 (String), Provided: Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Queue_adding_incompatible_type2", async () => {
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  reassign q to q.withEnqueue(3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Argument types. Expected: parameter0 (String), Provided: Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Queue_peek_empty_Queue", async () => {
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  call printNoLine(q.peek())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.peek());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  call printNoLine(q.dequeue())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.dequeue());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    const code = `${testHeader}

main
  variable q set to new Queue()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_QueueOfMutable", async () => {
    const code = `${testHeader}

main
  variable st set to new Queue<of Foo>()
end main

class Foo
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Queue cannot be of mutable type 'Foo'.LangRef.html#compile_error",
    ]);
  });
});
