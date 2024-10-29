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
    assertObjectCodeExecutes(fileImpl, "3322{7, 5}");
  });
});
