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

suite("Standard Data Structures", () => {
  test("Pass_Stack", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new Stack()
  print st.length()
  call st.push("apple")
  call st.push("pear")
  print st.length()
  print st.peek()
  var fruit set to st.pop()
  print fruit
  set fruit to st.pop()
  print fruit
  print st.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.Stack());
  system.printLine(_stdlib.asString(st.length()));
  st.push("apple");
  st.push("pear");
  system.printLine(_stdlib.asString(st.length()));
  system.printLine(_stdlib.asString(st.peek()));
  var fruit = st.pop();
  system.printLine(_stdlib.asString(fruit));
  fruit = st.pop();
  system.printLine(_stdlib.asString(fruit));
  system.printLine(_stdlib.asString(st.length()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "02pearpearapple0");
  });
});
