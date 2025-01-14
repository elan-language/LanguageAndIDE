import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("String Manipulation", () => {
  test("Pass_AppendStrings", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "Hello"
  variable b set to "World!"
  print a + " " + b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "Hello";
  var b = "World!";
  system.printLine(_stdlib.asString(a + " " + b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_AppendOrPrependChar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print "_" + "Hello" + "!"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString("_" + "Hello" + "!"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "_Hello!");
  });

  test("Pass_AppendFloat", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print "Hello" + 3.1
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString("Hello" + 3.1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello3.1");
  });

  test("Pass_Indexing", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  print a[2]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "abcde";
  system.printLine(_stdlib.asString(system.safeIndex(a, 2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "c");
  });

  test("Pass_IndexingAndAppend", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  variable b set to "z"
  set b to b + a[0]
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "abcde";
  var b = "z";
  b = b + system.safeIndex(a, 0);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "za");
  });

  test("Pass_SetIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  variable b set to "z"
  set b to a[0]
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "abcde";
  var b = "z";
  b = system.safeIndex(a, 0);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a");
  });

  test("Pass_Ranges", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  print a[1..3]
  print a[2..]
  print a[..2]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "abcde";
  system.printLine(_stdlib.asString(a.slice(1, 3)));
  system.printLine(_stdlib.asString(a.slice(2)));
  system.printLine(_stdlib.asString(a.slice(0, 2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bccdeab");
  });

  test("Pass_EqualityTesting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    print "abc" is "abc"
    print "abc" is "abcd"
    print "abc" is "Abc"
    print "abc" is "abc"
    print "abc" isnt "abcd"
    print "abc" isnt "abcd"
    print "abc" isnt "Abc"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString("abc" === "abc"));
  system.printLine(_stdlib.asString("abc" === "abcd"));
  system.printLine(_stdlib.asString("abc" === "Abc"));
  system.printLine(_stdlib.asString("abc" === "abc"));
  system.printLine(_stdlib.asString("abc" !== "abcd"));
  system.printLine(_stdlib.asString("abc" !== "abcd"));
  system.printLine(_stdlib.asString("abc" !== "Abc"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsefalsetruetruetruetrue");
  });

  test("Pass_ComparisonMethods", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print "abc".isBefore("abC")
  print "abcd".isAfter("abc")
  print "abc".isAfterOrSameAs("abc")
  print "abc".isBeforeOrSameAs("abc")
  print "abcd".isAfterOrSameAs("abc")
  print "abcd".isBeforeOrSameAs("abc")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(_stdlib.isBefore("abc", "abC")));
  system.printLine(_stdlib.asString(_stdlib.isAfter("abcd", "abc")));
  system.printLine(_stdlib.asString(_stdlib.isAfterOrSameAs("abc", "abc")));
  system.printLine(_stdlib.asString(_stdlib.isBeforeOrSameAs("abc", "abc")));
  system.printLine(_stdlib.asString(_stdlib.isAfterOrSameAs("abcd", "abc")));
  system.printLine(_stdlib.asString(_stdlib.isBeforeOrSameAs("abcd", "abc")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetruetruefalse");
  });

  test("Pass_UseAsStringExplicitly", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  variable b set to 2.1 + 3.4
  set a to b.asString()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = "abcde";
  var b = 2.1 + 3.4;
  a = _stdlib.asString(b);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  test("Pass_Interpolation", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  variable b set to 4
  variable c set to "{a} x {b} = {a * b}"
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = 3;
  var b = 4;
  var c = \`\${_stdlib.asString(a)} x \${_stdlib.asString(b)} = \${_stdlib.asString(a * b)}\`;
  system.printLine(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3 x 4 = 12");
  });

  test("Pass_AppendStringToFloat", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3.1 + "Hello"
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = 3.1 + "Hello";
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.1Hello");
  });

  test("Fail_IndexOutOfRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  print a[5]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_SetIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  call a.putAt(0, "b")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Array<of String>"]);
  });

  test("Fail_ComparisonOperators", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print "abc" < "abC"
  print "abcd" > "abc"
  print "abc" >= "abc"
  print "abc" <= "abc"
  print "abcd" >= "abc"
  print "abcd" <= "abc"
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
      "Incompatible types String to Float or Int",
    ]);
  });

  test("Fail_CoerceNumberToString", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "abcde"
  set a to 2.1 + 3.4
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to String"]);
  });
});
