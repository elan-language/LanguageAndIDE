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

suite("T20_Functions", () => {
  test("Pass_SimpleCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Float, b as Float) return Float
  return a * b
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
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

  test("Pass_ReturnSimpleDefault", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Int
    return empty Int
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Foo
  return empty Foo
end function

class Foo
  constructor()
  end constructor
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print foo(3,4)
end main

function foo(a as Int, b as Int) return ArrayList<of Int>
    return empty ArrayList<of Int>
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return system.emptyArrayList();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty ArrayList");
  });

  test("Pass_Recursive", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print factorial(5)
end main

function factorial(a as Int) return Int
    var result set to 0
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
  system.print(_stdlib.asString(factorial(5)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var b set to new Bar()
  print foo(b)
end main

function foo(bar as Bar) return String
    return bar.asString()
end function

immutable class Bar
    constructor()
    end constructor

    function asString() return String
        return "bar"
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  system.print(_stdlib.asString(foo(b)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to {"a":1}

main
  var b set to a.getKey()
  var c set to a.getKey("a", 1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameters expected: 1 got: 0",
      "Parameters expected: 1 got: 2",
    ]);
  });

  test("Fail_ParameterCount", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Float) return Float
  return 0
end function

main
  var a set to f(1, 2)
  var b set to f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameters expected: 1 got: 2",
      "Parameters expected: 1 got: 0",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Int) return Float
  return 0.0
end function

main
  var a set to f(true)
  var b set to f(1.0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Boolean to Int",
      "Incompatible types Float to Int",
    ]);
  });

  test("Fail_ReturnType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Boolean) return Int
  return p
end function

main
  var a set to f(true)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to Int"]);
  });

  test("Fail_noReturnType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Int)
  return p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noAs", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p Int) return Int 
  return p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_noReturn", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p Int) return Int 
  var c set to p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnTypeIncompatible", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ""
  set a to foo(3,4)
end main

function foo(a as Int, b as Int) return Int
  var c set to a * b
  return c
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_NoReturn2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(a as Int, b as Int) return Int
  var c set to a * b
  return
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_embeddedReturns", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(a as Int, b as Int) return Boolean
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main
    
function foo(a as Int, b as Int) return Int
  return a / b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_statementAfterReturn", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main
    
function foo(a as Int, b as Int) return Int
  return a * b
  var c set to a + b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainPrint", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(a as Int, b as Int) return Int
  print a
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CanNotContainInput", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(a as Int, b as Int) return Int
  input x
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotModifyParam", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) return Int
  set a to a + 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });

  test("Fail_CannotPassInArray", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(a as ArrayList<of Int>) return Int
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["ArrayList must be immutable"]);
  });

  test("Fail_CannotPassInArrayMultipleParameters", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function foo(b as Int, a as ArrayList<of Int>) return Int
    return a[0]
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["ArrayList must be immutable"]);
  });

  test("Fail_TooManyParams", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var result set to foo(3, 4, 5)
  print result
end main

function foo(a as Int, b as Int) return Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 2 got: 3"]);
  });

  test("Fail_NotEnoughParams", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var result set to foo(3)
  print result
end main

function foo(a as Int, b as Int) return Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 2 got: 1"]);
  });

  test("Fail_WrongParamType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var result set to foo(3, "b")
  print result
end main

function foo(a as Int, b as Int) return Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_CannotSpecifyParamByRef", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var result set to foo(3, "b")
  print result
end main

function foo(ref a as Int, b as Int) return Int
    return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassMutableTypes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

function foo(a as ArrayList<of Int>, b as Dictionary<of String, Int>, c as Foo) return Int
    return 1
end function

class Foo
  constructor()

  end constructor
end class
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ArrayList must be immutable",
      "Dictionary must be immutable",
      "Foo must be immutable",
    ]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

function changeValue(a as Bar) return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar is not defined"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

function changeValue(a as Int) return Bar
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  
end main

function if(a as Int) return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' keyword may not be used as identifier"]);
  });

  test("Fail_UseOfKeywordAsParamName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  
end main

function fun(if as Int) return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' keyword may not be used as identifier"]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function foo() return Int
  return 0
end function

function foo() return Int
  return 1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name foo not unique in scope"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function foo(a as Int, b as String, a as Int) return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name a not unique in scope"]);
  });
});
