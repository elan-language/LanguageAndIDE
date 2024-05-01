import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T19_Procedures', () => {

  test('Pass_BasicOperationIncludingPrint', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  print 2
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(1));
  foo();
  system.print(_stdlib.asString(3));
}

function foo() {
  system.print(_stdlib.asString(2));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  ignore_test('Pass_GlobalProcedureOnClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var b set to new Bar()
  call b.foo()
end main

procedure foo(bar Bar)
    print bar
end procedure

class Bar
    constructor()
    end constructor

    function asString() as String
        return "bar"
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = new Bar();
  b.foo();
}

function foo(bar: Bar) {
  system.print(_stdlib.asString(bar));
}

class Bar {
  constructor() {

  }

  asString() : string {
    return "bar";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  ignore_test('Pass_ExternalCall', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  external pause(1)
  print 1
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.pause(1);
  system.print(_stdlib.asString(1));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test('Pass_WithParamsPassingVariables', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to "hello"
  call foo(a, b)
end main

procedure foo(a as Number, b as String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  foo(a, b);
}

function foo(a, b) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  ignore_test('Pass_WithParamsPassingRefVariables', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to "hello"
  call foo(a, b)
end main

procedure foo(out a Int, out b String)
    print a
    print b
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  foo(a, b);
}

function foo(a: number, b: string) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test('Pass_WithMixedRefParams', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to "hello"
  call foo(a, b)
end main

procedure foo(a Int, out b String)
    print a
    print b
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  foo(a, b);
}

function foo(a: number, b: string) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test('Pass_CallingWithDotSyntax', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to "hello"
  call a.foo(b)
end main

procedure foo(a Int, b String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  var b = "hello";
  foo(a, b);
}

function foo(a: number, b: string) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test('Pass_WithParamsPassingLiteralsOrExpressions', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  call foo(a + 1, "hello")
end main

procedure foo(a Int, b String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  foo(a + 1, "hello");
}

function foo(a: number, b: string) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  ignore_test('Pass_RefParamsCanBeUpdated', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  var b set to ""hello""
  call foo(a, b)
  print a
  print b
end main

procedure foo (out a Int, out b String)
  set a to a + 1
  set b to b + "!"
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  var b = "hello";
  foo(a, b);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}

function foo(a: number, b: string) {
  a = a + 1;
  b = b + "!";
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test('Pass_NestedCalls', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  foo();
  system.print(_stdlib.asString(3));
}

function foo() {
  system.print(_stdlib.asString(1));
  bar();
}

function bar() {
  system.print(_stdlib.asString(2));
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  ignore_test('Pass_Recursion', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(3)
end main

procedure foo(a Int)
  if a > 0
    print a
    var b set to a - 1
    call foo(b)
  end if
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  foo(3);
}

function foo(a: number) {
  if (a > 0) {
    system.print(_stdlib.asString(a));
    var b = a - 1;
    foo(b);
  }
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test('Pass_ProcedureMethodMayCallOtherClassProcedureViaProperty', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call f.length()
end main

class Foo
    constructor()
        set p1 to new Bar()
    end constructor

    property p1 as Bar

    procedure length()
        call p1.length(2)
    end procedure

    function asString() return String
         return ""
    end function

end class

class Bar
    constructor()
        set p1 to 5
    end constructor

    property p1 as Int

    procedure length(plus as Number)
        print p1 + plus
    end procedure

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  f.length();
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Bar"]]);};
  constructor() {
    this.p1 = system.initialise(new Bar());
  }

  _p1;
  get p1() {
    return this._p1 ??= Bar.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  length() {
    this.p1.length(2);
  }

  asString() {
    return "";
  }

}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  length(plus) {
    system.print(_stdlib.asString(this.p1 + plus));
  }

  asString() {
    return "";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });


















 
  ignore_test('Fail_CallingUndeclaredProc', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call bar()
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_TypeSpecifiedBeforeParamName', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main
    
procedure foo(Int a) 
  print a
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertDoesNotParse(fileImpl);
  });

  test('Fail_NoEnd', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
    print 2
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_CannotCallMain', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  call main()
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_PassingUnnecessaryParameter', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call foo(3)
  print 3
end main

procedure foo()
  print 2
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_PassingTooFewParams', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  call foo(a + 1)
end main

procedure foo (a Int, b String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_PassingWrongType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(1,2)
end main

procedure foo (a Int, b String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_InclusionOfOutInCall', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(out 1,2)
end main

procedure foo(a Int, b String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_InclusionOfRefInDefinition', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(byref 1,2)
end main

procedure foo(ref a Int, b String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_UnterminatedRecursion', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(3)
end main

procedure foo(a Int)
  call foo(a)
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_CannotCallPrintAsAProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call print(""Hello World!"")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_NonRefParamsCannotBeUpdated', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  var b set to ""hello""
  call foo(a, b)
  print a
  print b
end main

procedure foo (out a Int, b String)
  set a to a + 1
  set b to b + ""!""
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_RefKeywordMayNotBeAddedToArgument', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  var b set to ""hello""
  call foo(ref a, b)
  print a
  print b
end main

procedure foo (ref a Int, b String)
  set a to a + 1
  set b to b + ""!""
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_WithParamsPassingRefLiteral', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to ""hello""
  call foo(a, ""hello"")
end main

procedure foo(out a Int, out b String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_ParameterCount', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

procedure f(p as Number)
  return 0
end procedure

main
  call f(1, 2)
  call f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many parameters 1",
      "Missing parameter 0"
    ]);

  });

  test('Fail_ParameterType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

procedure f(p as Int)

end procedure

main
  call f(true)
  call f(1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot assign Boolean to Int ",
      "Cannot assign Number to Int "
    ]);

  });

});