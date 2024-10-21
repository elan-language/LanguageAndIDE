import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompileWithId,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Let Statement", () => {
  test("Pass_normal", async () => {
    const code = `# FFFF Elan Beta 3 valid

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

  ignore_test("Pass_proveCached", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var z set to foo1()
  var x, y set to z
  call y.setP1(10)
  print x.p1
  print y.p1
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  procedure setP1(i as Int)
    set property.p1 to i
  end procedure
end class

function foo1() return (Foo, Foo) 
  let x be new Foo()
  let y be x
  return (x, y)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var z = foo1();
  var x, y = z;
  await y.setP1(10);
  system.printLine(_stdlib.asString(x.p1));
  system.printLine(_stdlib.asString(y.p1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

  async setP1(i) {
    this.p1 = i;
  }

}

function foo1() {
  const x = system.initialise(new Foo());
  const y = x;
  return system.tuple([x, y]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1010");
  });

  test("Pass_IdShadowsFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print foo()
end main

function foo() return Int
  return 1
end function

function bar() return Int
  let foo be foo()
  return foo
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(foo()));
}

function foo() {
  return 1;
}

function bar() {
  const foo = foo();
  return foo;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_InLoop", async () => {
    const code = `# FFFF Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

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
    assertDoesNotCompileWithId(fileImpl, "let15", ["May not reassign x"]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `# FFFF Elan Beta 3 valid

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
    assertDoesNotCompileWithId(fileImpl, "set15", ["May not mutate x"]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `# FFFF Elan Beta 3 valid

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
      "x is not defined",
    ]);

    assertDoesNotCompileWithId(fileImpl, "func8", ["Incompatible types Unknown to Float or Int"]);
  });

  test("Fail_RecursiveDefinition1", async () => {
    const code = `# FFFF Elan Beta 3 valid

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
    assertDoesNotCompileWithId(fileImpl, "expr17", ["y is not defined"]);
    assertDoesNotCompileWithId(fileImpl, "func5", ["y is not defined"]);
  });
});
