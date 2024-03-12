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
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 1) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "55");
});

test('Pass_withStep', async () => {
  const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
var tot set to 0
for i from 1 to 10 step 2
  set tot to tot + i
end for
print tot
end main`;

  const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 2) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;

  const fileImpl = new FileImpl(() => "", true);
  fileImpl.parseFrom(new CodeSourceFromString(code));

  assertParses(fileImpl);
  assertStatusIsValid(fileImpl);
  assertObjectCodeIs(fileImpl, objectCode);
  await assertObjectCodeExecutes(fileImpl, "25");
});
});