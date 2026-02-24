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
  call printNoLine(q.length())
  set q to q.enqueue("apple")
  set q to q.enqueue("pear")
  call printNoLine(q)
  call printNoLine(q.length())
  call printNoLine(q.peek())
  variable fruit set to ""
  variable t set to q.dequeue()
  set fruit to t.item0
  set q to t.item1
  call printNoLine(fruit)
  set t to q.dequeue()
  set fruit to t.item0
  set q to t.item1
  call printNoLine(fruit)
  call printNoLine(q.length())
  call printNoLine(q)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let q = system.initialise(await new _stdlib.Queue()._initialise());
  await _stdlib.printNoLine(q.length());
  q = q.enqueue("apple");
  q = q.enqueue("pear");
  await _stdlib.printNoLine(q);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q.peek());
  let fruit = "";
  let t = q.dequeue();
  fruit = t[0];
  q = t[1];
  await _stdlib.printNoLine(fruit);
  t = q.dequeue();
  fruit = t[0];
  q = t[1];
  await _stdlib.printNoLine(fruit);
  await _stdlib.printNoLine(q.length());
  await _stdlib.printNoLine(q);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
  set q to q.enqueue(3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      new DefaultProfile(),
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
      new DefaultProfile(),
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
      new DefaultProfile(),
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
      new DefaultProfile(),
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
