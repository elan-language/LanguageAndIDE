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

suite("Text Files", () => {
  test("Pass_Create", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var fr set to new TextFileReader()
  var fw set to new TextFileWriter()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var fr = system.initialise(new _stdlib.TextFileReader());
  var fw = system.initialise(new _stdlib.TextFileWriter());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_ReadToEnd", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var tf set to openFileForReading("data.txt")
  var txt set to tf.readToEnd()
  print txt
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading("data.txt");
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
    const code = `# FFFF Elan Beta 3 valid

main
  var tf set to openFileForReading("data.txt")

  while not tf.endOfFile()
    print tf.readLine()
  end while
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading("data.txt");
  while (!tf.endOfFile()) {
    system.printLine(_stdlib.asString(tf.readLine()));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1Line2Line3");
  });

  test("Pass_write", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var tf set to createFileForWriting("data.txt")
  call tf.writeLine("something")
  call tf.saveAndClose()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = _stdlib.createFileForWriting("data.txt");
  tf.writeLine("something");
  await tf.saveAndClose();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something");
  });
});
