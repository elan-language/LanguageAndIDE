import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Set", () => {
  test("Pass_SetAddRemoveLength", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  await system.printLine(st.length());
  st = st.add(7);
  await system.printLine(st.length());
  st = st.remove(3);
  await system.printLine(st.length());
  st = st.remove(3);
  await system.printLine(st.length());
  await system.printLine(st);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3322{7, 5}");
  });

  test("Pass_SetUnion", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  await system.printLine(st3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 4, 6, 1, 9}");
  });

  test("Pass_SetIntersection", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  await system.printLine(st3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 3}");
  });

  test("Pass_SetDifference", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  await system.printLine(st3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 6}");
  });

  test("Pass_IsDisjointFrom", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.add(2).add(4).add(6).add(3)
  let st2 be st0.add(3).add(1).add(4).add(9)
  let st3 be st0.add(8).add(9)
  print st1.isDisjointFrom(st2)
  print st1.isDisjointFrom(st3)
  print st2.isDisjointFrom(st3)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st0 = system.initialise(await new _stdlib.Set()._initialise());
  const st1 = st0.add(2).add(4).add(6).add(3);
  const st2 = st0.add(3).add(1).add(4).add(9);
  const st3 = st0.add(8).add(9);
  await system.printLine(st1.isDisjointFrom(st2));
  await system.printLine(st1.isDisjointFrom(st3));
  await system.printLine(st2.isDisjointFrom(st3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruefalse");
  });

  test("Pass_IsSubsetOfIsSupersetOf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.add(2).add(4).add(6).add(3)
  let st2 be st0.add(4).add(6)
  let st3 be st0.add(4).add(6).add(1)
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
  const st0 = system.initialise(await new _stdlib.Set()._initialise());
  const st1 = st0.add(2).add(4).add(6).add(3);
  const st2 = st0.add(4).add(6);
  const st3 = st0.add(4).add(6).add(1);
  await system.printLine(st2.isSubsetOf(st1));
  await system.printLine(st2.isSupersetOf(st1));
  await system.printLine(st1.isSupersetOf(st2));
  await system.printLine(st1.isSupersetOf(st3));
  await system.printLine(st3.isSupersetOf(st0));
  await system.printLine(st0.isSubsetOf(st3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruetrue");
  });
  test("Pass_AddFromList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.addFromList({2,4,6,3})
  print st1
  let st2 be st1.addFromList({2,5,6})
  print st2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st0 = system.initialise(await new _stdlib.Set()._initialise());
  const st1 = st0.addFromList(system.list([2, 4, 6, 3]));
  await system.printLine(st1);
  const st2 = st1.addFromList(system.list([2, 5, 6]));
  await system.printLine(st2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 4, 6, 3}{2, 4, 6, 3, 5}");
  });
  test("Pass_AddFromArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.addFromArray([2,4,6,3])
  print st1
  let st2 be st1.addFromArray([2,5,6])
  print st2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const st0 = system.initialise(await new _stdlib.Set()._initialise());
  const st1 = st0.addFromArray(system.literalArray([2, 4, 6, 3]));
  await system.printLine(st1);
  const st2 = st1.addFromArray(system.literalArray([2, 5, 6]));
  await system.printLine(st2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 4, 6, 3}{2, 4, 6, 3, 5}");
  });
});
