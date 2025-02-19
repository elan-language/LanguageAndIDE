import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Array", () => {
  test("Pass_literalArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [4,5,6,7,8]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray([4, 5, 6, 7, 8]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8]");
  });

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>()
  print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.array(new Array()));
  await system.printLine(_stdlib.length(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ConfirmStringElementsInitializedToEmptyStringNotNull", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  print a[0].length()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createArray(3, "");
  await system.printLine(_stdlib.length(system.safeIndex(a, 0)));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0[, , ]");
  });

  test("Pass_InitialiseToEnum", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, Fruit.apple)
  print a
end main

enum Fruit apple, orange, pear
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = _stdlib.createArray(3, Fruit.apple);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[apple, apple, apple]");
  });

  test("Pass_SetAndReadIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  call a.putAt(0, a[1])
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray([1, 2, 3]);
  _stdlib.putAt(a, 0, system.safeIndex(a, 1));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[2, 2, 3]");
  });

  test("Fail_CannotinitialiseToReferenceType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, empty Foo)
  print a
  variable foo set to a[0]
  print foo.p1
end main

class Foo
  constructor()

  end constructor

  property p1 as Int
end class
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Can only create array with simple value");
  });

  test("Fail_CannotinitialiseToReferenceType2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, empty Array<of Int>)
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Can only create array with simple value");
  });

  test("Pass_SetAndReadElements", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  call a.putAt(0, "foo")
  call a.putAt(2, "yon")
  print a[0]
  print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createArray(3, "");
  _stdlib.putAt(a, 0, "foo");
  _stdlib.putAt(a, 2, "yon");
  await system.printLine(system.safeIndex(a, 0));
  await system.printLine(system.safeIndex(a, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_Range1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["foo", "bar", "yon"]
  set a to a[1..]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray(["foo", "bar", "yon"]);
  a = system.array(system.safeSlice(a, 1));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[bar, yon]");
  });

  test("Pass_AddAndReadElements", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  call a.append("foo")
  call a.append("yon")
  print a[3]
  print a[4]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createArray(3, "");
  _stdlib.append(a, "foo");
  _stdlib.append(a, "yon");
  await system.printLine(system.safeIndex(a, 3));
  await system.printLine(system.safeIndex(a, 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetFromIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  call a.append("foo")
  call a.append("yon")
  variable c set to ""
  variable d set to ""
  set c to a[3]
  set d to a[4]
  print c
  print d
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createArray(3, "");
  _stdlib.append(a, "foo");
  _stdlib.append(a, "yon");
  let c = "";
  let d = "";
  c = system.safeIndex(a, 3);
  d = system.safeIndex(a, 4);
  await system.printLine(c);
  await system.printLine(d);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_InsertElements", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  call a.insertAt(1, "foo")
  call a.insertAt(3, "yon")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray(["one", "two", "three"]);
  _stdlib.insertAt(a, 1, "foo");
  _stdlib.insertAt(a, 3, "yon");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[one, foo, two, yon, three]");
  });

  test("Pass_removeAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  call a.removeAt(0)
  call a.removeAt(1)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray(["one", "two", "three"]);
  _stdlib.removeAt(a, 0);
  _stdlib.removeAt(a, 1);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[two]");
  });

  test("Pass_removeFirst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three", "one", "two", "three"]
  call a.removeFirst("two")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray(["one", "two", "three", "one", "two", "three"]);
  _stdlib.removeFirst(a, "two");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, two, three]");
  });

  test("Pass_removeAll", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three", "one", "two", "three"]
  call a.removeAll("two")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray(["one", "two", "three", "one", "two", "three"]);
  _stdlib.removeAll(a, "two");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, three]");
  });

  test("Pass_InitializeAnArrayFromAList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"foo","bar","yon"}.asArray()
  print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asArray(system.list(["foo", "bar", "yon"]));
  await system.printLine(_stdlib.length(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_EmptyArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array<of Int>
  variable b set to empty Array<of Int>
  call a.append(3)
  print a
  print b
  print a is b
  print a is empty Array<of Int>
  print b is empty Array<of Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.emptyArray();
  let b = system.emptyArray();
  _stdlib.append(a, 3);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.emptyArray()));
  await system.printLine(system.objectEquals(b, system.emptyArray()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3][]falsefalsetrue");
  });

  test("Fail_EmptyArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array<of Int>
  call a.putAt(0, 3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_UseRoundBracketsForIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  variable b set to a(0)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot invoke identifier 'a' as a method"]);
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  variable b set to a[0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Int"]);
  });

  test("Fail_ApplyIndexToUnknown", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to a[0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'a' is not defined"]);
  });

  test("Fail_2DArrayCreatedByDoubleIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>[3][4]
  print a[0, 0]
  print a[2, 3]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  variable b set to a[3]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  call a.putAt(0, true)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (String) Provided: Int, Boolean",
    ]);
  });

  test("Fail_IndexTypeIncompatibility", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>()
  call a.putAt(0, "fred")
  call a.putAt(1, "bill")
  variable b set to 0
  set b to a[0]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: String"]);
  });

  test("Fail_IndexTypeIncompatibility1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>()
  call a.append(1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: value (String) Provided: Int"]);
  });

  test("Fail_NoSet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  set a[0] to true
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_IndexWrongType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>()
  call a.putAt("b", "fred")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (String) Provided: String, String",
    ]);
  });

  test("Fail_SizeWrongType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3.1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: size (Int), initialValue (Int) Provided: Float, Int",
    ]);
  });

  test("Fail_SizeSpecifiedInSquareBrackets", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>[3]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  // obsolete code
  test("Fail_SpecifySizeAndInitializer", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Array<of String>() {"foo","bar","yon"}
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_get", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  print a.get(1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'get' is not defined"]);
  });

  test("Fail_getRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  print a.getRange(1, 2)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'getRange' is not defined"]);
  });

  test("Fail_put", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to a.withPutAt(1, "TWO")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_withInsertAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to a.withInsertAt(1, "TWO")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_withRemove", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to a.withRemove(1)
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'withRemove' is not defined"]);
  });

  test("Fail_putAt_asFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to a.withPutAt(1, "TWO")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_appendWithPlus", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to a + "four"
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int Provided: Array<of String>",
    ]);
  });

  test("Fail_prependWithPlus", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["one", "two", "three"]
  set a to "four" + a
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: String",
    ]);
  });

  test("Fail_withRemoveFirst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to ["one", "two", "three", "one", "two", "three"]
    set a to a.withRemoveFirst("two")
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_withRemoveAll", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to ["one", "two", "three", "one", "two", "three"]
    set a to a.withRemoveAll("two")
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Pass_listOfFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo1 set to ref foo
  variable body set to [ref foo, ref foo1]
  variable foo2 set to body[0]
  print foo2(1)
end main

function foo(i as Int) returns Int
  return i
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo1 = global.foo;
  let body = system.literalArray([global.foo, foo1]);
  let foo2 = system.safeIndex(body, 0);
  await system.printLine((await foo2(1)));
}

async function foo(i) {
  return i;
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test("Pass_listOfGenericFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable arr set to [ref sqrt]
  variable s0 set to arr[0]
  print s0(4)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let arr = system.literalArray([_stdlib.sqrt]);
  let s0 = system.safeIndex(arr, 0);
  await system.printLine(s0(4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `2`);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new Array()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> Expected: 1 Provided: 0"]);
  });

  test("Fail_assignRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    set a[1..2] to a
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_negativeIndexCompile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to a[-1]
    print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Index cannot be negative"]);
  });

  test("Fail_negativeIndexRuntime", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[b]
    print c
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_negativeRange1Compile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to a[-1..2]
    print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Index cannot be negative"]);
  });

  test("Fail_negativeRange1Runtime", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[b..2]
    print c
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_negativeRange2Compile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to a[0..-1]
    print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Index cannot be negative"]);
  });

  test("Fail_negativeRange2Runtime", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[0..b]
    print c
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_listOfLibFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable body set to [ref head]
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Library or class function 'head' cannot be preceded by by 'ref'",
    ]);
  });

  test("Fail_listOfClassFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let f be new Foo()
  variable body set to [ref f.bar]
end main

class Foo
  function bar() returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["To evaluate function 'bar' add brackets."]);
  });
});
