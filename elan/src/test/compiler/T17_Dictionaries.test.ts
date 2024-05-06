import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T17_Dictionaries', () => {

  test('Pass_LiteralConstantAndPrinting', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(a));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test('Pass_AccessByKey', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a["z"]
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(a["z"]));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test('Pass_keys', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print keys(a)
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.keys(a)));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [a, b, z]");
  });

  test('Pass_hasKey', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print hasKey(a, "b")
  print hasKey(a, "d")
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.hasKey(a, "b")));
  system.print(_stdlib.asString(_stdlib.hasKey(a, "d")));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test('Pass_values', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print values(a)
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.values(a)));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [1, 3, 10]");
  });

  test('Pass_set', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to setItem(a, "b", 4)
  var c set to setItem(b, "d", 2)
  print a
  print c
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.setItem(a, "b", 4);
  var c = _stdlib.setItem(b, "d", 2);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(c));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]Dictionary [a:1, b:4, z:10, d:2]");
  });

  test('Pass_removeEntry', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to removeItem(a, "b")
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.removeItem(a, "b");
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]Dictionary [a:1, z:10]");
  });

  test('Pass_removeInvalidKey', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to removeItem(a, "c")
  print b
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.removeItem(a, "c");
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test('Pass_CreateEmptyDictionary', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Dictionary<of String, Int>()
  var b set to setItem(a, "Foo", 1)
  set b to setItem(b, "Bar", 3)
  var k set to keys(b)
  print k.length()
  print b["Foo"]
  print b["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Object(), ["String", "Int"]);
  var b = _stdlib.setItem(a, "Foo", 1);
  b = _stdlib.setItem(b, "Bar", 3);
  var k = _stdlib.keys(b);
  system.print(_stdlib.asString(_stdlib.length(k)));
  system.print(_stdlib.asString(b["Foo"]));
  system.print(_stdlib.asString(b["Bar"]));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

 // fails TODO

});