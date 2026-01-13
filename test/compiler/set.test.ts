import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Set", () => {
  test("Pass_SetAddRemoveLength", async () => {
    const code = `${testHeader}

main
  variable st set to new Set<of Int>()
  set st to st.add(3).add(7).add(5)
  print st.length()
  set st to st.add(7)
  print st.length()
  set st to st.remove(3)
  print st.length()
  set st to st.remove(3)
  print st.length()
  print st
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st = system.initialise(await new _stdlib.Set()._initialise());
  st = st.add(3).add(7).add(5);
  await system.print(st.length());
  st = st.add(7);
  await system.print(st.length());
  st = st.remove(3);
  await system.print(st.length());
  st = st.remove(3);
  await system.print(st.length());
  await system.print(st);
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
    await assertObjectCodeExecutes(fileImpl, "3322{7, 5}");
  });

  test("Pass_SetUnion", async () => {
    const code = `${testHeader}

main
  variable st1 set to new Set<of Int>()
  variable st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6)
  set st2 to st2.add(1).add(4).add(9)
  variable st3 set to st1.union(st2)
  print st3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.Set()._initialise());
  let st2 = system.initialise(await new _stdlib.Set()._initialise());
  st1 = st1.add(2).add(4).add(6);
  st2 = st2.add(1).add(4).add(9);
  let st3 = st1.union(st2);
  await system.print(st3);
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
    await assertObjectCodeExecutes(fileImpl, "{2, 4, 6, 1, 9}");
  });

  test("Pass_SetIntersection", async () => {
    const code = `${testHeader}

main
  variable st1 set to new Set<of Int>()
  variable st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6).add(3)
  set st2 to st2.add(3).add(1).add(4).add(9)
  variable st3 set to st1.intersection(st2)
  print st3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.Set()._initialise());
  let st2 = system.initialise(await new _stdlib.Set()._initialise());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  let st3 = st1.intersection(st2);
  await system.print(st3);
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
    await assertObjectCodeExecutes(fileImpl, "{4, 3}");
  });

  test("Pass_SetDifference", async () => {
    const code = `${testHeader}

main
  variable st1 set to new Set<of Int>()
  variable st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6).add(3)
  set st2 to st2.add(3).add(1).add(4).add(9)
  variable st3 set to st1.difference(st2)
  print st3
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st1 = system.initialise(await new _stdlib.Set()._initialise());
  let st2 = system.initialise(await new _stdlib.Set()._initialise());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  let st3 = st1.difference(st2);
  await system.print(st3);
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
    await assertObjectCodeExecutes(fileImpl, "{2, 6}");
  });

  test("Pass_IsDisjointFrom", async () => {
    const code = `${testHeader}

main
  variable st0 set to new Set<of Int>()
  variable st1 set to st0.add(2).add(4).add(6).add(3)
  variable st2 set to st0.add(3).add(1).add(4).add(9)
  variable st3 set to st0.add(8).add(9)
  print st1.isDisjointFrom(st2)
  print st1.isDisjointFrom(st3)
  print st2.isDisjointFrom(st3)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.Set()._initialise());
  let st1 = st0.add(2).add(4).add(6).add(3);
  let st2 = st0.add(3).add(1).add(4).add(9);
  let st3 = st0.add(8).add(9);
  await system.print(st1.isDisjointFrom(st2));
  await system.print(st1.isDisjointFrom(st3));
  await system.print(st2.isDisjointFrom(st3));
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
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_IsSubsetOfIsSupersetOf", async () => {
    const code = `${testHeader}

main
  variable st0 set to new Set<of Int>()
  variable st1 set to st0.add(2).add(4).add(6).add(3)
  variable st2 set to st0.add(4).add(6)
  variable st3 set to st0.add(4).add(6).add(1)
  print st2.isSubsetOf(st1)
  print st2.isSupersetOf(st1)
  print st1.isSupersetOf(st2)
  print st1.isSupersetOf(st3)
  print st3.isSupersetOf(st0)
  print st0.isSubsetOf(st3)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.Set()._initialise());
  let st1 = st0.add(2).add(4).add(6).add(3);
  let st2 = st0.add(4).add(6);
  let st3 = st0.add(4).add(6).add(1);
  await system.print(st2.isSubsetOf(st1));
  await system.print(st2.isSupersetOf(st1));
  await system.print(st1.isSupersetOf(st2));
  await system.print(st1.isSupersetOf(st3));
  await system.print(st3.isSupersetOf(st0));
  await system.print(st0.isSubsetOf(st3));
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruetrue");
  });
  test("Pass_AddFromList", async () => {
    const code = `${testHeader}

main
  variable st0 set to new Set<of Int>()
  variable st1 set to st0.addFromList([2,4,6,3])
  print st1
  variable st2 set to st1.addFromList([2,5,6])
  print st2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let st0 = system.initialise(await new _stdlib.Set()._initialise());
  let st1 = st0.addFromList(system.list([2, 4, 6, 3]));
  await system.print(st1);
  let st2 = st1.addFromList(system.list([2, 5, 6]));
  await system.print(st2);
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
    await assertObjectCodeExecutes(fileImpl, "{2, 4, 6, 3}{2, 4, 6, 3, 5}");
  });

  test("Pass_Conversions", async () => {
    const code = `${testHeader}

main
  variable a set to ["one", "two", "three"].asSet()
  variable c set to a.asList()
  variable aa set to empty Set<of String>
  variable cc set to empty List<of String>
  set aa to a
  set cc to c
  print aa
  print cc
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]).asSet();
  let c = a.asList();
  let aa = system.initialise(_stdlib.Set.emptyInstance());
  let cc = system.initialise(_stdlib.List.emptyInstance());
  aa = a;
  cc = c;
  await system.print(aa);
  await system.print(cc);
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
    await assertObjectCodeExecutes(fileImpl, "{one, two, three}[one, two, three]");
  });

  test("Pass_Contains1", async () => {
    const code = `${testHeader}

main
  variable a set to new Set<of String>()
  set a to a.add("foo")
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Set()._initialise());
  a = a.add("foo");
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
  variable a set to new Set<of String>()
  set a to a.add("bar")
  print a.contains("foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Set()._initialise());
  a = a.add("bar");
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

  test("Fail_SetOfMutable", async () => {
    const code = `${testHeader}

main
  variable st set to new Set<of Foo>()
end main

class Foo
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Set cannot be of mutable type 'Foo'.LangRef.html#compile_error",
    ]);
  });
});
