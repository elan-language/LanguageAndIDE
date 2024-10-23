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

  test("Pass_With", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var vg set to new VectorGraphics()
  var circle1 set to new CircleVG()
  let xProp be circle1.x
  set circle1 to copy circle1 with x to 40
  print circle1.x
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var vg = system.initialise(new _stdlib.VectorGraphics());
  var circle1 = system.initialise(new _stdlib.CircleVG());
  const xProp = circle1.x;
  circle1 = (() => {const _a = {...circle1}; Object.setPrototypeOf(_a, Object.getPrototypeOf(circle1)); _a.x = 40; return _a;})();
  system.printLine(_stdlib.asString(circle1.x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "40");
  });
});
