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
  transforms
} from "./compiler-test-helpers";

suite("Regex", () => {
  test("Pass_LiteralRegex", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var r set to /a+/
  print r
  print "aa".matchesRegex(r)
  print "b".matchesRegex(r)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var r = /a+/;
  system.printLine(_stdlib.asString(r));
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("aa", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("b", r)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A Regextruefalse");
  });

  test("Pass_ContainsEscapedForwardSlash", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var r set to /a\\/b/
  print "a/b".matchesRegex(r)
  print "a\/b".matchesRegex(r)
  print "a\b".matchesRegex(r)
  print "a\\/b".matchesRegex(r)

end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var r = /a\\/b/;
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("a/b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("a/b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("a\b", r)));
  system.printLine(_stdlib.asString(_stdlib.matchesRegex("a\\/b", r)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var r set to /a+
end main`;


    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_boundedByQuotes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var r set to "/a+/"
  print "aa".matchesRegex(r)
  print "b".matchesRegex(r)
end main`;


    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl,["Incompatible types String to Regex"]);
  });


});
