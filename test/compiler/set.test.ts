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
  test("Pass_Set", async () => {
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
});
