import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Procedure Statement", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  print 2
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(1));
  await foo();
  system.printLine(_stdlib.asString(3));
}

async function foo() {
  system.printLine(_stdlib.asString(2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });
  test("Pass_PassingInListsUsingShortFormTypeNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1, 2]
  variable b set to {3, 4}
  variable c set to ["a":true, "b":false]
  variable d set to {"a":true, "b":false}
  call foo(a, b, c, d)
end main

procedure foo(x as Array<of Int>, y as List<of Int>, z as Dictionary<of String, Boolean>, t as DictionaryImmutable<of String, Boolean>)
  print x
  print y
  print z
  print t
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.list([3, 4]);
  var c = system.dictionary({["a"] : true, ["b"] : false});
  var d = system.dictionaryImmutable({["a"] : true, ["b"] : false});
  await foo(a, b, c, d);
}

async function foo(x, y, z, t) {
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString(t));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2]{3, 4}[a:true, b:false]{a:true, b:false}");
  });

  test("Pass_ExternalCall", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call pause(1)
  print 1
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await _stdlib.pause(1);
  system.printLine(_stdlib.asString(1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_WithParamsPassingVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 2
  variable b set to "hello"
  call foo(a, b)
end main

procedure foo(a as Float, b as String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  await foo(a, b);
}

async function foo(a, b) {
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_ReferenceTypesCanBeMutated", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [2, 3]
  call changeFirst(a)
  print a
end main

procedure changeFirst(out a as Array<of Int>)
    call a.putAt(0, 5)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([2, 3]);
  var _a = [a];
  await changeFirst(_a);
  a = _a[0];
  system.printLine(_stdlib.asString(a));
}

async function changeFirst(a) {
  _stdlib.putAt(a[0], 0, 5);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[5, 3]");
  });

  test("Pass_WithParamsPassingLiteralsOrExpressions", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  call foo(a + 1, "hello")
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  await foo(a + 1, "hello");
}

async function foo(a, b) {
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_NestedCalls", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo()
  print 3
end main

procedure foo()
  print 1
  call bar()
end procedure

procedure bar()
  print 2
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await foo();
  system.printLine(_stdlib.asString(3));
}

async function foo() {
  system.printLine(_stdlib.asString(1));
  await bar();
}

async function bar() {
  system.printLine(_stdlib.asString(2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_RepeatedCallToProcedureWithLiteralArgument", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call square(3)
  call square(5)
end main

procedure square(x as Int)
  print x * x
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await square(3);
  await square(5);
}

async function square(x) {
  system.printLine(_stdlib.asString(x * x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "925");
  });

  test("Pass_Recursion", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(3)
end main

procedure foo(a as Int)
  if a > 0 then
      print a
      variable b set to a - 1
      call foo(b)
  end if
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await foo(3);
}

async function foo(a) {
  if (a > 0) {
      system.printLine(_stdlib.asString(a));
      var b = a - 1;
      await foo(b);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "321");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureViaProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  call f.length()
end main

class Foo
    constructor()
        set property.p1 to new Bar()
    end constructor

    property p1 as Bar

    procedure length()
        call p1.length(2)
    end procedure

    function asString() returns String
         return ""
    end function

end class

class Bar
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    procedure length(plus as Float)
        print p1 + plus
    end procedure

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  await f.length();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {
    this.p1 = system.initialise(new Bar());
  }

  _p1;
  get p1() {
    return this._p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async length() {
    await this.p1.length(2);
  }

  asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  async length(plus) {
    system.printLine(_stdlib.asString(this.p1 + plus));
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_OutParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 2
  variable b set to "hello"
  call foo(a, b)
  print a
  print b
end main

procedure foo(out x as Float, out y as String)
  set x to 3
  set y to "goodbye"
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  var _a = [a]; var _b = [b];
  await foo(_a, _b);
  a = _a[0]; b = _b[0];
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

async function foo(x, y) {
  x[0] = 3;
  y[0] = "goodbye";
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3goodbye");
  });

  test("Pass_SetFromOutParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 2
  variable b set to 3
  call foo(a, b)
  print a
  print b
end main

procedure foo(out x as Float, out y as Float)
  variable c set to x
  set x to y
  set y to c
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = 3;
  var _a = [a]; var _b = [b];
  await foo(_a, _b);
  a = _a[0]; b = _b[0];
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

async function foo(x, y) {
  var c = x[0];
  x[0] = y[0];
  y[0] = c;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_NestedOutParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 2
  variable b set to 3
  call foo(a, b)
  print a
  print b
end main

procedure foo(out a as Float, out b as Float)
  call bar(a, b)
end procedure

procedure bar(out a as Float, out b as Float)
  variable c set to a
  set a to b
  set b to c
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = 3;
  var _a = [a]; var _b = [b];
  await foo(_a, _b);
  a = _a[0]; b = _b[0];
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

async function foo(a, b) {
  var _a = [a[0]]; var _b = [b[0]];
  await bar(_a, _b);
  a[0] = _a[0]; b[0] = _b[0];
}

async function bar(a, b) {
  var c = a[0];
  a[0] = b[0];
  b[0] = c;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "32");
  });

  test("Pass_CallOnOutParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Foo()
  variable b set to 0
  call foo(a, b)
  print b
end main

procedure foo(out f as Foo, out y as Int)
  call f.bar(y)
end procedure

class Foo
  constructor()
  end constructor

  procedure bar(out z as Int)
    set z to 1
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = 0;
  var _a = [a]; var _b = [b];
  await foo(_a, _b);
  a = _a[0]; b = _b[0];
  system.printLine(_stdlib.asString(b));
}

async function foo(f, y) {
  var _y = [y[0]];
  await f[0].bar(_y);
  y[0] = _y[0];
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  async bar(z) {
    z[0] = 1;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ExpressionOnOutParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Foo()
  variable b set to 100
  call foo(a, b)
  print b
end main

procedure foo(out f as Foo, out y as Int)
  set y to f.ff + y
end procedure

class Foo
  constructor()
    set property.ff to 1
  end constructor

  property ff as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = 100;
  var _a = [a]; var _b = [b];
  await foo(_a, _b);
  a = _a[0]; b = _b[0];
  system.printLine(_stdlib.asString(b));
}

async function foo(f, y) {
  y[0] = f[0].ff + y[0];
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["ff", 0]]);};
  constructor() {
    this.ff = 1;
  }

  ff = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "101");
  });

  test("Fail_CallingUndeclaredProc", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call bar()
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'bar' is not defined"]);
  });

  test("Fail_TypeSpecifiedBeforeParamName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main
    
procedure foo(Int a) 
  print a
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotCallMain", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  call main()
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'main' is not defined"]);
  });

  test("Fail_PassingUnnecessaryParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 1
  call foo(3)
  print 3
end main

procedure foo()
  print 2
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Too many argument(s). Expected: none"]);
  });

  test("Fail_PassingTooFewParams", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  call foo(a + 1)
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Missing argument(s). Expected: a (Int), b (String)"]);
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1]
  call a.append()
  call a.append(1, 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: value (Int)",
      "Too many argument(s). Expected: value (Int)",
    ]);
  });

  test("Fail_PassingWrongType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(1, 2)
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: a (Int), b (String) Provided: Int, Int",
    ]);
  });

  test("Fail_UnterminatedRecursion", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(3)
end main

procedure foo(a as Int)
  call foo(a)
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Maximum call stack size exceeded");
  });

  test("Fail_CannotCallPrintAsAProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printNoLine(""Hello World!"")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterCount", async () => {
    const code = `# FFFF Elan v1.0.0 valid

procedure f(p as Float)

end procedure

main
  call f(1, 2)
  call f()
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

procedure f(p as Int)

end procedure

main
  call f(true)
  call f(1.0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: p (Int) Provided: Boolean",
      "Argument types expected: p (Int) Provided: Float",
    ]);
  });

  test("Fail_ReferenceTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {2, 3}
  call changeAll(a)
  print a
end main

procedure changeAll(a as List<of Int>)
    set a to {1, 2, 3}
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter 'a'"]);
  });

  test("Fail_ArrayParamMayNotBeReassigned", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [2, 3]
  call changeAll(a)
  print a
end main

procedure changeAll(a as Array<of Int>)
    set a to [1, 2, 3]
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter 'a'"]);
  });

  test("Fail_ValueTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 4
  call changeValue(a)
  print a
end main

procedure changeValue(a as Int)
    set a to 3
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter 'a'"]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

procedure changeValue(a as Bar)

end procedure`;

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

procedure if(a as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

procedure break(a as Int)

end procedure`;

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

procedure fun(if as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedwordAsParamName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

procedure fun(break as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

procedure foo()

end procedure

procedure foo()

end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'foo' not unique in scope"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

procedure foo(a as Int, b as String, a as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope"]);
  });

  test("Fail_OperatorsAndProcedures", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to p1 is p2
  variable b set to p1 + p2
  variable c set to -p1
end main

procedure p1()

end procedure
procedure p2()

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot do equality operations on Procedures or Functions",
      "Incompatible types Procedure () to Float or Int",
      "Incompatible types Procedure () to Float or Int",
    ]);
  });

  test("Fail_ProcedureInExpression", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  set a to a.append(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Procedure (Array<of Generic Parameter T1>, Generic Parameter T1) to Array<of Int>",
      "Cannot call procedure 'append' within an expression",
    ]);
  });

  test("Fail_PassLiteralAsOut", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(0)
end main

procedure foo(out a as Int)
  set a to 1
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass '0' as an out parameter"]);
  });

  test("Fail_PassExpressionAsOut", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to 2
  call foo(a + b)
end main

procedure foo(out a as Int)
  set a to 1
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass 'a + b' as an out parameter"]);
  });

  test("Fail_PassLetAsOut", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be 1
  call foo(a)
end main

procedure foo(out a as Int)
  set a to 1
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass 'let a' as an out parameter"]);
  });

  test("Fail_PassFuncCall", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(bar())
end main

procedure foo(out a as Int)
  set a to 1
end procedure

function bar() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass 'bar()' as an out parameter"]);
  });

  test("Fail_PassProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  call foo(f.ff)
end main

procedure foo(out a as Int)
  set a to 1
end procedure

class Foo
  constructor()
    set property.ff to 1
  end constructor

  property ff as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass 'f.ff' as an out parameter"]);
  });

  test("Fail_PassIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to [1,2]
  call foo(f[0])
end main

procedure foo(out a as Int)
  set a to 1
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot pass 'f[0]' as an out parameter"]);
  });
});
