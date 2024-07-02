import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T72_PassingFunctionAsParameterOrReturn", () => {
  test("Pass_PassAsParam", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(3, twice)
end main
  
procedure printModified(i as Float, f as Func<of Float => Float>)
  print f(i)
end procedure
  
function twice(x as Float) return Float
  return x * 2
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printModified(3, twice);
}

async function printModified(i, f) {
  system.printLine(_stdlib.asString(f(i)));
}

function twice(x) {
  return x * 2;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_PassAsParam2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printIt("Hello", "e", find)
end main
  
procedure printIt(s as String, c as String, f as Func<of String, String => Int>)
  print f(s,c)
end procedure
  
function find(x as String, y as String) return Int
  return x.indexOf(y)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printIt("Hello", "e", find);
}

async function printIt(s, c, f) {
  system.printLine(_stdlib.asString(f(s, c)));
}

function find(x, y) {
  return _stdlib.indexOf(x, y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ReturnAFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to getFunc()
  print f(5)
end main
  
function getFunc() return Func<of Float => Float>
  return twice
end function
  
function twice(x as Float) return Float
  return x * 2
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = getFunc();
  system.printLine(_stdlib.asString(f(5)));
}

function getFunc() {
  return twice;
}

function twice(x) {
  return x * 2;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Fail_FunctionSignatureDoesntMatch1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(3, power)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure
  
function power(x as Int, y as Int) return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 2 got: 1"]);
  });

  test("Fail_FunctionSignatureDoesntMatch2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(3, power)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure
  
function power(x as Int) return String
  return "one"
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_UsingReturnedFuncWithoutArgs", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to getFunc()
  print a()
end main

function getFunc() return Func<of Int => Int>
  return twice
end function

function twice(x as Int) return Int
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 1 got: 0"]);
  });
});
