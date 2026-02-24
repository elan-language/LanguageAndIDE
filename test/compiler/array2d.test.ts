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
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Array2D", () => {
  test("Pass_Array2D", async () => {
    const code = `${testHeader}

main
  variable c set to new Array2D<of Int>(1, 1, 0)
  call printNoLine(c)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.Array2D()._initialise(1, 1, 0));
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
    await assertObjectCodeExecutes(fileImpl, "[[0]]");
  });

  test("Pass_Array2DAsParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(1, 1, 0)
  call printNoLine(bar(a))
end main

function bar(arr as Array2D<of Int>) returns Array2D<of Int>
  return arr
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(1, 1, 0));
  await _stdlib.printNoLine((await global.bar(a)));
}

async function bar(arr) {
  return arr;
}
global["bar"] = bar;
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
    await assertObjectCodeExecutes(fileImpl, "[[0]]");
  });

  test("Fail_Array2DAsParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(0, 0, 0)
  call printNoLine(foo(a))
end main

function foo(arr as List<of List<of Int>>) returns List<of List<of Int>>
  return bar(arr)
end function`;

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
      "Argument types. Expected: arr (List<of List<of Int>>), Provided: Array2D<of Int>.LangRef.html#compile_error",
    ]);
  });

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of String>
  call printNoLine(a.columns())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  await _stdlib.printNoLine(a.columns());
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_SetAndReadElements1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(3, 2, "")
  call a.put(0, 0, "bar")
  call a.put(0, 1, "foo")
  call a.put(2, 0, "yon")
  call a.put(2, 1, "xan")
  call printNoLine(a[0, 1])
  call printNoLine(a[2, 0])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a.put(0, 0, "bar");
  a.put(0, 1, "foo");
  a.put(2, 0, "yon");
  a.put(2, 1, "xan");
  await _stdlib.printNoLine(system.safeIndex(a, 0, 1));
  await _stdlib.printNoLine(system.safeIndex(a, 2, 0));
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_SetAndReadElements2", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of String>
  set a to new Array2D<of String>(3, 2, "")
  call a.put(0, 0, "bar")
  call a.put(0, 1, "foo")
  call printNoLine(a[0, 1])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a.put(0, 0, "bar");
  a.put(0, 1, "foo");
  await _stdlib.printNoLine(system.safeIndex(a, 0, 1));
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
    await assertObjectCodeExecutes(fileImpl, "foo");
  });

  test("Pass_WithSetAndReadElements1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(3, 2, "")
  set a to a.withPut(0, 0, "bar")
  set a to a.withPut(0, 1, "foo")
  set a to a.withPut(2, 0, "yon")
  set a to a.withPut(2, 1, "xan")
  call printNoLine(a[0, 1])
  call printNoLine(a[2, 0])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a = a.withPut(0, 0, "bar");
  a = a.withPut(0, 1, "foo");
  a = a.withPut(2, 0, "yon");
  a = a.withPut(2, 1, "xan");
  await _stdlib.printNoLine(system.safeIndex(a, 0, 1));
  await _stdlib.printNoLine(system.safeIndex(a, 2, 0));
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
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test("Pass_WithSetAndReadElements2", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of String>
  set a to new Array2D<of String>(3, 2, "")
  set a to a.withPut(0, 0, "bar")
  set a to a.withPut(0, 1, "foo")
  call printNoLine(a[0, 1])
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a = a.withPut(0, 0, "bar");
  a = a.withPut(0, 1, "foo");
  await _stdlib.printNoLine(system.safeIndex(a, 0, 1));
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
    await assertObjectCodeExecutes(fileImpl, "foo");
  });

  test("Pass_EmptyArrayByValue", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of Int>
  variable b set to empty Array2D<of Int>
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(a.isSameValueAs(b))
  call printNoLine(a.isSameValueAs(empty Array2D<of Int>))
  call printNoLine(b.isSameValueAs(empty Array2D<of Int>))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  let b = system.initialise(_stdlib.Array2D.emptyInstance());
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(_stdlib.isSameValueAs(a, b));
  await _stdlib.printNoLine(_stdlib.isSameValueAs(a, system.initialise(_stdlib.Array2D.emptyInstance())));
  await _stdlib.printNoLine(_stdlib.isSameValueAs(b, system.initialise(_stdlib.Array2D.emptyInstance())));
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
    await assertObjectCodeExecutes(fileImpl, "[][]truetruetrue");
  });

  test("Pass_EmptyArrayByReference", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of Int>
  variable b set to empty Array2D<of Int>
  variable c set to a
  call printNoLine(a.isSameReferenceAs(b))
  call printNoLine(a.isSameReferenceAs(empty Array2D<of Int>))
  call printNoLine(b.isSameReferenceAs(empty Array2D<of Int>))
  call printNoLine(a.isSameReferenceAs(c))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  let b = system.initialise(_stdlib.Array2D.emptyInstance());
  let c = a;
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(a, b));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(a, system.initialise(_stdlib.Array2D.emptyInstance())));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(b, system.initialise(_stdlib.Array2D.emptyInstance())));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(a, c));
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
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsetrue");
  });

  test("Pass_InitialiseEmptyArray", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(2, 2, 0)
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 0));
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
    await assertObjectCodeExecutes(fileImpl, "[[0, 0], [0, 0]]");
  });

  test("Pass_InitialiseArray2D", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(2, 2, 1)
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 1));
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
    await assertObjectCodeExecutes(fileImpl, "[[1, 1], [1, 1]]");
  });

  test("Pass_Contains1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(2, 2, "")
  call a.put(0, 1, "foo")
  call printNoLine(a.contains("foo"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, ""));
  a.put(0, 1, "foo");
  await _stdlib.printNoLine(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_Contains2", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(2, 2, "")
  call a.put(0, 1, "bar")
  call printNoLine(a.contains("foo"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, ""));
  a.put(0, 1, "bar");
  await _stdlib.printNoLine(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Pass_IndexOf", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(10, 10, "")
  call a.put(5, 7, "bar")
  call a.put(8, 2, "foo")
  call printNoLine(a.indexOf("bar"))
  call printNoLine(a.indexOf("foo"))
  call printNoLine(a.indexOf("yon"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(10, 10, ""));
  a.put(5, 7, "bar");
  a.put(8, 2, "foo");
  await _stdlib.printNoLine(a.indexOf("bar"));
  await _stdlib.printNoLine(a.indexOf("foo"));
  await _stdlib.printNoLine(a.indexOf("yon"));
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
    await assertObjectCodeExecutes(fileImpl, "tuple(5, 7)tuple(8, 2)tuple(-1, -1)");
  });

  ignore_test("Pass_SetInMain", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(2, 2, 2)
  set a[0, 1] to 1
  call print(a[0, 1])
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 2));
  system.safeSet(a, 1, 0, 1);
  await _stdlib.print(system.safeIndex(a, 0, 1));
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

  ignore_test("Pass_SetInProcedure", async () => {
    const code = `${testHeader}

main 
  call foo()
end main

procedure foo()
  variable a set to new Array2D<of Int>(2, 2, 2)
  set a[0, 1] to 1
  call print(a[0, 1])
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 2));
  system.safeSet(a, 1, 0, 1);
  await _stdlib.print(system.safeIndex(a, 0, 1));
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

  test("Fail_SetInFunction", async () => {
    const code = `${testHeader}

main
  call print(foo())
end main

function foo() returns Int
  variable a set to new Array2D<of Int>(2, 2, 2)
  set a[0, 1] to 1
  return a[0, 1]
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
      "Cannot mutate set an indexed value within a function. Use .withPut... functionLangRef.html#compile_error",
    ]);
  });

  test("Fail_SetWrongType", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(2, 2, 2)
  set a[0, 1] to "fred"
  call print(a[0, 1])
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

  test("Fail_EmptyArray2D1", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of Int>
  call a.put(0, 0, 3)
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 0 size: 0");
  });

  test("Fail_Array2DAccessedAs1D", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(1, 1, "")
  call a.put(0, "foo")
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
      "Missing argument(s). Expected: column (Int), row (Int), value (String).LangRef.html#compile_error",
    ]);
  });

  test("Fail_OutOfRange1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(2, 1, "")
  variable b set to a[0, 1]
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 1 size: 1");
  });

  test("Fail_OutOfRange2", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(2, 1, "")
  variable b set to a[3, 0]
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 2");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(1, 1, "")
  call a.put(0, 0, true)
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
      "Argument types. Expected: column (Int), row (Int), value (String), Provided: Int, Int, Boolean.LangRef.html#compile_error",
    ]);
  });

  test("Fail_singleIndexArray2D", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(3, 0, "")
  call printNoLine(a[0].length())
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
    assertDoesNotCompile(fileImpl, ["Cannot index Array2D<of String>.LangRef.html#compile_error"]);
  });

  test("Fail_missingGenericParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D(3, 0, "")
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
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
      "Argument types. Expected: columns (Int), rows (Int), initialValue (Generic Parameter T1), Provided: Int, Int, String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_zeroSize1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(0, 1, "")
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Each dimension of Array2D must be non zero, positive value",
    );
  });

  test("Fail_zeroSize2", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(1, 0, "")
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
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Each dimension of Array2D must be non zero, positive value",
    );
  });

  test("Fail_InvalidType", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Point>(2, 2, new Point())
end main

record Point
end record`;

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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Array2D must be of Type: Int, Float, String, or Boolean, with matching initial value",
    );
  });

  test("Fail_IndexNotInt", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of String>(3, 2, "")
  variable b set to a["0", 1]
  variable c set to a[0, 0.5]
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
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });
});
