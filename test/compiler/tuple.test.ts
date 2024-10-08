import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Tuple", () => {
  test("Pass_CreatingTuplesAndReadingContents", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
    var x set to (3, "Apple")
    print x
    let f, s be x
    print f
    print s
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  system.printLine(_stdlib.asString(x));
  const [f, s] = x;
  system.printLine(_stdlib.asString(f));
  system.printLine(_stdlib.asString(s));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(3, Apple)3Apple");
  });

  test("Pass_FunctionReturnsTuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to f()
  print x
  let fst, sec be x
  print fst
  print sec
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = f();
  system.printLine(_stdlib.asString(x));
  const [fst, sec] = x;
  system.printLine(_stdlib.asString(fst));
  system.printLine(_stdlib.asString(sec));
}

function f() {
  return system.tuple(["1", "2"]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(1, 2)12");
  });

  test("Pass_IndexFunctionReturnsTuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var t set to f()
  let fst, _ be t
  print fst
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var t = f();
  const [fst, ] = t;
  system.printLine(_stdlib.asString(fst));
}

function f() {
  return system.tuple(["1", "2"]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_IndexGenericFunctionReturnsTuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var t set to a.reduce((1, 1), lambda i as (Int, Int), j as (Int, Int) => j)
  let fst, _ be t
  print fst
end main
constant a set to {(1,2)}`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var t = _stdlib.reduce(a, system.tuple([1, 1]), (i, j) => j);
  const [fst, ] = t;
  system.printLine(_stdlib.asString(fst));
}

const a = system.list([system.tuple([1, 2])]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_FunctionTupleParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to "one"
  var y set to "two"
  print f((x,y))
end main

function f(t as (String, String)) return String
   let first, _ be t
   return first
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = "one";
  var y = "two";
  system.printLine(_stdlib.asString(f(system.tuple([x, y]))));
}

function f(t) {
  const [first, ] = t;
  return first;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_AssignANewTupleOfSameType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  set x to (4,"Pear")
  print x
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  x = system.tuple([4, "Pear"]);
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(4, Pear)");
  });

  // This test now correctly throws an out of range (runtime) error. Not sure how to test for runtime errors RP
  ignore_test("Fail_OutOfRangeError", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var a, b, c set to x
  print c
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [a, b, c] = x;
  system.printLine(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Out of range error");
  });

  test("Fail_AssignItemToWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var y set to 4
  set _, y to x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_ImmutableSoCannotAssignAnItem", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  set x.first() to 4
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssignANewTupleOfWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  set x to ("4", "Pear")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_DifferentSizeTuples1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple", 4)
  set x to (4, "Pear")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types (Int, String) to (Int, String, Int)"]);
  });

  test("Fail_DifferentSizeTuples2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  set x to (4, "Pear", 3)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types (Int, String, Int) to (Int, String)"]);
  });
});
