import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("VG", () => {
  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var svg set to new BaseVG()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["BaseVG must be concrete to new"]);
  });

  test("Pass_Inherits", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var li set to empty [BaseVG]
  let circ be new CircleVG()
  call li.append(circ)
  print li
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var li = system.emptyArray();
  const circ = system.initialise(new _stdlib.CircleVG());
  _stdlib.append(li, circ);
  system.printLine(_stdlib.asString(li));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a CircleVG]");
  });
});
