import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Array2D", () => {
  test("Pass_Array2D", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable c set to new Array2D<of Int>()
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.Array2D()._initialise());
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_Array2DAsParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  print bar(a)
end main

function bar(arr as Array2D<of Int>) returns Array2D<of Int>
  return arr
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise());
  await system.printLine((await global.bar(a)));
}

async function bar(arr) {
  return arr;
}
global["bar"] = bar;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Fail_Array2DAsParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  print foo(a)
end main

function foo(arr as Array<of Array<of Int>>) returns Array<of Array<of Int>>
  return bar(arr)
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: arr (Array<of Array<of Int>>) Provided: Array2D<of Int>",
    ]);
  });

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of String>()
  set a to createArray2D(3, 0, "")
  print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise());
  a = _stdlib.createArray2D(3, 0, "");
  await system.printLine(a.length());
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
  variable a set to createArray2D(3, 2, "")
  call a.putAt(0, 0, "bar")
  call a.putAt(0, 1, "foo")
  call a.putAt(2, 0, "yon")
  call a.putAt(2, 1, "xan")
  print a[0, 1]
  print a[2, 0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createArray2D(3, 2, "");
  a.putAt(0, 0, "bar");
  a.putAt(0, 1, "foo");
  a.putAt(2, 0, "yon");
  a.putAt(2, 1, "xan");
  await system.printLine(system.safeIndex(a, 0, 1));
  await system.printLine(system.safeIndex(a, 2, 0));
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
  set a to createArray2D(3, 2, "")
  call a.putAt(0, 0, "bar")
  call a.putAt(0, 1, "foo")
  print a[0, 1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  a = _stdlib.createArray2D(3, 2, "");
  a.putAt(0, 0, "bar");
  a.putAt(0, 1, "foo");
  await system.printLine(system.safeIndex(a, 0, 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "foo");
  });

  ignore_test("Pass_AddAndReadElements1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of String>
  set a to createArray2D(3, 0, "")
  call a.append(["foo"])
  call a.append(["yon"])
  print a[3]
  print a[4]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array.emptyInstance());
  a = _stdlib.createArray2D(3, 0, "");
  _stdlib.append(a, system.literalArray(["foo"]));
  _stdlib.append(a, system.literalArray(["yon"]));
  await system.printLine(system.safeIndex(a, 3));
  await system.printLine(system.safeIndex(a, 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[foo][yon]");
  });

  ignore_test("Pass_AddAndReadElements2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array2D<of String>
  set a to createArray2D(3, 0, "")
  call a[1].append("foo")
  call a[2].append("yon")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array.emptyInstance());
  a = _stdlib.createArray2D(3, 0, "");
  _stdlib.append(system.safeIndex(a, 1), "foo");
  _stdlib.append(system.safeIndex(a, 2), "yon");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[], [foo], [yon]]");
  });

  ignore_test("Pass_EmptyArray", async () => {
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array.emptyInstance());
  let b = system.initialise(_stdlib.Array.emptyInstance());
  _stdlib.append(a, system.literalArray([3]));
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Array.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Array.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[3]][]falsefalsetrue");
  });

  ignore_test("Pass_InitialiseEmptyArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to createArray2D(2, 2, 0)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.array(new Array()));
  a = _stdlib.createArray2D(2, 2, 0);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[0, 0], [0, 0]]");
  });

  ignore_test("Pass_InitialiseArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array2D<of Int>()
  set a to createArray2D(2, 2, 1)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.array(new Array()));
  a = _stdlib.createArray2D(2, 2, 1);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[1, 1], [1, 1]]");
  });

  ignore_test("Fail_EmptyArray1", async () => {
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

  ignore_test("Fail_2DArrayAccessedAs1D", async () => {
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
      "Argument types. Expected: index (Int), value (Array<of String>) Provided: Int, String",
    ]);
  });

  ignore_test("Fail_OutOfRange", async () => {
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

  ignore_test("Fail_TypeIncompatibility", async () => {
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
      "Argument types. Expected: index (Int), value (Array<of String>) Provided: Int, Boolean",
    ]);
  });

  ignore_test("Fail_2DArrayAdd", async () => {
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
      "Argument types. Expected: value (Array<of String>) Provided: String",
    ]);
  });

  ignore_test("Fail_IndexWrongType1", async () => {
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
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: String"]);
  });

  ignore_test("Fail_IndexWrongType2", async () => {
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
      "Argument types. Expected: index (Int), value (Int) Provided: String, Int",
    ]);
  });

  test("Fail_singleIndex2DArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray2D(3, 0, "")
  print a[0].length()
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Array2D<of String>"]);
  });
});
