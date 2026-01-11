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
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  let c = system.list([a, b]);
  await system.print(c);
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
  print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(0, "");
  await system.print(a.length());
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
  print a[0][1]
  print a[2][0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  a.put(0, system.list(["bar", "foo"]));
  a.put(2, system.list(["yon", "xan"]));
  await system.print(system.safeIndex(system.safeIndex(a, 0), 1));
  await system.print(system.safeIndex(system.safeIndex(a, 2), 0));
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
  print a[0][1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["", ""]), system.list(["", ""]), system.list(["", ""])]);
  a.put(0, system.list(["bar", "foo"]));
  system.safeIndex(a, 0).put(1, "yon");
  await system.print(system.safeIndex(system.safeIndex(a, 0), 1));
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
  print a[3]
  print a[4]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  a.append(system.list(["foo"]));
  a.append(system.list(["yon"]));
  await system.print(system.safeIndex(a, 3));
  await system.print(system.safeIndex(a, 4));
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([""]), system.list([""]), system.list([""])]);
  system.safeIndex(a, 1).append("foo");
  system.safeIndex(a, 2).append("yon");
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.insert(1, system.list(["foo"]));
  a.insert(3, system.list(["yon"]));
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 0).insert(0, "foo");
  system.safeIndex(a, 2).insert(1, "yon");
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.removeAt(0);
  a.removeAt(1);
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 0).removeAt(0);
  system.safeIndex(a, 2).removeAt(0);
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.removeFirst(system.list(["two"]));
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 1).removeFirst("two");
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  a.removeAll(system.list(["two"]));
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list(["one"]), system.list(["two", "two"]), system.list(["three"]), system.list(["one"]), system.list(["two"]), system.list(["three"])]);
  system.safeIndex(a, 1).removeAll("two");
  await system.print(a);
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

  test("Pass_InitializeAnListFromAList", async () => {
    const code = `${testHeader}

main
  variable a set to {{"foo"},{"bar","yon"}}.asList()
  print a.length()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([system.listImmutable(["foo"]), system.listImmutable(["bar", "yon"])]).asList();
  await system.print(a.length());
  await system.print(a);
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
    await assertObjectCodeExecutes(fileImpl, "2[{foo}, {bar, yon}]");
  });

  test("Pass_EmptyList", async () => {
    const code = `${testHeader}

main
  variable a set to empty List<of List<of Int>>
  variable b set to empty List<of List<of Int>>
  call a.append([3])
  print a
  print b
  print a is b
  print a is empty List<of List<of Int>>
  print b is empty List<of List<of Int>>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.List.emptyInstance());
  let b = system.initialise(_stdlib.List.emptyInstance());
  a.append(system.list([3]));
  await system.print(a);
  await system.print(b);
  await system.print(system.objectEquals(a, b));
  await system.print(system.objectEquals(a, system.initialise(_stdlib.List.emptyInstance())));
  await system.print(system.objectEquals(b, system.initialise(_stdlib.List.emptyInstance())));
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

  test("Pass_InitialiseEmptyList", async () => {
    const code = `${testHeader}

main
  variable a set to [createList(2, 0), createList(2, 0), createList(2, 0)]
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createList(2, 0), _stdlib.createList(2, 0), _stdlib.createList(2, 0)]);
  await system.print(a);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([_stdlib.createList(2, 1), _stdlib.createList(2, 1)]);
  await system.print(a);
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

  test("Fail_EmptyList1", async () => {
    const code = `${testHeader}

main
  variable a set to empty List<of List<of Int>>
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
  print a[0, 0]
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
  variable a set to createList(3, empty List<of String>)
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
  call a.put(0, empty List<of String>)
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
  variable a set to createList(3, empty List<of String>)
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
