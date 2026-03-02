import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParseIncomplete,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("RegExp", () => {
  test("Pass_LiteralRegex", async () => {
    const code = `${testHeader}

main
  variable r set to /a+/
  call printNoLine(r)
  call printNoLine("aa".matchesRegExp(r))
  call printNoLine("b".matchesRegExp(r))
end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable r set to /a+/
  call printNoLine(testRegex(r))
end main

function testRegex(r as RegExp) returns Boolean
  return "aa".matchesRegExp(r)
end function`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable r set to testRegex()
  call printNoLine("aa".matchesRegExp(r))
end main

function testRegex() returns RegExp
  return /a+/
end function`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable r set to /a\\/b/
  call printNoLine("a/b".matchesRegExp(r))
  call printNoLine("a\\/b".matchesRegExp(r))
  call printNoLine("a\\b".matchesRegExp(r))
  call printNoLine("a\\\\/b".matchesRegExp(r))

end main`;

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
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable r set to /a+
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    const code = `${testHeader}

main
  variable r set to "/a+/"
  call printNoLine("aa".matchesRegExp(r))
  call printNoLine("b".matchesRegExp(r))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: regExp (RegExp), Provided: String.LangRef.html#compile_error",
    ]);
  });
});
