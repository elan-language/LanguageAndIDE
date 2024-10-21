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

suite("Dictionary", () => {
  test("Pass_LiteralDictionary", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

enum Fruit apple, orange, pear

main
  var a set to [Fruit.apple:1, Fruit.orange:3, Fruit.pear:10]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var a = system.dictionary({[Fruit.apple] : 1, [Fruit.orange] : 3, [Fruit.pear] : 10});
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a["z"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.printLine(_stdlib.asString(system.safeIndex(a, "z")));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1], "b":["b":3, "z":10]]
  print a["b"]["z"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  system.printLine(_stdlib.asString(system.safeIndex(system.safeIndex(a, "b"), "z")));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  var b set to empty {String}
  set b to a.keys()
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  var b = system.emptyImmutableList();
  b = _stdlib.keys(a);
  system.printLine(_stdlib.asString(b));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.printLine(_stdlib.asString(_stdlib.hasKey(a, "b")));
  system.printLine(_stdlib.asString(_stdlib.hasKey(a, "d")));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.values()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.printLine(_stdlib.asString(_stdlib.values(a)));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.putAtKey("b", 4)
  call a.putAtKey("d", 2)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  _stdlib.putAtKey(a, "b", 4);
  _stdlib.putAtKey(a, "d", 2);
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a.putAtKey("b", ["c":4])
  call a["a"].putAtKey("x", 2)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  _stdlib.putAtKey(a, "b", system.dictionary({["c"] : 4}));
  _stdlib.putAtKey(system.safeIndex(a, "a"), "x", 2);
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey("b")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  _stdlib.removeAtKey(a, "b");
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1], "b":["b":3, "z":10]]
  call a["b"].removeAtKey("b")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : system.dictionary({["a"] : 1}), ["b"] : system.dictionary({["b"] : 3, ["z"] : 10})});
  _stdlib.removeAtKey(system.safeIndex(a, "b"), "b");
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey("c")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  _stdlib.removeAtKey(a, "c");
  system.printLine(_stdlib.asString(a));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to new Dictionary<of String, Int>()
  call a.putAtKey("Foo", 1)
  call a.putAtKey("Bar", 3)
  var k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.dictionary(new Object()));
  _stdlib.putAtKey(a, "Foo", 1);
  _stdlib.putAtKey(a, "Bar", 3);
  var k = _stdlib.keys(a);
  system.printLine(_stdlib.asString(_stdlib.length(k)));
  system.printLine(_stdlib.asString(system.safeIndex(a, "Foo")));
  system.printLine(_stdlib.asString(system.safeIndex(a, "Bar")));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to new Dictionary<of String, Dictionary<of String, Int>>()
  call a.putAtKey("Foo", ["ff":1])
  call a.putAtKey("Bar", new Dictionary<of String, Int>())
  call a["Bar"].putAtKey("bb", 3)
  var k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.dictionary(new Object()));
  _stdlib.putAtKey(a, "Foo", system.dictionary({["ff"] : 1}));
  _stdlib.putAtKey(a, "Bar", system.initialise(system.dictionary(new Object())));
  _stdlib.putAtKey(system.safeIndex(a, "Bar"), "bb", 3);
  var k = _stdlib.keys(a);
  system.printLine(_stdlib.asString(_stdlib.length(k)));
  system.printLine(_stdlib.asString(system.safeIndex(a, "Foo")));
  system.printLine(_stdlib.asString(system.safeIndex(a, "Bar")));
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
    const code = `# FFFF Elan Beta 3 valid

    enum Fruit apple, orange, pear  

main
  var a set to new Dictionary<of Fruit, Int>()
  call a.putAtKey(Fruit.apple, 1)
  call a.putAtKey(Fruit.orange, 3)
  var k set to a.keys()
  print k.length()
  print a[Fruit.apple]
  print a[Fruit.orange]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var a = system.initialise(system.dictionary(new Object()));
  _stdlib.putAtKey(a, Fruit.apple, 1);
  _stdlib.putAtKey(a, Fruit.orange, 3);
  var k = _stdlib.keys(a);
  system.printLine(_stdlib.asString(_stdlib.length(k)));
  system.printLine(_stdlib.asString(system.safeIndex(a, Fruit.apple)));
  system.printLine(_stdlib.asString(system.safeIndex(a, Fruit.orange)));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to empty [String:Int]
  var b set to empty [String:Int]
  call a.putAtKey("a", 3)
  print a
  print b
  print a is b
  print a is empty [String:Int]
  print b is empty [String:Int]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyDictionary();
  var b = system.emptyDictionary();
  _stdlib.putAtKey(a, "a", 3);
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(system.objectEquals(a, b)));
  system.printLine(_stdlib.asString(system.objectEquals(a, system.emptyDictionary())));
  system.printLine(_stdlib.asString(system.objectEquals(b, system.emptyDictionary())));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to empty [String:[String:Int]]
  var b set to empty [String:[String:Int]]
  call a.putAtKey("a", ["a":1])
  print a
  print b
  print a is b
  print a is empty [String:[String:Int]]
  print b is empty [String:[String:Int]]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyDictionary();
  var b = system.emptyDictionary();
  _stdlib.putAtKey(a, "a", system.dictionary({["a"] : 1}));
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(system.objectEquals(a, b)));
  system.printLine(_stdlib.asString(system.objectEquals(a, system.emptyDictionary())));
  system.printLine(_stdlib.asString(system.objectEquals(b, system.emptyDictionary())));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "a":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate Dictionary key(s)"]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3.1, "c":10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, 10:10]
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a["c"]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "No such key: c");
  });

  test("Fail_RemoveInvalidKeyType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeAtKey(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.putAtKey(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  ignore_test("Fail_getForKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.getValueByKey("a")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Dictionary to ImmutableDictionary"]);
  });

  test("Fail_putAtKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  set a to a.withPutAtKey("a", 2)
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ImmutableDictionary to Dictionary"]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.putAtKey("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_withRemoveAtKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "b":3, "z":10]
  var b set to a.withRemoveAtKey("b")
  print a
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Dictionary to ImmutableDictionary"]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var a set to new Dictionary()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Generic parameters expected: 2 got: 0"]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":1, "d":2]
  call a.putAtKey(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1, "d":2]]
  call a[0].putAtKey("a", 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to ["a":["a":1, "d":2]]
  call a["a"].putAtKey(1, 1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_Range", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1:1, 2:2]
  set a to a[1..]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot range Dictionary"]);
  });
});
