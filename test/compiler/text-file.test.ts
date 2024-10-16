import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Text File", () => {
  test("Pass_Create", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var tf set to new TextFile()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = system.initialise(new _stdlib.TextFile());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_ReadToEnd", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var tf set to openRead("path")
  var txt set to tf.readToEnd()
  print txt
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openRead("path");
  var txt = tf.readToEnd();
  system.printLine(_stdlib.asString(txt));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1\nLine2\nLine3");
  });

  test("Pass_ReadLine", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var tf set to openRead("path")
  var txt set to tf.readLine()
  print txt
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openRead("path");
  var txt = tf.readLine();
  system.printLine(_stdlib.asString(txt));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1");
  });
});
