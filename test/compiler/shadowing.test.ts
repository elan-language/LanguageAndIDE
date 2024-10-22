import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Shadowing", () => {
  test("Fail_LocalShadowsConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to 4

main
  var a set to 3
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a constant and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print foo()
end main
function foo() return Int
  return 1
end function

function bar() return Int
  var foo set to foo()
  return foo
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'foo' is already used for a function and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsProcedure", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  call foo()
end main
procedure foo()

end procedure

function bar() return Int
  var foo set to 1
  return foo
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'foo' is already used for a procedure and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsParameter", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  call foo(1)
end main
procedure foo(a as Int)
  var a set to a
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsVariable", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  var a set to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsLet", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let a be 1
  var a set to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  test("Fail_LetShadowsLet", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let a be 1
  let a be 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  test("Fail_ParameterShadowsConst", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant x set to 1

main
  
end main

function foo(x as Int) return Int
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'x' is already used for a constant and cannot be re-defined here.",
    ]);
  });

  test("Pass_DisambiguateLocalVariableFromLibConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var pi set to library.pi
  print pi
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var pi = _stdlib.pi;
  system.printLine(_stdlib.asString(pi));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_DisambiguateLocalLetFromLibConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let pi be library.pi
  print pi
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const pi = _stdlib.pi;
  system.printLine(_stdlib.asString(pi));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_DisambiguateLibFunctionFromLocalAndInstanceFunctions", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var f set to new Foo()
    print f.sin(1)
    print sin(1)
    print library.sin(1)
end main

function sin(x as Float) return Float
    return 111
end function

class Foo
    constructor()
    end constructor

    function sin(x as Float) return Float
      return 222
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.sin(1)));
  system.printLine(_stdlib.asString(sin(1)));
  system.printLine(_stdlib.asString(_stdlib.sin(1)));
}

function sin(x) {
  return 111;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  sin(x) {
    return 222;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2221110.8414709848078965");
  });

  test("Fail_global", async () => {
    const code = `# FFFF Elan Beta 3 valid

const a = 4
const b = global.a

main
 
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
