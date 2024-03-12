import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_8_ForLoop', () => {

  ignore_test('Pass_minimal', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
system.print(system.asString("Hello World!"));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
});
});