import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
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

suite("T17_Dictionaries", () => {
  test("Pass_LiteralConstantAndPrinting", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test("Pass_LiteralEnumKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

enum Fruit
  apple, orange, pear
end enum

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
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [apple:1, orange:3, pear:10]");
  });

  test("Pass_AccessByKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a["z"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.print(_stdlib.asString(a["z"]));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {a, b, z}");
  });

  test("Pass_hasKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.print(_stdlib.asString(_stdlib.hasKey(a, "b")));
  system.print(_stdlib.asString(_stdlib.hasKey(a, "d")));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.values()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.print(_stdlib.asString(_stdlib.values(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {1, 3, 10}");
  });

  test("Pass_set", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  set a["b"] to 4
  set a["d"] to 2
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  a["b"] = 4;
  a["d"] = 2;
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:4, z:10, d:2]");
  });

  test("Pass_removeKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeKey("b")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  _stdlib.removeKey(a, "b");
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, z:10]");
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeKey("c")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.dictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  _stdlib.removeKey(a, "c");
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Dictionary<of String, Int>()
  set a["Foo"] to 1
  set a["Bar"] to 3
  var k set to a.keys()
  print k.length()
  print a["Foo"]
  print a["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.dictionary(new Object()));
  a["Foo"] = 1;
  a["Bar"] = 3;
  var k = _stdlib.keys(a);
  system.print(_stdlib.asString(_stdlib.length(k)));
  system.print(_stdlib.asString(a["Foo"]));
  system.print(_stdlib.asString(a["Bar"]));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EnumKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

    enum Fruit
  apple, orange, pear
end enum  

main
  var a set to new Dictionary<of Fruit, Int>()
  set a[Fruit.apple] to 1
  set a[Fruit.orange] to 3
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
  a[Fruit.apple] = 1;
  a[Fruit.orange] = 3;
  var k = _stdlib.keys(a);
  system.print(_stdlib.asString(_stdlib.length(k)));
  system.print(_stdlib.asString(a[Fruit.apple]));
  system.print(_stdlib.asString(a[Fruit.orange]));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to empty [String:Int]
  var b set to empty [String:Int]
  set a["a"] to 3
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
  a["a"] = 3;
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(system.objectEquals(a, b)));
  system.print(_stdlib.asString(system.objectEquals(a, system.emptyDictionary())));
  system.print(_stdlib.asString(system.objectEquals(b, system.emptyDictionary())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:3]empty Dictionaryfalsefalsetrue");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a["c"]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_RemoveInvalidKeyType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  call a.removeKey(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Failed");
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  set a[10] to 4
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Failed");
  });

  test("Fail_getForKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  print a.getKey("a")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Dictionary to ImmutableDictionary"]);
  });

  test("Fail_putAtKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  set a to a.withKey("a", 2)
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ImmutableDictionary to Dictionary"]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  set a["b"] to 3.1
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_withRemoveKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["a":1, "b":3, "z":10]
  var b set to a.withRemoveKey("b")
  print a
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Dictionary to ImmutableDictionary"]);
  });
});
