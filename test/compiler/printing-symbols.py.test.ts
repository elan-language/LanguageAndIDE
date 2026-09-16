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

suite("Python Printing Symbols", () => {
  test("Pass_PrintWithNoArgument", async () => {
    const code = `${testPythonHeader}

def foo(p: Maybe[int]) -> int: # function
  return 0
# end function

def main() -> None:
  printNoLine("") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("");
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
    await assertObjectCodeExecutes(fileImpl, "");
  });
  test("Pass_CommonSymbolsAccessibleFromUKKeyboard", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("") # procedure call
# end main

def main() -> None:
  printNoLine("¬!£$%^&*()@~#|<>'") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("¬!£$%^&*()@~#|<>'");
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
    await assertObjectCodeExecutes(fileImpl, "¬!£$%^&*()@~#|<>'");
  });

  test("Pass_printEscape", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("¬!£$%^&*()@~#|<>'") # procedure call
# end main

def main() -> None:
  printNoLine("\\b\\n") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("\\\\b\\n");
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
    await assertObjectCodeExecutes(fileImpl, "\\b\n");
  });

  test("Pass_CallPrintTab", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("\\b\\n") # procedure call
# end main

def main() -> None:
  printTab(5, "Foo") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printTab(5, "Foo");
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
    await assertObjectCodeExecutes(fileImpl, "     Foo");
  });
  test("Pass_CallClearPrintedText", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printTab(5, "Foo") # procedure call
# end main

def main() -> None:
  printNoLine("Foo") # procedure call
  clearPrintedText() # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("Foo");
  await _stdlib.clearPrintedText();
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_PrintImage", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Foo") # procedure call
  clearPrintedText() # procedure call
# end main

def main() -> None:
  i = ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") # variable definition
  i = i.withWidth(50).withHeight(50).withTitle("foo").withAlt("bar") # assignment
  printNoLine(i) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let i = system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png"));
  i = i.withWidth(50).withHeight(50).withTitle("foo").withAlt("bar");
  await _stdlib.printNoLine(i);
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
    await assertObjectCodeExecutes(fileImpl, `an ImageVG`);
  });
  test("Pass_PrintUncloseHtmlTag", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  i = ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") # variable definition
  i = i.withWidth(50).withHeight(50).withTitle("foo").withAlt("bar") # assignment
  printNoLine(i) # procedure call
# end main

def main() -> None:
  printNoLine("<3") # procedure call
  printNoLine("a < b ") # procedure call
  printNoLine("c <d> ") # procedure call
  printNoLine("e <f ") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("<3");
  await _stdlib.printNoLine("a < b ");
  await _stdlib.printNoLine("c <d> ");
  await _stdlib.printNoLine("e <f ");
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
    await assertObjectCodeDoesNotExecute(fileImpl, `Unclosed HTML tag in printed text 'e &lt;f '`);
  });
});
