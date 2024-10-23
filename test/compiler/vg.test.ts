import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("VG", () => {
  test("Pass_Inherits", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let arr be empty [BaseVG]
  let circle be new CircleVG()
  call arr.append(circle)
  call arr[0].renderAsSVG()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const arr = system.emptyArray();
  const circle = system.initialise(new _stdlib.CircleVG());
  _stdlib.append(arr, circle);
  await system.safeIndex(arr, 0).renderAsSVG();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
