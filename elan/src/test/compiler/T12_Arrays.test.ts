import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T12_Arrays', () => {

  test('Pass_DeclareAnEmptyArrayBySizeAndCheckLength', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Array<of String>(3)
  print a.length()
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array(3)), ["String"]);
  system.print(_stdlib.asString(_stdlib.length(a)));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test('Pass_ConfirmStringElementsInitializedToEmptyStringNotNull', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Array<of String>(3)
  print a[0].length()
  print a
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array(3)), ["String"]);
  system.print(_stdlib.asString(_stdlib.length(a[0])));
  system.print(_stdlib.asString(a));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0Array [, , ]");
  });

  test('Pass_SetAndReadElements', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Array<of String>(3)
  set a[0] to "foo"
  set a[2] to "yon"
  print a[0]
  print a[2]
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array(3)), ["String"]);
  a[0] = "foo";
  a[2] = "yon";
  system.print(_stdlib.asString(a[0]));
  system.print(_stdlib.asString(a[2]));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "fooyon");
  });

  test('Pass_InitializeAnArrayFromAList', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["foo","bar","yon"].asArray()
  print a.length()
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.asArray(system.list(["foo", "bar", "yon"]));
  system.print(_stdlib.asString(_stdlib.length(a)));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  // Fails TODO

});