import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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
    print x
    let f, s be x
    print f
    print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  await system.printLine(x);
  const [f, s] = x;
  await system.printLine(f);
  await system.printLine(s);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
    print x
    let f be x.item0
    let s be x.item1
    print f
    print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  await system.printLine(x);
  const f = x[0];
  const s = x[1];
  await system.printLine(f);
  await system.printLine(s);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print x
  let fst, sec be x
  print fst
  print sec
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (await global.f());
  await system.printLine(x);
  const [fst, sec] = x;
  await system.printLine(fst);
  await system.printLine(sec);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print x
  let fst be x.item0
  let snd be x.item1
  print fst
  print snd
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (await global.f());
  await system.printLine(x);
  const fst = x[0];
  const snd = x[1];
  await system.printLine(fst);
  await system.printLine(snd);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let fst, _ be t
  print fst
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = (await global.f());
  const [fst, ] = t;
  await system.printLine(fst);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let fst be t.item0
  print fst
end main

function f() returns (String, String)
   return tuple("1", "2")
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = (await global.f());
  const fst = t[0];
  await system.printLine(fst);
}

async function f() {
  return system.tuple(["1", "2"]);
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let fst, _ be t
  print fst
end main
constant a set to {tuple(1,2)}`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.tuple([1, 2])]);

};
async function main() {
  let t = (await global.a.reduce(system.tuple([1, 1]), async (i, j) => j));
  const [fst, ] = t;
  await system.printLine(fst);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let fst be t.item0
  print fst
end main
constant a set to {tuple(1,2)}`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.tuple([1, 2])]);

};
async function main() {
  let t = (await global.a.reduce(system.tuple([1, 1]), async (i, j) => j));
  const fst = t[0];
  await system.printLine(fst);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print f(tuple(x,y))
end main

function f(t as (String, String)) returns String
   let first, _ be t
   return first
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = "one";
  let y = "two";
  await system.printLine((await global.f(system.tuple([x, y]))));
}

async function f(t) {
  const [first, ] = t;
  return first;
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print f(tuple(x,y))
end main

function f(t as (String, String)) returns String
   let first be t.item0
   return first
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = "one";
  let y = "two";
  await system.printLine((await global.f(system.tuple([x, y]))));
}

async function f(t) {
  const first = t[0];
  return first;
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print x
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.tuple([3, "Apple"]);
  x = system.tuple([4, "Pear"]);
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let y be x.item0 + x.item1
  let z be p[x.item0]
  let q be abs(x.item1)
  let s be abs(p[x.item1])
  print y
  print z
  print q
  print s
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let p = system.list([1, 2, 3, 4, 5]);
  let x = system.tuple([3, 4]);
  const y = x[0] + x[1];
  const z = system.safeIndex(p, x[0]);
  const q = _stdlib.abs(x[1]);
  const s = _stdlib.abs(system.safeIndex(p, x[1]));
  await system.printLine(y);
  await system.printLine(z);
  await system.printLine(q);
  await system.printLine(s);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print c
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  let y be x.item2
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'item2' is not defined.LangRef.html#compile_error"]);
  });
});
