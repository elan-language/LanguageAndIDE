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
  transforms,
} from "./compiler-test-helpers";

suite("RegExp", () => {
  test("Pass_LiteralRegex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  system.printLine(_stdlib.asString(r));
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("aa", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("b", r)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A RegExptruefalse");
  });

  test("Pass_RegexAsParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  system.printLine(_stdlib.asString(testRegex(r)));
}

function testRegex(r) {
  return _stdlib.matchesRegExp("aa", r);
}
global["testRegex"] = testRegex;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ReturnRegex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  r = testRegex();
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("aa", r)));
}

function testRegex() {
  return /a+/;
}
global["testRegex"] = testRegex;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_ContainsEscapedForwardSlash", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable r set to /a\\/b/
  print "a/b".matchesRegExp(r)
  print "a\/b".matchesRegExp(r)
  print "a\b".matchesRegExp(r)
  print "a\\/b".matchesRegExp(r)

end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = /a\\/b/;
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("a/b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("a/b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("a\b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegExp("a\\/b", r)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalsetrue");
  });

  test("fail_missing end slash", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable r set to /a+
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_boundedByQuotes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable r set to "/a+/"
  print "aa".matchesRegExp(r)
  print "b".matchesRegExp(r)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: regExp (RegExp) Provided: String"]);
  });
});
