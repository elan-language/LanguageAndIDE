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

suite("Dictionary", () => {
  test("Pass_LiteralDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]");
  });

  test("Pass_LiteralDictionaryOfDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1], b:[b:3, z:10]]");
  });

  test("Pass_LiteralEnumKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  let a = system.dictionary({[Fruit.apple] : 1, [Fruit.orange] : 3, [Fruit.pear] : 10});
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[apple:1, orange:3, pear:10]");
  });

  test("Pass_AccessByKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  print a["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  await system.printLine(system.safeIndex(a, "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_AccessByDoubleKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a["b"]["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  await system.printLine(system.safeIndex(system.safeIndex(a, "b"), "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_keys", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  variable b set to empty List<of String>
  set b to a.keys()
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  let b = system.initialise(_stdlib.List.emptyInstance());
  b = a.keys();
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a, b, z}");
  });

  test("Pass_hasKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  await system.printLine(a.hasKey("b"));
  await system.printLine(a.hasKey("d"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_values", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  print a.values()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  await system.printLine(a.values());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 3, 10}");
  });

  test("Pass_set", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.putAtKey("b", 4)
  call a.putAtKey("d", 2)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  a.putAtKey("b", 4);
  a.putAtKey("d", 2);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:4, z:10, d:2]");
  });

  test("Pass_set2d", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a.putAtKey("b", ["c":4])
  call a["a"].putAtKey("x", 2)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  a.putAtKey("b", system.dictionary({["c"] : 4}));
  system.safeIndex(a, "a").putAtKey("x", 2);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1, x:2], b:[c:4]]");
  });

  test("Pass_removeKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey("b")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  a.removeAtKey("b");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, z:10]");
  });

  test("Pass_remove2dKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a["b"].removeAtKey("b")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  system.safeIndex(a, "b").removeAtKey("b");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1], b:[z:10]]");
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey("c")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  a.removeAtKey("c");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Dictionary<of String, Int>()
  call a.putAtKey("Foo", 1)
  call a.putAtKey("Bar", 3)
  variable k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.putAtKey("Foo", 1);
  a.putAtKey("Bar", 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, "Foo"));
  await system.printLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_CreateEmptyDictionaryOfDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Dictionary<of String, Dictionary<of String, Int>>()
  call a.putAtKey("Foo", ["ff":1])
  call a.putAtKey("Bar", new Dictionary<of String, Int>())
  call a["Bar"].putAtKey("bb", 3)
  variable k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.putAtKey("Foo", system.dictionary({["ff"] : 1}));
  a.putAtKey("Bar", system.initialise(await new _stdlib.Dictionary()._initialise()));
  system.safeIndex(a, "Bar").putAtKey("bb", 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, "Foo"));
  await system.printLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2[ff:1][bb:3]");
  });

  test("Pass_EnumKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    enum Fruit apple, orange, pear  

main
  variable a set to new Dictionary<of Fruit, Int>()
  call a.putAtKey(Fruit.apple, 1)
  call a.putAtKey(Fruit.orange, 3)
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
  a.putAtKey(Fruit.apple, 1);
  a.putAtKey(Fruit.orange, 3);
  let k = a.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(a, Fruit.apple));
  await system.printLine(system.safeIndex(a, Fruit.orange));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EmptyDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Dictionary<of String, Int>
  variable b set to empty Dictionary<of String, Int>
  call a.putAtKey("a", 3)
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
  a.putAtKey("a", 3);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Dictionary.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Dictionary.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:3][]falsefalsetrue");
  });

  test("Pass_Empty2dDictionary", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Dictionary<of String, Dictionary<of String, Int>>
  variable b set to empty Dictionary<of String, Dictionary<of String, Int>>
  call a.putAtKey("a", ["a":1])
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
  a.putAtKey("a", system.dictionary({["a"] : 1}));
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Dictionary.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Dictionary.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1]][]falsefalsetrue");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "a":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate Dictionary key(s)"]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3.1, "c":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: Float"]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, 10:10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: String Provided: Int"]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  print a["c"]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "No such key: c");
  });

  test("Fail_RemoveInvalidKeyType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types. Expected: key (String) Provided: Int"]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.putAtKey(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int) Provided: Int, Int",
    ]);
  });

  test("Fail_withPutAtKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  set a to a.withPutAtKey("a", 2)
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'withPutAtKey' is not defined for type 'Dictionary'"]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.putAtKey("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int) Provided: String, Float",
    ]);
  });

  test("Fail_withRemoveAtKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "b":3, "z":10]
  variable b set to a.withRemoveAtKey("b")
  print a
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'withRemoveAtKey' is not defined for type 'Dictionary'"]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new Dictionary()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> Expected: 2 Provided: 0"]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":1, "d":2]
  call a.putAtKey(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int) Provided: Int, Int",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1, "d":2]]
  call a[0].putAtKey("a", 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: String Provided: Int"]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ["a":["a":1, "d":2]]
  call a["a"].putAtKey(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int) Provided: Int, Int",
    ]);
  });

  test("Fail_Range", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1:1, 2:2]
  set a to a[1..]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot range Dictionary<of Int, Int>"]);
  });
});
