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

suite("List of List", () => {
  test("Pass_literalListOfList", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable b set to [3,4]
  variable c set to [a,b]
  call printNoLine(c)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[1, 2], [3, 4]]");
  });

  test("Pass_DeclareAnEmptyListBySizeAndCheckLength", async () => {
    const code = `${testHeader}

main
  variable a set to createList(0, "")
  call printNoLine(a.length())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(0, "");
  await _stdlib.printNoLine(a.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_SetAndReadElements1", async () => {
    const code = `${testHeader}

main
  variable a set to [[""],[""],[""]]
  call a.put(0, ["bar", "foo"])
  call a.put(2, ["yon", "xan"])
  call printNoLine(a[0][1])
  call printNoLine(a[2][0])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  a.put(0, system.list(["bar", "foo"]));
  a.put(2, system.list(["yon", "xan"]));
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 0), 1));
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 2), 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetAndReadElements2", async () => {
    const code = `${testHeader}

main
  variable a set to [["",""],["",""],["",""]]
  call a.put(0, ["bar", "foo"])
  call a[0].put(1, "yon")
  call printNoLine(a[0][1])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["", ""]), system.list(["", ""]), system.list(["", ""])]);
  a.put(0, system.list(["bar", "foo"]));
  system.safeIndex(a, 0).put(1, "yon");
  await _stdlib.printNoLine(system.safeIndex(system.safeIndex(a, 0), 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yon");
  });

  test("Pass_AddAndReadElements1", async () => {
    const code = `${testHeader}

main
  variable a set to [[""],[""],[""]]
  call a.append(["foo"])
  call a.append(["yon"])
  call printNoLine(a[3])
  call printNoLine(a[4])
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[foo][yon]");
  });

  test("Pass_AddAndReadElements2", async () => {
    const code = `${testHeader}

main
  variable a set to [[""], [""], [""]]
  call a[1].append("foo")
  call a[2].append("yon")
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[], [, foo], [, yon]]");
  });

  test("Pass_InsertElements1", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"]]
  call a.insert(1, ["foo"])
  call a.insert(3, ["yon"])
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [foo], [two], [yon], [three]]");
  });

  test("Pass_InsertElements2", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"]]
  call a[0].insert(0, "foo")
  call a[2].insert(1, "yon")
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[foo, one], [two], [three, yon]]");
  });

  test("Pass_remove1", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"]]
  call a.removeAt(0)
  call a.removeAt(1)
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[two]]");
  });

  test("Pass_remove2", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"]]
  call a[0].removeAt(0)
  call a[2].removeAt(0)
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[], [two], []]");
  });

  test("Pass_removeFirst1", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a.removeFirst(["two"])
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [two], [three]]");
  });

  test("Pass_removeFirst2", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a[1].removeFirst("two")
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_removeAll1", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two"], ["three"], ["one"], ["two"], ["three"]]
  call a.removeAll(["two"])
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [three], [one], [three]]");
  });

  test("Pass_removeAll2", async () => {
    const code = `${testHeader}

main
  variable a set to [["one"], ["two", "two"], ["three"], ["one"], ["two"], ["three"]]
  call a[1].removeAll("two")
  call printNoLine(a)
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[one], [], [three], [one], [two], [three]]");
  });

  test("Pass_EmptyListByValue", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of List<of Int>>()
  variable b set to new List<of List<of Int>>()
  call a.append([3])
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(a.isSameValueAs(b))
  call printNoLine(a.isSameValueAs(new List<of List<of Int>>()))
  call printNoLine(b.isSameValueAs(new List<of List<of Int>>()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(system.list([3]));
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(_stdlib.isSameValueAs(a, b));
  await _stdlib.printNoLine(_stdlib.isSameValueAs(a, system.initialise(await new _stdlib.List()._initialise())));
  await _stdlib.printNoLine(_stdlib.isSameValueAs(b, system.initialise(await new _stdlib.List()._initialise())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[3]][]falsefalsetrue");
  });

  test("Pass_EmptyListByReference", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of List<of Int>>()
  variable b set to new List<of List<of Int>>()
  call a.append([3])
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(a.isSameReferenceAs(b))
  call printNoLine(a.isSameReferenceAs(new List<of List<of Int>>()))
  call printNoLine(b.isSameReferenceAs(new List<of List<of Int>>()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(system.list([3]));
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(a, b));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(a, system.initialise(await new _stdlib.List()._initialise())));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(b, system.initialise(await new _stdlib.List()._initialise())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[3]][]falsefalsefalse");
  });

  test("Pass_InitialiseEmptyList", async () => {
    const code = `${testHeader}

main
  variable a set to [createList(2, 0), createList(2, 0), createList(2, 0)]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createList(2, 0), _stdlib.createList(2, 0), _stdlib.createList(2, 0)]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[0, 0], [0, 0], [0, 0]]");
  });

  test("Pass_InitialiseList", async () => {
    const code = `${testHeader}

main
  variable a set to [createList(2, 1), createList(2, 1)]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createList(2, 1), _stdlib.createList(2, 1)]);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[1, 1], [1, 1]]");
  });

  test("Pass_SetListOfList", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2],[3,4]]
  set a[0][0] to 0
  call printNoLine(a[0][0])
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_SetListOfListOfList", async () => {
    const code = `${testHeader}

main
  variable a set to [[[1,2],[3,4]],[[5,6],[7,8]]]
  set a[0][0][0] to 0
  call printNoLine(a[0][0][0])
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_SetListOfListOfList1", async () => {
    const code = `${testHeader}

main
  variable a set to [[[1,2],[3,4]],[[5,6],[7,8]]]
  set a[0][0] to [9,10]
  call printNoLine(a[0][0][0])
end main`;

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
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Fail_ListOfListWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2],[3,4]]
  set a[0][0] to ""
  call printNoLine(a[0][0])
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_EmptyList1", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of List<of Int>>()
  call a[0].put(0, 3)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `${testHeader}

main
  variable a set to [1, 2]
  variable b set to a[0][0]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Int.LangRef.html#compile_error"]);
  });

  test("Fail_1DListAccessedAs2D1", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  call a.put(0, 0, "foo")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: index (Int), value (String).LangRef.html#compile_error",
    ]);
  });

  test("Fail_1DListAccessedAs2D2", async () => {
    const code = `${testHeader}

main
  variable a set to [[1],[1]]
  call printNoLine(a[0, 0])
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot double index List<of List<of Int>>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_2DListAccessedAs1D", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, new List<of String>())
  call a.put(0, "foo")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (List<of String>), Provided: Int, String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to [[""],[""]]
  call a.put(0, new List<of String>())
  variable b set to a[0][0]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, new List<of String>())
  call a.put(0, true)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (List<of String>), Provided: Int, Boolean.LangRef.html#compile_error",
    ]);
  });

  test("Fail_2DListAdd", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of List<of String>>()
  call a.append("foo")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: value (List<of String>), Provided: String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType1", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2],[3,4]]
  call a["b"].put(0, 5)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_IndexWrongType2", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2],[3,4]]
  call a[0].put("b", 5)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: index (Int), value (Int), Provided: String, Int.LangRef.html#compile_error",
    ]);
  });
});
