import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T71_StandardLib", () => {
  test("Pass_contains", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant lst set to {"one", "two"}
main
  var arr set to ["three", "four"]
  print lst.contains("two")
  print lst.contains("three")
  print arr.contains("four")
  print arr.contains("five")
  print "onetwo".contains("two")
  print "onetwo".contains("three")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const lst = system.immutableList(["one", "two"]);

async function main() {
  var arr = system.literalArray(["three", "four"]);
  system.print(_stdlib.asString(_stdlib.contains(lst, "two")));
  system.print(_stdlib.asString(_stdlib.contains(lst, "three")));
  system.print(_stdlib.asString(_stdlib.contains(arr, "four")));
  system.print(_stdlib.asString(_stdlib.contains(arr, "five")));
  system.print(_stdlib.asString(_stdlib.contains("onetwo", "two")));
  system.print(_stdlib.asString(_stdlib.contains("onetwo", "three")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruefalse");
  });

  test("Pass_pause", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call pause(100)
  print 2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(1));
  await _stdlib.pause(100);
  system.print(_stdlib.asString(2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_clock", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to clock()
  call pause(100)
  var b set to clock()
  print b > a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.clock();
  await _stdlib.pause(100);
  var b = _stdlib.clock();
  system.print(_stdlib.asString(b > a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_random", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to random()
  var b set to random()
  print a < 1
  print a is not b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.random();
  var b = _stdlib.random();
  system.print(_stdlib.asString(a < 1));
  system.print(_stdlib.asString(a !== b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });

  test("Pass_parseAsFloat1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to  "10.1".parseAsFloat()
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("10.1");
  system.print(_stdlib.asString(_stdlib.first(a)));
  system.print(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true10.1");
  });

  test("Pass_parseAsFloat2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to  "x12".parseAsFloat()
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("x12");
  system.print(_stdlib.asString(_stdlib.first(a)));
  system.print(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false0");
  });

  test("Pass_parseAsInt1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to  "10.1".parseAsInt()
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("10.1");
  system.print(_stdlib.asString(_stdlib.first(a)));
  system.print(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true10");
  });

  test("Pass_parseAsInt2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to  "".parseAsInt()
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("");
  system.print(_stdlib.asString(_stdlib.first(a)));
  system.print(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false0");
  });
});
