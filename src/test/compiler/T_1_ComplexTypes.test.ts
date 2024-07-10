import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompileWithId,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T_1_ComplexTypes", () => {
  test("Pass_ArrayListOfDictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to [["a":1], ["b":3, "z":10]]
  set a[0]["b"] to 2
  print a[0]["b"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.dictionary({["a"] : 1}), system.dictionary({["b"] : 3, ["z"] : 10})]);
  system.safeDoubleSet(a, 0, "b", 2);
  system.printLine(_stdlib.asString(system.safeDoubleIndex(a, 0, "b")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_DictionaryOfArrayList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to ["a":[1,2], "b":[3,4,5]]
  set a["b"][0] to 2
  print a["b"][0]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : system.literalArray([1, 2]), ["b"] : system.literalArray([3, 4, 5])});
  system.safeDoubleSet(a, "b", 0, 2);
  system.printLine(_stdlib.asString(system.safeDoubleIndex(a, "b", 0)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to [["a":1], ["b":3, "z":10]]
  set a["b"]["b"] to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident7", ["Incompatible types String to Int"]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to [["a":1], ["b":3, "z":10]]
  set a[0][0] to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident7", ["Incompatible types Int to String"]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to ["a":[1,2], "b":[3,4,5]]
  set a[0][0] to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident7", ["Incompatible types Int to String"]);
  });

  test("Fail_IndexWrongType4", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to ["a":[1,2], "b":[3,4,5]]
  set a["b"]["b"] to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident7", ["Incompatible types String to Int"]);
  });
});
