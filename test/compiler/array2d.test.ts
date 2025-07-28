import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

suite("Array2D", () => {
  test("Pass_Array2D", async () => {
    const code = `${testHeader}

main
  variable c set to new Array2D<of Int>(1, 1, 0)
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.Array2D()._initialise(1, 1, 0));
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print bar(a)
end main

function bar(arr as Array2D<of Int>) returns Array2D<of Int>
  return arr
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(1, 1, 0));
  await system.printLine((await global.bar(a)));
}

async function bar(arr) {
  return arr;
}
global["bar"] = bar;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print foo(a)
end main

function foo(arr as List<of List<of Int>>) returns List<of List<of Int>>
  return bar(arr)
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a.columns()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  await system.printLine(a.columns());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a[0, 1]
  print a[2, 0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a.put(0, 0, "bar");
  a.put(0, 1, "foo");
  a.put(2, 0, "yon");
  a.put(2, 1, "xan");
  await system.printLine(system.safeIndex(a, 0, 1));
  await system.printLine(system.safeIndex(a, 2, 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a[0, 1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a.put(0, 0, "bar");
  a.put(0, 1, "foo");
  await system.printLine(system.safeIndex(a, 0, 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a[0, 1]
  print a[2, 0]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a = a.withPut(0, 0, "bar");
  a = a.withPut(0, 1, "foo");
  a = a.withPut(2, 0, "yon");
  a = a.withPut(2, 1, "xan");
  await system.printLine(system.safeIndex(a, 0, 1));
  await system.printLine(system.safeIndex(a, 2, 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a[0, 1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  a = system.initialise(await new _stdlib.Array2D()._initialise(3, 2, ""));
  a = a.withPut(0, 0, "bar");
  a = a.withPut(0, 1, "foo");
  await system.printLine(system.safeIndex(a, 0, 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "foo");
  });

  test("Pass_EmptyArray", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of Int>
  variable b set to empty Array2D<of Int>
  print a
  print b
  print a is b
  print a is empty Array2D<of Int>
  print b is empty Array2D<of Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array2D.emptyInstance());
  let b = system.initialise(_stdlib.Array2D.emptyInstance());
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.initialise(_stdlib.Array2D.emptyInstance())));
  await system.printLine(system.objectEquals(b, system.initialise(_stdlib.Array2D.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[][]truetruetrue");
  });

  test("Pass_InitialiseEmptyArray", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(2, 2, 0)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 0));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, 1));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, ""));
  a.put(0, 1, "foo");
  await system.printLine(a.contains("foo"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, ""));
  a.put(0, 1, "bar");
  await system.printLine(a.contains("foo"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a.indexOf("bar")
  print a.indexOf("foo")
  print a.indexOf("yon")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(10, 10, ""));
  a.put(5, 7, "bar");
  a.put(8, 2, "foo");
  await system.printLine(a.indexOf("bar"));
  await system.printLine(a.indexOf("foo"));
  await system.printLine(a.indexOf("yon"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "tuple(5, 7)tuple(8, 2)tuple(-1, -1)");
  });

  test("Fail_EmptyArray2D1", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array2D<of Int>
  call a.put(0, 0, 3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a[0].length()
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Array2D<of String>.LangRef.html#compile_error"]);
  });

  test("Fail_missingGenericParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D(3, 0, "")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Array2D must be of Type: Int, Float, String, or Boolean, with matching initial value",
    );
  });
});
