import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertExportedVBis,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  testVBHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python List", () => {
  test("Pass_literalList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0]["b"] = 5 # assignment
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8]");
  });

  test("Pass_appendList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [9, 10, 11] # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.list([9, 10, 11]);
  a.appendList(b);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8, 9, 10, 11]");
  });

  test("Fail_appendValueAsList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [9, 10, 11] # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = 9 # variable definition
  a.appendList(b) # procedure call
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
      "Argument types. Expected: other (List<of Int>), Provided: Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_prependList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = 9 # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [9, 10, 11] # variable definition
  a.prependList(b) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.list([9, 10, 11]);
  a.prependList(b);
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
    await assertObjectCodeExecutes(fileImpl, "[9, 10, 11, 4, 5, 6, 7, 8]");
  });

  test("Pass_literalListOfList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [9, 10, 11] # variable definition
  a.prependList(b) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [[4], [5]] # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([4]), system.list([5])]);
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
    await assertObjectCodeExecutes(fileImpl, "[[4], [5]]");
  });

  test("Pass_DeclareAnEmptyListBySizeAndCheckLength", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[4], [5]] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = list[str]() # variable definition
  printNoLine(a.length()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  await _stdlib.printNoLine(a.length());
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ConfirmStringElementsInitializedToEmptyStringNotNull", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[str]() # variable definition
  printNoLine(a.length()) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  printNoLine(a[0].length()) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(3, "");
  await _stdlib.printNoLine(_stdlib.length(system.safeIndex(a, 0)));
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
    await assertObjectCodeExecutes(fileImpl, "0[, , ]");
  });

  test("Pass_InitialiseToEnum", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  printNoLine(a[0].length()) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, Fruit.apple) # variable definition
  printNoLine(a) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(3, Fruit.apple);
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
    await assertObjectCodeExecutes(fileImpl, "[apple, apple, apple]");
  });

  test("Pass_SetAndReadIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, Fruit.apple) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [1, 2, 3] # variable definition
  a[0] = a[1] # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  system.safeSet(a, system.safeIndex(a, 1), [0]);
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
    assertObjectCodeIs(fileImpl, objectCode);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeExecutes(fileImpl, "[2, 2, 3]");
  });

  test("Pass_Range", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3] # variable definition
  a[0] = a[1] # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = list[int]() # variable definition
  b = a.subList(2, 5) # assignment
  printNoLine(b) # procedure call
  printNoLine(a.subList(1, 3)) # procedure call
  printNoLine(a.subList(0, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.initialise(await new _stdlib.List()._initialise());
  b = a.subList(2, 5);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(a.subList(1, 3));
  await _stdlib.printNoLine(a.subList(0, 2));
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
    await assertObjectCodeExecutes(fileImpl, "[6, 7, 8][5, 6][4, 5]");
  });

  test("Fail_CannotinitialiseToReferenceType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = list[int]() # variable definition
  b = a.subList(2, 5) # assignment
  printNoLine(b) # procedure call
  printNoLine(a.subList(1, 3)) # procedure call
  printNoLine(a.subList(0, 2)) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, list[int]()) # variable definition
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Can only create List with simple value");
  });

  test("Pass_SetAndReadElements", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, list[int]()) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a[0] = "foo" # assignment
  a[2] = "yon" # assignment
  printNoLine(a[0]) # procedure call
  printNoLine(a[2]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(3, "");
  system.safeSet(a, "foo", [0]);
  system.safeSet(a, "yon", [2]);
  await _stdlib.printNoLine(system.safeIndex(a, 0));
  await _stdlib.printNoLine(system.safeIndex(a, 2));
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_Range1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a[0] = "foo" # assignment
  a[2] = "yon" # assignment
  printNoLine(a[0]) # procedure call
  printNoLine(a[2]) # procedure call
# end main

def main() -> None:
  a = ["foo", "bar", "yon"] # variable definition
  a = a.subList(1, a.length()) # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["foo", "bar", "yon"]);
  a = a.subList(1, a.length());
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
    await assertObjectCodeExecutes(fileImpl, "[bar, yon]");
  });

  test("Pass_AddAndReadElements", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["foo", "bar", "yon"] # variable definition
  a = a.subList(1, a.length()) # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a.append("foo") # procedure call
  a.append("yon") # procedure call
  printNoLine(a[3]) # procedure call
  printNoLine(a[4]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(3, "");
  a.append("foo");
  a.append("yon");
  await _stdlib.printNoLine(system.safeIndex(a, 3));
  await _stdlib.printNoLine(system.safeIndex(a, 4));
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetFromIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a.append("foo") # procedure call
  a.append("yon") # procedure call
  printNoLine(a[3]) # procedure call
  printNoLine(a[4]) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a.append("foo") # procedure call
  a.append("yon") # procedure call
  c = "" # variable definition
  d = "" # variable definition
  c = a[3] # assignment
  d = a[4] # assignment
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(3, "");
  a.append("foo");
  a.append("yon");
  let c = "";
  let d = "";
  c = system.safeIndex(a, 3);
  d = system.safeIndex(a, 4);
  await _stdlib.printNoLine(c);
  await _stdlib.printNoLine(d);
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_InsertElements", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a.append("foo") # procedure call
  a.append("yon") # procedure call
  c = "" # variable definition
  d = "" # variable definition
  c = a[3] # assignment
  d = a[4] # assignment
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a.insert(1, "foo") # procedure call
  a.insert(3, "yon") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a.insert(1, "foo");
  a.insert(3, "yon");
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
    await assertObjectCodeExecutes(fileImpl, "[one, foo, two, yon, three]");
  });

  test("Pass_removeAt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a.insert(1, "foo") # procedure call
  a.insert(3, "yon") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a.removeAt(0) # procedure call
  a.removeAt(1) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a.removeAt(0);
  a.removeAt(1);
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
    await assertObjectCodeExecutes(fileImpl, "[two]");
  });

  test("Pass_removeFirst", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a.removeAt(0) # procedure call
  a.removeAt(1) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a.removeFirst("two") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a.removeFirst("two");
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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, two, three]");
  });

  test("Pass_removeAll", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a.removeFirst("two") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a.removeAll("two") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a.removeAll("two");
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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, three]");
  });

  test("Pass_EmptyListByValue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a.removeAll("two") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = list[int]() # variable definition
  b = list[int]() # variable definition
  a.append(3) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(a.equals(b)) # procedure call
  printNoLine(a.equals(list[int]())) # procedure call
  printNoLine(b.equals(list[int]())) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(3);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(_stdlib.equals(a, b));
  await _stdlib.printNoLine(_stdlib.equals(a, system.initialise(await new _stdlib.List()._initialise())));
  await _stdlib.printNoLine(_stdlib.equals(b, system.initialise(await new _stdlib.List()._initialise())));
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
    await assertObjectCodeExecutes(fileImpl, "[3][]falsefalsetrue");
  });

  test("Pass_SetInMain", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[int]() # variable definition
  b = list[int]() # variable definition
  a.append(3) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(a.equals(b)) # procedure call
  printNoLine(a.equals(list[int]())) # procedure call
  printNoLine(b.equals(list[int]())) # procedure call
# end main

def main() -> None:
  a = [2, 2] # variable definition
  a[0] = 1 # assignment
  print(a[0])
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([2, 2]);
  system.safeSet(a, 1, [0]);
  await _stdlib.print(system.safeIndex(a, 0));
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
  a = [2, 2] # variable definition
  a[0] = 1 # assignment
  print(a[0])
# end main

def main() -> None:
  foo() # procedure call
# end main

def foo() -> None: # procedure
  a = [2, 2] # variable definition
  a[0] = 1 # assignment
  print(a[0])
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.list([2, 2]);
  system.safeSet(a, 1, [0]);
  await _stdlib.print(system.safeIndex(a, 0));
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

  test("Fail_SetInFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo() # procedure call
# end main

def main() -> None:
  print(foo())
# end main

def foo() -> int: # function
  a = [2, 2] # variable definition
  a[0] = 1 # assignment
  return a[0]
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
  a = [2, 2] # variable definition
  a[0] = "fred" # assignment
  print(a[0])
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

  test("Fail_EmptyList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [2, 2] # variable definition
  a[0] = "fred" # assignment
  print(a[0])
# end main

def main() -> None:
  a = list[int]() # variable definition
  a[0] = 3 # assignment
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_UseRoundBracketsForIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[int]() # variable definition
  a[0] = 3 # assignment
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = a(0) # variable definition
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
      "Cannot invoke identifier 'a' as a method.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = a(0) # variable definition
# end main

def main() -> None:
  a = 3 # variable definition
  b = a[0] # variable definition
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
    assertDoesNotCompile(fileImpl, ["Cannot index Int.ErrorMessages.html#compile_error"]);
  });

  test("Fail_ApplyIndexToUnknown", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 # variable definition
  b = a[0] # variable definition
# end main

def main() -> None:
  b = a[0] # variable definition
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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_2DListCreatedByDoubleIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = a[0] # variable definition
# end main

def main() -> None:
  a = new List<of String>[3][4] # variable definition
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = new List<of String>[3][4] # variable definition
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = a[3] # variable definition
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  b = a[3] # variable definition
# end main

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a[0] = True # assignment
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
      "Incompatible types. Expected: String, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_DoubleIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, "") # variable definition
  a[0] = True # assignment
# end main

def main() -> None:
  a = list[int]() # variable definition
  printNoLine(a[0, 0]) # procedure call
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_IndexTypeIncompatibility", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[int]() # variable definition
  printNoLine(a[0, 0]) # procedure call
# end main

def main() -> None:
  a = list[str]() # variable definition
  a[0] = "fred" # assignment
  a[1] = "bill" # assignment
  b = 0 # variable definition
  b = a[0] # assignment
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

  test("Fail_IndexTypeIncompatibility1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[str]() # variable definition
  a[0] = "fred" # assignment
  a[1] = "bill" # assignment
  b = 0 # variable definition
  b = a[0] # assignment
# end main

def main() -> None:
  a = list[str]() # variable definition
  a.append(1) # procedure call
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
      "Argument types. Expected: value (String), Provided: Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[str]() # variable definition
  a.append(1) # procedure call
# end main

def main() -> None:
  a = list[str]() # variable definition
  a["b"] = "fred" # assignment
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

  test("Fail_SizeWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[str]() # variable definition
  a["b"] = "fred" # assignment
# end main

def main() -> None:
  a = createPopulatedList(3.1, 1) # variable definition
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
      "Argument types. Expected: size (Int), initialValue (Int), Provided: Float, Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SizeSpecifiedInSquareBrackets", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3.1, 1) # variable definition
# end main

def main() -> None:
  a = new List<of String>[3] # variable definition
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

    assertDoesNotParse(fileImpl);
  });

  // obsolete code
  test("Fail_SpecifySizeAndInitializer", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = new List<of String>[3] # variable definition
# end main

def main() -> None:
  a = new List<of String>() {"foo","bar","yon"} # variable definition
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_getRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = new List<of String>() {"foo","bar","yon"} # variable definition
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  printNoLine(a.getRange(1, 2)) # procedure call
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
      "'getRange' is not defined for type 'List'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_withPut", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  printNoLine(a.getRange(1, 2)) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withPut(1, "TWO") # assignment
  b = a.withPut(0, "ONE") # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = a.withPut(1, "TWO");
  let b = a.withPut(0, "ONE");
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
    await assertObjectCodeExecutes(fileImpl, "[one, TWO, three][ONE, TWO, three]");
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withPut(1, "TWO") # assignment
  b = a.withPut(0, "ONE") # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withPut(3, "THREE") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = a.withPut(3, "THREE");
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Pass_withInsertAt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withPut(3, "THREE") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withInsert(1, "TWO") # assignment
  b = a.withInsert(0, "ONE") # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = a.withInsert(1, "TWO");
  let b = a.withInsert(0, "ONE");
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
    await assertObjectCodeExecutes(fileImpl, "[one, TWO, two, three][ONE, one, TWO, two, three]");
  });

  test("Fail_withRemove", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withInsert(1, "TWO") # assignment
  b = a.withInsert(0, "ONE") # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withRemove(1) # assignment
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
      "'withRemove' is not defined for type 'List'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_appendWithPlus", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withRemove(1) # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a + "four" # assignment
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
      "Incompatible types. Expected: Float or Int, Provided: List<of String>.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_prependWithPlus", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a + "four" # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = "four" + a # assignment
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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: List<of String>.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: List<of String>, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Pass_withRemoveFirst", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = "four" + a # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a = a.withRemoveFirst("two") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a = a.withRemoveFirst("two");
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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, two, three]");
  });

  test("Pass_withRemoveAll", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a = a.withRemoveFirst("two") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a = a.withRemoveAll("two") # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a = a.withRemoveAll("two");
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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, three]");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three", "one", "two", "three"] # variable definition
  a = a.withRemoveAll("two") # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withRemoveAt(1) # assignment
  b = a.withRemoveAt(0) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = a.withRemoveAt(1);
  let b = a.withRemoveAt(0);
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
    await assertObjectCodeExecutes(fileImpl, "[one, three][three]");
  });

  test("Pass_head", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  a = a.withRemoveAt(1) # assignment
  b = a.withRemoveAt(0) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = "" # variable definition
  b = a.head() # assignment
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  let b = "";
  b = a.head();
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
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_tail", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = "" # variable definition
  b = a.head() # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = [""] # variable definition
  b = a.tail() # assignment
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  let b = system.list([""]);
  b = a.tail();
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
    await assertObjectCodeExecutes(fileImpl, "[two, three]");
  });

  test("Fail_listOfFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = [""] # variable definition
  b = a.tail() # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  foo1 = foo # variable definition
  body = [foo, foo1] # variable definition
  foo2 = body[0] # variable definition
  printNoLine(foo2(1)) # procedure call
# end main

def foo(i: int) -> int: # function
  return i
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate a function in an expression it must have brackets and arguments for required parameters.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_addElementToList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo1 = foo # variable definition
  body = [foo, foo1] # variable definition
  foo2 = body[0] # variable definition
  printNoLine(foo2(1)) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a.withAppend(9) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = a.withAppend(9);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][4, 5, 6, 7, 8, 9]");
  });

  test("Pass_addListToList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a.withAppend(9) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [1, 2, 3, 4, 5] # variable definition
  c = a.withAppendList(b) # variable definition
  printNoLine(a) # procedure call
  printNoLine(c) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.list([1, 2, 3, 4, 5]);
  let c = a.withAppendList(b);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][4, 5, 6, 7, 8, 1, 2, 3, 4, 5]");
  });

  test("Pass_prependElementToList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [1, 2, 3, 4, 5] # variable definition
  c = a.withAppendList(b) # variable definition
  printNoLine(a) # procedure call
  printNoLine(c) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a.withPrepend(9) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = a.withPrepend(9);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][9, 4, 5, 6, 7, 8]");
  });

  test("Pass_prependListToList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a.withPrepend(9) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [1, 2, 3, 4, 5] # variable definition
  c = a.withPrependList(b) # variable definition
  printNoLine(a) # procedure call
  printNoLine(c) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.list([1, 2, 3, 4, 5]);
  let c = a.withPrependList(b);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][1, 2, 3, 4, 5, 4, 5, 6, 7, 8]");
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = [1, 2, 3, 4, 5] # variable definition
  c = a.withPrependList(b) # variable definition
  printNoLine(a) # procedure call
  printNoLine(c) # procedure call
# end main

def main() -> None:
  a = list() # variable definition
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
      "Expected: generic type specifier.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  ignore_test("Fail_assignRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list() # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  a.subList(1, 2) =  # assignment
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
      "Cannot mutate set a ranged valueErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_negativeIndexCompile", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  a.subList(1, 2) =  # assignment
# end main

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = a[-1] # variable definition
  printNoLine(b) # procedure call
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
    assertDoesNotCompile(fileImpl, ["Index cannot be negative.ErrorMessages.html#compile_error"]);
  });

  test("Fail_negativeIndexRuntime", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = a[-1] # variable definition
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = -1 # variable definition
  c = a[b] # variable definition
  printNoLine(c) # procedure call
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_listOfLibFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = -1 # variable definition
  c = a[b] # variable definition
  printNoLine(c) # procedure call
# end main

def main() -> None:
  body = [getKey] # variable definition
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
      "Library or class function 'getKey' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_listOfClassFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  body = [getKey] # variable definition
# end main

def main() -> None:
  f = Foo() # variable definition
  body = [f.bar] # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def bar(self: Foo) -> int: # function method
    return 0
  # end function method

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
      "Library or class function 'bar' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_EmptyGenericType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  body = [f.bar] # variable definition
# end main

def main() -> None:
  f = list() # variable definition
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
      "Expected: generic type specifier.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_appendTuple1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = list() # variable definition
# end main

def main() -> None:
  points = list[tuple[int, int]]() # variable definition
  points = points + (1, 2) # assignment
  printNoLine(points) # procedure call
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
      "Incompatible types. Expected: Float or Int, Provided: List<of (Int, Int)>.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_appendTuple2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  points = list[tuple[int, int]]() # variable definition
  points = points + (1, 2) # assignment
  printNoLine(points) # procedure call
# end main

def main() -> None:
  points = list[tuple[int, int]]() # variable definition
  points.appendList((1, 2)) # procedure call
  printNoLine(points) # procedure call
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
      "Argument types. Expected: other (List<of (Int, Int)>), Provided: (Int, Int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  points = list[tuple[int, int]]() # variable definition
  points.appendList((1, 2)) # procedure call
  printNoLine(points) # procedure call
# end main

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = a.withPut(3, "THREE") # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  let b = a.withPut(3, "THREE");
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ["one", "two", "three"] # variable definition
  b = a.withPut(3, "THREE") # variable definition
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a[5] # variable definition
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_NegativeIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [4, 5, 6, 7, 8] # variable definition
  b = a[5] # variable definition
# end main

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = -1 # variable definition
  a[b] = 3 # assignment
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Negative indexes are not supported.");
  });
});
