import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = system.dictionary([[Fruit.apple, 1], [Fruit.orange, 3], [Fruit.pear, 10]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a["z"])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(system.safeIndex(a, "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a["b"]["z"])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, "b"), "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  variable b set to new List<of String>()
  set b to a.keys()
  call printNoLine(b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = system.initialise(await new _stdlib.List()._initialise());
  b = a.keys();
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a.hasKey("b"))
  call printNoLine(a.hasKey("d"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a.hasKey("b"));
  await _stdlib.printNoLine(a.hasKey("d"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a.values())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a.values());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.put("b", 4);
  a.put("d", 2);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  a.put("b", system.dictionary([["c", 4]]));
  system.safeIndex(a, "a").put("x", 2);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.removeAt("b");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  system.safeIndex(a, "b").removeAt("b");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  a.removeAt("c");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(k.length())
  call printNoLine(a["Foo"])
  call printNoLine(a["Bar"])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.put("Foo", 1);
  a.put("Bar", 3);
  let k = a.keys();
  await _stdlib.printNoLine(k.length());
  await _stdlib.printNoLine(system.safeIndex(a, "Foo"));
  await _stdlib.printNoLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(k.length())
  call printNoLine(a["Foo"])
  call printNoLine(a["Bar"])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Dictionary()._initialise());
  a.put("Foo", system.dictionary([["ff", 1]]));
  a.put("Bar", system.initialise(await new _stdlib.Dictionary()._initialise()));
  system.safeIndex(a, "Bar").put("bb", 3);
  let k = a.keys();
  await _stdlib.printNoLine(k.length());
  await _stdlib.printNoLine(system.safeIndex(a, "Foo"));
  await _stdlib.printNoLine(system.safeIndex(a, "Bar"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(k.length())
  call printNoLine(a[Fruit.apple])
  call printNoLine(a[Fruit.orange])
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
  await _stdlib.printNoLine(k.length());
  await _stdlib.printNoLine(system.safeIndex(a, Fruit.apple));
  await _stdlib.printNoLine(system.safeIndex(a, Fruit.orange));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_SetInMain", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":2, "b":2]
  set a["a"] to 1
  call print(a["a"])
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 2], ["b", 2]]);
  system.safeSet(a, 1, ["a"]);
  await _stdlib.print(system.safeIndex(a, "a"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Pass_SetInProcedure", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to ["a":2,"b":2]
  set a["a"] to 1
  call print(a["a"])
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.dictionary([["a", 2], ["b", 2]]);
  system.safeSet(a, 1, ["a"]);
  await _stdlib.print(system.safeIndex(a, "a"));
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Pass_SetDictionaryOfDictionary", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to ["a":["c":2],"b":["d":3]]
  set a["a"]["c"] to 1
  call print(a["a"]["c"])
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.dictionary([["a", system.dictionary([["c", 2]])], ["b", system.dictionary([["d", 3]])]]);
  system.safeSet(a, 1, ["a", "c"]);
  await _stdlib.print(system.safeIndex(system.safeIndex(a, "a"), "c"));
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Pass_SetDictionaryOfDictionaryOfDictionary", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to ["a":["c":["e":""]],"b":["d":["f":""]]]
  set a["a"]["c"]["e"] to "1"
  call print(a["a"]["c"]["e"])
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.dictionary([["a", system.dictionary([["c", system.dictionary([["e", ""]])]])], ["b", system.dictionary([["d", system.dictionary([["f", ""]])]])]]);
  system.safeSet(a, "1", ["a", "c", "e"]);
  await _stdlib.print(system.safeIndex(system.safeIndex(system.safeIndex(a, "a"), "c"), "e"));
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Fail_DictionaryOfDictionaryWrongType", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to ["a":["c":2],"b":["d":3]]
  set a["a"]["c"] to ""
  call print(a["a"]["c"])
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.dictionary([["a", system.dictionary([["c", 2]])], ["b", system.dictionary([["d", 3]])]]);
  system.safeSet(a, 1, ["a", "c"]);
  await _stdlib.print(system.safeIndex(system.safeIndex(a, "a"), "c"));
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_SetInFunction", async () => {
    const code = `${testHeader}

main
  call print(foo())
end main

function foo() returns Int
  variable a set to ["a":2,"b":2]
  set a["a"] to 1
  return a["a"]
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot set an indexed value within a function. Use .withPut... functionLangRef.html#compile_error",
    ]);
  });

  test("Fail_SetWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":2,"b":2]
  set a["a"] to "fred"
  call print(a["a"])
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_RepeatedKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "a":10]
  call printNoLine(a)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate Dictionary key(s).LangRef.html#compile_error"]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3.1, "c":10]
  call printNoLine(a)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, 10:10]
  call printNoLine(a)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call printNoLine(a["c"])
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), Provided: Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.put(10, 4)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.LangRef.html#compile_error",
    ]);
  });

  test("Pass_withPutAt", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  variable b set to a.withPut("b", 4)
  variable c set to b.withPut("d", 2)
  call printNoLine(a)
  call printNoLine(c)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = a.withPut("b", 4);
  let c = b.withPut("d", 2);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10][a:1, b:4, z:10, d:2]");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  variable b set to a.withRemoveAt("b")
  call printNoLine(a)
  call printNoLine(b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let b = a.withRemoveAt("b");
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10][a:1, z:10]");
  });

  test("Pass_checkKeys(#1196)", async () => {
    const code = `${testHeader}

main
  variable di set to new Dictionary<of Int, Int>()
  variable ds set to new Dictionary<of String, Int>()
  variable i42 set to 42
  variable s42 set to "42"
  call di.put(i42, 99)
  call ds.put(s42, 98)
  call printNoLine("{di.hasKey(i42)} {di[i42]} {ds.hasKey(s42)} {ds[s42]}")
  call printNoLine("{di} {ds}")
  call printNoLine("{di.keys()} {di.keys().contains(42)}")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let di = system.initialise(await new _stdlib.Dictionary()._initialise());
  let ds = system.initialise(await new _stdlib.Dictionary()._initialise());
  let i42 = 42;
  let s42 = "42";
  di.put(i42, 99);
  ds.put(s42, 98);
  await _stdlib.printNoLine(\`\${await _stdlib.asString(di.hasKey(i42))} \${await _stdlib.asString(system.safeIndex(di, i42))} \${await _stdlib.asString(ds.hasKey(s42))} \${await _stdlib.asString(system.safeIndex(ds, s42))}\`);
  await _stdlib.printNoLine(\`\${await _stdlib.asString(di)} \${await _stdlib.asString(ds)}\`);
  await _stdlib.printNoLine(\`\${await _stdlib.asString(di.keys())} \${await _stdlib.asString(di.keys().contains(42))}\`);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true 99 true 98[42:99] [42:98][42] true");
  });

  test("Pass_asDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:3, z:10]");
  });

  test("Fail_SetInvalidValueType", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "b":3, "z":10]
  call a.put("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: String, Float.LangRef.html#compile_error",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testHeader}

main
    variable a set to new Dictionary()
    call printNoLine(a)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type, Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":1, "d":2]
  call a.put(1, 1)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1, "d":2]]
  call a[0].put("a", 1)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `${testHeader}

main
  variable a set to ["a":["a":1, "d":2]]
  call a["a"].put(1, 1)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Range", async () => {
    const code = `${testHeader}

main
  variable a set to [1:1, 2:2]
  set a to a[1..]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot range Dictionary<of Int, Int>.LangRef.html#compile_error",
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of String, Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable f set to new List<of Int>()
  variable a set to [f:1]
end main

class Foo
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.LangRef.html#compile_error",
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of Dictionary<of Int, Int>, Int>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of Int, Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfDictionaryKey", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of Dictionary<of Int, Int>, Int>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of Int, Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of List<of Int>, Int>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testHeader}

main
  variable a set to new Dictionary<of List<of Int>, Int>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfMutableClassKey", async () => {
    const code = `${testHeader}

main
    variable a set to new Dictionary<of Foo, Int>()
end main

class Foo
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'.LangRef.html#compile_error",
    ]);
  });
});
