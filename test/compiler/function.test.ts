import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("Function", () => {
  test("Pass_SimpleCase", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo(3,4)
end main

function foo(a as Float, b as Float) returns Float
  return a * b
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return a * b;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_IndexResult", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to foo(1,2)[0]
  print a
end main

function foo(a as Int, b as Int) returns [Int]
  return [a, b]
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.safeIndex(foo(1, 2), 0);
  system.printLine(_stdlib.asString(a));
}

function foo(a, b) {
  return system.literalArray([a, b]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_RangeResult", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to foo(1,2)[0..1]
  print a
end main

function foo(a as Int, b as Int) returns [Int]
  return [a, b]
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.array(foo(1, 2).slice(0, 1));
  system.printLine(_stdlib.asString(a));
}

function foo(a, b) {
  return system.literalArray([a, b]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Pass_ReturnSimpleDefault", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) returns Int
    return empty Int
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return 0;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ReturnClassDefault", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return Foo.emptyInstance();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_ReturnCollectionDefault", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    print foo(3,4)
end main

function foo(a as Int, b as Int) returns Array<of Int>
    return empty Array<of Int>
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return system.emptyArray();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_Recursive", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print factorial(5)
end main

function factorial(a as Int) returns Int
    variable result set to 0
    if a > 2
      then
        set result to a * factorial(a - 1)
      else 
        set result to a
    end if
    return result
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(factorial(5)));
}

function factorial(a) {
  var result = 0;
  if (a > 2) {
      result = a * factorial(a - 1);
    } else {
      result = a;
  }
  return result;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "120");
  });

  test("Pass_GlobalFunctionOnClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  system.printLine(_stdlib.asString(foo(b)));
}

function foo(bar) {
  return bar.asString();
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  constructor() {

  }

  asString() {
    return "bar";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {"a":1}

main
  variable b set to a.withPutAtKey()
  variable c set to a.withPutAtKey("a", 1, 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: key (String), value (Int)",
      "Too many argument(s). Expected: key (String), value (Int)",
    ]);
  });

  test("Fail_ParameterCount", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p as Float) returns Float
  return 0
end function

main
  variable a set to f(1, 2)
  variable b set to f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: p (Float)",
      "Missing argument(s). Expected: p (Float)",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p as Int) returns Float
  return 0.0
end function

main
  variable a set to f(true)
  variable b set to f(1.0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: p (Int) Provided: Boolean",
      "Argument types expected: p (Int) Provided: Float",
    ]);
  });

  test("Fail_ReturnType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p as Boolean) returns Int
  return p
end function

main
  variable a set to f(true)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to Int"]);
  });

  test("Fail_noReturnType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p as Int)
  return p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noAs", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p Int) returns Int 
  return p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noReturn", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function f(p Int) returns Int 
  variable c set to p
end function

main
  variable a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnTypeIncompatible", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ""
  set a to foo(3,4)
end main

function foo(a as Int, b as Int) returns Int
  variable c set to a * b
  return c
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_NoReturn2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(a as Int, b as Int) returns Int
  variable c set to a * b
  return
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_embeddedReturns", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(a as Int, b as Int) returns Boolean
    if 2 > 1
        return true
    else
        return false
    end if
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_nonMatchingReturn2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main
    
function foo(a as Int, b as Int) returns Int
  return a / b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_statementAfterReturn", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main
    
function foo(a as Int, b as Int) returns Int
  return a * b
  variable c set to a + b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainPrint", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(a as Int, b as Int) returns Int
  print a
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainInput", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(a as Int, b as Int) returns Int
  input x
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotModifyParam", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  set a to 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter 'a'"]);
  });

  test("Fail_CannotModifyParam1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  set a to a + 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter 'a'"]);
  });

  test("Fail_CannotUpdateArray", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(a as Array<of Int>) returns Int
    call a.putAt(0, 1)
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotPassInArrayMultipleParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

function foo(b as Int, a as Array<of Int>) returns Int
    call a.setAt(0, 0)
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TooManyParams", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3, 4, 5)
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Too many argument(s). Expected: a (Int), b (Int)"]);
  });

  test("Fail_NotEnoughParams", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3)
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Missing argument(s). Expected: a (Int), b (Int)"]);
  });

  test("Fail_WrongParamType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3, "b")
  print result
end main

function foo(a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: a (Int), b (Int) Provided: Int, String",
    ]);
  });

  test("Fail_CannotSpecifyParamByRef", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3, "b")
  print result
end main

function foo(ref a as Int, b as Int) returns Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassMutableTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as Array<of Int>, b as Dictionary<of String, Int>, c as Foo) returns Int
  call b.setAtKey("key", 1)
  return 1
end function

class Foo
  constructor()

  end constructor
end class
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function changeValue(a as Bar) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function changeValue(a as Int) returns Bar
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

function if(a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

function break(a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

function fun(if as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedWordAsParamName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

function fun(break as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function foo() returns Int
  return 0
end function

function foo() returns Int
  return 1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'foo' not unique in scope"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function foo(a as Int, b as String, a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope"]);
  });

  test("Fail_OutOnParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

function foo(out a as Int) returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'out' parameters are only supported on procedures."]);
  });

  test("Fail_OperatorsAndProceduresWithFunctionKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ref p1 is ref p2
  variable b set to ref p1 + ref p2
  variable c set to - ref p1
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot do equality operations on Procedures or Functions",
      "Incompatible types Func<of  => Int> to Float or Int",
      "Incompatible types Func<of  => Int> to Float or Int",
    ]);
  });

  test("Fail_OperatorsAndProcedures", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to p1 is p2
  variable b set to p1 + p2
  variable c set to -p1
end main

function p1() returns Int
  return 0
end function
function p2() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot do equality operations on Procedures or Functions",
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'",
      "To evaluate function 'p2' add brackets. Or to create a reference to 'p2', precede it by 'ref'",
      "Incompatible types Func<of  => Int> to Float or Int",
      "Incompatible types Func<of  => Int> to Float or Int",
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'",
      "To evaluate function 'p2' add brackets. Or to create a reference to 'p2', precede it by 'ref'",
      "To evaluate function 'p1' add brackets. Or to create a reference to 'p1', precede it by 'ref'",
    ]);
  });

  test("Fail_FunctionWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print a.b
end main

function a() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'a' add brackets. Or to create a reference to 'a', precede it by 'ref'",
    ]);
  });

  test("Fail_FunctionMethodWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let g be new BlockGraphics()
  let g2 be g.withBlock
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'withBlock' add brackets. Or to create a reference to 'withBlock', precede it by 'ref'",
    ]);
  });

  test("Fail_LibFunctionWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print abs.b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'abs' add brackets. Or to create a reference to 'abs', precede it by 'ref'",
    ]);
  });

  test("Fail_PrintLibFunctionWithoutRefKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print abs
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'abs' add brackets. Or to create a reference to 'abs', precede it by 'ref'",
    ]);
  });

  test("Fail_NoIndexing", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to p1()
  variable b set to p2()
end main

function p1() returns Int
  variable a set to [1, 2]
  set a[0] to 2
  return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
