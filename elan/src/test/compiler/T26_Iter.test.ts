import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T26_Iter', () => {

  test('Pass_List', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to [1, 5, 6]
  call printEach(it)
end main
  
procedure printEach(target as Iter<of Int>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var it = [1, 5, 6];
  printEach(it);
}

function printEach(target) {
  for (const x of target) {
    system.print(system.asString(x));
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "156");
  });

  test('Pass_Array', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to asArray([1, 3, 6])
  call printEach(it)
end main
  
procedure printEach(target as Iter<of Int>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var it = _stdlib.asArray([1, 3, 6]);
  printEach(it);
}

function printEach(target) {
  for (const x of target) {
    system.print(system.asString(x));
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "136");
  });



  // TODO fails

});