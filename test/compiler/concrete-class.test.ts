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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Concrete Class", () => {
  test("Pass_Class_SimpleInstantiation_PropertyAccess_Methods", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  print x.p1
  print x.p2
  print x.asString()
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Float

  property p2 as String

  function asString() returns String
        return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await system.printLine(x.p1);
  await system.printLine(x.p2);
  await system.printLine((await x.asString()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  p2 = "";

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ConstructorWithParm", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7, "Apple")
  print x.p1
  print x.p2
end main

class Foo
    constructor(p_1 as Float,  p_2 as String)
        set property.p1 to p_1
        set property.p2 to p_2
    end constructor

    property p1 as Float
    property p2 as String
    function asString() returns String
        return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  await system.printLine(x.p1);
  await system.printLine(x.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p_1, p_2) {
    this.p1 = p_1;
    this.p2 = p_2;
    return this;
  }

  p1 = 0;

  p2 = "";

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test("Pass_ConstructorAsScope", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  variable y set to x.b
  call y.printP1()
end main

class Foo
    constructor()
      variable bar set to new Bar()
      set property.b to bar
    end constructor

    property b as Bar 

end class

class Bar
    constructor()
      set property.p1 to 5
    end constructor

    property p1 as Int

    procedure printP1()
      print property.p1
    end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  let y = x.b;
  await y.printP1();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    let bar = system.initialise(await new Bar()._initialise());
    this.b = bar;
    return this;
  }

  _b;
  get b() {
    return this._b ??= Bar.emptyInstance();
  }
  set b(b) {
    this._b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async printP1() {
    await system.printLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ReferenceProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable bar set to foo.bar
  print bar.p1
  print bar.p2
  variable foo2 set to bar.foo
  variable bar2 set to foo2.bar
  print bar2.p1
  print bar2.p2
end main

class Foo
  constructor()
  end constructor

  property bar as Bar

  function asString() returns String
        return ""
  end function

end class

class Bar
  constructor()
  end constructor

  property p1 as Int

  property p2 as String

  property foo as Foo

  function asString() returns String
        return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let bar = foo.bar;
  await system.printLine(bar.p1);
  await system.printLine(bar.p2);
  let foo2 = bar.foo;
  let bar2 = foo2.bar;
  await system.printLine(bar2.p1);
  await system.printLine(bar2.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  _bar;
  get bar() {
    return this._bar ??= Bar.emptyInstance();
  }
  set bar(bar) {
    this._bar = bar;
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", ""]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

  p2 = "";

  _foo;
  get foo() {
    return this._foo ??= Foo.emptyInstance();
  }
  set foo(foo) {
    this._foo = foo;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_IndexProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable b set to foo.strArr[0]
  print b
end main

class Foo
  constructor()
    set property.strArr to ["apple", "orange", "pair"]
  end constructor

  property strArr as List<of String>

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let b = system.safeIndex(foo.strArr, 0);
  await system.printLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["strArr", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.strArr = system.list(["apple", "orange", "pair"]);
    return this;
  }

  strArr = system.initialise(_stdlib.List.emptyInstance());

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_MutableClassAsProcedureParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call proc(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

procedure proc(foo as Foo)
    print foo.p1
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

}

async function proc(foo) {
  await system.printLine(foo.p1);
}
global["proc"] = proc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_MutableClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print fun(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int

  procedure updateP1()
    set property.p1 to 0
  end procedure
end class

function fun(foo as Foo) returns Int
    return foo.p1
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine((await global.fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

  async updateP1() {
    this.p1 = 0;
  }

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_NoConstructor", async () => {
    const code = `${testHeader}

class Foo

  property p1 as Int
  property p2 as String
  
  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
  });

  test("Pass_ConstructorWithFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.p1
end main

class Foo
  constructor()
    set property.p1 to ff()
  end constructor

  property p1 as Int

  function ff() returns Int
    return 0
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = (await this.ff());
    return this;
  }

  p1 = 0;

  async ff() {
    return 0;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ProcedureNameMatchesCalledProcedureName", async () => {
    const code = `${testHeader}

main
  let f be new Foo()
  call f.append()
end main

class Foo
  property p1 as List<of Int>

  procedure append()
    call property.p1.append(1)
    print property.p1
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const f = system.initialise(await new Foo()._initialise());
  await f.append();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", system.initialise(_stdlib.List.emptyInstance())]]);};
  async _initialise() { return this; }
  p1 = system.initialise(_stdlib.List.emptyInstance());

  async append() {
    this.p1.append(1);
    await system.printLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Fail_InitialisePropertyInLine", async () => {
    const code = `${testHeader}

class Foo

    property p1 as Int set to 3
    property p2 as String
   
    function asString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AttemptToModifyAPropertyDirectly", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  set x.p1 to 3
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function asString() returns String
      return ""
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OverloadedConstructor", async () => {
    const code = `${testHeader}

class Foo
  constructor()
  end constructor

  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InstantiateWithoutRequiredArgs", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
end main

class Foo
  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: val (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_InstantiateWithWrongArgType", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7.1)
end main

class Foo
  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: val (Int), Provided: Float.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SupplyingArgumentNotSpecified", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7)
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingNewOnInstantiation", async () => {
    const code = `${testHeader}

main
  variable x set to Foo()
  print x.p1
  print x.p2
  print x.asString()
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Int

  property p2 as String

  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingClassOnInstantiation", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_IncompatibleClassAsProcedureParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call proc(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  property p1 as Int
end class

procedure proc(bar as Bar)
    print bar.p1
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: bar (Bar), Provided: Foo.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IncompatibleClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print fun(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  property p1 as Int
end class

function fun(bar as Bar) returns Int
    return bar.p1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: bar (Bar), Provided: Foo.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnknownPropertyType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Bar
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Foo
  constructor()
  end constructor
  property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'Foo' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
  property p1 as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  function ff() returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  procedure ff()
  end procedure
  procedure ff()
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  procedure ff()
  end procedure
  property ff as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  property ff as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  procedure ff()
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_ConstructorWithCall", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  print x.b
end main

class Foo
    constructor()
      call setP1(5)
    end constructor

    procedure setP1(a as Int)
      set property.b to a
    end procedure
    
    property b as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UnnecessaryGenericParm1", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo<of String>()
end main

class Foo
    constructor()
    end constructor
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "<of Type> was not expected here.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_UnnecessaryGenericParm2", async () => {
    const code = `${testHeader}

main
  variable x set to new Random<of String>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "<of Type> was not expected here.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_CannotNewUnknownType", async () => {
    const code = `${testHeader}

main
  variable x set to new FooBar()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'FooBar' is not defined. Click for more info.LangRef.html#compile_error",
      "'FooBar' is not defined. Click for more info.LangRef.html#compile_error",
      "Cannot new FooBar. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotNewNonClassType", async () => {
    const code = `${testHeader}

main
  variable x set to new Int()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot new Int.LangRef.html#compile_error"]);
  });

  test("Fail_PropertyIsNotDefined", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
    constructor()
    end constructor

    property vg as CircleVG

    procedure bar()
      set property.vg to property.vg.noSuch
    end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'noSuch' is not defined for type 'CircleVG'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Foo
  property prop as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Foo' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Yon inherits Foo
  property prop as Int
end class

class Bar inherits Yon
  property prop as Int
end class

class Foo inherits Bar
  property prop as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Yon' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritInterfaceIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Bar
  property prop as Int
end class

interface Yon inherits Bar
  abstract property prop as Int
end interface

interface Bar inherits Yon
  abstract property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Bar' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritAbstractClassIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Bar
  property prop as Int
end class

abstract class Yon inherits Bar
  abstract property prop as Int
end class

abstract class Bar inherits Yon
  abstract property prop as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Bar' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CallConstructor", async () => {
    const code = `${testHeader}

main
  let f be new Foo()
  call f.constructor()
end main

class Foo
  constructor()
  end constructor
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'constructor' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });
});
