import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

suite("Let Statement", () => {
  test("Pass_normal", async () => {
    const code = `${testHeader}

main
  print add()
end main

function add() returns Int
  let x be 3
  let y be x + 3
  return x + y
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.add()));
}

async function add() {
  const x = 3;
  const y = x + 3;
  return x + y;
}
global["add"] = add;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_InLoop", async () => {
    const code = `${testHeader}

constant li set to {1,2,3,4,5}

main
  call foo()
end main

procedure foo()
  for i from 0 to 4 step 1
    let temp be li[i]
    print temp
  end for
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  li = system.listImmutable([1, 2, 3, 4, 5]);

};
async function main() {
  await foo();
}

async function foo() {
  for (let i = 0; i <= 4; i = i + 1) {
    const temp = system.safeIndex(global.li, i);
    await system.printLine(temp);
  }
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  variable li set to {1,2,3,4,5}
  for i from 0 to 3 step 1
    let temp be li[i]
    set li to li.withPut(i, li[i + 1])
    set li to li.withPut(i + 1, temp)
  end for
  print li
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let li = system.listImmutable([1, 2, 3, 4, 5]);
  for (let i = 0; i <= 3; i = i + 1) {
    const temp = system.safeIndex(li, i);
    li = li.withPut(i, system.safeIndex(li, i + 1));
    li = li.withPut(i + 1, temp);
  }
  await system.printLine(li);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 3, 4, 5, 1}");
  });

  test("Pass_Scoped", async () => {
    const code = `${testHeader}

main
  print foo()
end main

function foo() returns Int
  if true then
    variable i set to 0
  end if
  let i be 1
  return i
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.foo()));
}

async function foo() {
  if (_stdlib.true) {
    let i = 0;
  }
  const i = 1;
  return i;
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_cannotRedefine ", async () => {
    const code = `${testHeader}

main
  print foo()
end main

function foo() returns Int
  let x be 3
  let x be 4
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'x' is already used for a 'let' and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `${testHeader}

main
  print foo()
end main

function foo() returns Int
  let x be 3
  set x to 4
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the 'let' 'x'.LangRef.html#compile_error"]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `${testHeader}

main
  variable x set to foo()
  print x
end main

function foo() returns Int
  let x be x + 1
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_RecursiveDefinition1", async () => {
    const code = `${testHeader}

main
  print foo()
end main

function foo() returns Int
  variable x set to 1
  let y be x.y
  return y
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'y' is not defined.LangRef.html#compile_error"]);
  });

  test("Pass_Redefine", async () => {
    const code = `${testHeader}

main
  let a, length be foo()
end main

function foo() returns (Int, Int)
  return tuple(0, 0)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const [a, length] = (await global.foo());
}

async function foo() {
  return system.tuple([0, 0]);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
