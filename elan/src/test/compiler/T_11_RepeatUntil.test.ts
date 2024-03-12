import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_11_RepeatUntil', () => {

  test('Pass_minimal', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 0
  repeat
    set x to x + 1
  end repeat when x >= 10
  print x
 end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var x = 0;
  do {
    x = x + 1;
  } while (!(x >= 10));
  system.print(system.asString(x));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });


});