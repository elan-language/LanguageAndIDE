import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Set", () => {
  test("Pass_SetAddRemoveLength", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = /[/ # variable definition
# end main

def main() -> None:
  st = HashSet[int]() # variable definition
  st = st.add(3).add(7).add(5) # assignment
  printNoLine(st.length()) # procedure call
  st = st.add(7) # assignment
  printNoLine(st.length()) # procedure call
  st = st.remove(3) # assignment
  printNoLine(st.length()) # procedure call
  st = st.remove(3) # assignment
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.HashSet()._initialise());
  st = st.add(3).add(7).add(5);
  await _stdlib.printNoLine(st.length());
  st = st.add(7);
  await _stdlib.printNoLine(st.length());
  st = st.remove(3);
  await _stdlib.printNoLine(st.length());
  st = st.remove(3);
  await _stdlib.printNoLine(st.length());
  await _stdlib.printNoLine(st);
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
    await assertObjectCodeExecutes(fileImpl, "3322[7, 5]");
  });

  test("Pass_SetUnion", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = HashSet[int]() # variable definition
  st = st.add(3).add(7).add(5) # assignment
  printNoLine(st.length()) # procedure call
  st = st.add(7) # assignment
  printNoLine(st.length()) # procedure call
  st = st.remove(3) # assignment
  printNoLine(st.length()) # procedure call
  st = st.remove(3) # assignment
  printNoLine(st.length()) # procedure call
  printNoLine(st) # procedure call
# end main

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6) # assignment
  st2 = st2.add(1).add(4).add(9) # assignment
  st3 = st1.union(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st2 = system.initialise(await new _stdlib.HashSet()._initialise());
  st1 = st1.add(2).add(4).add(6);
  st2 = st2.add(1).add(4).add(9);
  let st3 = st1.union(st2);
  await _stdlib.printNoLine(st3);
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
    await assertObjectCodeExecutes(fileImpl, "[2, 4, 6, 1, 9]");
  });

  test("Pass_SetIntersection", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6) # assignment
  st2 = st2.add(1).add(4).add(9) # assignment
  st3 = st1.union(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6).add(3) # assignment
  st2 = st2.add(3).add(1).add(4).add(9) # assignment
  st3 = st1.intersection(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st2 = system.initialise(await new _stdlib.HashSet()._initialise());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  let st3 = st1.intersection(st2);
  await _stdlib.printNoLine(st3);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 3]");
  });

  test("Pass_SetDifference", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6).add(3) # assignment
  st2 = st2.add(3).add(1).add(4).add(9) # assignment
  st3 = st1.intersection(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6).add(3) # assignment
  st2 = st2.add(3).add(1).add(4).add(9) # assignment
  st3 = st1.difference(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st2 = system.initialise(await new _stdlib.HashSet()._initialise());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  let st3 = st1.difference(st2);
  await _stdlib.printNoLine(st3);
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
    await assertObjectCodeExecutes(fileImpl, "[2, 6]");
  });

  test("Pass_IsDisjointFrom", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st1 = HashSet[int]() # variable definition
  st2 = HashSet[int]() # variable definition
  st1 = st1.add(2).add(4).add(6).add(3) # assignment
  st2 = st2.add(3).add(1).add(4).add(9) # assignment
  st3 = st1.difference(st2) # variable definition
  printNoLine(st3) # procedure call
# end main

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.add(2).add(4).add(6).add(3) # variable definition
  st2 = st0.add(3).add(1).add(4).add(9) # variable definition
  st3 = st0.add(8).add(9) # variable definition
  printNoLine(st1.isDisjointFrom(st2)) # procedure call
  printNoLine(st1.isDisjointFrom(st3)) # procedure call
  printNoLine(st2.isDisjointFrom(st3)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st1 = st0.add(2).add(4).add(6).add(3);
  let st2 = st0.add(3).add(1).add(4).add(9);
  let st3 = st0.add(8).add(9);
  await _stdlib.printNoLine(st1.isDisjointFrom(st2));
  await _stdlib.printNoLine(st1.isDisjointFrom(st3));
  await _stdlib.printNoLine(st2.isDisjointFrom(st3));
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
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_IsSubsetOfIsSupersetOf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.add(2).add(4).add(6).add(3) # variable definition
  st2 = st0.add(3).add(1).add(4).add(9) # variable definition
  st3 = st0.add(8).add(9) # variable definition
  printNoLine(st1.isDisjointFrom(st2)) # procedure call
  printNoLine(st1.isDisjointFrom(st3)) # procedure call
  printNoLine(st2.isDisjointFrom(st3)) # procedure call
# end main

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.add(2).add(4).add(6).add(3) # variable definition
  st2 = st0.add(4).add(6) # variable definition
  st3 = st0.add(4).add(6).add(1) # variable definition
  printNoLine(st2.isSubsetOf(st1)) # procedure call
  printNoLine(st2.isSupersetOf(st1)) # procedure call
  printNoLine(st1.isSupersetOf(st2)) # procedure call
  printNoLine(st1.isSupersetOf(st3)) # procedure call
  printNoLine(st3.isSupersetOf(st0)) # procedure call
  printNoLine(st0.isSubsetOf(st3)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st1 = st0.add(2).add(4).add(6).add(3);
  let st2 = st0.add(4).add(6);
  let st3 = st0.add(4).add(6).add(1);
  await _stdlib.printNoLine(st2.isSubsetOf(st1));
  await _stdlib.printNoLine(st2.isSupersetOf(st1));
  await _stdlib.printNoLine(st1.isSupersetOf(st2));
  await _stdlib.printNoLine(st1.isSupersetOf(st3));
  await _stdlib.printNoLine(st3.isSupersetOf(st0));
  await _stdlib.printNoLine(st0.isSubsetOf(st3));
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruetrue");
  });
  test("Pass_AddFromList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.add(2).add(4).add(6).add(3) # variable definition
  st2 = st0.add(4).add(6) # variable definition
  st3 = st0.add(4).add(6).add(1) # variable definition
  printNoLine(st2.isSubsetOf(st1)) # procedure call
  printNoLine(st2.isSupersetOf(st1)) # procedure call
  printNoLine(st1.isSupersetOf(st2)) # procedure call
  printNoLine(st1.isSupersetOf(st3)) # procedure call
  printNoLine(st3.isSupersetOf(st0)) # procedure call
  printNoLine(st0.isSubsetOf(st3)) # procedure call
# end main

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.addFromList([2, 4, 6, 3]) # variable definition
  printNoLine(st1) # procedure call
  st2 = st1.addFromList([2, 5, 6]) # variable definition
  printNoLine(st2) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.HashSet()._initialise());
  let st1 = st0.addFromList(system.list([2, 4, 6, 3]));
  await _stdlib.printNoLine(st1);
  let st2 = st1.addFromList(system.list([2, 5, 6]));
  await _stdlib.printNoLine(st2);
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
    await assertObjectCodeExecutes(fileImpl, "[2, 4, 6, 3][2, 4, 6, 3, 5]");
  });

  test("Pass_Contains1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st0 = HashSet[int]() # variable definition
  st1 = st0.addFromList([2, 4, 6, 3]) # variable definition
  printNoLine(st1) # procedure call
  st2 = st1.addFromList([2, 5, 6]) # variable definition
  printNoLine(st2) # procedure call
# end main

def main() -> None:
  a = HashSet[str]() # variable definition
  a = a.add("foo") # assignment
  printNoLine(a.contains("foo")) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.HashSet()._initialise());
  a = a.add("foo");
  await _stdlib.printNoLine(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_Contains2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = HashSet[str]() # variable definition
  a = a.add("foo") # assignment
  printNoLine(a.contains("foo")) # procedure call
# end main

def main() -> None:
  a = HashSet[str]() # variable definition
  a = a.add("bar") # assignment
  printNoLine(a.contains("foo")) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.HashSet()._initialise());
  a = a.add("bar");
  await _stdlib.printNoLine(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Fail_SetOfMutable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = HashSet[str]() # variable definition
  a = a.add("bar") # assignment
  printNoLine(a.contains("foo")) # procedure call
# end main

def main() -> None:
  st = HashSet[Foo]() # variable definition
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "HashSet cannot be of mutable type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });
});
