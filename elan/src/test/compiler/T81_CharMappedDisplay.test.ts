import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";
import { AssertOutcome } from "../../system";
import { TestStatus } from "../../frames/status-enums";

suite("Pass_PassingTest", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
