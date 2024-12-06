import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Text Files", () => {
  test("Pass_Create", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

  test("Pass_readWholeFile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to openFileForReading()
  var txt set to tf.readWholeFile()
  print txt
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading();
  var txt = tf.readWholeFile();
  system.printLine(_stdlib.asString(txt));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1 \n Line2\n\rLine3");
  });

  test("Pass_readWholeFile_ClosesFile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to openFileForReading()
  var txt set to tf.readWholeFile()
  let line be tf.readLine()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading();
  var txt = tf.readWholeFile();
  const line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_ReadLineInLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to openFileForReading()

  while not tf.endOfFile()
    print tf.readLine()
  end while
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading();
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

  test("Pass_ReadLine_ErrorIfClosed", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to openFileForReading()
  call tf.close()
  let line be tf.readLine()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = await _stdlib.openFileForReading();
  tf.close();
  const line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_write", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  test("Pass_writeWholeFile", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to createFileForWriting("data.txt")
  call tf.writeWholeFile("something else")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = _stdlib.createFileForWriting("data.txt");
  await tf.writeWholeFile("something else");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something else");
  });
  test("Pass_writeWholeFileErrorIfAlreadyWrittenTo", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to createFileForWriting("data.txt")
  call tf.writeLine("something")
  call tf.writeWholeFile("something else")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = _stdlib.createFileForWriting("data.txt");
  tf.writeLine("something");
  await tf.writeWholeFile("something else");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `Cannot call 'writeWholeFile' if content has already been written using 'writeLine'`,
    );
  });
  test("Pass_writeWholeFileErrorIfAlreadyClosed", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var tf set to createFileForWriting("data.txt")
  call tf.writeWholeFile("something else")
  call tf.saveAndClose()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tf = _stdlib.createFileForWriting("data.txt");
  await tf.writeWholeFile("something else");
  await tf.saveAndClose();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, `Cannot use any method on a closed file`);
  });
});
