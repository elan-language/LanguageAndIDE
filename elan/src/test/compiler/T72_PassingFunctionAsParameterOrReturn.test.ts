import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T72_PassingFunctionAsParameterOrReturn', () => {

  ignore_test('Pass_PassAsParam', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(3, twice)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure
  
function twice(x as Int) return Int
  return x * 2
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  printModified(3, twice);
}

function printModified(i, f) {
  system.print(_stdlib.asString(f(i)));
}

function twice(x) {
  return x * 2;
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

 
  

  // Fails TODO

});