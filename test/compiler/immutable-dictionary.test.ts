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
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Immutable Dictionary", () => {
  test("Pass_LiteralConstantAndPrinting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  await system.printLine(global.a);
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
    const code = `# FFFF Elan v1.0.0 valid

enum Fruit apple, orange, pear  
constant a set to {Fruit.apple:1, Fruit.orange:3, Fruit.pear:10}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {
  a = system.dictionaryImmutable({[Fruit.apple] : 1, [Fruit.orange] : 3, [Fruit.pear] : 10});

};
async function main() {
  await system.printLine(global.a);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"a":1, "b":3, "z":10}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});
  await system.printLine(a);
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
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  print a["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  await system.printLine(system.safeIndex(global.a, "z"));
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

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to empty List<of String>
  set b to a.keys()
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  let b = system.emptyImmutableList();
  b = _stdlib.keys(global.a);
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

constant a set to {"a":1, "b":3, "z":10}
main
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  await system.printLine(_stdlib.hasKey(global.a, "b"));
  await system.printLine(_stdlib.hasKey(global.a, "d"));
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

constant a set to {"a":1, "b":3, "z":10}
main
  print a.values()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  await system.printLine(_stdlib.values(global.a));
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
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPutAtKey("b", 4)
  variable c set to b.withPutAtKey("d", 2)
  print a
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  let b = _stdlib.withPutAtKey(global.a, "b", 4);
  let c = _stdlib.withPutAtKey(b, "d", 2);
  await system.printLine(global.a);
  await system.printLine(c);
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
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAtKey("b")
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  let b = _stdlib.withRemoveAtKey(global.a, "b");
  await system.printLine(global.a);
  await system.printLine(b);
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
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAtKey("c")
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable({["a"] : 1, ["b"] : 3, ["z"] : 10});

};
async function main() {
  let b = _stdlib.withRemoveAtKey(global.a, "c");
  await system.printLine(b);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new DictionaryImmutable<of String, Int>()
  variable b set to a.withPutAtKey("Foo", 1)
  set b to b.withPutAtKey("Bar", 3)
  variable k set to b.keys()
  print k.length()
  print b["Foo"]
  print b["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.dictionaryImmutable(new Object()));
  let b = _stdlib.withPutAtKey(a, "Foo", 1);
  b = _stdlib.withPutAtKey(b, "Bar", 3);
  let k = _stdlib.keys(b);
  await system.printLine(_stdlib.length(k));
  await system.printLine(system.safeIndex(b, "Foo"));
  await system.printLine(system.safeIndex(b, "Bar"));
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
    const code = `# FFFF Elan v1.0.0 valid

enum Fruit apple, orange, pear  

main
  variable a set to new DictionaryImmutable<of Fruit, Int>()
  variable b set to a.withPutAtKey(Fruit.apple, 1)
  set b to b.withPutAtKey(Fruit.orange, 3)
  variable k set to b.keys()
  print k.length()
  print b[Fruit.apple]
  print b[Fruit.orange]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = system.initialise(system.dictionaryImmutable(new Object()));
  let b = _stdlib.withPutAtKey(a, Fruit.apple, 1);
  b = _stdlib.withPutAtKey(b, Fruit.orange, 3);
  let k = _stdlib.keys(b);
  await system.printLine(_stdlib.length(k));
  await system.printLine(system.safeIndex(b, Fruit.apple));
  await system.printLine(system.safeIndex(b, Fruit.orange));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EmptyDictionaryImmutable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty DictionaryImmutable<of String, Int>
  variable b set to empty DictionaryImmutable<of String, Int>
  set b to a.withPutAtKey("a", 1)
  print a
  print b
  print a is b
  print a is empty DictionaryImmutable<of String, Int>
  print b is empty DictionaryImmutable<of String, Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.emptyDictionaryImmutable();
  let b = system.emptyDictionaryImmutable();
  b = _stdlib.withPutAtKey(a, "a", 1);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.emptyDictionaryImmutable()));
  await system.printLine(system.objectEquals(b, system.emptyDictionaryImmutable()));
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
    const code = `# FFFF Elan v1.0.0 valid

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
    const code = `# FFFF Elan v1.0.0 valid

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
    const code = `# FFFF Elan v1.0.0 valid

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
    const code = `# FFFF Elan v1.0.0 valid

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
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAtKey(10)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: parameter1 (String) Provided: Int"]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPutAtKey(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: key (String), value (Int) Provided: Int, Int",
    ]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPutAtKey("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: key (String), value (Int) Provided: String, Float",
    ]);
  });

  test("Fail_CannotSetIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  set a["a"] to 0
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPutAtKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  call a.putAtKey("a", 0)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types DictionaryImmutable<of String, Int> to Dictionary<of String, Int>",
    ]);
  });

  test("Fail_removeKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"a":1, "b":3, "z":10}
  call a.removeAtKey("b")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types DictionaryImmutable<of String, Int> to Dictionary<of String, Int>",
    ]);
  });

  test("Fail_undefined", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to a.withPutAtKey("a", 1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'a' is not defined"]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new DictionaryImmutable()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> expected: 2 got: 0"]);
  });

  test("Fail_WrongIndexBrackets", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {0:"a"}

main
  print p1()
end main

function p1() returns String
  return "{a(0)}"
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot invoke identifier 'a' as a method"]);
  });

  test("Fail_WrongIndexBrackets1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {0:"a"}

main
  call a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot invoke identifier 'a' as a method"]);
  });
});
