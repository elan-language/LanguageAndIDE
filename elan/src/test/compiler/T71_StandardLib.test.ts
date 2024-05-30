import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T71_StandardLib", () => {
  test("Pass_contains", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant lst set to {"one", "two"}
main
  var arr set to ["three", "four"]
  print lst.contains("two")
  print lst.contains("three")
  print arr.contains("four")
  print arr.contains("five")
  print "onetwo".contains("two")
  print "onetwo".contains("three")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const lst = system.list(["one", "two"]);

async function main() {
  var arr = system.literalArray(["three", "four"]);
  system.print(_stdlib.asString(_stdlib.contains(lst, "two")));
  system.print(_stdlib.asString(_stdlib.contains(lst, "three")));
  system.print(_stdlib.asString(_stdlib.contains(arr, "four")));
  system.print(_stdlib.asString(_stdlib.contains(arr, "five")));
  system.print(_stdlib.asString(_stdlib.contains("onetwo", "two")));
  system.print(_stdlib.asString(_stdlib.contains("onetwo", "three")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruefalse");
  });
});
