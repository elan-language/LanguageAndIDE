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

suite("Immutable Dictionary", () => {
  test("Pass_LiteralConstantAndPrinting", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  system.printLine(_stdlib.asString(global.a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_LiteralEnumKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

enum Fruit apple, orange, pear  
constant a set to {Fruit.apple:1, Fruit.orange:3, Fruit.pear:10}
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {
  a = system.immutableDictionary({[Fruit.apple] : 1, [Fruit.orange] : 3, [Fruit.pear] : 10});

};
async function main() {
  system.printLine(_stdlib.asString(global.a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{apple:1, orange:3, pear:10}");
  });

  test("Pass_LiteralVarAndPrinting", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"a":1, "b":3, "z":10}
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_AccessByKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  print a["z"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  system.printLine(_stdlib.asString(system.safeIndex(global.a, "z")));
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

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to empty {String}
  set b to a.keys()
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  var b = system.emptyImmutableList();
  b = _stdlib.keys(global.a);
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

constant a set to {"a":1, "b":3, "z":10}
main
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  system.printLine(_stdlib.asString(_stdlib.hasKey(global.a, "b")));
  system.printLine(_stdlib.asString(_stdlib.hasKey(global.a, "d")));
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

constant a set to {"a":1, "b":3, "z":10}
main
  print a.values()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  system.printLine(_stdlib.asString(_stdlib.values(global.a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 3, 10}");
  });

  test("Pass_putAtKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withPutAtKey("b", 4)
  var c set to b.withPutAtKey("d", 2)
  print a
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  var b = _stdlib.withPutAtKey(global.a, "b", 4);
  var c = _stdlib.withPutAtKey(b, "d", 2);
  system.printLine(_stdlib.asString(global.a));
  system.printLine(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}{a:1, b:4, z:10, d:2}");
  });

  test("Pass_withRemoveAtKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withRemoveAtKey("b")
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  var b = _stdlib.withRemoveAtKey(global.a, "b");
  system.printLine(_stdlib.asString(global.a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}{a:1, z:10}");
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withRemoveAtKey("c")
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.immutableDictionary({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  var b = _stdlib.withRemoveAtKey(global.a, "c");
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to new ImmutableDictionary<of String, Int>()
  var b set to a.withPutAtKey("Foo", 1)
  set b to b.withPutAtKey("Bar", 3)
  var k set to b.keys()
  print k.length()
  print b["Foo"]
  print b["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.immutableDictionary(new Object()));
  var b = _stdlib.withPutAtKey(a, "Foo", 1);
  b = _stdlib.withPutAtKey(b, "Bar", 3);
  var k = _stdlib.keys(b);
  system.printLine(_stdlib.asString(_stdlib.length(k)));
  system.printLine(_stdlib.asString(system.safeIndex(b, "Foo")));
  system.printLine(_stdlib.asString(system.safeIndex(b, "Bar")));
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
    const code = `# FFFF Elan Beta 3 valid

enum Fruit apple, orange, pear  

main
  var a set to new ImmutableDictionary<of Fruit, Int>()
  var b set to a.withPutAtKey(Fruit.apple, 1)
  set b to b.withPutAtKey(Fruit.orange, 3)
  var k set to b.keys()
  print k.length()
  print b[Fruit.apple]
  print b[Fruit.orange]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var a = system.initialise(system.immutableDictionary(new Object()));
  var b = _stdlib.withPutAtKey(a, Fruit.apple, 1);
  b = _stdlib.withPutAtKey(b, Fruit.orange, 3);
  var k = _stdlib.keys(b);
  system.printLine(_stdlib.asString(_stdlib.length(k)));
  system.printLine(_stdlib.asString(system.safeIndex(b, Fruit.apple)));
  system.printLine(_stdlib.asString(system.safeIndex(b, Fruit.orange)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EmptyImmutableDictionary", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to empty {String:Int}
  var b set to empty {String:Int}
  set b to a.withPutAtKey("a", 1)
  print a
  print b
  print a is b
  print a is empty {String:Int}
  print b is empty {String:Int}
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.emptyImmutableDictionary();
  var b = system.emptyImmutableDictionary();
  b = _stdlib.withPutAtKey(a, "a", 1);
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(system.objectEquals(a, b)));
  system.printLine(_stdlib.asString(system.objectEquals(a, system.emptyImmutableDictionary())));
  system.printLine(_stdlib.asString(system.objectEquals(b, system.emptyImmutableDictionary())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}{a:1}falsetruefalse");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "a":10}
main
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

constant a set to {"a":1, "b":3.1, "c":10}
main
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

constant a set to {"a":1, "b":3, 10:10}
main
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

constant a set to {"a":1, "b":3, "z":10}
main
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

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withRemoveAtKey(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withPutAtKey(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to {"a":1, "b":3, "z":10}
main
  var b set to a.withPutAtKey("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  ignore_test("Fail_CannotIndex", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  var b set to a["a"]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index ImmutableDictionary"]);
  });

  test("Fail_CannotSetIndex", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  set a["a"] to 0
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPutAtKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  call a.putAtKey("a", 0)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ImmutableDictionary to Dictionary"]);
  });

  test("Fail_removeKey", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"a":1, "b":3, "z":10}
  call a.removeAtKey("b")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ImmutableDictionary to Dictionary"]);
  });

  test("Fail_recursive definition", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to a.getValueByKey("a")
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["a is not defined"]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var a set to new ImmutableDictionary()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> expected: 2 got: 0"]);
  });
});
