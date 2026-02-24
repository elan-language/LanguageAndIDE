import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertExportedPythonIs,
  assertExportedVBis,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertObjectCodeIsWithAdvisories,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  testVBHeader,
  transforms,
} from "./compiler-test-helpers";

suite("List", () => {
  test("Pass_literalList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8]");
    const vbCode = `${testVBHeader}

Sub main()
  Dim a = {4, 5, 6, 7, 8} ' variable
  printNoLine(a) ' call
End Sub
`;
    await assertExportedVBis(fileImpl, vbCode);
  });

  test("Pass_appendList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to [9,10,11]
  call a.appendList(b)
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8, 9, 10, 11]");
  });

  test("Fail_appendValueAsList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to 9
  call a.appendList(b)
  call printNoLine(a)
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
      "Argument types. Expected: other (List<of Int>), Provided: Int.LangRef.html#compile_error",
    ]);
  });

  test("Pass_prependList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to [9,10,11]
  call a.prependList(b)
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[9, 10, 11, 4, 5, 6, 7, 8]");
  });

  test("Pass_literalListOfList", async () => {
    const code = `${testHeader}

main
  variable a set to [[4],[5]]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([4]), system.list([5])]);
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
    await assertObjectCodeExecutes(fileImpl, "[[4], [5]]");
  });

  test("Pass_DeclareAnEmptyListBySizeAndCheckLength", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>()
  call printNoLine(a.length())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
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

  test("Pass_ConfirmStringElementsInitializedToEmptyStringNotNull", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  call printNoLine(a[0].length())
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(3, "");
  await _stdlib.printNoLine(_stdlib.length(system.safeIndex(a, 0)));
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
    await assertObjectCodeExecutes(fileImpl, "0[, , ]");
  });

  test("Pass_InitialiseToEnum", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, Fruit.apple)
  call printNoLine(a)
end main

enum Fruit apple, orange, pear
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = _stdlib.createList(3, Fruit.apple);
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
    await assertObjectCodeExecutes(fileImpl, "[apple, apple, apple]");
  });

  test("Pass_SetAndReadIndex", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  call a.put(0, a[1])
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  a.put(0, system.safeIndex(a, 1));
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
    await assertObjectCodeExecutes(fileImpl, "[2, 2, 3]");
  });

  test("Pass_Range", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to new List<of Int>()
  set b to a[2..5]
  call printNoLine(b)
  call printNoLine(a[1..3])
  call printNoLine(a[0..2])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.initialise(await new _stdlib.List()._initialise());
  b = system.safeSlice(a, 2, 5);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(system.safeSlice(a, 1, 3));
  await _stdlib.printNoLine(system.safeSlice(a, 0, 2));
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
    await assertObjectCodeExecutes(fileImpl, "[6, 7, 8][5, 6][4, 5]");
  });

  test("Fail_CannotinitialiseToReferenceType1", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, empty Foo)
  call printNoLine(a)
  variable foo set to a[0]
  call printNoLine(foo.p1)
end main

class Foo
  constructor()

  end constructor

  property p1 as Int
end class
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Can only create List with simple value");
  });

  test("Fail_CannotinitialiseToReferenceType2", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, new List<of Int>())
  call printNoLine(a)
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Can only create List with simple value");
  });

  test("Pass_SetAndReadElements", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  call a.put(0, "foo")
  call a.put(2, "yon")
  call printNoLine(a[0])
  call printNoLine(a[2])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(3, "");
  a.put(0, "foo");
  a.put(2, "yon");
  await _stdlib.printNoLine(system.safeIndex(a, 0));
  await _stdlib.printNoLine(system.safeIndex(a, 2));
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

  test("Pass_Range1", async () => {
    const code = `${testHeader}

main
  variable a set to ["foo", "bar", "yon"]
  set a to a[1..]
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["foo", "bar", "yon"]);
  a = system.safeSlice(a, 1);
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
    await assertObjectCodeExecutes(fileImpl, "[bar, yon]");
  });

  test("Pass_AddAndReadElements", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  call a.append("foo")
  call a.append("yon")
  call printNoLine(a[3])
  call printNoLine(a[4])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(3, "");
  a.append("foo");
  a.append("yon");
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetFromIndex", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  call a.append("foo")
  call a.append("yon")
  variable c set to ""
  variable d set to ""
  set c to a[3]
  set d to a[4]
  call printNoLine(c)
  call printNoLine(d)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createList(3, "");
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

  test("Pass_InsertElements", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  call a.insert(1, "foo")
  call a.insert(3, "yon")
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, foo, two, yon, three]");
  });

  test("Pass_removeAt", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  call a.removeAt(0)
  call a.removeAt(1)
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[two]");
  });

  test("Pass_removeFirst", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three", "one", "two", "three"]
  call a.removeFirst("two")
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, two, three]");
  });

  test("Pass_removeAll", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three", "one", "two", "three"]
  call a.removeAll("two")
  call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, three]");
  });

  test("Pass_EmptyListByValue", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Int>()
  variable b set to new List<of Int>()
  call a.append(3)
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(a.isSameValueAs(b))
  call printNoLine(a.isSameValueAs(new List<of Int>()))
  call printNoLine(b.isSameValueAs(new List<of Int>()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(3);
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
    await assertObjectCodeExecutes(fileImpl, "[3][]falsefalsetrue");
  });

  test("Pass_EmptyListByReference", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Int>()
  variable b set to new List<of Int>()
  call a.append(3)
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(a.isSameReferenceAs(b))
  call printNoLine(a.isSameReferenceAs(new List<of Int>()))
  call printNoLine(b.isSameReferenceAs(new List<of Int>()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.append(3);
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
    await assertObjectCodeExecutes(fileImpl, "[3][]falsefalsefalse");
  });

  test("Pass_SetInMain", async () => {
    const code = `${testHeader}

main
  variable a set to [2,2]
  set a[0] to 1
  call print(a[0])
end main
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
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Pass_SetInProcedure", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to [2,2]
  set a[0] to 1
  call print(a[0])
end procedure
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
    await assertObjectCodeExecutes(fileImpl, "1\n");
  });

  test("Fail_SetInFunction", async () => {
    const code = `${testHeader}

main
  call print(foo())
end main

function foo() returns Int
  variable a set to [2,2]
  set a[0] to 1
  return a[0]
end function
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
      "Cannot mutate set an indexed value within a function. Use .withPut... functionLangRef.html#compile_error",
    ]);
  });

  test("Fail_SetWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to [2,2]
  set a[0] to "fred"
  call print(a[0])
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

  test("Fail_EmptyList", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Int>()
  call a.put(0, 3)
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

  test("Fail_UseRoundBracketsForIndex", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  variable b set to a(0)
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
      "Cannot invoke identifier 'a' as a method.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ApplyIndexToANonIndexable", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  variable b set to a[0]
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

  test("Fail_ApplyIndexToUnknown", async () => {
    const code = `${testHeader}

main
  variable b set to a[0]
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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_2DListCreatedByDoubleIndex", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>[3][4]
  call printNoLine(a[0, 0])
  call printNoLine(a[2, 3])
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  variable b set to a[3]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
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
      "Argument types. Expected: index (Int), value (String), Provided: Int, Boolean.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DoubleIndex", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Int>()
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
    assertDoesNotCompile(fileImpl, ["Cannot double index List<of Int>.LangRef.html#compile_error"]);
  });

  test("Fail_IndexTypeIncompatibility", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>()
  call a.put(0, "fred")
  call a.put(1, "bill")
  variable b set to 0
  set b to a[0]
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

  test("Fail_IndexTypeIncompatibility1", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>()
  call a.append(1)
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
      "Argument types. Expected: value (String), Provided: Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IndexWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>()
  call a.put("b", "fred")
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
      "Argument types. Expected: index (Int), value (String), Provided: String, String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SizeWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3.1, 1)
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
      "Argument types. Expected: size (Int), initialValue (Int), Provided: Float, Int.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SizeSpecifiedInSquareBrackets", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>[3]
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

    assertDoesNotParse(fileImpl);
  });

  // obsolete code
  test("Fail_SpecifySizeAndInitializer", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of String>() {"foo","bar","yon"}
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_get", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  call printNoLine(a.get(1))
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
      "'get' is not defined for type 'List'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_getRange", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  call printNoLine(a.getRange(1, 2))
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
      "'getRange' is not defined for type 'List'.LangRef.html#compile_error",
    ]);
  });

  test("Pass_withPut", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    set a to a.withPut(1, "TWO")
    variable b set to a.withPut(0, "ONE")
    call printNoLine(a)
    call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, TWO, three][ONE, TWO, three]");
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    set a to a.withPut(3, "THREE")
    call printNoLine(a)
end main`;

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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Pass_withInsertAt", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    set a to a.withInsert(1, "TWO")
    variable b set to a.withInsert(0, "ONE")
    call printNoLine(a)
    call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, TWO, two, three][ONE, one, TWO, two, three]");
  });

  test("Pass_Conversions", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  variable d set to a.asSet()
  variable aa set to new List<of String>()
  variable dd set to empty Set<of String>
  set aa to a
  set dd to d
  call printNoLine(aa)
  call printNoLine(dd)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  let d = a.asSet();
  let aa = system.initialise(await new _stdlib.List()._initialise());
  let dd = system.initialise(_stdlib.Set.emptyInstance());
  aa = a;
  dd = d;
  await _stdlib.printNoLine(aa);
  await _stdlib.printNoLine(dd);
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
    await assertObjectCodeExecutes(fileImpl, "[one, two, three][one, two, three]");
  });

  test("Fail_withRemove", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  set a to a.withRemove(1)
  call printNoLine(a)
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
      "'withRemove' is not defined for type 'List'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_appendWithPlus", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  set a to a + "four"
  call printNoLine(a)
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
      "Incompatible types. Expected: Float or Int, Provided: List<of String>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_prependWithPlus", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"]
  set a to "four" + a
  call printNoLine(a)
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: List<of String>.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: List<of String>, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Pass_withRemoveFirst", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three", "one", "two", "three"]
    set a to a.withRemoveFirst("two")
    call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, two, three]");
  });

  test("Pass_withRemoveAll", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three", "one", "two", "three"]
    set a to a.withRemoveAll("two")
    call printNoLine(a)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, three, one, three]");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    set a to a.withRemoveAt(1)
    variable b set to a.withRemoveAt(0)
    call printNoLine(a)
    call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[one, three][three]");
  });

  test("Pass_head", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    variable b set to ""
    set b to a.head()
    call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_tail", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    variable b set to [""]
    set b to a.tail()
    call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[two, three]");
  });

  test("Pass_listOfFunction", async () => {
    const code = `${testHeader}

main
  variable foo1 set to ref foo
  variable body set to [ref foo, ref foo1]
  variable foo2 set to body[0]
  call printNoLine(foo2(1))
end main

function foo(i as Int) returns Int
  return i
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo1 = global.foo;
  let body = system.list([global.foo, foo1]);
  let foo2 = system.safeIndex(body, 0);
  await _stdlib.printNoLine((await foo2(1)));
}

async function foo(i) {
  return i;
}
global["foo"] = foo;
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
    assertObjectCodeIsWithAdvisories(fileImpl, objectCode, [
      "The 'ref' keyword is no longer needed and we recommend that you remove it.LangRef.html#ref",
      "The 'ref' keyword is no longer needed and we recommend that you remove it.LangRef.html#ref",
      "The 'ref' keyword is no longer needed and we recommend that you remove it.LangRef.html#ref",
    ]);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_addElementToList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to a.withAppend(9)
  call printNoLine(a)
  call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][4, 5, 6, 7, 8, 9]");
  });

  test("Pass_addListToList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to [1,2,3,4,5]
  variable c set to a.withAppendList(b)
  call printNoLine(a)
  call printNoLine(c)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][4, 5, 6, 7, 8, 1, 2, 3, 4, 5]");
  });

  test("Pass_prependElementToList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to a.withPrepend(9)
  call printNoLine(a)
  call printNoLine(b)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][9, 4, 5, 6, 7, 8]");
  });

  test("Pass_prependListToList", async () => {
    const code = `${testHeader}

main
  variable a set to [4,5,6,7,8]
  variable b set to [1,2,3,4,5]
  variable c set to a.withPrependList(b)
  call printNoLine(a)
  call printNoLine(c)
end main`;

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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8][1, 2, 3, 4, 5, 4, 5, 6, 7, 8]");
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testHeader}

main
    variable a set to new List()
    call printNoLine(a)
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
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_assignRange", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    set a[1..2] to a
    call printNoLine(a)
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
    assertDoesNotCompile(fileImpl, ["Cannot mutate set a ranged valueLangRef.html#compile_error"]);
  });

  test("Fail_negativeIndexCompile", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to a[-1]
    call printNoLine(b)
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
    assertDoesNotCompile(fileImpl, ["Index cannot be negative.LangRef.html#compile_error"]);
  });

  test("Fail_negativeIndexRuntime", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[b]
    call printNoLine(c)
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_negativeRange1Compile", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to a[-1..2]
    call printNoLine(b)
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
    assertDoesNotCompile(fileImpl, ["Index cannot be negative.LangRef.html#compile_error"]);
  });

  test("Fail_negativeRange1Runtime", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[b..2]
    call printNoLine(c)
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_negativeRange2Compile", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to a[0..-1]
    call printNoLine(b)
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
    assertDoesNotCompile(fileImpl, ["Index cannot be negative.LangRef.html#compile_error"]);
  });

  test("Fail_negativeRange2Runtime", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to -1
    variable c set to a[0..b]
    call printNoLine(c)
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 4");
  });

  test("Fail_listOfLibFunction", async () => {
    const code = `${testHeader}

main
    variable body set to [ref getKey]
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
      "The 'ref' keyword is no longer needed and we recommend that you remove it.LangRef.html#ref",
      "Library or class function 'getKey' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_listOfClassFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable body set to [ref f.bar]
end main

class Foo
  function bar() returns Int
    return 0
  end function
end class`;

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
      "Library or class function 'bar' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_LiteralListOfEmptyUnknownClass", async () => {
    const code = `${testHeader}

main
  variable f set to [empty Foo]
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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_EmptyGenericType", async () => {
    const code = `${testHeader}

main
  variable f set to new List()
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
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_appendTuple1", async () => {
    const code = `${testHeader}

main
  variable points set to new List<of Tuple<of Int, Int>>()
  set points to points + tuple(1, 2)
  call printNoLine(points)
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
      "Incompatible types. Expected: Float or Int, Provided: List<of tuple(Int, Int)>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_appendTuple2", async () => {
    const code = `${testHeader}

main
  variable points set to new List<of Tuple<of Int, Int>>()
  call points.appendList(tuple(1, 2))
  call printNoLine(points)
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
      "Argument types. Expected: other (List<of tuple(Int, Int)>), Provided: tuple(Int, Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testHeader}

main
    variable a set to ["one", "two", "three"]
    variable b set to a.withPut(3, "THREE")
    call printNoLine(b)
end main`;

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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to [4, 5, 6, 7, 8]
  variable b set to a[5]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_RangeNotInt", async () => {
    const code = `${testHeader}

main
    variable a set to [1,2,3,4]
    variable b set to a["2"..5]
    variable c set to a[2..5.0]
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
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });
});
