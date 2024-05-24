import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite("T19_Procedures", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
  system.print(_stdlib.asString(1));
  foo();
  system.print(_stdlib.asString(3));
}

function foo() {
  system.print(_stdlib.asString(2));
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_ExternalCall", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call pause(1)
  print 1
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  _stdlib.pause(1);
  system.print(_stdlib.asString(1));
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

  test("Pass_WithParamsPassingVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  var b set to "hello"
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
  foo(a, b);
}

function foo(a, b) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_ReferenceTypesCanBeMutated", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [2, 3]
  call changeFirst(a)
  print a
end main

procedure changeFirst(a as ArrayList<of Int>)
    set a[0] to 5
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([2, 3]);
  changeFirst(a);
  system.print(_stdlib.asString(a));
}

function changeFirst(a) {
  a[0] = 5;
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
    await assertObjectCodeExecutes(fileImpl, "ArrayList [5, 3]");
  });

  test("Pass_WithParamsPassingLiteralsOrExpressions", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  call foo(a + 1, "hello")
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  foo(a + 1, "hello");
}

function foo(a, b) {
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
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
    await assertObjectCodeExecutes(fileImpl, "2hello");
  });

  test("Pass_NestedCalls", async () => {
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Pass_Recursion", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(3)
end main

procedure foo(a as Int)
  if a > 0
    print a
    var b set to a - 1
    call foo(b)
  end if
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  foo(3);
}

function foo(a) {
  if (a > 0) {
    system.print(_stdlib.asString(a));
    var b = a - 1;
    foo(b);
  }
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
    await assertObjectCodeExecutes(fileImpl, "321");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureViaProperty", async () => {
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

    property p1 as Float

    procedure length(plus as Float)
        print p1 + plus
    end procedure

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Float"]]);};
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Fail_CallingUndeclaredProc", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call bar()
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["bar is not defined"]);
  });

  test("Fail_TypeSpecifiedBeforeParamName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main
    
procedure foo(Int a) 
  print a
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertDoesNotParse(fileImpl);
  });

  ignore_test("Fail_CannotCallMain", async () => {
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "keyword 'main' cannot be used as an identifer",
    ]); //Or some broadly similar message
  });

  test("Fail_PassingUnnecessaryParameter", async () => {
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 0 got: 1"]);
  });

  test("Fail_PassingTooFewParams", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  call foo(a + 1)
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 2 got: 1"]);
  });

  test("Fail_PassingWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(1, 2)
end main

procedure foo(a as Int, b as String)
  print a
  print b
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  // not really compiler
  ignore_test("Fail_UnterminatedRecursion", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo(3)
end main

procedure foo(a Int)
  call foo(a)
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotCallPrintAsAProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call print(""Hello World!"")
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterCount", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

procedure f(p as Float)
  return 0
end procedure

main
  call f(1, 2)
  call f()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameters expected: 1 got: 2",
      "Parameters expected: 1 got: 0",
    ]);
  });

  test("Fail_ParameterType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

procedure f(p as Int)

end procedure

main
  call f(true)
  call f(1.0)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Boolean to Int",
      "Incompatible types Float to Int",
    ]);
  });

  test("Fail_ReferenceTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to {2, 3}
  call changeAll(a)
  print a
end main

procedure changeAll(a as ImmutableList<of Int>)
    set a to {1, 2, 3}
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });

  test("Fail_ArrayListParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [2, 3]
  call changeAll(a)
  print a
end main

procedure changeAll(a as ArrayList<of Int>)
    set a to [1, 2, 3]
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });

  test("Fail_ValueTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 4
  call changeValue(a)
  print a
end main

procedure changeValue(a as Int)
    set a to 3
end procedure`;

    const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });
});
