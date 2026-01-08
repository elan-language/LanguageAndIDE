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

suite("Tuple Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y set to 0
  variable z set to ""
  set y, z to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let y = 0;
  let z = "";
  [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructFromFunction", async () => {
    const code = `${testHeader}

main
  let a, b be foo()
  print a
  print b
end main

function foo() returns (Float, Int)
  return tuple(0.0, 0)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const [a, b] = (await global.foo());
  await system.print(a);
  await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_DeconstructFromFunctionMethod", async () => {
    const code = `${testHeader}

main
  let foo be new Foo()
  let a, b be foo.bar()
  print a
  print b
end main

class Foo
  constructor()
  end constructor

  function bar() returns (Float, Int)
    return tuple(0.0, 0)
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const foo = system.initialise(await new Foo()._initialise());
  const [a, b] = (await foo.bar());
  await system.print(a);
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async bar() {
    return system.tuple([0, 0]);
  }

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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_DeconstructFromComplexTupleFunction", async () => {
    const code = `${testHeader}

main
  let a, b be foo()
  print a
  print b
end main

function foo() returns (ListImmutable<of Float>, Int)
  return tuple({0.0}, 0)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const [a, b] = (await global.foo());
  await system.print(a);
  await system.print(b);
}

async function foo() {
  return system.tuple([system.listImmutable([0]), 0]);
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
    await assertObjectCodeExecutes(fileImpl, "{0}0");
  });

  test("Pass_CreateAndDeconstructAFourTuple", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple", true, 1.1)
  print x
  let a, b, c, d be x
  print a
  print b
  print c
  print d
  let _, _, e, _ be x
  print e
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple", _stdlib.true, 1.1]);
  await system.print(x);
  const [a, b, c, d] = x;
  await system.print(a);
  await system.print(b);
  await system.print(c);
  await system.print(d);
  const [, , e, ] = x;
  await system.print(e);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(3, Apple, true, 1.1)3Appletrue1.1true");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard1", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable z set to ""
  set _, z to x
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let z = "";
  [, z] = x;
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard2", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y set to 0
  set y, _ to x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let y = 0;
  [y, ] = x;
  await system.print(y);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard3", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple", 4)
  variable z set to ""
  set _, z, _ to x
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple", 4]);
  let z = "";
  [, z, ] = x;
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard4", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple", 4)
  variable y set to 0
  set _, _, y to x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple", 4]);
  let y = 0;
  [, , y] = x;
  await system.print(y);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  let y, z be x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  const [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  let _, z be x
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  const [, z] = x;
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y, z set to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariablesWithDiscard1", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable _, z set to x
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let [, z] = x;
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoNewVariablesWithDiscard2", async () => {
    const code = `${testHeader}

main
  variable t set to tuple(3, 4, "Apple")
  variable x, _, z set to t
  print x
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.tuple([3, 4, "Apple"]);
  let [x, , z] = t;
  await system.print(x);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariablesTypeCheck", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y, z set to x
  variable a set to 0
  variable b set to ""
  set a to y
  set b to z
  print a
  print b
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  let [y, z] = x;
  let a = 0;
  let b = "";
  a = y;
  b = z;
  await system.print(a);
  await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructTupleWithListIntoNew", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to tuple(3, a)
  variable y, z set to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let x = system.tuple([3, a]);
  let [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3[1, 2]");
  });

  test("Pass_DeconstructTupleWithListIntoNewLet", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to tuple(3, a)
  let y, z be x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let x = system.tuple([3, a]);
  const [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3[1, 2]");
  });

  test("Pass_DeconstructTupleWithListIntoExisting", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to tuple(3, a)
  variable y set to 0
  variable z set to empty List<of Int>
  set y, z to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let x = system.tuple([3, a]);
  let y = 0;
  let z = system.initialise(_stdlib.List.emptyInstance());
  [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3[1, 2]");
  });

  test("Pass_DeconstructTupleWithTupleIntoNew", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1,2)
  variable x set to tuple(3, a)
  variable y, z set to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.tuple([1, 2]);
  let x = system.tuple([3, a]);
  let [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3tuple(1, 2)");
  });

  test("Pass_DeconstructTupleWithTupleIntoNewLet", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1,2)
  variable x set to tuple(3, a)
  let y, z be x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.tuple([1, 2]);
  let x = system.tuple([3, a]);
  const [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3tuple(1, 2)");
  });

  test("Pass_DeconstructTupleWithTupleIntoExisting", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1, 2)
  variable x set to tuple(3, a)
  variable y set to 0
  variable z set to tuple(0, 0)
  set y, z to x
  print y
  print z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.tuple([1, 2]);
  let x = system.tuple([3, a]);
  let y = 0;
  let z = system.tuple([0, 0]);
  [y, z] = x;
  await system.print(y);
  await system.print(z);
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
    await assertObjectCodeExecutes(fileImpl, "3tuple(1, 2)");
  });

  test("Pass_DeconstructTupleTypes", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1, "string")
  variable y, z set to a
  set y to y
  set z to z
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.tuple([1, "string"]);
  let [y, z] = a;
  y = y;
  z = z;
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_DeconstructIntoWrongType", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable y set to 0
  variable z set to ""
  set z, y to x
  print y
  print z
end main
`;

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
      "Incompatible types. Expected: String, Int, Provided: tuple(Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoMixed1", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable z set to ""
  set z, y to x
  print y
  print z
end main
`;

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
      "'y' is not defined.LangRef.html#compile_error",
      "Incompatible types. Expected: String, Unknown, Provided: tuple(Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoMixed2", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable z set to 0
  variable z, y set to x
  print y
  print z
end main
`;

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
      "The identifier 'z' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DeconstructIntoWrongTypeWithDiscard", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y set to ""
  set y, _ to x
  print y
end main
`;

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
      "Incompatible types. Expected: String, _, Provided: tuple(Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  let y be 0
  let z be ""
  set y, z to x
  print y
  print z
end main
`;

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
      "May not re-assign the 'let' 'y'.LangRef.html#compile_error",
      "May not re-assign the 'let' 'z'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotDeconstruct", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable x,y set to a
end main
`;

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
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstructLet", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  let x, y be a
end main
`;

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
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_DeconstructIntoExistingAndNewVariables", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1, 2)
  variable x set to 1
  set x, y to a
end main
`;

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
    assertDoesNotCompile(fileImpl, ["'y' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_Id1", async () => {
    const code = `${testHeader}

main
  variable a, b set to tuple(1, 2)
  call a()
end main
`;

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
      "Cannot invoke identifier 'a' as a method.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Id2", async () => {
    const code = `${testHeader}

main
  variable a, b set to tuple(1, 2)
  call b()
end main
`;

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
      "Cannot invoke identifier 'b' as a method.LangRef.html#compile_error",
    ]);
  });
});
