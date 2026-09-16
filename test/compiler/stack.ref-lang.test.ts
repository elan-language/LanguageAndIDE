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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Stack", () => {
  test("Pass Stack using conventional methods", async () => {
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  call printNoLine(st.length())
  call st.push("apple")
  call st.push("pear")
  call printNoLine(st)
  call printNoLine(st.length())
  call printNoLine(st.peek())
  variable fruit set to st.pop()
  call printNoLine(fruit)
  assign fruit to st.pop()
  call printNoLine(fruit)
  call printNoLine(st.length())
  call printNoLine(st)
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  call printNoLine(st.length())
  assign st to st.withPush("apple")
  assign st to st.withPush("pear")
  call printNoLine(st)
  call printNoLine(st.length())
  call printNoLine(st.peek())
  variable fruit set to st.peek()
  assign st to st.withPop()
  call printNoLine(fruit)
  call printNoLine(st.length())
  call printNoLine(st)
  assign fruit to st.peek()
  assign st to st.withPop()
  call printNoLine(fruit)
  call printNoLine(st.length())
  call printNoLine(st)
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  assign st to st.withPush("apple")
  assign st to st.withPush(3)
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  call st.push("apple")
  variable a set to 1
  assign a to st.peek()
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  call printNoLine(st.peek())
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of String>()
  call printNoLine(st.pop())
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack()
end main`;

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
    const code = `${testHeader}

main
  variable st set to new Stack<of Foo>()
end main

class Foo
end class`;

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
