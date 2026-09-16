import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParseIncomplete,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python RegExp", () => {
  test("Pass_LiteralRegex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  st = Queue[Foo]() # variable definition
# end main

def main() -> None:
  r = /a+/ # variable definition
  printNoLine(r) # procedure call
  printNoLine("aa".matchesRegExp(r)) # procedure call
  printNoLine("b".matchesRegExp(r)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a+/;
  await _stdlib.printNoLine(r);
  await _stdlib.printNoLine(_stdlib.matchesRegExp("aa", r));
  await _stdlib.printNoLine(_stdlib.matchesRegExp("b", r));
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
    await assertObjectCodeExecutes(fileImpl, "A RegExptruefalse");
  });

  test("Pass_RegexAsParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = /a+/ # variable definition
  printNoLine(r) # procedure call
  printNoLine("aa".matchesRegExp(r)) # procedure call
  printNoLine("b".matchesRegExp(r)) # procedure call
# end main

def main() -> None:
  r = /a+/ # variable definition
  printNoLine(testRegex(r)) # procedure call
# end main

def testRegex(r: RegExp) -> bool: # function
  return "aa".matchesRegExp(r)
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a+/;
  await _stdlib.printNoLine((await global.testRegex(r)));
}

async function testRegex(r) {
  return _stdlib.matchesRegExp("aa", r);
}
global["testRegex"] = testRegex;
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ReturnRegex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = /a+/ # variable definition
  printNoLine(testRegex(r)) # procedure call
# end main

def main() -> None:
  r = testRegex() # variable definition
  printNoLine("aa".matchesRegExp(r)) # procedure call
# end main

def testRegex() -> RegExp: # function
  return /a+/
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = (await global.testRegex());
  await _stdlib.printNoLine(_stdlib.matchesRegExp("aa", r));
}

async function testRegex() {
  return /a+/;
}
global["testRegex"] = testRegex;
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ContainsEscapedForwardSlash", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = testRegex() # variable definition
  printNoLine("aa".matchesRegExp(r)) # procedure call
# end main

def main() -> None:
  r = /a\\/b/ # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a\\/b/;
  await _stdlib.printNoLine(_stdlib.matchesRegExp("a/b", r));
  await _stdlib.printNoLine(_stdlib.matchesRegExp("a\\\\/b", r));
  await _stdlib.printNoLine(_stdlib.matchesRegExp("a\\\\b", r));
  await _stdlib.printNoLine(_stdlib.matchesRegExp("a\\\\\\\\/b", r));
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
    await assertObjectCodeExecutes(fileImpl, "truefalsefalsefalse");
  });

  test("fail_missing end slash", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = /a\\/b/ # variable definition
# end main

def main() -> None:
  r = /a+ # variable definition
# end main

main()
`;

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

    assertParseIncomplete(fileImpl);
  });

  test("Fail_boundedByQuotes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = /a+ # variable definition
# end main

def main() -> None:
  r = "/a+/" # variable definition
  printNoLine("aa".matchesRegExp(r)) # procedure call
  printNoLine("b".matchesRegExp(r)) # procedure call
# end main

main()
`;

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
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: regExp (RegExp), Provided: String.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IllFormedRegex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = "/a+/" # variable definition
  printNoLine("aa".matchesRegExp(r)) # procedure call
  printNoLine("b".matchesRegExp(r)) # procedure call
# end main

def main() -> None:
  r = /[/ # variable definition
# end main

main()
`;

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
    assertDoesNotCompile(fileImpl, [
      "Invalid regular expression: /[/: Unterminated character classLibRef.html#RegExpFunctions",
    ]);
  });
});
