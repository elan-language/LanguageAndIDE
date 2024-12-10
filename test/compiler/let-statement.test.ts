import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompileWithId,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Let Statement", () => {
  test("Pass_normal", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print add()
end main

function add() return Int
  let x be 3
  let y be x + 3
  return x + y
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(add()));
}

function add() {
  const x = 3;
  const y = x + 3;
  return x + y;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_InLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant list set to {1,2,3,4,5}

main
  call foo()
end main

procedure foo()
  for i from 0 to 4 step 1
    let temp be list[i]
    print temp
  end for
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  list = system.list([1, 2, 3, 4, 5]);

};
async function main() {
  await foo();
}

async function foo() {
  for (var i = 0; i <= 4; i = i + 1) {
    const temp = system.safeIndex(global.list, i);
    system.printLine(_stdlib.asString(temp));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12345");
  });

  test("Pass_InLoop1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo()
end main

procedure foo()
  var list set to {1,2,3,4,5}
  for i from 0 to 3 step 1
    let temp be list[i]
    set list to list.withPutAt(i, list[i + 1])
    set list to list.withPutAt(i + 1, temp)
  end for
  print list
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await foo();
}

async function foo() {
  var list = system.list([1, 2, 3, 4, 5]);
  for (var i = 0; i <= 3; i = i + 1) {
    const temp = system.safeIndex(list, i);
    list = _stdlib.withPutAt(list, i, system.safeIndex(list, i + 1));
    list = _stdlib.withPutAt(list, i + 1, temp);
  }
  system.printLine(_stdlib.asString(list));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 3, 4, 5, 1}");
  });

  test("Fail_cannotRedefine ", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo()
end main

function foo() return Int
  let x be 3
  let x be 4
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "let15", [
      "The identifier 'x' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo()
end main

function foo() return Int
  let x be 3
  set x to 4
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "set15", ["May not re-assign the 'let' x"]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var x set to foo()
  print x
end main

function foo() return Int
  let x be x + 1
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr17", [
      "Incompatible types Unknown to Float or Int",
      "'x' is not defined",
    ]);

    assertDoesNotCompileWithId(fileImpl, "func8", ["Incompatible types Unknown to Float or Int"]);
  });

  test("Fail_RecursiveDefinition1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo()
end main

function foo() return Int
  var x set to 1
  let y be x.y
  return y
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr17", ["'y' is not defined"]);
    assertDoesNotCompileWithId(fileImpl, "func5", ["'y' is not defined"]);
  });

  test("Pass_Redefine", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a, length be foo()
end main

function foo() return (Int, Int)
  return (0, 0)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const [a, length] = foo();
}

function foo() {
  return system.tuple([0, 0]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
