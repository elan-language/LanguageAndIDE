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

suite("Array", () => {
  test("Pass_Array", async () => {
    const code = `${testHeader}

main
  variable c set to new Array<of Int>(1, 0)
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.Array()._initialise(1, 0));
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
    await assertObjectCodeExecutes(fileImpl, "[0]");
  });

  test("Pass_ArrayAsParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of Int>(1, 0)
  print bar(a)
end main

function bar(arr as Array<of Int>) returns Array<of Int>
  return arr
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(1, 0));
  await system.print((await global.bar(a)));
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
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[0]");
  });

  test("Fail_ArrayAsParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of Int>(0, 0)
  print foo(a)
end main

function foo(arr as List<of Int>) returns List<of Int>
  return bar(arr)
end function`;

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
      "Argument types. Expected: arr (List<of Int>), Provided: Array<of Int>.LangRef.html#compile_error",
    ]);
  });

  test("Pass_DeclareAnEmptyArrayBySizeAndCheckLength", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array<of String>
  print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array.emptyInstance());
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
  variable a set to new Array<of String>(3, "")
  call a.put(0, "bar")
  call a.put(2, "xan")
  print a[0]
  print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(3, ""));
  a.put(0, "bar");
  a.put(2, "xan");
  await system.print(system.safeIndex(a, 0));
  await system.print(system.safeIndex(a, 2));
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
    await assertObjectCodeExecutes(fileImpl, "barxan");
  });

  test("Pass_WithSetAndReadElements1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(3, "")
  set a to a.withPut(0, "bar")
  set a to a.withPut(2, "xan")
  print a[0]
  print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(3, ""));
  a = a.withPut(0, "bar");
  a = a.withPut(2, "xan");
  await system.print(system.safeIndex(a, 0));
  await system.print(system.safeIndex(a, 2));
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
    await assertObjectCodeExecutes(fileImpl, "barxan");
  });

  test("Pass_Conversions", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"].asArray()
  variable c set to a.asList()
  variable d set to a.asSet()
  variable aa set to empty Array<of String>
  variable cc set to empty List<of String>
  variable dd set to empty Set<of String>
  set aa to a
  set cc to c
  set dd to d
  print aa
  print cc
  print dd
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]).asArray();
  let c = a.asList();
  let d = a.asSet();
  let aa = system.initialise(_stdlib.Array.emptyInstance());
  let cc = system.initialise(_stdlib.List.emptyInstance());
  let dd = system.initialise(_stdlib.Set.emptyInstance());
  aa = a;
  cc = c;
  dd = d;
  await system.print(aa);
  await system.print(cc);
  await system.print(dd);
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
    await assertObjectCodeExecutes(fileImpl, "[one, two, three][one, two, three]{one, two, three}");
  });

  test("Fail_WithPutOutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(3, "")
  set a to a.withPut(0, "bar")
  set a to a.withPut(3, "xan")
  print a[0]
  print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(3, ""));
  a = a.withPut(0, "bar");
  a = a.withPut(3, "xan");
  await system.print(system.safeIndex(a, 0));
  await system.print(system.safeIndex(a, 2));
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

  test("Pass_EmptyArray", async () => {
    const code = `${testHeader}

main
  variable a set to empty Array<of Int>
  variable b set to empty Array<of Int>
  print a
  print b
  print a is b
  print a is empty Array<of Int>
  print b is empty Array<of Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.Array.emptyInstance());
  let b = system.initialise(_stdlib.Array.emptyInstance());
  await system.print(a);
  await system.print(b);
  await system.print(system.objectEquals(a, b));
  await system.print(system.objectEquals(a, system.initialise(_stdlib.Array.emptyInstance())));
  await system.print(system.objectEquals(b, system.initialise(_stdlib.Array.emptyInstance())));
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
    await assertObjectCodeExecutes(fileImpl, "[][]truetruetrue");
  });

  test("Pass_InitialiseEmptyArray", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of Int>(2, 0)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(2, 0));
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
    await assertObjectCodeExecutes(fileImpl, "[0, 0]");
  });

  test("Pass_InitialiseArray", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of Int>(2, 1)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(2, 1));
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
    await assertObjectCodeExecutes(fileImpl, "[1, 1]");
  });

  test("Pass_Contains1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(2, "")
  call a.put(0, "foo")
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(2, ""));
  a.put(0, "foo");
  await system.print(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_Contains2", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(2, "")
  call a.put(0, "bar")
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(2, ""));
  a.put(0, "bar");
  await system.print(a.contains("foo"));
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
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Pass_IndexOf", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(10, "")
  call a.put(5, "bar")
  call a.put(8, "foo")
  print a.indexOf("bar")
  print a.indexOf("foo")
  print a.indexOf("yon")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array()._initialise(10, ""));
  a.put(5, "bar");
  a.put(8, "foo");
  await system.print(a.indexOf("bar"));
  await system.print(a.indexOf("foo"));
  await system.print(a.indexOf("yon"));
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
    await assertObjectCodeExecutes(fileImpl, "58-1");
  });

  test("Pass_Range", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}.asArray()
  variable b set to empty Array<of Int>
  set b to a[2..5]
  print b
  print a[1..3]
  print a[0..2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]).asArray();
  let b = system.initialise(_stdlib.Array.emptyInstance());
  b = system.safeSlice(a, 2, 5);
  await system.print(b);
  await system.print(system.safeSlice(a, 1, 3));
  await system.print(system.safeSlice(a, 0, 2));
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

  test("Pass_OutOfRange1", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}.asArray()
  variable b set to 6
  variable c set to a[b..]
  print c
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]).asArray();
  let b = 6;
  let c = system.safeSlice(a, b);
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_OutOfRange2", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}.asArray()
  variable b set to 6
  variable c set to a[0..b]
  print c
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]).asArray();
  let b = 6;
  let c = system.safeSlice(a, 0, b);
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
    await assertObjectCodeExecutes(fileImpl, "[4, 5, 6, 7, 8]");
  });

  test("Pass_FunctionIndex", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}
  variable b set to a[randomInt(0, 3)]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = system.safeIndex(a, _stdlib.randomInt(0, 3));
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_SetInMain", async () => {
    const code = `${testHeader}

main
  variable a set to {2,2}.asArray()
  set a[0] to 1
  call print(a[0])
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([2, 2]).asArray();
  system.safeSet(a, 1, 0);
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
  variable a set to {2,2}.asArray()
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
  let a = system.listImmutable([2, 2]).asArray();
  system.safeSet(a, 1, 0);
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
  variable a set to {2,2}.asArray()
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
  variable a set to {2,2}.asArray()
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

  test("Fail_assignRange", async () => {
    const code = `${testHeader}

main
    variable a set to {1,2,3,4}.asArray()
    set a[1..2] to a
    print a
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

  test("Fail_ArrayAccessedAs2D", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(1, "")
  call a.put(0, 1, "foo")
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

  test("Fail_OutOfRange1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(2, "")
  variable b set to a[2]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 2 size: 2");
  });

  test("Fail_OutOfRange2", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(2, "")
  variable i set to -1
  variable b set to a[i]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 2");
  });

  test("Fail_TypeIncompatibility", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(1, "")
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

  test("Fail_missingGenericParameter", async () => {
    const code = `${testHeader}

main
  variable a set to new Array(3, "")
  print a
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
      "Argument types. Expected: size (Int), initialValue (Generic Parameter T1), Provided: Int, String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_zeroSize1", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of String>(0, "")
  print a
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Size of Array must be non zero, positive value",
    );
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}.asArray()
    variable b set to a.withPut(3, "THREE")
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]).asArray();
  let b = a.withPut(3, "THREE");
  await system.print(b);
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
  variable a set to {4, 5, 6, 7, 8}.asArray()
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

  test("Fail_NegativeIndex", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}.asArray()
  variable b set to -1
  variable c set to a[b]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 5");
  });

  test("Fail_NegativeRange1", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}.asArray()
  variable b set to -1
  variable c set to a[0..b]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 5");
  });

  test("Fail_NegativeRange2", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}.asArray()
  variable b set to -1
  variable c set to a[b..]
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
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: -1 size: 5");
  });

  test("Fail_InvalidType", async () => {
    const code = `${testHeader}

main
  variable a set to new Array<of Point>(2, new Point())
end main

record Point
end record`;

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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Array must be of Type: Int, Float, String, or Boolean, with matching initial value",
    );
  });
});
