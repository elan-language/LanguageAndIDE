import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T31_Expressions5_LogicalOperators', () => {

  test('Pass_and', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false and false
  var b set to false and true
  var c set to true and false
  var d set to true and true
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = false && false;
  var b = false && true;
  var c = true && false;
  var d = true && true;
  system.print(system.asString(a));
  system.print(system.asString(b));
  system.print(system.asString(c));
  system.print(system.asString(d));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsetrue");
  });

 
 

  // TODO fails

});