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

suite("Array of Array", () => {
  test("Pass_literalArrayOfArray", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [1,2]
  var b set to [3,4]
  var c set to [a,b]
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.literalArray([3, 4]);
  var c = system.literalArray([a, b]);
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

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  print a.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
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

  test("Pass_ConfirmStringElementsInitializedToEmptyArrayNotNull", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  print a[0].length()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
  system.printLine(_stdlib.asString(_stdlib.length(system.safeIndex(a, 0))));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0[[], [], []]");
  });

  test("Pass_SetAndReadElements1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  call a.putAt(0, ["bar", "foo"])
  call a.putAt(2, ["yon", "xan"])
  print a[0][1]
  print a[2][0]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  call a.putAt(0, ["bar", "foo"])
  call a[0].putAt(1, "yon")
  print a[0][1]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  call a.append(["foo"])
  call a.append(["yon"])
  print a[3]
  print a[4]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  call a[1].append("foo")
  call a[2].append("yon")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
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

  test("Pass_InsertElements1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"]]
  call a.insertAt(1, ["foo"])
  call a.insertAt(3, ["yon"])
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.insertAt(a, 1, system.literalArray(["foo"]));
  _stdlib.insertAt(a, 3, system.literalArray(["yon"]));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [foo], [two], [yon], [three]]");
  });

  test("Pass_InsertElements2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"]]
  call a[0].insertAt(0, "foo")
  call a[2].insertAt(1, "yon")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.insertAt(system.safeIndex(a, 0), 0, "foo");
  _stdlib.insertAt(system.safeIndex(a, 2), 1, "yon");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[foo, one], [two], [three, yon]]");
  });

  test("Pass_remove1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"]]
  call a.removeAt(0)
  call a.removeAt(1)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeAt(a, 0);
  _stdlib.removeAt(a, 1);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[two]]");
  });

  test("Pass_remove2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"]]
  call a[0].removeAt(0)
  call a[2].removeAt(0)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeAt(system.safeIndex(a, 0), 0);
  _stdlib.removeAt(system.safeIndex(a, 2), 0);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[], [two], []]");
  });

  test("Pass_removeFirst1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a.removeFirst(["two"])
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"]), system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeFirst(a, system.literalArray(["two"]));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [two], [three]]");
  });

  test("Pass_removeFirst2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a[1].removeFirst("two")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"]), system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeFirst(system.safeIndex(a, 1), "two");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_removeAll1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a.removeAll(["two"])
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"]), system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeAll(a, system.literalArray(["two"]));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [three]]");
  });

  test("Pass_removeAll2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [["one"], ["two", "two"], ["three"], ["one"], ["two"], ["three"]]
  call a[1].removeAll("two")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray(["one"]), system.literalArray(["two", "two"]), system.literalArray(["three"]), system.literalArray(["one"]), system.literalArray(["two"]), system.literalArray(["three"])]);
  _stdlib.removeAll(system.safeIndex(a, 1), "two");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_InitializeAnArrayFromAList", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to {{"foo"},{"bar","yon"}}.asArray()
  print a.length()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.asArray(system.list([system.list(["foo"]), system.list(["bar", "yon"])]));
  system.printLine(_stdlib.asString(_stdlib.length(a)));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2[{foo}, {bar, yon}]");
  });

  test("Pass_EmptyArray", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to empty [[Int]]
  var b set to empty [[Int]]
  call a.append([3])
  print a
  print b
  print a is b
  print a is empty [[Int]]
  print b is empty [[Int]]
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(2, 2, 0)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(2, 2, 0);
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(2, 2, 1)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(2, 2, 1);
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
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to empty [[Int]]
  call a[0].putAt(0, 3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [1, 2]
  var b set to a[0][0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Int"]);
  });

  test("Fail_1DArrayAccessedAs2D1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to createArray(3, "")
  call a[0].putAt(0, "foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to [String]"]);
  });

  test("Fail_1DArrayAccessedAs2D2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to createArray(3, 0)
  call a[0].putAt(0, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to [Int]"]);
  });

  test("Fail_2DArrayAccessedAs1D", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to createArray(3, empty [String])
  call a.putAt(0, "foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to [String]"]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to create2DArray(3, 0, "")
  call a.putAt(0, empty [String])
  var b set to a[0][0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to createArray(3, empty [String])
  call a.putAt(0, true)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to [String]"]);
  });

  test("Fail_2DArrayAdd", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to new Array<of Array<of String>>()
  call a.append("foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to [String]"]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [[1,2],[3,4]]
  call a["b"].putAt(0, 5)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to [[1,2],[3,4]]
  call a[0].putAt("b", 5)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });
});
