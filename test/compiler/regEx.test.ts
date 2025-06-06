import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
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
  print r
  print "aa".matchesRegExp(r)
  print "b".matchesRegExp(r)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a+/;
  await system.printLine(r);
  await system.printLine(_stdlib.matchesRegExp("aa", r));
  await system.printLine(_stdlib.matchesRegExp("b", r));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print testRegex(r)
end main

function testRegex(r as RegExp) returns Boolean
  return "aa".matchesRegExp(r)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a+/;
  await system.printLine((await global.testRegex(r)));
}

async function testRegex(r) {
  return _stdlib.matchesRegExp("aa", r);
}
global["testRegex"] = testRegex;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ReturnRegex", async () => {
    const code = `${testHeader}

main
  variable r set to empty RegExp
  set r to testRegex()
  print "aa".matchesRegExp(r)
end main

function testRegex() returns RegExp
  return /a+/
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = system.emptyRegExp();
  r = (await global.testRegex());
  await system.printLine(_stdlib.matchesRegExp("aa", r));
}

async function testRegex() {
  return /a+/;
}
global["testRegex"] = testRegex;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print "a/b".matchesRegExp(r)
  print "a\\/b".matchesRegExp(r)
  print "a\\b".matchesRegExp(r)
  print "a\\\\/b".matchesRegExp(r)

end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a\\/b/;
  await system.printLine(_stdlib.matchesRegExp("a/b", r));
  await system.printLine(_stdlib.matchesRegExp("a\\\\/b", r));
  await system.printLine(_stdlib.matchesRegExp("a\\\\b", r));
  await system.printLine(_stdlib.matchesRegExp("a\\\\\\\\/b", r));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_boundedByQuotes", async () => {
    const code = `${testHeader}

main
  variable r set to "/a+/"
  print "aa".matchesRegExp(r)
  print "b".matchesRegExp(r)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: regExp (RegExp), Provided: String.LangRef.html#compile_error",
    ]);
  });
});
