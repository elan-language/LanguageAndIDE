import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
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

suite("Tuple", () => {
  test("Pass_CreatingTuplesAndReadingContentsByItem", async () => {
    const code = `${testHeader}

main
    variable x set to (3, "Apple")
    call printNoLine(x)
    variable f set to x.item_0
    variable s set to x.item_1
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "(3, Apple)3Apple");
  });

  test("Pass_FunctionReturnsTupleItem", async () => {
    const code = `${testHeader}

main
  variable x set to f()
  call printNoLine(x)
  variable fst set to x.item_0
  variable snd set to x.item_1
  call printNoLine(fst)
  call printNoLine(snd)
end main

function f() returns (String, String)
   return ("1", "2")
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "(1, 2)12");
  });

  test("Pass_IndexFunctionReturnsTuple", async () => {
    const code = `${testHeader}

main
  variable t set to f()
  variable fst set to t.item_0
  call printNoLine(fst)
end main

function f() returns (String, String)
   return ("1", "2")
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_IndexGenericFunctionReturnsTuple", async () => {
    const code = `${testHeader}

main
  variable a set to [(1,2)]
  variable t set to a.reduce((1, 1), lambda i, j => j)
  variable fst set to t.item_0
  call printNoLine(fst)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.tuple([1, 2])]);
  let t = (await a.reduce(system.tuple([1, 1]), async (i, j) => j));
  let fst = t[0];
  await _stdlib.printNoLine(fst);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_FunctionTupleParameter", async () => {
    const code = `${testHeader}

main
  variable x set to "one"
  variable y set to "two"
  call printNoLine(f((x,y)))
end main

function f(t as (String, String)) returns String
   variable first set to t.item_0
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_AssignANewTupleOfSameType", async () => {
    const code = `${testHeader}

main
  variable x set to (3,"Apple")
  set x to (4,"Pear")
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "(4, Pear)");
  });

  test("Pass_item in expression", async () => {
    const code = `${testHeader}

main
  variable p set to [1, 2, 3, 4, 5]
  variable x set to (3, 4)
  variable y set to x.item_0 + x.item_1
  variable z set to p[x.item_0]
  variable q set to abs(x.item_1)
  variable s set to abs(p[x.item_1])
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
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "7445");
  });

  test("Fail_AssignItemToWrongType", async () => {
    const code = `${testHeader}

main
  variable x set to (3,"Apple")
  variable y set to 4
  set y to x.item_1
  call printNoLine(y)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_ImmutableSoCannotAssignAnItem", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple")
  set x.item_0 to 4
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'item_0' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_AssignANewTupleOfWrongType", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple")
  set x to ("4", "Pear")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Incompatible types. Expected: (Int, String), Provided: (String, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DifferentSizeTuples1", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple", 4)
  set x to (4, "Pear")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Incompatible types. Expected: (Int, String, Int), Provided: (Int, String).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DifferentSizeTuples2", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple")
  set x to (4, "Pear", 3)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "Incompatible types. Expected: (Int, String), Provided: (Int, String, Int).LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_itemOutOfRange", async () => {
    const code = `${testHeader}

main
  variable x set to (3, "Apple")
  variable y set to x.item_2
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
      "'item_2' is not defined for type '(Int, String)'.LangRef.html#compile_error",
    ]);
  });
});
