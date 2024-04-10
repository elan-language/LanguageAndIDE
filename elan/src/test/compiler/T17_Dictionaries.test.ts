import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T17_Dictionaries', () => {

  test('Pass_LiteralConstantAndPrinting', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ['a':1, 'b':3, 'z':10]
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
const a = {'a' : 1, 'b' : 3, 'z' : 10};

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test('Pass_AccessByKey', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ['a':1, 'b':3, 'z':10]
main
  print a['z']
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
const a = {'a' : 1, 'b' : 3, 'z' : 10};

export async function main() {
  system.print(system.asString(a['z']));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test('Pass_keys', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ['a':1, 'b':3, 'z':10]
main
  print keys(a)
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
const a = {'a' : 1, 'b' : 3, 'z' : 10};

export async function main() {
  system.print(system.asString(_stdlib.keys(a)));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [a, b, z]");
  });

  test('Pass_hasKey', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ['a':1, 'b':3, 'z':10]
main
  print hasKey(a, 'b')
  print hasKey(a, 'd')
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
const a = {'a' : 1, 'b' : 3, 'z' : 10};

export async function main() {
  system.print(system.asString(_stdlib.hasKey(a, 'b')));
  system.print(system.asString(_stdlib.hasKey(a, 'd')));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

 

});