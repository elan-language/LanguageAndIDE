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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Immutable Dictionary", () => {
  test("Pass_LiteralConstantAndPrinting", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_LiteralEnumKey", async () => {
    const code = `${testHeader}

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
  a = system.dictionaryImmutable([[Fruit.apple, 1], [Fruit.orange, 3], [Fruit.pear, 10]]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{apple:1, orange:3, pear:10}");
  });

  test("Pass_LiteralVarAndPrinting", async () => {
    const code = `${testHeader}

main
  variable a set to {"a":1, "b":3, "z":10}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_AccessByKey", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  print a["z"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  await system.printLine(system.safeIndex(global.a, "z"));
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

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to empty ListImmutable<of String>
  set b to a.keys()
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  let b = system.initialise(_stdlib.ListImmutable.emptyInstance());
  b = global.a.keys();
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a, b, z}");
  });

  test("Pass_RecordKey", async () => {
    const code = `${testHeader}

main
  variable a set to new DictionaryImmutable<of Point, Int>()
  let r1 be new Point() with x set to 1, y set to 2
  let r2 be new Point() with x set to 2, y set to 1
  let r3 be new Point() with x set to 1, y set to 2

  set a to a.withPut(r1, 1)
  set a to a.withPut(r2, 2)
  
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
  let a = system.initialise(await new _stdlib.DictionaryImmutable()._initialise());
  const r1 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  const r2 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 2; _a.y = 1; return _a;})();
  const r3 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  a = a.withPut(r1, 1);
  a = a.withPut(r2, 2);
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

  test("Pass_hasKey", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  await system.printLine(global.a.hasKey("b"));
  await system.printLine(global.a.hasKey("d"));
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

constant a set to {"a":1, "b":3, "z":10}
main
  print a.values()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  await system.printLine(global.a.values());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 3, 10}");
  });

  test("Pass_withPutAt", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPut("b", 4)
  variable c set to b.withPut("d", 2)
  print a
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  let b = global.a.withPut("b", 4);
  let c = b.withPut("d", 2);
  await system.printLine(global.a);
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}{a:1, b:4, z:10, d:2}");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAt("b")
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  let b = global.a.withRemoveAt("b");
  await system.printLine(global.a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}{a:1, z:10}");
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAt("c")
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);

};
async function main() {
  let b = global.a.withRemoveAt("c");
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to new DictionaryImmutable<of String, Int>()
  variable b set to a.withPut("Foo", 1)
  set b to b.withPut("Bar", 3)
  variable k set to b.keys()
  print k.length()
  print b["Foo"]
  print b["Bar"]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.DictionaryImmutable()._initialise());
  let b = a.withPut("Foo", 1);
  b = b.withPut("Bar", 3);
  let k = b.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(b, "Foo"));
  await system.printLine(system.safeIndex(b, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EnumKey", async () => {
    const code = `${testHeader}

enum Fruit apple, orange, pear  

main
  variable a set to new DictionaryImmutable<of Fruit, Int>()
  variable b set to a.withPut(Fruit.apple, 1)
  set b to b.withPut(Fruit.orange, 3)
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
  let a = system.initialise(await new _stdlib.DictionaryImmutable()._initialise());
  let b = a.withPut(Fruit.apple, 1);
  b = b.withPut(Fruit.orange, 3);
  let k = b.keys();
  await system.printLine(k.length());
  await system.printLine(system.safeIndex(b, Fruit.apple));
  await system.printLine(system.safeIndex(b, Fruit.orange));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_EmptyDictionaryImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to empty DictionaryImmutable<of String, Int>
  variable b set to empty DictionaryImmutable<of String, Int>
  set b to a.withPut("a", 1)
  print a
  print b
  print a is b
  print a is empty DictionaryImmutable<of String, Int>
  print b is empty DictionaryImmutable<of String, Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.DictionaryImmutable.emptyInstance());
  let b = system.initialise(_stdlib.DictionaryImmutable.emptyInstance());
  b = a.withPut("a", 1);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.DictionaryImmutable.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.DictionaryImmutable.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}{a:1}falsetruefalse");
  });

  test("Pass_RecordKeyNoDuplicates", async () => {
    const code = `${testHeader}

main
  variable a set to new DictionaryImmutable<of Point, Int>()
  let r1 be new Point() with x set to 1, y set to 2
  let r2 be new Point() with x set to 1, y set to 2

  set a to a.withPut(r1, 1)
  set a to a.withPut(r2, 2)
  
  print a[r1]
  print a.keys().length()

  set a to a.withRemoveAt(r1)

  print a.keys().length()
end main

record Point
  property x as Int
  property y as Int
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.DictionaryImmutable()._initialise());
  const r1 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  const r2 = await (async () => {const _a = {...system.initialise(await new Point()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Point()._initialise()))); _a.x = 1; _a.y = 2; return _a;})();
  a = a.withPut(r1, 1);
  a = a.withPut(r2, 2);
  await system.printLine(system.safeIndex(a, r1));
  await system.printLine(a.keys().length());
  a = a.withRemoveAt(r1);
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

  test("Pass_asDictionary", async () => {
    const code = `${testHeader}

main
  let a be {"a":1, "b":3, "z":10}
  let b be a.asDictionary()
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.dictionaryImmutable([["a", 1], ["b", 3], ["z", 10]]);
  const b = a.asDictionary();
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a:1, b:3, z:10}[a:1, b:3, z:10]");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "a":10}
main
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

constant a set to {"a":1, "b":3.1, "c":10}
main
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

constant a set to {"a":1, "b":3, 10:10}
main
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

constant a set to {"a":1, "b":3, "z":10}
main
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

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withRemoveAt(10)
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

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPut(10, 4)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `${testHeader}

constant a set to {"a":1, "b":3, "z":10}
main
  variable b set to a.withPut("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: String, Float. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotSetIndex", async () => {
    const code = `${testHeader}

main
  variable a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  set a["a"] to 0
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPutAtKey", async () => {
    const code = `${testHeader}

main
  variable a set to {"a":4, "b":5, "c":6, "d":7, "e":8}
  call a.put("a", 0)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'put' is not defined for type 'DictionaryImmutable'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_removeKey", async () => {
    const code = `${testHeader}

main
  variable a set to {"a":1, "b":3, "z":10}
  call a.removeAt("b")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'removeAt' is not defined for type 'DictionaryImmutable'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_undefined", async () => {
    const code = `${testHeader}

main
  variable a set to a.withPut("a", 1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'a' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testHeader}

main
    variable a set to new DictionaryImmutable()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type, Type>'. Click for more info.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_WrongIndexBrackets", async () => {
    const code = `${testHeader}

constant a set to {0:"a"}

main
  print p1()
end main

function p1() returns String
  return "{a(0)}"
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot invoke identifier 'a' as a method. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_WrongIndexBrackets1", async () => {
    const code = `${testHeader}

constant a set to {0:"a"}

main
  call a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot invoke identifier 'a' as a method. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfMutableClassValue", async () => {
    const code = `${testHeader}

main
    variable a set to empty DictionaryImmutable<of Int, Foo>
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfMutableClassKey", async () => {
    const code = `${testHeader}

main
    variable a set to empty DictionaryImmutable<of Foo, Int>
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfListValue", async () => {
    const code = `${testHeader}

main
  variable a set to empty DictionaryImmutable<of Int, List<of Int>>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfListKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty DictionaryImmutable<of List<of Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfDictionaryValue", async () => {
    const code = `${testHeader}

main
  variable a set to empty DictionaryImmutable<of Int, Dictionary<of Int, Int>>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'Dictionary<of Int, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryImmutableOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable a set to empty DictionaryImmutable<of Dictionary<of Int, Int>, Int>
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'Dictionary<of Int, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfMutableClassValue", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable a set to {1:f}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfMutableClassKey", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable a set to {f:1}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'Foo'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfListValue", async () => {
    const code = `${testHeader}

main
  variable f set to empty List<of Int>
  variable a set to {1:f}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfListKey", async () => {
    const code = `${testHeader}

main
  variable f set to empty List<of Int>
  variable a set to {f:1}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'List<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfListKey", async () => {
    const code = `${testHeader}

main
  variable f set to empty ListImmutable<of Int>
  variable a set to {f:1}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'ListImmutable<of Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfDictionaryValue", async () => {
    const code = `${testHeader}

main
  variable f set to ["a":1]
  variable a set to {1:f}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot be of mutable type 'Dictionary<of String, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable f set to ["a":1]
  variable a set to {f:1}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'Dictionary<of String, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfDictionaryImmutableKey", async () => {
    const code = `${testHeader}

main
  variable f set to {"a":1}
  variable a set to {f:1}
end main

class Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "DictionaryImmutable cannot have key of type 'DictionaryImmutable<of String, Int>'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfEmptyUnknownClass1", async () => {
    const code = `${testHeader}

main
  variable f set to {empty Foo:1}
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'Foo' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryImmutableOfEmptyUnknownClass2", async () => {
    const code = `${testHeader}

main
  variable f set to {1:empty Foo}
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
  variable f set to empty DictionaryImmutable
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type, Type>'. Click for more info.LangRef.html#GenericParametersCompileError",
    ]);
  });
});
