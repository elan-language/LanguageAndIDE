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

suite("T12.5_ArrayListOfArrayList", () => {
  test("Pass_literalArrayListOfArrayList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "0[[], [], []]",
    );
  });

  test("Pass_SetAndReadElements1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to create2DArray(3, 0, "")
  set a[0] to ["bar", "foo"]
  set a[2] to ["yon", "xan"]
  print a[0][1]
  print a[2][0]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
  system.safeSet(a, 0, system.literalArray(["bar", "foo"]));
  system.safeSet(a, 2, system.literalArray(["yon", "xan"]));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to create2DArray(3, 0, "")
  set a[0] to ["bar", "foo"]
  set a[0][1] to "yon"
  print a[0][1]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
  system.safeSet(a, 0, system.literalArray(["bar", "foo"]));
  system.safeDoubleSet(a, 0, 1, "yon");
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to create2DArray(3, 0, "")
  call a.add(["foo"])
  call a.add(["yon"])
  print a[3]
  print a[4]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
  _stdlib.add(a, system.literalArray(["foo"]));
  _stdlib.add(a, system.literalArray(["yon"]));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to create2DArray(3, 0, "")
  call a[1].add("foo")
  call a[2].add("yon")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.create2DArray(3, 0, "");
  _stdlib.add(system.safeIndex(a, 1), "foo");
  _stdlib.add(system.safeIndex(a, 2), "yon");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[[], [foo], [yon]]",
    );
  });

  test("Pass_InsertElements1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[one], [foo], [two], [yon], [three]]",
    );
  });

  test("Pass_InsertElements2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[foo, one], [two], [three, yon]]",
    );
  });

  test("Pass_remove1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[], [two], []]",
    );
  });

  test("Pass_removeFirst1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[one], [three], [one], [two], [three]]",
    );
  });

  test("Pass_removeFirst2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[one], [], [three], [one], [two], [three]]",
    );
  });

  test("Pass_removeAll1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[one], [three], [one], [three]]",
    );
  });

  test("Pass_removeAll2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    await assertObjectCodeExecutes(
      fileImpl,
      "[[one], [], [three], [one], [two], [three]]",
    );
  });

  test("Pass_InitializeAnArrayFromAList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to {{"foo"},{"bar","yon"}}.asArrayList()
  print a.length()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.asArrayList(system.immutableList([system.immutableList(["foo"]), system.immutableList(["bar", "yon"])]));
  system.printLine(_stdlib.asString(_stdlib.length(a)));
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "2[{foo}, {bar, yon}]",
    );
  });

  test("Pass_EmptyArrayList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to empty [[Int]]
  var b set to empty [[Int]]
  call a.add([3])
  print a
  print b
  print a is b
  print a is empty [[Int]]
  print b is empty [[Int]]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyArrayList();
  var b = system.emptyArrayList();
  _stdlib.add(a, system.literalArray([3]));
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(system.objectEquals(a, b)));
  system.printLine(_stdlib.asString(system.objectEquals(a, system.emptyArrayList())));
  system.printLine(_stdlib.asString(system.objectEquals(b, system.emptyArrayList())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[[3]][]falsefalsetrue",
    );
  });

  test("Pass_InitialiseEmptyArrayList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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

  test("Pass_InitialiseArrayList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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

  test("Fail_EmptyArrayList1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to empty [[Int]]
  set a[0][0] to 3
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to createArray(3, "")
  set a[0][0] to "foo"
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index String"]);
  });

  test("Fail_1DArrayAccessedAs2D2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to createArray(3, 0)
  set a[0][0] to 1
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Int"]);
  });

  test("Fail_2DArrayAccessedAs1D", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to createArray(3, empty [String])
  set a[0] to "foo"
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to ArrayList"]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to create2DArray(3, 0, "")
  set a[0] to empty [String]
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to createArray(3, empty [String])
  set a[0] to true
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to ArrayList"]);
  });

  test("Fail_2DArrayAdd", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new ArrayList<of ArrayList<of String>>()
  call a.add("foo")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to ArrayList"]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [[1,2],[3,4]]
  set a["b"][0] to 5
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [[1,2],[3,4]]
  set a[0]["b"] to 5
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });
});
