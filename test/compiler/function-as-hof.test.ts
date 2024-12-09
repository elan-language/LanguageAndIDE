import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Function as HOF", () => {
  test("Pass_PassAsParam", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printModified(3, ref twice)
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

  test("Pass_PassAsParam1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printModified(3, ref twice)
end main
  
procedure printModified(i as Float, f as Func<of => Float>)
  print f()
end procedure
  
function twice() return Float
  return 2
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printModified(3, twice);
}

async function printModified(i, f) {
  system.printLine(_stdlib.asString(f()));
}

function twice() {
  return 2;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_PassAsParam2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printIt("Hello", "e", ref find)
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
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to getFunc()
  print f(5)
end main
  
function getFunc() return Func<of Float => Float>
  return ref twice
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

  test("Pass_SetAsVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to ref twice
  print f(5)
end main
  
function twice(x as Float) return Float
  return x * 2
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = twice;
  system.printLine(_stdlib.asString(f(5)));
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

  test("Pass_SetAsProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to new Foo(ref ff)
  print f.pf(5)
end main

function ff(a as Int) return Int
  return a
end function
  
class Foo
  constructor(f as Func<of Int => Int>)
    set property.pf to ref f
  end constructor

  property pf as Func<of Int => Int>

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo(ff));
  system.printLine(_stdlib.asString(f.pf(5)));
}

function ff(a) {
  return a;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["pf", system.emptyFunc(0)]]);};
  constructor(f) {
    this.pf = f;
  }

  pf = system.emptyFunc(0);

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_Print", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print ref ff
end main

function ff(a as Int) return Int
  return a
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(ff));
}

function ff(a) {
  return a;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "function ff");
  });

  test("Fail_SetAsVariableWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to twice
  print f(5)
end main
  
function twice(x as Float) return Float
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'",
    ]);
  });

  test("Fail_FunctionSignatureDoesntMatch1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printModified(3, ref power)
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
    assertDoesNotCompile(fileImpl, [
      "Function Signatures do not match expected: 1 parameter(s) got: 2",
    ]);
  });

  test("Fail_FunctionSignatureDoesntMatch2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printModified(3, ref power)
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
    const code = `# FFFF Elan v1.0.0 valid

main
  var a set to getFunc()
  print a()
end main

function getFunc() return Func<of Int => Int>
  return ref twice
end function

function twice(x as Int) return Int
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Missing argument(s). Expected: parameter0 (Int)"]);
  });

  test("Fail_PassAsParamWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printModified(3, twice)
end main
  
procedure printModified(i as Float, f as Func<of Float => Float>)
  print f(i)
end procedure
  
function twice(x as Float) return Float
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'",
    ]);
  });

  test("Fail_ReturnAFunctionWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'",
    ]);
  });

  test("Fail_SetAsPropertyWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to new Foo(ff)
  print f.pf(5)
end main

function ff(a as Int) return Int
  return a
end function
  
class Foo
  constructor(f as Func<of Int => Int>)
    set property.pf to f
  end constructor

  property pf as Func<of Int => Int>

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'ff' add brackets. Or to create a reference to 'ff', precede it by 'ref'",
    ]);
  });

  test("Fail_InExpression1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to 1 + ff
end main

function ff(a as Int) return Int
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Func<of Int => Int> to Float or Int",
      "To evaluate function 'ff' add brackets. Or to create a reference to 'ff', precede it by 'ref'",
    ]);
  });

  test("Fail_InExpression2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var f set to 1 + ref ff
end main

function ff(a as Int) return Int
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Func<of Int => Int> to Float or Int"]);
  });
});
