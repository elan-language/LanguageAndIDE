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

suite("TurtleGraphics", () => {
  test("Pass_MethodsUpdateTurtleState", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new TurtleGraphics()
  call t.placeAt(100, 150)
  call t.turn(45)
  call t.move(100)
  print floor(t.x)
  print floor(t.y)
  print t.heading
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.TurtleGraphics());
  t.placeAt(100, 150);
  t.turn(45);
  t.move(100);
  system.printLine(_stdlib.asString(_stdlib.floor(t.x)));
  system.printLine(_stdlib.asString(_stdlib.floor(t.y)));
  system.printLine(_stdlib.asString(t.heading));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `1707945`);
  });
});
