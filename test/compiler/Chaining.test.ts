import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
    assertDoesNotCompileWithId,
    assertObjectCodeExecutes,
    assertObjectCodeIs,
    assertParses,
    assertStatusIsValid,
    testHash,
    transforms,
} from "./compiler-test-helpers";

suite("Chaining", () => {
  test("Pass_SimpleChain", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {{1,2}, {3,4}}
  var b set to a.get(1).get(1)
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableList([system.immutableList([1, 2]), system.immutableList([3, 4])]);
  var b = _stdlib.get(_stdlib.get(a, 1), 1);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

});
