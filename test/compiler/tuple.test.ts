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

suite("T62_Tuples", () => {
  test("Pass_CreatingTuplesAndReadingContents", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
    var x set to (3, "Apple")
    print x
    print x.first()
    print x.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(_stdlib.first(x)));
  system.printLine(_stdlib.asString(_stdlib.second(x)));
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
  print x.first()
  print x.second()
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = f();
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(_stdlib.first(x)));
  system.printLine(_stdlib.asString(_stdlib.second(x)));
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
  print t.first()
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var t = f();
  system.printLine(_stdlib.asString(_stdlib.first(t)));
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
  print t.first()
end main
constant a set to {(1,2)}`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var t = _stdlib.reduce(a, system.tuple([1, 1]), (i, j) => j);
  system.printLine(_stdlib.asString(_stdlib.first(t)));
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
   return t.first()
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = "one";
  var y = "two";
  system.printLine(_stdlib.asString(f(system.tuple([x, y]))));
}

function f(t) {
  return _stdlib.first(t);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  var y set to 0
  var z set to ""
  set (y, z) to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var y = 0;
  var z = "";
  [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  // #466
  ignore_test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  let (y, z) be x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [_y, _z] = x; var y = () => _y; var z = () => _z;
  system.printLine(_stdlib.asString(y()));
  system.printLine(_stdlib.asString(z()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  var (y, z) set to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariablesTypeCheck", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3, "Apple")
  var (y, z) set to x
  var a set to 0
  var b set to ""
  set a to y
  set b to z
  print a
  print b
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [y, z] = x;
  var a = 0;
  var b = "";
  a = y;
  b = z;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
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

  test("Fail_OutOfRangeError", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  print x.third()
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertDoesNotCompile(fileImpl, [
      "Incompatible types (Int, String) to (Int, String, Unknown)",
    ]);
  });

  test("Fail_AssignItemToWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var y set to 4
  set y to x.second()
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

  test("Fail_DeconstructIntoWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var y set to 0
  var z set to ""
  set (z, y) to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Int to String",
      "Incompatible types String to Int",
    ]);
  });

  test("Fail_DeconstructIntoMixed1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var z set to ""
  set (z, y) to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String", "y is not defined"]);
  });

  test("Fail_DeconstructIntoMixed2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to (3,"Apple")
  var z set to ""
  var (z, y) set to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign z"]);
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
