import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Text Files", () => {
  test("Pass_Create", async () => {
    const code = `${testPythonHeader}

class Test_proc(unittest.TestCase):
 def test_proc(self) -> None:

# end test

def main() -> None:
  fr = TextFileReader() # variable definition
  fw = TextFileWriter() # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let fr = system.initialise(await new _stdlib.TextFileReader()._initialise());
  let fw = system.initialise(await new _stdlib.TextFileWriter()._initialise());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_readWholeFile", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  fr = TextFileReader() # variable definition
  fw = TextFileWriter() # variable definition
# end main

def main() -> None:
  tf = openFileForReading() # variable definition
  txt = tf.readWholeFile() # variable definition
  printNoLine(txt) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  let txt = tf.readWholeFile();
  await _stdlib.printNoLine(txt);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1 \n Line2\n\rLine3");
  });

  test("Pass_readWholeFile_ClosesFile", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = openFileForReading() # variable definition
  txt = tf.readWholeFile() # variable definition
  printNoLine(txt) # procedure call
# end main

def main() -> None:
  tf = openFileForReading() # variable definition
  txt = tf.readWholeFile() # variable definition
  line = tf.readLine() # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  let txt = tf.readWholeFile();
  let line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_ReadLineInLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = openFileForReading() # variable definition
  txt = tf.readWholeFile() # variable definition
  line = tf.readLine() # variable definition
# end main

def main() -> None:
  tf = openFileForReading() # variable definition
  while not tf.endOfFile():
    printNoLine(tf.readLine()) # procedure call
  # end while
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  while (!tf.endOfFile()) {
    await _stdlib.printNoLine(tf.readLine());
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Line1Line2Line3");
  });

  test("Pass_ReadLine_ErrorIfClosed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = openFileForReading() # variable definition
  while not tf.endOfFile():
    printNoLine(tf.readLine()) # procedure call
  # end while
# end main

def main() -> None:
  tf = openFileForReading() # variable definition
  tf.close() # procedure call
  line = tf.readLine() # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = (await _stdlib.openFileForReading());
  tf.close();
  let line = tf.readLine();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Cannot use any method on a closed file");
  });

  test("Pass_write", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = openFileForReading() # variable definition
  tf.close() # procedure call
  line = tf.readLine() # variable definition
# end main

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeLine("something") # procedure call
  tf.saveAndClose() # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something");
  });
  test("Pass_writeWholeFile", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeLine("something") # procedure call
  tf.saveAndClose() # procedure call
# end main

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeWholeFile("something else") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let tf = _stdlib.createFileForWriting("data.txt");
  await tf.writeWholeFile("something else");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "something else");
  });
  test("Pass_writeWholeFileErrorIfAlreadyWrittenTo", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeWholeFile("something else") # procedure call
# end main

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeLine("something") # procedure call
  tf.writeWholeFile("something else") # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeLine("something") # procedure call
  tf.writeWholeFile("something else") # procedure call
# end main

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeWholeFile("something else") # procedure call
  tf.saveAndClose() # procedure call
# end main

main()
`;

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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, `Cannot use any method on a closed file`);
  });
});
