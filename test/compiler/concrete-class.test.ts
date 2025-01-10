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

suite("Concrete Class", () => {
  test("Pass_Class_SimpleInstantiation_PropertyAccess_Methods", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.printLine(_stdlib.asString(x.p1));
  system.printLine(_stdlib.asString(x.p2));
  system.printLine(_stdlib.asString(x.asString()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ConstructorWithParm", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7, "Apple"));
  system.printLine(_stdlib.asString(x.p1));
  system.printLine(_stdlib.asString(x.p2));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor(p_1, p_2) {
    this.p1 = p_1;
    this.p2 = p_2;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test("Pass_ConstructorAsScope", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  var y = x.b;
  await y.printP1();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {
    var bar = system.initialise(new Bar());
    this.b = bar;
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
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  async printP1() {
    system.printLine(_stdlib.asString(this.p1));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ReferenceProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var bar = foo.bar;
  system.printLine(_stdlib.asString(bar.p1));
  system.printLine(_stdlib.asString(bar.p2));
  var foo2 = bar.foo;
  var bar2 = foo2.bar;
  system.printLine(_stdlib.asString(bar2.p1));
  system.printLine(_stdlib.asString(bar2.p2));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  _bar;
  get bar() {
    return this._bar ??= Bar.emptyInstance();
  }
  set bar(bar) {
    this._bar = bar;
  }

  asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", ""]]);};
  constructor() {

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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_IndexProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to new Foo()
  variable b set to foo.strArr[0]
  print b
end main

class Foo
  constructor()
    set property.strArr to ["apple", "orange", "pair"]
  end constructor

  property strArr as Array<of String>

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var b = system.safeIndex(foo.strArr, 0);
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["strArr", system.emptyArray()]]);};
  constructor() {
    this.strArr = system.literalArray(["apple", "orange", "pair"]);
  }

  strArr = system.emptyArray();

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_MutableClassAsProcedureParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

}

async function proc(foo) {
  system.printLine(_stdlib.asString(foo.p1));
}
global["proc"] = proc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_MutableClassAsFunctionParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

  async updateP1() {
    this.p1 = 0;
  }

}

function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_NoConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo

  property p1 as Int
  property p2 as String
  
  function asString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
  });

  test("Fail_InitialisePropertyInLine", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo

    property p1 as Int set to 3
    property p2 as String
   
    function asString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AttemptToModifyAPropertyDirectly", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OverloadedConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InstantiateWithoutRequiredArgs", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Missing argument(s). Expected: val (Int)"]);
  });

  test("Fail_InstantiateWithWrongArgType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: val (Int) Provided: Float"]);
  });

  test("Fail_SupplyingArgumentNotSpecified", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Too many argument(s). Expected: none"]);
  });

  test("Fail_MissingNewOnInstantiation", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingClassOnInstantiation", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined"]);
  });

  test("Fail_IncompatibleClassAsProcedureParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: bar (Bar) Provided: Foo"]);
  });

  test("Fail_IncompatibleClassAsFunctionParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: bar (Bar) Provided: Foo"]);
  });

  test("Fail_UnknownPropertyType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Bar
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'Foo' not unique in scope"]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
  property p1 as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope"]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor
  procedure ff()
  end procedure
  property ff as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_ConstructorWithCall", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UnnecessaryGenericParm1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo<of String>()
end main

class Foo
    constructor()
    end constructor
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> expected: 0 got: 1"]);
  });

  test("Fail_UnnecessaryGenericParm2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new BlockGraphics<of String>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> expected: 0 got: 1"]);
  });

  test("Fail_CannotNewUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new FooBar()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'FooBar' is not defined", "Cannot new FooBar"]);
  });

  test("Fail_CannotNewNonClassType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Int()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot new Int"]);
  });

  test("Fail_PropertyIsNotDefined", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
    constructor()
    end constructor

    property vg as VectorGraphics

    procedure bar()
      set property.vg to property.vg.noSuch
    end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'noSuch' is not defined for type 'VectorGraphics'"]);
  });
});
