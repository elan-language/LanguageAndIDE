import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T74_AnyImmutableTypeAsConstant', () => {

  test('Pass_String', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to "Apple"

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = "Apple";

async function main() {
  system.print(_stdlib.asString(k));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test('Pass_Tuple', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to (3, "Apple")

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.tuple([3, "Apple"]);

async function main() {
  system.print(_stdlib.asString(k));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Tuple (3, Apple)");
  });

  test('Pass_List', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to [1, 2, 3]

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.list([1, 2, 3]);

async function main() {
  system.print(_stdlib.asString(k));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [1, 2, 3]");
  });

  test('Pass_Dictionary', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to ['a':1, 'b':3, 'c':3]

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = {'a' : 1, 'b' : 3, 'c' : 3};

async function main() {
  system.print(_stdlib.asString(k));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, c:3]");
  });

 
  

  // Fails TODO

});