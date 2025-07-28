import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Function", () => {
  test("Pass_SimpleCase", async () => {
    const code = `${testHeader}

main
  print foo(3,4)
end main

function foo(a as Float, b as Float) returns Float
  return a * b
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return a * b;
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_IndexResult", async () => {
    const code = `${testHeader}

main
  variable a set to foo(1,2)[0]
  print a
end main

function foo(a as Int, b as Int) returns List<of Int>
  return [a, b]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.safeIndex((await global.foo(1, 2)), 0);
  await system.printLine(a);
}

async function foo(a, b) {
  return system.list([a, b]);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_RangeResult", async () => {
    const code = `${testHeader}

main
  variable a set to foo(1,2)[0..1]
  print a
end main

function foo(a as Int, b as Int) returns List<of Int>
  return [a, b]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.safeSlice((await global.foo(1, 2)), 0, 1);
  await system.printLine(a);
}

async function foo(a, b) {
  return system.list([a, b]);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Pass_ReturnSimpleDefault", async () => {
    const code = `${testHeader}

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) returns Int
    return empty Int
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return 0;
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ReturnClassDefault", async () => {
    const code = `${testHeader}

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) returns Foo
  return empty Foo
end function

class Foo
  constructor()
  end constructor
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return Foo.emptyInstance();
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_ReturnCollectionDefault", async () => {
    const code = `${testHeader}

main
    print foo(3,4)
end main

function foo(a as Int, b as Int) returns List<of Int>
    return empty List<of Int>
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.foo(3, 4)));
}

async function foo(a, b) {
  return system.initialise(_stdlib.List.emptyInstance());
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_Recursive", async () => {
    const code = `${testHeader}

main
  print factorial(5)
end main

function factorial(a as Int) returns Int
    variable result set to 0
    if a > 2 then
        set result to a * factorial(a - 1)
      else 
        set result to a
    end if
    return result
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.factorial(5)));
}

async function factorial(a) {
  let result = 0;
  if (a > 2) {
    result = a * (await global.factorial(a - 1));
  } else {
    result = a;
  }
  return result;
}
global["factorial"] = factorial;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "120");
  });

  test("Pass_GlobalFunctionOnClass", async () => {
    const code = `${testHeader}

main
  variable b set to new Bar()
  print foo(b)
end main

function foo(bar as Bar) returns String
    return bar.asString()
end function

class Bar
    constructor()
    end constructor

    function asString() returns String
        return "bar"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  await system.printLine((await global.foo(b)));
}

async function foo(bar) {
  return (await bar.asString());
}
global["foo"] = foo;

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async asString() {
    return "bar";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `${testHeader}

constant a set to ""

main
  variable b set to a.contains()
  variable c set to a.contains("a", 1, 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: item (String).LangRef.html#compile_error",
      "Too many argument(s). Expected: item (String).LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterCount", async () => {
    const code = `${testHeader}

function f(p as Float) returns Float
  return 0
end function

main
  variable a set to f(1, 2)
  variable b set to f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: p (Float).LangRef.html#compile_error",
      "Missing argument(s). Expected: p (Float).LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `${testHeader}

function f(p as Int) returns Float
  return 0.0
end function

main
  variable a set to f(true)
  variable b set to f(1.0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: p (Int), Provided: Boolean.LangRef.html#compile_error",
      "Argument types. Expected: p (Int), Provided: Float.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnType", async () => {
    const code = `${testHeader}

function f(p as Boolean) returns Int
  return p
end function

main
  variable a set to f(true)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Boolean.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_noReturnType", async () => {
    const code = `${testHeader}

function f(p as Int)
  return p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noAs", async () => {
    const code = `${testHeader}

function f(p Int) returns Int 
  return p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noReturn", async () => {
    const code = `${testHeader}

function f(p Int) returns Int 
  variable c set to p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnTypeIncompatible", async () => {
    const code = `${testHeader}

main
  variable a set to ""
  set a to foo(3,4)
end main

function foo(a as Int, b as Int) returns Int
  variable c set to a * b
  return c
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_NoReturn2", async () => {
    const code = `${testHeader}

main
end main

function foo(a as Int, b as Int) returns Int
  variable c set to a * b
  return
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_embeddedReturns", async () => {
    const code = `${testHeader}

main
end main

function foo(a as Int, b as Int) returns Boolean
    if 2 > 1
        return true
  else
        return false
    end if
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_nonMatchingReturn2", async () => {
    const code = `${testHeader}

main
end main
    
function foo(a as Int, b as Int) returns Int
  return a / b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_statementAfterReturn", async () => {
    const code = `${testHeader}

main
end main
    
function foo(a as Int, b as Int) returns Int
  return a * b
  variable c set to a + b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainPrint", async () => {
    const code = `${testHeader}

main
end main

function foo(a as Int, b as Int) returns Int
  print a
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainInput", async () => {
    const code = `${testHeader}

main
end main

function foo(a as Int, b as Int) returns Int
  input x
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotModifyParam", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  set a to 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the parameter 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotModifyParam1", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  set a to a + 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the parameter 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotUpdateList", async () => {
    const code = `${testHeader}

main
end main

function foo(a as List<of Int>) returns Int
    call a.put(0, 1)
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPassInListMultipleParameters", async () => {
    const code = `${testHeader}

main
end main

function foo(b as Int, a as List<of Int>) returns Int
    call a.setAt(0, 0)
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TooManyParams", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3, 4, 5)
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: a (Int), b (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotEnoughParams", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3)
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: a (Int), b (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_WrongParamType", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3, "b")
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: a (Int), b (Int), Provided: Int, String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotSpecifyParamByRef", async () => {
    const code = `${testHeader}

main
  variable result set to foo(3, "b")
  print result
end main

function foo(ref a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassMutableTypes", async () => {
    const code = `${testHeader}

main
 
end main

function foo(a as List<of Int>, b as Dictionary<of String, Int>, c as Foo) returns Int
  call b.setAtKey("key", 1)
  return 1
end function

class Foo
  constructor()

  end constructor
end class
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

function changeValue(a as Bar) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

function changeValue(a as Int) returns Bar
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
  
end main

function if(a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testHeader}

main
  
end main

function break(a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `${testHeader}

main
  
end main

function fun(if as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedWordAsParamName", async () => {
    const code = `${testHeader}

main
  
end main

function fun(break as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `${testHeader}

function foo() returns Int
  return 0
end function

function foo() returns Int
  return 1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'foo' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testHeader}

function foo(a as Int, b as String, a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_OutOnParameter", async () => {
    const code = `${testHeader}

function foo(out a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'out' parameters are only supported on procedures.LangRef.html#compile_error",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword1", async () => {
    const code = `${testHeader}

main
  variable a set to ref p1 is ref p2
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword2", async () => {
    const code = `${testHeader}

main
  variable b set to ref p1 + ref p2
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Func<of  => Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword3", async () => {
    const code = `${testHeader}

main
  variable c set to - ref p1
end main

function p1() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Func<of  => Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword4", async () => {
    const code = `${testHeader}

main
  variable d set to ref p1
  set d to ref p3
end main

function p1() returns Int
  return 0
end function
function p3(a as Int) returns Float
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'd' add brackets. Or to create a reference to 'd', precede it by 'ref'.LangRef.html#compile_error",
      "Incompatible types. Expected: Func<of  => Int>, Provided: Func<of Int => Float>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProcedures1", async () => {
    const code = `${testHeader}

main
  variable a set to p1 is p2
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'.LangRef.html#compile_error",
      "To evaluate function 'p2' add brackets. Or to create a reference to 'p2', precede it by 'ref'.LangRef.html#compile_error",
      "Cannot do equality operations on Procedures or Functions.LangRef.html#CannotCompareProcFunc",
    ]);
  });

  test("Fail_OperatorsAndProcedures2", async () => {
    const code = `${testHeader}

main
  variable b set to p1 + p2
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'.LangRef.html#compile_error",
      "To evaluate function 'p2' add brackets. Or to create a reference to 'p2', precede it by 'ref'.LangRef.html#compile_error",
      "Incompatible types. Expected: Float or Int, Provided: Func<of  => Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_OperatorsAndProcedures3", async () => {
    const code = `${testHeader}

main
  variable c set to -p1
end main

function p1() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'.LangRef.html#compile_error",
      "Incompatible types. Expected: Float or Int, Provided: Func<of  => Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_FunctionWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  print a.b
end main

function a() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'a' add brackets. Or to create a reference to 'a', precede it by 'ref'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  let g be "xxx"
  let g2 be g.length
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'length' add brackets.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LibFunctionWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  print abs.b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'abs' add brackets.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrintLibFunctionWithoutRefKeyword", async () => {
    const code = `${testHeader}

main
  print abs
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'abs' add brackets.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NoIndexing", async () => {
    const code = `${testHeader}

main
  variable a set to p1()
  variable b set to p2()
end main

function p1() returns Int
  variable a set to [1, 2]
  set a[0] to 2
  return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnListOfMutableType", async () => {
    const code = `${testHeader}

function p1() returns ListImmutable<of List<of Int>>
  return p1()
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterListOfMutableType", async () => {
    const code = `${testHeader}

function p1(a as ListImmutable<of List<of Int>>) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension1", async () => {
    const code = `${testHeader}

main
  let s be "hello"
  let s1 be s.asBinary()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'asBinary' is not defined for type 'String'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_noMatchingExtension2", async () => {
    const code = `${testHeader}

main
  let s be "hello"
  let s1 be s.reverse()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'reverse' is not defined for type 'String'.LangRef.html#compile_error",
    ]);
  });
});
