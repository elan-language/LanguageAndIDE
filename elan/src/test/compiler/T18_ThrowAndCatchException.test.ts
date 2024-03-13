import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T18_ThrowAndCatchException', () => {

  test('Pass_ThrowExceptionInMain', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    throw "Foo"
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  throw new Error("Foo");
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });
});