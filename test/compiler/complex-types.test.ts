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
  transforms,
} from "./compiler-test-helpers";

suite("Complex Types", () => {
  test("Pass_ArrayOfDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a[0].putAtKey("b", 2)
  print a[0]["b"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.literalArray([system.dictionary([["a", 1]]), system.dictionary([["b", 3], ["z", 10]])]);
  system.safeIndex(a, 0).putAtKey("b", 2);
  await system.printLine(system.safeIndex(system.safeIndex(a, 0), "b"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_DictionaryOfArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a["b"].putAt(0, 2)
  print a["b"][0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.literalArray([1, 2])], ["b", system.literalArray([3, 4, 5])]]);
  system.safeIndex(a, "b").putAt(0, 2);
  await system.printLine(system.safeIndex(system.safeIndex(a, "b"), 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a.putAt("b", ["b":2])
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (Dictionary<of String, Int>) Provided: String, Dictionary<of String, Int>",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a[0].putAtKey(0, 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int) Provided: Int, Int",
    ]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a.putAtKey(0, [2,2])
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Array<of Int>) Provided: Int, Array<of Int>",
    ]);
  });

  test("Fail_IndexWrongType4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a["b"].putAt("b", 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (Int) Provided: String, Int",
    ]);
  });

  test("Fail_UnknownOfType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be new Array<of Foo>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined"]);
  });

  test("Fail_UnknowNestedOfType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be new Array<of Array<of Foo>>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined"]);
  });

  test("Fail_NotType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let t be 1
  let a be new Array<of t>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
