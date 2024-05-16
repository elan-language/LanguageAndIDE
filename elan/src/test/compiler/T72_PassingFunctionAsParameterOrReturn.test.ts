import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite("T72_PassingFunctionAsParameterOrReturn", () => {
  ignore_test("Pass_PassAsParam", async () => {
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
  printModified(3, twice);
}

function printModified(i, f) {
  system.print(_stdlib.asString(f(i)));
}

function twice(x) {
  return x * 2;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  ignore_test("Pass_PassAsParam2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printIt("Hello", "e", find)
end main
  
procedure printIt(s as String, c as String, f as Func<of String, String => Int>)
  print f(s,c)
end procedure
  
function find(x as String, y as String) return Int
  return indexOf(x, y)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  printIt("Hello", "e", find);
}

function printIt(s, c, f) {
  system.print(_stdlib.asString(f(s, c)));
}

function find(x, y) {
  return _stdlib.indexOf(x, y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test("Pass_ReturnAFunction", async () => {
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
  system.print(_stdlib.asString(f(5)));
}

function getFunc() {
  return twice;
}

function twice(x) {
  return x * 2;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  // Fails TODO
});
