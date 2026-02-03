import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Tuple", () => {
  test("Pass_CreatingTuplesAndReadingContents", async () => {
    const code = `${testHeader}

main
    variable x set to tuple(3, "Apple")
    call printNoLine(x)
    variable f, s set to x
    call printNoLine(f)
    call printNoLine(s)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  await _stdlib.printNoLine(x);
  let [f, s] = x;
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(3, Apple)3Apple");
  });

  test("Pass_CreatingTuplesAndReadingContentsByItem", async () => {
    const code = `${testHeader}

main
    variable x set to tuple(3, "Apple")
    call printNoLine(x)
    variable f set to x.item0
    variable s set to x.item1
    call printNoLine(f)
    call printNoLine(s)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  await _stdlib.printNoLine(x);
  let f = x[0];
  let s = x[1];
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(3, Apple)3Apple");
  });

  test("Pass_FunctionReturnsTuple", async () => {
    const code = `${testHeader}

main
  variable x set to f()
  call printNoLine(x)
  variable fst, sec set to x
  call printNoLine(fst)
  call printNoLine(sec)
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (await global.f());
  await _stdlib.printNoLine(x);
  let [fst, sec] = x;
  await _stdlib.printNoLine(fst);
  await _stdlib.printNoLine(sec);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
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
    await assertObjectCodeExecutes(fileImpl, "tuple(1, 2)12");
  });

  test("Pass_FunctionReturnsTupleItem", async () => {
    const code = `${testHeader}

main
  variable x set to f()
  call printNoLine(x)
  variable fst set to x.item0
  variable snd set to x.item1
  call printNoLine(fst)
  call printNoLine(snd)
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (await global.f());
  await _stdlib.printNoLine(x);
  let fst = x[0];
  let snd = x[1];
  await _stdlib.printNoLine(fst);
  await _stdlib.printNoLine(snd);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
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
    await assertObjectCodeExecutes(fileImpl, "tuple(1, 2)12");
  });

  test("Pass_IndexFunctionReturnsTuple", async () => {
    const code = `${testHeader}

main
  variable t set to f()
  variable fst, _ set to t
  call printNoLine(fst)
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = (await global.f());
  let [fst, ] = t;
  await _stdlib.printNoLine(fst);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
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

  test("Pass_IndexFunctionReturnsTuple1", async () => {
    const code = `${testHeader}

main
  variable t set to f()
  variable fst set to t.item0
  call printNoLine(fst)
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = (await global.f());
  let fst = t[0];
  await _stdlib.printNoLine(fst);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
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

  test("Pass_IndexGenericFunctionReturnsTuple", async () => {
    const code = `${testHeader}

main
  variable t set to a.reduce(tuple(1, 1), lambda i as (Int, Int), j as (Int, Int) => j)
  variable fst, _ set to t
  call printNoLine(fst)
end main
constant a set to {tuple(1,2)}`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.tuple([1, 2])]);

};
async function main() {
  let t = (await global.a.reduce(system.tuple([1, 1]), async (i, j) => j));
  let [fst, ] = t;
  await _stdlib.printNoLine(fst);
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_IndexGenericFunctionReturnsTuple1", async () => {
    const code = `${testHeader}

main
  variable t set to a.reduce(tuple(1, 1), lambda i as (Int, Int), j as (Int, Int) => j)
  variable fst set to t.item0
  call printNoLine(fst)
end main
constant a set to {tuple(1,2)}`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.tuple([1, 2])]);

};
async function main() {
  let t = (await global.a.reduce(system.tuple([1, 1]), async (i, j) => j));
  let fst = t[0];
  await _stdlib.printNoLine(fst);
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_FunctionTupleParameter", async () => {
    const code = `${testHeader}

main
  variable x set to "one"
  variable y set to "two"
  call printNoLine(f(tuple(x,y)))
end main

function f(t as (String, String)) returns String
   variable first, _ set to t
   return first
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = "one";
  let y = "two";
  await _stdlib.printNoLine((await global.f(system.tuple([x, y]))));
}

async function f(t) {
  let [first, ] = t;
  return first;
}
global["f"] = f;
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
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_FunctionTupleParameter1", async () => {
    const code = `${testHeader}

main
  variable x set to "one"
  variable y set to "two"
  call printNoLine(f(tuple(x,y)))
end main

function f(t as (String, String)) returns String
   variable first set to t.item0
   return first
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = "one";
  let y = "two";
  await _stdlib.printNoLine((await global.f(system.tuple([x, y]))));
}

async function f(t) {
  let first = t[0];
  return first;
}
global["f"] = f;
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
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_AssignANewTupleOfSameType", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  set x to tuple(4,"Pear")
  call printNoLine(x)
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  x = system.tuple([4, "Pear"]);
  await _stdlib.printNoLine(x);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(4, Pear)");
  });

  test("Pass_item in expression", async () => {
    const code = `${testHeader}

main
  variable p set to [1, 2, 3, 4, 5]
  variable x set to tuple(3, 4)
  variable y set to x.item0 + x.item1
  variable z set to p[x.item0]
  variable q set to abs(x.item1)
  variable s set to abs(p[x.item1])
  call printNoLine(y)
  call printNoLine(z)
  call printNoLine(q)
  call printNoLine(s)
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let p = system.list([1, 2, 3, 4, 5]);
  let x = system.tuple([3, 4]);
  let y = x[0] + x[1];
  let z = system.safeIndex(p, x[0]);
  let q = _stdlib.abs(x[1]);
  let s = _stdlib.abs(system.safeIndex(p, x[1]));
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
  await _stdlib.printNoLine(q);
  await _stdlib.printNoLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "7445");
  });

  test("Fail_OutOfRangeError", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable a, b, c set to x
  call printNoLine(c)
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
      "Wrong number of deconstructed variables.LangRef.html#compile_error",
    ]);
  });

  test("Fail_AssignItemToWrongType", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable y set to 4
  set _, y to x
  call printNoLine(y)
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
      "Incompatible types. Expected: _, Int, Provided: tuple(Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_AssignItemToWrongType1", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3,"Apple")
  variable y set to 4
  set y to x.item1
  call printNoLine(y)
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
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_ImmutableSoCannotAssignAnItem", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple")
  set x.item0 to 4
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssignANewTupleOfWrongType", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  set x to tuple("4", "Pear")
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
      "Incompatible types. Expected: tuple(Int, String), Provided: tuple(String, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DifferentSizeTuples1", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple", 4)
  set x to tuple(4, "Pear")
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
      "Incompatible types. Expected: tuple(Int, String, Int), Provided: tuple(Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DifferentSizeTuples2", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  set x to tuple(4, "Pear", 3)
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
      "Incompatible types. Expected: tuple(Int, String), Provided: tuple(Int, String, Int).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_itemOutOfRange", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(3, "Apple")
  variable y set to x.item2
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
      "'item2' is not defined for type 'tuple(Int, String)'.LangRef.html#compile_error",
    ]);
  });
});
