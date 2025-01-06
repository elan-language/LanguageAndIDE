import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Array2D", () => {
  test("Pass_literalArrayOfArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable b set to [3,4]
  variable c set to new Array2D<of Int>()
  set c to [a,b]
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.literalArray([3, 4]);
  var c = system.initialise(system.array(new Array()));
  c = system.literalArray([a, b]);
  system.printLine(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[1, 2], [3, 4]]");
  });

  test("Pass_Array2DAsParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  print foo(a)
end main

function foo(arr as Array<of Array<of Int>>) returns Array<of Array<of Int>>
  return bar(arr)
end function

function bar(arr as Array2D<of Int>) returns Array2D<of Int>
  return arr
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  system.printLine(_stdlib.asString(foo(a)));
}

function foo(arr) {
  return bar(arr);
}

function bar(arr) {
  return arr;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  set a to createArray2D(3, 0, "")
  print a.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  a = _stdlib.createArray2D(3, 0, "");
  system.printLine(_stdlib.asString(_stdlib.length(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_SetAndReadElements1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  set a to [[""], [""], [""]]
  call a.putAt(0, ["bar", "foo"])
  call a.putAt(2, ["yon", "xan"])
  print a[0][1]
  print a[2][0]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  a = system.literalArray([system.literalArray([""]), system.literalArray([""]), system.literalArray([""])]);
  _stdlib.putAt(a, 0, system.literalArray(["bar", "foo"]));
  _stdlib.putAt(a, 2, system.literalArray(["yon", "xan"]));
  system.printLine(_stdlib.asString(system.safeIndex(system.safeIndex(a, 0), 1)));
  system.printLine(_stdlib.asString(system.safeIndex(system.safeIndex(a, 2), 0)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetAndReadElements2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of String>
  set a to createArray2D(3, 0, "")
  call a.putAt(0, ["bar", "foo"])
  call a[0].putAt(1, "yon")
  print a[0][1]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyArray();
  a = _stdlib.createArray2D(3, 0, "");
  _stdlib.putAt(a, 0, system.literalArray(["bar", "foo"]));
  _stdlib.putAt(system.safeIndex(a, 0), 1, "yon");
  system.printLine(_stdlib.asString(system.safeIndex(system.safeIndex(a, 0), 1)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yon");
  });

  test("Pass_AddAndReadElements1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of String>
  set a to createArray2D(3, 0, "")
  call a.append(["foo"])
  call a.append(["yon"])
  print a[3]
  print a[4]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyArray();
  a = _stdlib.createArray2D(3, 0, "");
  _stdlib.append(a, system.literalArray(["foo"]));
  _stdlib.append(a, system.literalArray(["yon"]));
  system.printLine(_stdlib.asString(system.safeIndex(a, 3)));
  system.printLine(_stdlib.asString(system.safeIndex(a, 4)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[foo][yon]");
  });

  test("Pass_AddAndReadElements2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of String>
  set a to createArray2D(3, 0, "")
  call a[1].append("foo")
  call a[2].append("yon")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyArray();
  a = _stdlib.createArray2D(3, 0, "");
  _stdlib.append(system.safeIndex(a, 1), "foo");
  _stdlib.append(system.safeIndex(a, 2), "yon");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[], [foo], [yon]]");
  });

  test("Pass_EmptyArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of Int>
  variable b set to empty Array2D<of Int>
  call a.append([3])
  print a
  print b
  print a is b
  print a is empty Array<of Array<of Int>>
  print b is empty Array<of Array<of Int>>
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyArray();
  var b = system.emptyArray();
  _stdlib.append(a, system.literalArray([3]));
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(system.objectEquals(a, b)));
  system.printLine(_stdlib.asString(system.objectEquals(a, system.emptyArray())));
  system.printLine(_stdlib.asString(system.objectEquals(b, system.emptyArray())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[3]][]falsefalsetrue");
  });

  test("Pass_InitialiseEmptyArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to createArray2D(2, 2, 0)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  a = _stdlib.createArray2D(2, 2, 0);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[0, 0], [0, 0]]");
  });

  test("Pass_InitialiseArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to createArray2D(2, 2, 1)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  a = _stdlib.createArray2D(2, 2, 1);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[1, 1], [1, 1]]");
  });

  test("Fail_EmptyArray1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of Int>
  call a[0].putAt(0, 3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_2DArrayAccessedAs1D", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  call a.putAt(0, "foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: index (Int), value (Array<of String>) Provided: Int, String",
    ]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  call a.putAt(0, empty Array<of String>)
  variable b set to a[0][0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  call a.putAt(0, true)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: index (Int), value (Array<of String>) Provided: Int, Boolean",
    ]);
  });

  test("Fail_2DArrayAdd", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  call a.append("foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: value (Array<of String>) Provided: String",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to [[1,2],[3,4]]
  call a["b"].putAt(0, 5)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to [[1,2],[3,4]]
  call a[0].putAt("b", 5)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: index (Int), value (Int) Provided: String, Int",
    ]);
  });
});
