import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertParses,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Dictionary", () => {
  /*
  test("Pass_LiteralDictionary", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = DeprecatedClass1[int]() # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = [Fruit.apple:1, Fruit.orange:3, Fruit.pear:10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(system.safeIndex(a, "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", system.dictionary([["a", 1]])], ["b", system.dictionary([["b", 3], ["z", 10]])]]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, "b"), "z"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a.values());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:4, z:10, d:2]");
  });

  test("Pass_set2d", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "[a:[a:1, x:2], b:[c:4]]");
  });

  test("Pass_removeKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1], "b":["b":3, "z":10]] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = Dictionary[str, int]() # variable definition
  a.put("Foo", 1) # procedure call
  a.put("Bar", 3) # procedure call
  k = a.keys() # variable definition
  printNoLine(k.length()) # procedure call
  printNoLine(a["Foo"]) # procedure call
  printNoLine(a["Bar"]) # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_CreateEmptyDictionaryOfDictionary", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[str, int]() # variable definition
  a.put("Foo", 1) # procedure call
  a.put("Bar", 3) # procedure call
  k = a.keys() # variable definition
  printNoLine(k.length()) # procedure call
  printNoLine(a["Foo"]) # procedure call
  printNoLine(a["Bar"]) # procedure call
# end main

def main() -> None:
  a = Dictionary[str, Dictionary[str, int]]() # variable definition
  a.put("Foo", ["ff":1]) # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "2[ff:1][bb:3]");
  });

  test("Pass_EnumKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[str, Dictionary[str, int]]() # variable definition
  a.put("Foo", ["ff":1]) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = Dictionary[Fruit, int]() # variable definition
  a.put(Fruit.apple, 1) # procedure call
  a.put(Fruit.orange, 3) # procedure call
  k = a.keys() # variable definition
  printNoLine(k.length()) # procedure call
  printNoLine(a[Fruit.apple]) # procedure call
  printNoLine(a[Fruit.orange]) # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Pass_SetInMain", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = ["a":2, "b":2] # variable definition
# end main

main()
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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":2, "b":2] # variable definition
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  a = ["a":2,"b":2] # variable definition
# end procedure

main()
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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  a = ["a":["c":2],"b":["d":3]] # variable definition
# end procedure

main()
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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  a = ["a":["c":["e":""]],"b":["d":["f":""]]] # variable definition
# end procedure

main()
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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  a = ["a":["c":2],"b":["d":3]] # variable definition
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_SetInFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  print(foo())
# end main

def foo() -> int: # function
  a = ["a":2,"b":2] # variable definition
  return 
# end function

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot set an indexed value within a function. Use .withPut... functionErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SetWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  print(foo())
# end main

def main() -> None:
  a = ["a":2,"b":2] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_RepeatedKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":2,"b":2] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "a":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Duplicate Dictionary key(s).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "a":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3.1, "c":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3.1, "c":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, 10:10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, 10:10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), Provided: Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_withPutAt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  di = Dictionary[int, int]() # variable definition
  ds = Dictionary[str, int]() # variable definition
  i42 = 42 # variable definition
  s42 = "42" # variable definition
  di.put(i42, 99) # procedure call
  ds.put(s42, 98) # procedure call
  printNoLine(f"{di.hasKey(i42)} {di[i42]} {ds.hasKey(s42)} {ds[s42]}") # procedure call
  printNoLine(f"{di} {ds}") # procedure call
  printNoLine(f"{di.keys()} {di.keys().contains(42)}") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let di = system.initialise(await new _stdlib.Dictionary()._initialise());
  let ds = system.initialise(await new _stdlib.Dictionary()._initialise());
  let i42 = 42;
  let s42 = "42";
  di.put(i42, 99);
  ds.put(s42, 98);
  await _stdlib.printNoLine(\`\${await _stdlib.toString(di.hasKey(i42))} \${await _stdlib.toString(system.safeIndex(di, i42))} \${await _stdlib.toString(ds.hasKey(s42))} \${await _stdlib.toString(system.safeIndex(ds, s42))}\`);
  await _stdlib.printNoLine(\`\${await _stdlib.toString(di)} \${await _stdlib.toString(ds)}\`);
  await _stdlib.printNoLine(\`\${await _stdlib.toString(di.keys())} \${await _stdlib.toString(di.keys().contains(42))}\`);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "Advisory: Code change suggested. Method was deprecated in v1.9.LibRef.html#Xxxx",
    ]);
    await assertObjectCodeExecutes(fileImpl, "true 99 true 98[42:99] [42:98][42] true");
  });

  test("Pass_asDictionary", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  di = Dictionary[int, int]() # variable definition
  ds = Dictionary[str, int]() # variable definition
  i42 = 42 # variable definition
  s42 = "42" # variable definition
  di.put(i42, 99) # procedure call
  ds.put(s42, 98) # procedure call
  printNoLine(f"{di.hasKey(i42)} {di[i42]} {ds.hasKey(s42)} {ds[s42]}") # procedure call
  printNoLine(f"{di} {ds}") # procedure call
  printNoLine(f"{di.keys()} {di.keys().contains(42)}") # procedure call
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: String, Float.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "b":3, "z":10] # variable definition
# end main

def main() -> None:
  a = Dictionary() # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: two generic type specifiers.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary() # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["a":1, "d":2] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":1, "d":2] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1, "d":2]] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexWrongType3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1, "d":2]] # variable definition
# end main

def main() -> None:
  a = ["a":["a":1, "d":2]] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: key (String), value (Int), Provided: Int, Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfDictionaryKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["a":["a":1, "d":2]] # variable definition
# end main

def main() -> None:
  f = ["a":1] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of String, Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfListKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = ["a":1] # variable definition
# end main

def main() -> None:
  f = list[int]() # variable definition
  a = [f:1] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_LiteralDictionaryOfMutableClassKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = list[int]() # variable definition
  a = [f:1] # variable definition
# end main

def main() -> None:
  f = Foo() # variable definition
  a = [f:1] # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });
*/
  test("Fail_DictionaryOfDictionaryKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  a = [f:1] # variable definition
# end main

def main() -> None:
  a = Dictionary[Dictionary[int, int], int]() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of Int, Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfDictionaryKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[Dictionary[int, int], int]() # variable definition
# end main

def main() -> None:
  a = Dictionary[Dictionary[int, int], int]() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Dictionary<of Int, Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[Dictionary[int, int], int]() # variable definition
# end main

def main() -> None:
  a = Dictionary[list[int], int]() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfListKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[list[int], int]() # variable definition
# end main

def main() -> None:
  a = Dictionary[list[int], int]() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'List<of Int>'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DictionaryOfMutableClassKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Dictionary[list[int], int]() # variable definition
# end main

def main() -> None:
  a = Dictionary[Foo, int]() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Dictionary cannot have key of type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });
});
