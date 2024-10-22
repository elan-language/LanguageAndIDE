import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib-symbols", () => {
  test("Pass_AbstractClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
 
end main

procedure renderSvg(out vg as VGBase)
  call vg.renderAsSVG()
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

async function renderSvg(vg) {
  await vg[0].renderAsSVG();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var svg set to new VGBase()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["VGBase must be concrete to new"]);
  });
});
