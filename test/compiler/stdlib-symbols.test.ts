import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { TestStatus } from "../../src/frames/status-enums";
import { AssertOutcome } from "../../src/system";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib-symbols", () => {
  test("Pass_contains", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var bg set to new BlockGraphics1()
  var ks set to bg.getKeystroke1()
  print ks
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var bg = system.initialise(new _stdlib.BlockGraphics1());
  var ks = await bg.getKeystroke1();
  system.printLine(_stdlib.asString(ks));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "testvalue");
  });
});
