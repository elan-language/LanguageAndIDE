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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Dictionary", () => {
  test("Pass_LiteralDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]");
  });

  test("Pass_LiteralDictionaryOfDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1], b:[b:3, z:10]]");
  });

  test("Pass_LiteralEnumKey", async () => {
    const code = `${testHeader}

enum Fruit apple, orange, pear

main
  variable a set to [Fruit.apple:1, Fruit.orange:3, Fruit.pear:10]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = system.dictionary([[Fruit.apple, 1], [Fruit.orange, 3], [Fruit.pear, 10]]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[apple:1, orange:3, pear:10]");
  });

  test("Pass_AccessByKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  print a["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await system.printLine(system.safeIndex(a, "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_AccessByDoubleKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a["b"]["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await system.printLine(system.safeIndex(system.safeIndex(a, "b"), "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_keys", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  variable b set to empty List<of String>
  set b to a.keys()
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = system.initialise(_stdlib.List.emptyInstance());
  b = a.keys();
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a, b, z]");
  });

  test("Pass_hasKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await system.printLine(a.hasKey("b"));
  await system.printLine(a.hasKey("d"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_values", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  print a.values()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await system.printLine(a.values());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 3, 10]");
  });

  test("Pass_set", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.put("b", 4)
  call a.put("d", 2)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.put("b", 4);
  a.put("d", 2);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:4, z:10, d:2]");
  });

  test("Pass_set2d", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a.put("b", ["c":4])
  call a["a"].put("x", 2)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  a.put("b", system.dictionary([["c", 4]]));
  system.safeIndex(a, "a").put("x", 2);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1, x:2], b:[c:4]]");
  });

  test("Pass_removeKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAt("b")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.removeAt("b");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, z:10]");
  });

  test("Pass_remove2dKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a["b"].removeAt("b")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  system.safeIndex(a, "b").removeAt("b");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1], b:[z:10]]");
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAt("c")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.removeAt("c");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of String, Int>()
  call a.put("Foo", 1)
  call a.put("Bar", 3)
  variable k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.put("Foo", 1);
  a.put("Bar", 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, "Foo"));
  await system.printLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_CreateEmptyDictionaryOfDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of String, Dictionary<of String, Int>>()
  call a.put("Foo", ["ff":1])
  call a.put("Bar", new Dictionary<of String, Int>())
  call a["Bar"].put("bb", 3)
  variable k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.put("Foo", system.dictionary([["ff", 1]]));
  a.put("Bar", system.initialise(await new _stdlib.Dictionary()._initialise()));
  system.safeIndex(a, "Bar").put("bb", 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, "Foo"));
  await system.printLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2[ff:1][bb:3]");
  });

  test("Pass_EnumKey", async () => {
    const code = `${testHeader}

    enum Fruit apple, orange, pear  

main
  variable a set to new Dictionary<of Fruit, Int>()
  call a.put(Fruit.apple, 1)
  call a.put(Fruit.orange, 3)
  variable k set to a.keys()
  print k.length()
  print a[Fruit.apple]
  print a[Fruit.orange]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.put(Fruit.apple, 1);
  a.put(Fruit.orange, 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, Fruit.apple));
  await system.printLine(system.safeIndex(a, Fruit.orange));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_RecordKey", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of Point, Int>()
  let r1 be new Point() with x set to 1, y set to 2
  let r2 be new Point() with x set to 2, y set to 1
  let r3 be new Point() with x set to 1, y set to 2

  call a.put(r1, 1)
  call a.put(r2, 2)
  
  print a[r1]
  print a[r2]
  print a[r3]
end main

record Point
  property x as Int
  property y as Int
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  const r1 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  const r2 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 2; _a.y = 1; return _a;})();
  const r3 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  a.put(r1, 1);
  a.put(r2, 2);
  await system.printLine(system.safeIndex(a, r1));
  await system.printLine(system.safeIndex(a, r2));
  await system.printLine(system.safeIndex(a, r3));
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, [["x", 0], ["y", 0]]);};
  async _initialise() { return this; }
  x = 0;

  y = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "121");
  });

  test("Pass_RecordKeyNoDuplicates", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of Point, Int>()
  let r1 be new Point() with x set to 1, y set to 2
  let r2 be new Point() with x set to 1, y set to 2

  call a.put(r1, 1)
  call a.put(r2, 2)
  
  print a[r1]
  print a.keys().length()

  call a.removeAt(r1)

  print a.keys().length()
end main

record Point
  property x as Int
  property y as Int
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  const r1 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  const r2 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  a.put(r1, 1);
  a.put(r2, 2);
  await system.printLine(system.safeIndex(a, r1));
  await system.printLine(a.keys().length());
  a.removeAt(r1);
  await system.printLine(a.keys().length());
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, [["x", 0], ["y", 0]]);};
  async _initialise() { return this; }
  x = 0;

  y = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "210");
  });

  test("Pass_EmptyDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of String, Int>
  variable b set to empty Dictionary<of String, Int>
  call a.put("a", 3)
  print a
  print b
  print a is b
  print a is empty Dictionary<of String, Int>
  print b is empty Dictionary<of String, Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Dictionary.emptyInstance());
  let b = system.initialise(_stdlib.Dictionary.emptyInstance());
  a.put("a", 3);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Dictionary.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Dictionary.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:3][]falsefalsetrue");
  });

  test("Pass_Empty2dDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of String, Dictionary<of String, Int>>
  variable b set to empty Dictionary<of String, Dictionary<of String, Int>>
  call a.put("a", ["a":1])
  print a
  print b
  print a is b
  print a is empty Dictionary<of String, Dictionary<of String, Int>>
  print b is empty Dictionary<of String, Dictionary<of String, Int>>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Dictionary.emptyInstance());
  let b = system.initialise(_stdlib.Dictionary.emptyInstance());
  a.put("a", system.dictionary([["a", 1]]));
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Dictionary.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Dictionary.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1]][]falsefalsetrue");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "a":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Duplicate Dictionary key(s). Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3.1, "c":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float. Click for more info.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, 10:10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int. Click for more info.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  print a["c"]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "No such key: c");
  });

  test("Fail_RemoveInvalidKeyType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAt(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), Provided: Int. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.put(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Pass_withPutAt", async () => {
    const code = `${testHeader}

main
  let a be ["a":1, "b":3, "z":10]
  variable b set to a.withPut("b", 4)
  variable c set to b.withPut("d", 2)
  print a
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = a.withPut("b", 4);
  let c = b.withPut("d", 2);
  await system.printLine(a);
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10][a:1, b:4, z:10, d:2]");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testHeader}

main
  let a be ["a":1, "b":3, "z":10]
  variable b set to a.withRemoveAt("b")
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = a.withRemoveAt("b");
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10][a:1, z:10]");
  });

  test("Pass_checkKeys(#1196)", async () => {
    const code = `${testHeader}

main
  variable di set to empty Dictionary<of Int, Int>
  variable ds set to empty Dictionary<of String, Int>
  variable i42 set to 42
  variable s42 set to "42"
  call di.put(i42, 99)
  call ds.put(s42, 98)
  print "{di.hasKey(i42)} {di[i42]} {ds.hasKey(s42)} {ds[s42]}"
  print "{di} {ds}"
  print "{di.keys()} {di.keys().contains(42)}"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let di = system.initialise(_stdlib.Dictionary.emptyInstance());
  let ds = system.initialise(_stdlib.Dictionary.emptyInstance());
  let i42 = 42;
  let s42 = "42";
  di.put(i42, 99);
  ds.put(s42, 98);
  await system.printLine(\`\${await _stdlib.asString(di.hasKey(i42))} \${await _stdlib.asString(system.safeIndex(di, i42))} \${await _stdlib.asString(ds.hasKey(s42))} \${await _stdlib.asString(system.safeIndex(ds, s42))}\`);
  await system.printLine(\`\${await _stdlib.asString(di)} \${await _stdlib.asString(ds)}\`);
  await system.printLine(\`\${await _stdlib.asString(di.keys())} \${await _stdlib.asString(di.keys().contains(42))}\`);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true 99 true 98[42:99] [42:98][42] true");
  });

  test("Pass_asDictionaryImmutable", async () => {
    const code = `${testHeader}

main
  let a be ["a":1, "b":3, "z":10]
  let b be a.asDictionaryImmutable()
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  const b = a.asDictionaryImmutable();
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]{a:1, b:3, z:10}");
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.put("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: String, Float. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testHeader}

main
    variable a set to new Dictionary()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type, Type>'. Click for more info.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "d":2]
  call a.put(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1, "d":2]]
  call a[0].put("a", 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int. Click for more info.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1, "d":2]]
  call a["a"].put(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Range", async () => {
    const code = `${testHeader}

main
  variable a set to [1:1, 2:2]
  set a to a[1..]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot range Dictionary<of Int, Int>. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable f set to ["a":1]
  variable a set to [f:1]
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of String, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable f set to empty List<of Int>
  variable a set to [f:1]
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfMutableClassKey", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable a set to [f:1]
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of Dictionary<of Int, Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of Int, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfDictionaryImmutableKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of DictionaryImmutable<of Int, Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'DictionaryImmutable<of Int, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of List<of Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty Dictionary<of ListImmutable<of Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'ListImmutable<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfMutableClassKey", async () => {
    const code = `${testHeader}

main
    variable a set to empty Dictionary<of Foo, Int>
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionyOfEmptyUnknownClass1", async () => {
    const code = `${testHeader}

main
  variable f set to [empty Foo:1]
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'Foo' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionyOfEmptyUnknownClass2", async () => {
    const code = `${testHeader}

main
  variable f set to [1:empty Foo]
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'Foo' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_EmptyGenericType", async () => {
    const code = `${testHeader}

main
  variable f set to empty Dictionary
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type, Type>'. Click for more info.LangRef.html#GenericParametersCompileError",
    ]);
  });
});
