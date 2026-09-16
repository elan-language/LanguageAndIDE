import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python List of List", () => {
  test("Pass_literalListOfList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  l = lambda x => if_(x is 1, x, l(x-1)) # variable definition
# end main

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  c = [a, b] # variable definition
  printNoLine(c) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  let c = system.list([a, b]);
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
    await assertObjectCodeExecutes(fileImpl, "[[1, 2], [3, 4]]");
  });

  test("Pass_DeclareAnEmptyListBySizeAndCheckLength", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  c = [a, b] # variable definition
  printNoLine(c) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(0, "") # variable definition
  printNoLine(a.length()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(0, "");
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

  test("Pass_SetAndReadElements1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(0, "") # variable definition
  printNoLine(a.length()) # procedure call
# end main

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a[0] = ["bar", "foo"] # assignment
  a[2] = ["yon", "xan"] # assignment
  printNoLine(a[0][1]) # procedure call
  printNoLine(a[2][0]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  system.safeSet(a, system.list(["bar", "foo"]), [0]);
  system.safeSet(a, system.list(["yon", "xan"]), [2]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 0), 1));
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 2), 0));
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

  test("Pass_SetAndReadElements2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a[0] = ["bar", "foo"] # assignment
  a[2] = ["yon", "xan"] # assignment
  printNoLine(a[0][1]) # procedure call
  printNoLine(a[2][0]) # procedure call
# end main

def main() -> None:
  a = [["", ""], ["", ""], ["", ""]] # variable definition
  a[0] = ["bar", "foo"] # assignment
  a[0][1] = "yon" # assignment
  printNoLine(a[0][1]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["", ""]), system.list(["", ""]), system.list(["", ""])]);
  system.safeSet(a, system.list(["bar", "foo"]), [0]);
  system.safeSet(a, "yon", [0, 1]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 0), 1));
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
    await assertObjectCodeExecutes(fileImpl, "yon");
  });

  test("Pass_AddAndReadElements1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["", ""], ["", ""], ["", ""]] # variable definition
  a[0] = ["bar", "foo"] # assignment
  a[0][1] = "yon" # assignment
  printNoLine(a[0][1]) # procedure call
# end main

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a.append(["foo"]) # procedure call
  a.append(["yon"]) # procedure call
  printNoLine(a[3]) # procedure call
  printNoLine(a[4]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  a.append(system.list(["foo"]));
  a.append(system.list(["yon"]));
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
    await assertObjectCodeExecutes(fileImpl, "[foo][yon]");
  });

  test("Pass_AddAndReadElements2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a.append(["foo"]) # procedure call
  a.append(["yon"]) # procedure call
  printNoLine(a[3]) # procedure call
  printNoLine(a[4]) # procedure call
# end main

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a[1].append("foo") # procedure call
  a[2].append("yon") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  system.safeIndex(a, 1).append("foo");
  system.safeIndex(a, 2).append("yon");
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
    await assertObjectCodeExecutes(fileImpl, "[[], [, foo], [, yon]]");
  });

  test("Pass_InsertElements1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[""], [""], [""]] # variable definition
  a[1].append("foo") # procedure call
  a[2].append("yon") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a.insert(1, ["foo"]) # procedure call
  a.insert(3, ["yon"]) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.insert(1, system.list(["foo"]));
  a.insert(3, system.list(["yon"]));
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
    await assertObjectCodeExecutes(fileImpl, "[[one], [foo], [two], [yon], [three]]");
  });

  test("Pass_InsertElements2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a.insert(1, ["foo"]) # procedure call
  a.insert(3, ["yon"]) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a[0].insert(0, "foo") # procedure call
  a[2].insert(1, "yon") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 0).insert(0, "foo");
  system.safeIndex(a, 2).insert(1, "yon");
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
    await assertObjectCodeExecutes(fileImpl, "[[foo, one], [two], [three, yon]]");
  });

  test("Pass_remove1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a[0].insert(0, "foo") # procedure call
  a[2].insert(1, "yon") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a.removeAt(0) # procedure call
  a.removeAt(1) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
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
    await assertObjectCodeExecutes(fileImpl, "[[two]]");
  });

  test("Pass_remove2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a.removeAt(0) # procedure call
  a.removeAt(1) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a[0].removeAt(0) # procedure call
  a[2].removeAt(0) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 0).removeAt(0);
  system.safeIndex(a, 2).removeAt(0);
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
    await assertObjectCodeExecutes(fileImpl, "[[], [two], []]");
  });

  test("Pass_removeFirst1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"]] # variable definition
  a[0].removeAt(0) # procedure call
  a[2].removeAt(0) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a.removeFirst(["two"]) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.removeFirst(system.list(["two"]));
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
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [two], [three]]");
  });

  test("Pass_removeFirst2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a.removeFirst(["two"]) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a[1].removeFirst("two") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 1).removeFirst("two");
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
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_removeAll1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a[1].removeFirst("two") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a.removeAll(["two"]) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.removeAll(system.list(["two"]));
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
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [three]]");
  });

  test("Pass_removeAll2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a.removeAll(["two"]) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [["one"], ["two", "two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a[1].removeAll("two") # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two", "two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 1).removeAll("two");
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
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_EmptyListByValue", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [["one"], ["two", "two"], ["three"], ["one"], ["two"], ["three"]] # variable definition
  a[1].removeAll("two") # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = list[list[int]]() # variable definition
  b = list[list[int]]() # variable definition
  a.append([3]) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(a.equals(b)) # procedure call
  printNoLine(a.equals(list[list[int]]())) # procedure call
  printNoLine(b.equals(list[list[int]]())) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(system.list([3]));
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
    await assertObjectCodeExecutes(fileImpl, "[[3]][]falsefalsetrue");
  });

  test("Pass_InitialiseEmptyList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[list[int]]() # variable definition
  b = list[list[int]]() # variable definition
  a.append([3]) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(a.equals(b)) # procedure call
  printNoLine(a.equals(list[list[int]]())) # procedure call
  printNoLine(b.equals(list[list[int]]())) # procedure call
# end main

def main() -> None:
  a = [createPopulatedList(2, 0), createPopulatedList(2, 0), createPopulatedList(2, 0)] # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createPopulatedList(2, 0), _stdlib.createPopulatedList(2, 0), _stdlib.createPopulatedList(2, 0)]);
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
    await assertObjectCodeExecutes(fileImpl, "[[0, 0], [0, 0], [0, 0]]");
  });

  test("Pass_InitialiseList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [createPopulatedList(2, 0), createPopulatedList(2, 0), createPopulatedList(2, 0)] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [createPopulatedList(2, 1), createPopulatedList(2, 1)] # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createPopulatedList(2, 1), _stdlib.createPopulatedList(2, 1)]);
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
    await assertObjectCodeExecutes(fileImpl, "[[1, 1], [1, 1]]");
  });

  test("Pass_SetListOfList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [createPopulatedList(2, 1), createPopulatedList(2, 1)] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0][0] = 0 # assignment
  printNoLine(a[0][0]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2]), system.list([3, 4])]);
  system.safeSet(a, 0, [0, 0]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 0), 0));
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

  test("Pass_SetListOfListOfList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0][0] = 0 # assignment
  printNoLine(a[0][0]) # procedure call
# end main

def main() -> None:
  a = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]] # variable definition
  a[0][0][0] = 0 # assignment
  printNoLine(a[0][0][0]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([system.list([1, 2]), system.list([3, 4])]), system.list([system.list([5, 6]), system.list([7, 8])])]);
  system.safeSet(a, 0, [0, 0, 0]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(system.safeIndex(a, 0), 0), 0));
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

  test("Pass_SetListOfListOfList1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]] # variable definition
  a[0][0][0] = 0 # assignment
  printNoLine(a[0][0][0]) # procedure call
# end main

def main() -> None:
  a = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]] # variable definition
  a[0][0] = [9, 10] # assignment
  printNoLine(a[0][0][0]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([system.list([1, 2]), system.list([3, 4])]), system.list([system.list([5, 6]), system.list([7, 8])])]);
  system.safeSet(a, system.list([9, 10]), [0, 0]);
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(system.safeIndex(a, 0), 0), 0));
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
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Fail_ListOfListWrongType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]] # variable definition
  a[0][0] = [9, 10] # assignment
  printNoLine(a[0][0][0]) # procedure call
# end main

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0][0] = "" # assignment
  printNoLine(a[0][0]) # procedure call
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

  test("Fail_EmptyList1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0][0] = "" # assignment
  printNoLine(a[0][0]) # procedure call
# end main

def main() -> None:
  a = list[list[int]]() # variable definition
  a[0] = [3] # assignment
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

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[list[int]]() # variable definition
  a[0] = [3] # assignment
# end main

def main() -> None:
  a = [1, 2] # variable definition
  b = a[0][0] # variable definition
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

  test("Fail_1DListAccessedAs2D1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  b = a[0][0] # variable definition
# end main

def main() -> None:
  a = createList(3, "") # variable definition
  a[0][0] = "foo" # assignment
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
    assertDoesNotCompile(fileImpl, []);
  });

  test("Fail_useOfCommaInIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createList(3, "") # variable definition
  a[0][0] = "foo" # assignment
# end main

def main() -> None:
  a = [[1], [1]] # variable definition
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

  test("Fail_2DListAccessedAs1D", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1], [1]] # variable definition
  printNoLine(a[0, 0]) # procedure call
# end main

def main() -> None:
  a = createPopulatedList(3, list[str]()) # variable definition
  a[0] = "foo" # assignment
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
      "Incompatible types. Expected: List<of String>, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, list[str]()) # variable definition
  a[0] = "foo" # assignment
# end main

def main() -> None:
  a = [[""], [""]] # variable definition
  a[0] = list[str]() # assignment
  b = a[0][0] # variable definition
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

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[""], [""]] # variable definition
  a[0] = list[str]() # assignment
  b = a[0][0] # variable definition
# end main

def main() -> None:
  a = createPopulatedList(3, list[str]()) # variable definition
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
      "Incompatible types. Expected: List<of String>, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_2DListAdd", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(3, list[str]()) # variable definition
  a[0] = True # assignment
# end main

def main() -> None:
  a = list[list[str]]() # variable definition
  a.append("foo") # procedure call
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
      "Argument types. Expected: value (List<of String>), Provided: String.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[list[str]]() # variable definition
  a.append("foo") # procedure call
# end main

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a["b"].put(0, 5) # procedure call
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

  test("Fail_IndexWrongType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a["b"].put(0, 5) # procedure call
# end main

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  a[0]["b"] = 5 # assignment
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
    assertDoesNotCompile(fileImpl, []);
  });
});
