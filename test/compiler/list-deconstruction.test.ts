import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
import {
  testHash,
  transforms,
  assertParses,
  assertStatusIsValid,
  assertObjectCodeIs,
  assertObjectCodeExecutes,
  ignore_test,
} from "./compiler-test-helpers";

suite("List Deconstruction", () => {
  ignore_test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to [1,2,3]
  var x set to 1
  var y set to empty [Int]
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var x = 1;
  var y = system.emptyArray();
  [x, system.array(...y)] = a;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[2, 3]");
  });
});
