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
    const code = `# FFFF Elan Beta 3 valid

main
  var st set to new Set<of Int>()
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st = system.initialise(new _stdlib.Set());
  st = st.add(3).add(7).add(5);
  system.printLine(_stdlib.asString(st.length()));
  st = st.add(7);
  system.printLine(_stdlib.asString(st.length()));
  st = st.remove(3);
  system.printLine(_stdlib.asString(st.length()));
  st = st.remove(3);
  system.printLine(_stdlib.asString(st.length()));
  system.printLine(_stdlib.asString(st));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var st1 set to new Set<of Int>()
  var st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6)
  set st2 to st2.add(1).add(4).add(9)
  var st3 set to st1.union(st2)
  print st3
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st1 = system.initialise(new _stdlib.Set());
  var st2 = system.initialise(new _stdlib.Set());
  st1 = st1.add(2).add(4).add(6);
  st2 = st2.add(1).add(4).add(9);
  var st3 = st1.union(st2);
  system.printLine(_stdlib.asString(st3));
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
    const code = `# FFFF Elan Beta 3 valid

main
  var st1 set to new Set<of Int>()
  var st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6).add(3)
  set st2 to st2.add(3).add(1).add(4).add(9)
  var st3 set to st1.intersection(st2)
  print st3
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st1 = system.initialise(new _stdlib.Set());
  var st2 = system.initialise(new _stdlib.Set());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  var st3 = st1.intersection(st2);
  system.printLine(_stdlib.asString(st3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4,3}");
  });
  test("Pass_SetDifference", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var st1 set to new Set<of Int>()
  var st2 set to new Set<of Int>()
  set st1 to st1.add(2).add(4).add(6).add(3)
  set st2 to st2.add(3).add(1).add(4).add(9)
  var st3 set to st1.difference(st2)
  print st3
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st1 = system.initialise(new _stdlib.Set());
  var st2 = system.initialise(new _stdlib.Set());
  st1 = st1.add(2).add(4).add(6).add(3);
  st2 = st2.add(3).add(1).add(4).add(9);
  var st3 = st1.difference(st2);
  system.printLine(_stdlib.asString(st3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2,6}");
  });
  test("Pass_IsDisjointFrom", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.add(2).add(4).add(6).add(3)
  let st2 be st0.add(3).add(1).add(4).add(9)
  let st3 be st0.add(8).add(9)
  print st1.isDisjointFrom(st2)
  print st1.isDisjointFrom(st3)
  print st2.isDisjointFrom(st3)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st0 = system.initialise(new _stdlib.Set());
  const st1 = st0.add(2).add(4).add(6).add(3);
  const st2 = st0.add(3).add(1).add(4).add(9);
  const st3 = st0.add(8).add(9);
  system.printLine(_stdlib.asString(st1.isDisjointFrom(st2)));
  system.printLine(_stdlib.asString(st1.isDisjointFrom(s3)));
  system.printLine(_stdlib.asString(st2.isDisjointFrom(st3)));
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
    const code = `# FFFF Elan Beta 3 valid

main
  let st0 be new Set<of Int>()
  let st1 be st0.add(2).add(4).add(6).add(3)
  let st2 be sr0.add(4).add(6)
  let st3 be st0.add(4).add(6).add(1)
  print st2.isSubsetOf(st1)
  print st2.isSupersetOf(st1)
  print st1.isSupersetOf(st2)
  print st1.isSupersetOf(st3)
  print st3.isSupersetOf(st0)
  print st0.isSubsetOf(st3)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st0 = system.initialise(new _stdlib.Set());
  const st1 = st0.add(2).add(4).add(6).add(3);
  const st2 = st0.add(3).add(1).add(4).add(9);
  const st3 = st0..add(8).add(9);
  system.printLine(_stdlib.asString(st1.isDisjointFrom(st2)));
  system.printLine(_stdlib.asString(st1.isDisjointFrom(s3)));
  system.printLine(_stdlib.asString(st2.isDisjointFrom(st3)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruetrue");
  });
});
