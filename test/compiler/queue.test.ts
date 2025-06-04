import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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
  await system.printLine(q.length());
  q = q.enqueue("apple");
  q = q.enqueue("pear");
  await system.printLine(q);
  await system.printLine(q.length());
  await system.printLine(q.peek());
  let fruit = "";
  [fruit, q] = q.dequeue();
  await system.printLine(fruit);
  [fruit, q] = q.dequeue();
  await system.printLine(fruit);
  await system.printLine(q.length());
  await system.printLine(q);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let q be new Queue<of String>()
  print q.peek()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const q = system.initialise(await new _stdlib.Queue()._initialise());
  await system.printLine(q.peek());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let q be new Queue<of String>()
  print q.dequeue()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const q = system.initialise(await new _stdlib.Queue()._initialise());
  await system.printLine(q.dequeue());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let q be new Queue()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Queue cannot be of mutable type 'Foo'.LangRef.html#compile_error",
    ]);
  });
});
