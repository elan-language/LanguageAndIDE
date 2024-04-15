import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T13_StringManipulation', () => {

  test('Pass_AppendStrings', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to "Hello"
  var b set to "World!"
  print a + " " + b
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = "Hello";
  var b = "World!";
  system.print(_stdlib.asString(a + " " + b));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test('Pass_AppendOrPrependChar', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print '_' + "Hello" + '!'
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  system.print(_stdlib.asString('_' + "Hello" + '!'));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "_Hello!");
  });

  test('Pass_AppendNumber', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print "Hello" + 3.1
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  system.print(_stdlib.asString("Hello" + 3.1));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello3.1");
  });

  test('Pass_Indexing', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to "abcde"
  print a[2]
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = "abcde";
  system.print(_stdlib.asString(a[2]));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "c");
  });

  test('Pass_Ranges', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to "abcde"
  print a[1..3]
  print a[2..]
  print a[..2]
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = "abcde";
  system.print(_stdlib.asString(a.slice(1, 3)));
  system.print(_stdlib.asString(a.slice(2)));
  system.print(_stdlib.asString(a.slice(0, 2)));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bccdeab");
  });

  test('Pass_EqualityTesting', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print "abc" is "abc"
    print "abc" is "abcd"
    print "abc" is "Abc"
    print "abc" is "abc"
    print "abc" is not "abcd"
    print "abc" is not "abcd"
    print "abc" is not "Abc"
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  system.print(_stdlib.asString("abc" === "abc"));
  system.print(_stdlib.asString("abc" === "abcd"));
  system.print(_stdlib.asString("abc" === "Abc"));
  system.print(_stdlib.asString("abc" === "abc"));
  system.print(_stdlib.asString("abc" !== "abcd"));
  system.print(_stdlib.asString("abc" !== "abcd"));
  system.print(_stdlib.asString("abc" !== "Abc"));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsefalsetruetruetruetrue");
  });

  test('Pass_ComparisonMethods', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print isBefore("abc", "abC")
  print isAfter("abcd", "abc")
  print isAfterOrSameAs("abc", "abc")
  print isBeforeOrSameAs("abc", "abc")
  print isAfterOrSameAs("abcd", "abc")
  print isBeforeOrSameAs("abcd", "abc")
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  system.print(_stdlib.asString(_stdlib.isBefore("abc", "abC")));
  system.print(_stdlib.asString(_stdlib.isAfter("abcd", "abc")));
  system.print(_stdlib.asString(_stdlib.isAfterOrSameAs("abc", "abc")));
  system.print(_stdlib.asString(_stdlib.isBeforeOrSameAs("abc", "abc")));
  system.print(_stdlib.asString(_stdlib.isAfterOrSameAs("abcd", "abc")));
  system.print(_stdlib.asString(_stdlib.isBeforeOrSameAs("abcd", "abc")));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetruetruefalse");
  });

  test('Pass_UseAsStringExplicitly', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to "abcde"
  set a to asString(2.1 + 3.4)
  print a
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = "abcde";
  a = _stdlib.asString(2.1 + 3.4);
  system.print(_stdlib.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  ignore_test('Pass_Interpolation', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  var b set to 4
  var c set to "{a} x {b} = {a * b}"
  print c
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var a = 3;
  var b = 4;
  var c = \`\${a} x \${b} = \${a * b}\`;
  system.print(_stdlib.asString(c));
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3 x 4 = 12");
  });

  // more TODO pending interpolation

  // Fails TODO

});