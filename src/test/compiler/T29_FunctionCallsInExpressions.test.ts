import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T29_Expressions3_FunctionCalls", () => {
  test("Pass_LibraryConst", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  print pi
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(_stdlib.pi));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_SingleFunctionCall", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to sin(pi / 180 * 30)
  print x
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = _stdlib.sin(_stdlib.pi / 180 * 30);
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_Sin", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to  pi/180*30
  var y set to sin(x)
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = _stdlib.pi / 180 * 30;
  var y = _stdlib.sin(x);
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0.49999999999999994");
  });

  test("Pass_FunctionsInExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to pi/180*30
  var y set to sin(x) + cos(x)
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = _stdlib.pi / 180 * 30;
  var y = _stdlib.sin(x) + _stdlib.cos(x);
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1.3660254037844386");
  });

  test("Pass_MoreComplexExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to 0.7
  var y set to sin(x) ^ 2 + cos(x) ^ 2
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 0.7;
  var y = _stdlib.sin(x) ** 2 + _stdlib.cos(x) ** 2;
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_MultiParamCall", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to {3.1, 3}.min()
  print x
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = _stdlib.min(system.immutableList([3.1, 3]));
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_MultiParamCallUsingDotSyntax", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var i set to ["a", "b"]
  var x set to i.contains("b")
  print x
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var i = system.literalArray(["a", "b"]);
  var x = _stdlib.contains(i, "b");
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Fail_IncorrectType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to "hello".max()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Iter<of Float>"]);
  });

  test("Fail_UnconsumedExpressionResult1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call sin(1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot call Function"]);
  });

  test("Fail_UnconsumedExpressionResult2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  1 + 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UnconsumedExpressionResult3", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [1,2]
  call a.max()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot call Function"]);
  });
});
