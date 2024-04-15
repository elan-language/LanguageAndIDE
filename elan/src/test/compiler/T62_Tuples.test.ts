import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T62_Tuples', () => {

  test('Pass_CreatingTuplesAndReadingContents', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var x set to (3, "Apple")
    print x
    print first(x)
    print second(x)
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = [3, "Apple"];
  system.print(_stdlib.asString(x));
  system.print(_stdlib.asString(_stdlib.first(x)));
  system.print(_stdlib.asString(_stdlib.second(x)));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [3, Apple]3Apple");
  });

  

  // Fails TODO

});