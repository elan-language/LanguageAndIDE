import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T15_eachLoop', () => {

  test('Pass_List', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [7,8,9]
  var n set to 0
  each x in a
      set n to n + x
  end each
  print n
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([7, 8, 9]);
  var n = 0;
  for (const x of a) {
    n = n + x;
  }
  system.print(_stdlib.asString(n));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test('Pass_Array', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to asArray([7,8,9])
  var n set to 0
  each x in a
      set n to n + x
  end each
  print n
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.asArray(system.list([7, 8, 9]));
  var n = 0;
  for (const x of a) {
    n = n + x;
  }
  system.print(_stdlib.asString(n));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test('Pass_String', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to "hello"
  each x in a
    print x + newline
  end each
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = "hello";
  for (const x of a) {
    system.print(_stdlib.asString(x + _stdlib.newline));
  }
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "h\ne\nl\nl\no\n");
  });

  test('Pass_DoubleLoop', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  each x in "12"
    each y in "34"
      print "{x}{y}"
    end each
  end each
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (const x of "12") {
    for (const y of "34") {
      system.print(_stdlib.asString(\`\${_stdlib.asString(x)}\${_stdlib.asString(y)}\`));
    }
  }
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13142324");
  });

  test('Pass_functionProvidingList', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  each x in fruit()
    print x
  end each
end main

function fruit() return List<of String>
  return ["apple","orange", "pear"]
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (const x of fruit()) {
    system.print(_stdlib.asString(x));
  }
}

function fruit() {
  return system.list(["apple", "orange", "pear"]);
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  

  // Fails TODO

});