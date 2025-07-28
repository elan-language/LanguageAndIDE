import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Function as HOF", () => {
  test("Pass_PassAsParam", async () => {
    const code = `${testHeader}

main
  call printModified(3, ref twice)
end main
  
procedure printModified(i as Float, f as Func<of Float => Float>)
  print f(i)
end procedure
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(3, global.twice);
}

async function printModified(i, f) {
  await system.printLine((await f(i)));
}
global["printModified"] = printModified;

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_PassAsParam1", async () => {
    const code = `${testHeader}

main
  call printModified(3, ref twice)
end main
  
procedure printModified(i as Float, f as Func<of => Float>)
  print f()
end procedure
  
function twice() returns Float
  return 2
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(3, global.twice);
}

async function printModified(i, f) {
  await system.printLine((await f()));
}
global["printModified"] = printModified;

async function twice() {
  return 2;
}
global["twice"] = twice;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_PassAsParam2", async () => {
    const code = `${testHeader}

main
  call printIt("Hello", "e", ref find)
end main
  
procedure printIt(s as String, c as String, f as Func<of String, String => Int>)
  print f(s,c)
end procedure
  
function find(x as String, y as String) returns Int
  return x.indexOf(y)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printIt("Hello", "e", global.find);
}

async function printIt(s, c, f) {
  await system.printLine((await f(s, c)));
}
global["printIt"] = printIt;

async function find(x, y) {
  return _stdlib.indexOf(x, y);
}
global["find"] = find;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ReturnAFunction", async () => {
    const code = `${testHeader}

main
  variable f set to getFunc()
  print f(5)
end main
  
function getFunc() returns Func<of Float => Float>
  return ref twice
end function
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = (await global.getFunc());
  await system.printLine((await f(5)));
}

async function getFunc() {
  return global.twice;
}
global["getFunc"] = getFunc;

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_SetAsVariable", async () => {
    const code = `${testHeader}

main
  variable f set to ref twice
  print f(5)
end main
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = global.twice;
  await system.printLine((await f(5)));
}

async function twice(x) {
  return x * 2;
}
global["twice"] = twice;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_SetAsProperty", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo(ref ff)
  print f.pf(5)
end main

function ff(a as Int) returns Int
  return a
end function
  
class Foo
  constructor(f as Func<of Int => Int>)
    set property.pf to ref f
  end constructor

  property pf as Func<of Int => Int>

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise(global.ff));
  await system.printLine((await f.pf(5)));
}

async function ff(a) {
  return a;
}
global["ff"] = ff;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["pf", system.emptyFunc(0)]]);};

  async _initialise(f) {
    this.pf = f;
    return this;
  }

  pf = system.emptyFunc(0);

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_Print", async () => {
    const code = `${testHeader}

main
  print ref ff
end main

function ff(a as Int) returns Int
  return a
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(global.ff);
}

async function ff(a) {
  return a;
}
global["ff"] = ff;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "function ff");
  });

  test("Fail_SetAsVariableWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  variable f set to twice
  print f(5)
end main
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_FunctionSignatureDoesntMatch1", async () => {
    const code = `${testHeader}

main
  call printModified(3, ref power)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure
  
function power(x as Int, y as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of Int => Int>), Provided: Int, Func<of Int, Int => Int>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_FunctionSignatureDoesntMatch2", async () => {
    const code = `${testHeader}

main
  call printModified(3, ref power)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure
  
function power(x as Int) returns String
  return "one"
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of Int => Int>), Provided: Int, Func<of Int => String>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UsingReturnedFuncWithoutArgs", async () => {
    const code = `${testHeader}

main
  variable a set to getFunc()
  print a()
end main

function getFunc() returns Func<of Int => Int>
  return ref twice
end function

function twice(x as Int) returns Int
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: parameter0 (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassAsParamWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  call printModified(3, twice)
end main
  
procedure printModified(i as Float, f as Func<of Float => Float>)
  print f(i)
end procedure
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnAFunctionWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  variable f set to getFunc()
  print f(5)
end main
  
function getFunc() returns Func<of Float => Float>
  return twice
end function
  
function twice(x as Float) returns Float
  return x * 2
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'twice' add brackets. Or to create a reference to 'twice', precede it by 'ref'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SetAsPropertyWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo(ff)
  print f.pf(5)
end main

function ff(a as Int) returns Int
  return a
end function
  
class Foo
  constructor(f as Func<of Int => Int>)
    set property.pf to f
  end constructor

  property pf as Func<of Int => Int>

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'ff' add brackets. Or to create a reference to 'ff', precede it by 'ref'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InExpression1", async () => {
    const code = `${testHeader}

main
  variable f set to 1 + ff
end main

function ff(a as Int) returns Int
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'ff' add brackets. Or to create a reference to 'ff', precede it by 'ref'.LangRef.html#compile_error",
      "Incompatible types. Expected: Float or Int, Provided: Func<of Int => Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_InExpression2", async () => {
    const code = `${testHeader}

main
  variable f set to 1 + ref ff
end main

function ff(a as Int) returns Int
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Func<of Int => Int>.LangRef.html#TypesCompileError",
    ]);
  });
});
