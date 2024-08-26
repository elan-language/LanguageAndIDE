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

suite("T19_Procedures", () => {
  test("Pass_BasicOperationIncludingPrint", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [1, 2]
  var b set to {3, 4}
  var c set to ["a":true, "b":false]
  var d set to {"a":true, "b":false}
  call foo(a, b, c, d)
end main

procedure foo(x as [Int], y as {Int}, z as [String:Boolean], t as {String:Boolean})
  print x
  print y
  print z
  print t
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.immutableList([3, 4]);
  var c = system.dictionary({["a"] : true, ["b"] : false});
  var d = system.immutableDictionary({["a"] : true, ["b"] : false});
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
    await assertObjectCodeExecutes(
      fileImpl,
      "ArrayList [1, 2]ImmutableList {3, 4}Dictionary [a:true, b:false]ImmutableDictionary {a:true, b:false}",
    );
  });

  test("Pass_ExternalCall", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
  await changeFirst(a);
  system.printLine(_stdlib.asString(a));
}

async function changeFirst(a) {
  system.safeSet(a, 0, 5);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ArrayList [5, 3]");
  });

  test("Pass_WithParamsPassingLiteralsOrExpressions", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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

  test("Pass_Recursion", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call foo(3)
end main

procedure foo(a as Int)
  if a > 0
    then
      print a
      var b set to a - 1
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Foo()
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

    function asString() return String
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

    function asString() return String
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

  test("Fail_CallingUndeclaredProc", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call bar()
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["bar is not defined"]);
  });

  test("Fail_TypeSpecifiedBeforeParamName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["main is not defined"]);
  });

  test("Fail_PassingUnnecessaryParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Parameters expected: 0 got: 1"]);
  });

  test("Fail_PassingTooFewParams", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to 1
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
    assertDoesNotCompile(fileImpl, ["Parameters expected: 2 got: 1"]);
  });

  test("Fail_ExtensionParameterCount", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [1]
  call a.add()
  call a.add(1, 2)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameters expected: 1 got: 0",
      "Parameters expected: 1 got: 2",
    ]);
  });

  test("Fail_PassingWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_UnterminatedRecursion", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call print(""Hello World!"")
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterCount", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

procedure f(p as Float)
  return 0
end procedure

main
  call f(1, 2)
  call f()
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
      "Incompatible types Boolean to Int",
      "Incompatible types Float to Int",
    ]);
  });

  test("Fail_ReferenceTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to {2, 3}
  call changeAll(a)
  print a
end main

procedure changeAll(a as ImmutableList<of Int>)
    set a to {1, 2, 3}
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign parameter: a"]);
  });

  test("Fail_ArrayListParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [2, 3]
  call changeAll(a)
  print a
end main

procedure changeAll(a as ArrayList<of Int>)
    set a to [1, 2, 3]
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign parameter: a"]);
  });

  test("Fail_ValueTypeParamMayNotBeReassigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to 4
  call changeValue(a)
  print a
end main

procedure changeValue(a as Int)
    set a to 3
end procedure`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign parameter: a"]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
 
end main

procedure changeValue(a as Bar)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  
end main

procedure fun(if as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedwordAsParamName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

procedure foo()

end procedure

procedure foo()

end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name foo not unique in scope"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

procedure foo(a as Int, b as String, a as Int)

end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name a not unique in scope"]);
  });

  test("Fail_OperatorsAndProcedures", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to p1 is p2
  var b set to p1 + p2
  var c set to -p1
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
      "Incompatible types Procedure to Float or Int",
      "Incompatible types Procedure to Float or Int",
    ]);
  });

  test("Fail_ProcedureInExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to [1,2]
  set a to a.add(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Procedure to ArrayList",
      "Cannot call Procedure",
    ]);
  });
});
