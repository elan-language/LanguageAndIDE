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

suite("Stack", () => {
  test("Pass_Stack", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  print st.length()
  set st to st.push("apple")
  set st to st.push("pear")
  print st.length()
  print st.peek()
  variable fruit set to ""
  set fruit, st to st.pop()
  print fruit
  set fruit, st to st.pop()
  print fruit
  print st.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Stack()._initialise());
  await system.printLine(st.length());
  st = st.push("apple");
  st = st.push("pear");
  await system.printLine(st.length());
  await system.printLine(st.peek());
  let fruit = "";
  [fruit, st] = st.pop();
  await system.printLine(fruit);
  [fruit, st] = st.pop();
  await system.printLine(fruit);
  await system.printLine(st.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "02pearpearapple0");
  });

  test("Fail_Stack_adding_incompatible_type1", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  set st to st.push("apple")
  set st to st.push(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: parameter0 (String) Provided: Int"]);
  });

  test("Fail_Stack_adding_incompatible_type2", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  set st to st.push(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: parameter0 (String) Provided: Int"]);
  });

  test("Fail_Stack_peek_incompatible_type", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  set st to st.push("apple")
  variable a set to 1
  set a to st.peek()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: String"]);
  });

  test("Fail_Stack_peek_empty_stack", async () => {
    const code = `${testHeader}

main
  let st be new Stack<of String>()
  print st.peek()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st = system.initialise(await new _stdlib.Stack()._initialise());
  await system.printLine(st.peek());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
    const code = `${testHeader}

main
  let st be new Stack<of String>()
  print st.pop()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st = system.initialise(await new _stdlib.Stack()._initialise());
  await system.printLine(st.pop());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
    const code = `${testHeader}

main
  let st be new Stack()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> Expected: 1 Provided: 0"]);
  });

  test("Fail_StackOfMutable", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of Foo>()
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Stack cannot be of mutable type 'Foo'"]);
  });
});
