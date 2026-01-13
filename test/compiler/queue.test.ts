import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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
  test("Pass_Queue", async () => {
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  print q.length()
  set q to q.enqueue("apple")
  set q to q.enqueue("pear")
  print q
  print q.length()
  print q.peek()
  variable fruit set to ""
  set fruit, q to q.dequeue()
  print fruit
  set fruit, q to q.dequeue()
  print fruit
  print q.length()
  print q
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await system.print(q.length());
  q = q.enqueue("apple");
  q = q.enqueue("pear");
  await system.print(q);
  await system.print(q.length());
  await system.print(q.peek());
  let fruit = "";
  [fruit, q] = q.dequeue();
  await system.print(fruit);
  [fruit, q] = q.dequeue();
  await system.print(fruit);
  await system.print(q.length());
  await system.print(q);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0[apple, pear]2appleapplepear0[]");
  });

  test("Fail_Queue_adding_incompatible_type1", async () => {
    const code = `${testHeader}

main
  variable q set to new Queue<of String>()
  set q to q.enqueue("apple")
  set q to q.enqueue(3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  set q to q.enqueue(3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  print q.peek()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await system.print(q.peek());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
  print q.dequeue()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await system.print(q.dequeue());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
