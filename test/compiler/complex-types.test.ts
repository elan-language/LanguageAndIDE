import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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

suite("Complex Types", () => {
  test("Pass_ListOfDictionary", async () => {
    const code = `${testHeader}

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a[0].put("b", 2)
  print a[0]["b"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.dictionary([["a", 1]]), system.dictionary([["b", 3], ["z", 10]])]);
  system.safeIndex(a, 0).put("b", 2);
  await system.printLine(system.safeIndex(system.safeIndex(a, 0), "b"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_DictionaryOfList", async () => {
    const code = `${testHeader}

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a["b"].put(0, 2)
  print a["b"][0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.list([1, 2])], ["b", system.list([3, 4, 5])]]);
  system.safeIndex(a, "b").put(0, 2);
  await system.printLine(system.safeIndex(system.safeIndex(a, "b"), 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testHeader}

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a.put("b", ["b":2])
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (Dictionary<of String, Int>), Provided: String, Dictionary<of String, Int>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `${testHeader}

main 
  variable a set to [["a":1], ["b":3, "z":10]]
  call a[0].put(0, 2)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `${testHeader}

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a.put(0, [2,2])
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (List<of Int>), Provided: Int, List<of Int>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType4", async () => {
    const code = `${testHeader}

main 
  variable a set to ["a":[1,2], "b":[3,4,5]]
  call a["b"].put("b", 2)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (Int), Provided: String, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnknownOfType", async () => {
    const code = `${testHeader}

main
  let a be new List<of Foo>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UnknowNestedOfType", async () => {
    const code = `${testHeader}

main
  let a be new List<of List<of Foo>>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_NotType", async () => {
    const code = `${testHeader}

main
  let t be 1
  let a be new List<of t>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
