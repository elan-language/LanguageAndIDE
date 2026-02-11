import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Constant Statement", () => {
  test("Pass_normal", async () => {
    const code = `${testHeader}

main
  call printNoLine(add())
end main

function add() returns Int
  constant x set to 3
  constant y set to x + 3
  return x + y
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.add()));
}

async function add() {
  const x = 3;
  const y = x + 3;
  return x + y;
}
global["add"] = add;
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
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_function", async () => {
    const code = `${testHeader}

main
  constant y set to add()
  call printNoLine(y)
end main

function add() returns Int
  constant x set to 3
  constant y set to x + 3
  return x + y
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const y = (await global.add());
  await _stdlib.printNoLine(y);
}

async function add() {
  const x = 3;
  const y = x + 3;
  return x + y;
}
global["add"] = add;
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
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_InLoop", async () => {
    const code = `${testHeader}

main
  call foo()
end main

procedure foo()
  variable li set to [1,2,3,4,5]
  for i from 0 to 4 step 1
    constant temp set to li[i]
    call printNoLine(temp)
  end for
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let li = system.list([1, 2, 3, 4, 5]);
  const _tofor13 = 4;
  for (let i = 0; i <= _tofor13; i = i + 1) {
    const temp = system.safeIndex(li, i);
    await _stdlib.printNoLine(temp);
  }
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "12345");
  });

  test("Pass_InLoop1", async () => {
    const code = `${testHeader}

main
  call foo()
end main

procedure foo()
  variable li set to [1,2,3,4,5]
  for i from 0 to 3 step 1
    constant temp set to li[i]
    set li to li.withPut(i, li[i + 1])
    set li to li.withPut(i + 1, temp)
  end for
  call printNoLine(li)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let li = system.list([1, 2, 3, 4, 5]);
  const _tofor13 = 3;
  for (let i = 0; i <= _tofor13; i = i + 1) {
    const temp = system.safeIndex(li, i);
    li = li.withPut(i, system.safeIndex(li, i + 1));
    li = li.withPut(i + 1, temp);
  }
  await _stdlib.printNoLine(li);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "[2, 3, 4, 5, 1]");
  });

  test("Pass_Scoped", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  if true then
    constant i set to 0
  end if
  constant i set to 1
  return i
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.foo()));
}

async function foo() {
  if (_stdlib.true) {
    const i = 0;
  }
  const i = 1;
  return i;
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_Redefine", async () => {
    const code = `${testHeader}

main
  constant a set to foo().item0
  constant length set to foo().item1
end main

function foo() returns (Int, Int)
  return tuple(0, 0)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = (await global.foo())[0];
  const length = (await global.foo())[1];
}

async function foo() {
  return system.tuple([0, 0]);
}
global["foo"] = foo;
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_cannotRedefine ", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  constant x set to 3
  constant x set to 4
  return x
end function`;

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
      "The identifier 'x' is already used for a constant and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  constant x set to 3
  set x to 4
  return x
end function`;

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
      "May not re-assign the constant 'x'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `${testHeader}

main
  variable x set to foo()
  call printNoLine(x)
end main

function foo() returns Int
  variable x set to x + 1
  return x
end function`;

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
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_RecursiveDefinition1", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  variable x set to 1
  variable y set to x.y
  return y
end function`;

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
    assertDoesNotCompile(fileImpl, [
      "'y' is not defined for type 'Int'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_mustBeValueType", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  constant x set to tuple(1, 2)
  return x.item0
end function`;

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
    assertDoesNotCompile(fileImpl, [
      "Can only assign a value type to a constantLangRef.html#compile_error",
    ]);
  });
  test("Fail_mustBeValueType1", async () => {
    const code = `${testHeader}

main
  call printNoLine(foo())
end main

function foo() returns Int
  constant x set to foo
  return x()
end function`;

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
    assertDoesNotCompile(fileImpl, [
      "Can only assign a value type to a constantLangRef.html#compile_error",
    ]);
  });
});
