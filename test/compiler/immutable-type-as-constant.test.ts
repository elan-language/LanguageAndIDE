import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Immutable Type as Constant", () => {
  test("Pass_String", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to "Apple"

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = "Apple";

async function main() {
  system.printLine(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_Tuple", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to (3, "Apple")

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.tuple([3, "Apple"]);

async function main() {
  system.printLine(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(3, Apple)");
  });

  test("Pass_List", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to {1, 2, 3}

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.list([1, 2, 3]);

async function main() {
  system.printLine(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2, 3}");
  });

  test("Pass_Dictionary", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to {"a":1, "b":3, "c":3}

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["c"] : 3});

async function main() {
  system.printLine(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, c:3}");
  });

  test("Fail_ImmutableClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k = new Foo(3)

main
  print k
end main

immutable class Foo
  constructor(p1 as Int)
    set property.p1 to p1 * 2
  end constructor
    
  property p1 as Int
    
  function asString() return String
    return "{p1}"
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Array1", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to [1, 2, 3]

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Array2", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to new Array<of Int>()

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Array3", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to empty [Int]

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Dictionary1", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to ["a":1]

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Dictionary2", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to new Dictionary<of String, Int>()

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Dictionary3", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to empty [String:Int]

main 
  print k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Class", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant k set to new Foo()

main 
  print k.p1
end main

class Foo
  constructor()

  end constructor

  property p1 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
