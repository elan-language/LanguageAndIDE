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
  transforms,
} from "./compiler-test-helpers";

suite("Queue", () => {
  test("Pass_Queue", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue<of String>()
  print st.length()
  call st.enqueue("apple")
  call st.enqueue("pear")
  print st.length()
  print st.peek()
  variable fruit set to st.dequeue()
  print fruit
  set fruit to st.dequeue()
  print fruit
  print st.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st = system.initialise(await new _stdlib.Queue()._initialise());
  await system.printLine(st.length());
  st.enqueue("apple");
  st.enqueue("pear");
  await system.printLine(st.length());
  await system.printLine(st.peek());
  let fruit = st.dequeue();
  await system.printLine(fruit);
  fruit = st.dequeue();
  await system.printLine(fruit);
  await system.printLine(st.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "02appleapplepear0");
  });

  test("Fail_Queue_adding_incompatible_type1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue<of String>()
  call st.enqueue("apple")
  call st.enqueue(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: parameter0 (String) Provided: Int"]);
  });

  test("Fail_Queue_adding_incompatible_type2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue<of String>()
  call st.enqueue(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: parameter0 (String) Provided: Int"]);
  });

  test("Fail_Queue_peek_empty_Queue", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue<of String>()
  print st.peek()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st = system.initialise(await new _stdlib.Queue()._initialise());
  await system.printLine(st.peek());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue<of String>()
  print st.dequeue()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st = system.initialise(await new _stdlib.Queue()._initialise());
  await system.printLine(st.dequeue());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  let st be new Queue()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> Expected: 1 Provided: 0"]);
  });
});
