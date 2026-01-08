import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Text Files", () => {
  test("Pass_Create", async () => {
    const code = `${testHeader}

main
  variable fr set to new TextFileReader()
  variable fw set to new TextFileWriter()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let fr = system.initialise(await new _stdlib.TextFileReader()._initialise());
  let fw = system.initialise(await new _stdlib.TextFileWriter()._initialise());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_readWholeFile", async () => {
    const code = `${testHeader}

main
  variable tf set to openFileForReading()
  variable txt set to tf.readWholeFile()
  print txt
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  let txt = tf.readWholeFile();
  await system.print(txt);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1 \n Line2\n\rLine3");
  });

  test("Pass_readWholeFile_ClosesFile", async () => {
    const code = `${testHeader}

main
  variable tf set to openFileForReading()
  variable txt set to tf.readWholeFile()
  let line be tf.readLine()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  let txt = tf.readWholeFile();
  const line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_ReadLineInLoop", async () => {
    const code = `${testHeader}

main
  variable tf set to openFileForReading()

  while not tf.endOfFile()
    print tf.readLine()
  end while
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  while (!tf.endOfFile()) {
    await system.print(tf.readLine());
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1Line2Line3");
  });

  test("Pass_ReadLine_ErrorIfClosed", async () => {
    const code = `${testHeader}

main
  variable tf set to openFileForReading()
  call tf.close()
  let line be tf.readLine()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  tf.close();
  const line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_write", async () => {
    const code = `${testHeader}

main
  variable tf set to createFileForWriting("data.txt")
  call tf.writeLine("something")
  call tf.saveAndClose()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = _stdlib.createFileForWriting("data.txt");
  tf.writeLine("something");
  await tf.saveAndClose();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something");
  });
  test("Pass_writeWholeFile", async () => {
    const code = `${testHeader}

main
  variable tf set to createFileForWriting("data.txt")
  call tf.writeWholeFile("something else")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = _stdlib.createFileForWriting("data.txt");
  await tf.writeWholeFile("something else");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something else");
  });
  test("Pass_writeWholeFileErrorIfAlreadyWrittenTo", async () => {
    const code = `${testHeader}

main
  variable tf set to createFileForWriting("data.txt")
  call tf.writeLine("something")
  call tf.writeWholeFile("something else")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = _stdlib.createFileForWriting("data.txt");
  tf.writeLine("something");
  await tf.writeWholeFile("something else");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
    const code = `${testHeader}

main
  variable tf set to createFileForWriting("data.txt")
  call tf.writeWholeFile("something else")
  call tf.saveAndClose()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = _stdlib.createFileForWriting("data.txt");
  await tf.writeWholeFile("something else");
  await tf.saveAndClose();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, `Cannot use any method on a closed file`);
  });
});
