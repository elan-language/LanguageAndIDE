import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Inheritance", () => {
  test("Pass_DefineAbstractClassAndInheritFromIt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.p1
  print x.p2
  print x.product()
  call x.setP1(4)
  print x.product()
end main

abstract class Foo
  abstract property p1 as Float
  abstract property p2 as Float 
  abstract procedure setP1(v as Float)
  abstract function product() returns Float
end class

class Bar inherits Foo
    constructor()
        set property.p1 to 3
        set property.p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() returns Float
        return property.p1 * property.p2
    end function

    function asString() returns String 
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  system.printLine(_stdlib.asString(x.p1));
  system.printLine(_stdlib.asString(x.p2));
  system.printLine(_stdlib.asString(x.product()));
  await x.setP1(4);
  system.printLine(_stdlib.asString(x.product()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  get p2() {
    return 0;
  }
  set p2(p2) {
  }

  setP1(v) {
  }

  product() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", 0]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = 4;
  }

  p1 = 0;

  p2 = 0;

  async setP1(p1) {
    this.p1 = p1;
  }

  product() {
    return this.p1 * this.p2;
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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test("Pass_PassAsAbstractClassIntoFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Yon()
  print f(x)
  print b(x)
end main

abstract class Foo
  abstract property p1 as Float
end class

abstract class Bar inherits Foo
  abstract property p2 as String
end class

class Yon inherits Bar
    constructor()
        set property.p1 to 3
        set property.p2 to "apple"
    end constructor
    property p1 as Float
    property p2 as String
end class

function b(bar as Bar) returns String
    return bar.p2
end function

function f(foo as Foo) returns Float
    return foo.p1
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Yon());
  system.printLine(_stdlib.asString(f(x)));
  system.printLine(_stdlib.asString(b(x)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p2", ""]]);};
  get p2() {
    return "";
  }
  set p2(p2) {
  }

  asString() {
    return "empty Abstract Class Bar";
  }
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0], ["p2", ""]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = "apple";
  }

  p1 = 0;

  p2 = "";

}

function b(bar) {
  return bar.p2;
}
global["b"] = b;

function f(foo) {
  return foo.p1;
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3apple");
  });

  test("Pass_SuperclassesCanDefineSameMember", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.p1
  print x.p2
  print x.product()
  call x.setP1(4)
  print x.product()
end main

abstract class Foo
  abstract property p1 as Float
  abstract property p2 as Float 
end class

abstract class Yon inherits Foo
  abstract property p1 as Float 
  abstract procedure setP1(v as Float)
  abstract function product() returns Float
end class

class Bar inherits Yon
    constructor()
        set property.p1 to 3
        set property.p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() returns Float
        return property.p1 * property.p2
    end function

    function asString() returns String 
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  system.printLine(_stdlib.asString(x.p1));
  system.printLine(_stdlib.asString(x.p2));
  system.printLine(_stdlib.asString(x.product()));
  await x.setP1(4);
  system.printLine(_stdlib.asString(x.product()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  get p2() {
    return 0;
  }
  set p2(p2) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  setP1(v) {
  }

  product() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", 0]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = 4;
  }

  p1 = 0;

  p2 = 0;

  async setP1(p1) {
    this.p1 = p1;
  }

  product() {
    return this.p1 * this.p2;
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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test("Pass_AbstractMutableClassAsProcedureParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Bar()
  call proc(f)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
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
  var f = system.initialise(new Bar());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
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

  test("Pass_Invariance", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable lst set to {b}
  print fun(lst)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as List<of Bar>) returns Bar
    return l[0]
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  var lst = system.list([b]);
  system.printLine(_stdlib.asString(fun(lst)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

}

function fun(l) {
  return system.safeIndex(l, 0);
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_AbstractMutableClassAsFunctionParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Bar()
  print fun(f)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(foo as Foo) returns Int
  return foo.p1
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Bar());
  system.printLine(_stdlib.asString(fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

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

  ignore_test("Pass_DefineAbstractWithPrivateMembers", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  private property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

  private function ff() returns Int
    return property.p1
  end function
end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor

  procedure testPrivate(a as Int)
    call setP1(a)
    print ff()
    print p1
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  ff() {
    return this.p1;
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  _Foo = new Foo();
  constructor() {
    this._Foo.p1 = 1;
  }

  async testPrivate(a) {
    await this._Foo.setP1(a);
    system.printLine(_stdlib.asString(this._Foo.ff()));
    system.printLine(_stdlib.asString(this._Foo.p1));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "33");
  });

  ignore_test("Pass_DefineAbstractWithPrivateMembersMultipleInheritance", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  private property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

  private function ff() returns Int
    return property.p1
  end function
end class

abstract class Yon
  private property p2 as Int

  private procedure setP2(a as Int)
    set property.p2 to a
  end procedure

  private function ff2() returns Int
    return property.p2
  end function
end class

class Bar inherits Foo, Yon
  constructor()
  end constructor

  procedure testPrivate(a as Int)
    call setP1(a)
    print ff()
    print p1
    call setP2(a + 1)
    print ff2()
    print p2
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  ff() {
    return this.p1;
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p2", 0]]);};
  p2 = 0;

  async setP2(a) {
    this.p2 = a;
  }

  ff2() {
    return this.p2;
  }

  asString() {
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  _Foo = new Foo(); _Yon = new Yon();
  constructor() {

  }

  async testPrivate(a) {
    await this._Foo.setP1(a);
    system.printLine(_stdlib.asString(this._Foo.ff()));
    system.printLine(_stdlib.asString(this._Foo.p1));
    await this._Yon.setP2(a + 1);
    system.printLine(_stdlib.asString(this._Yon.ff2()));
    system.printLine(_stdlib.asString(this._Yon.p2));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  ignore_test("Pass_DefineAbstractWithPrivateMembersIndirectInheritance", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  private property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

  private function ff() returns Int
    return property.p1
  end function
end class

abstract class Yon inherits Foo
  private property p2 as Int

  private procedure setP2(a as Int)
    set property.p2 to a
  end procedure

  private function ff2() returns Int
    return property.p2
  end function
end class

class Bar inherits Yon
  constructor()
  end constructor

  procedure testPrivate(a as Int)
    call setP1(a)
    print ff()
    print p1
    call setP2(a + 1)
    print ff2()
    print p2
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  ff() {
    return this.p1;
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p2", 0]]);};
  p2 = 0;

  async setP2(a) {
    this.p2 = a;
  }

  ff2() {
    return this.p2;
  }

  asString() {
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  _Yon = new Yon(); _Foo = new Foo();
  constructor() {

  }

  async testPrivate(a) {
    await this._Foo.setP1(a);
    system.printLine(_stdlib.asString(this._Foo.ff()));
    system.printLine(_stdlib.asString(this._Foo.p1));
    await this._Yon.setP2(a + 1);
    system.printLine(_stdlib.asString(this._Yon.ff2()));
    system.printLine(_stdlib.asString(this._Yon.p2));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  ignore_test("Pass_SetInheritedProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  private property p1 as Int
end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor

  procedure testPrivate(a as Int)
    print p1
    set property.p1 to a
    print p1
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  _Foo = new Foo();
  constructor() {
    this._Foo.p1 = 1;
  }

  async testPrivate(a) {
    system.printLine(_stdlib.asString(this._Foo.p1));
    this._Foo.p1 = a;
    system.printLine(_stdlib.asString(this._Foo.p1));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13");
  });

  test("Fail_AccessAbstractPropertyFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  abstract property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor
  
  property p1 as Int

  procedure testPrivate(a as Int)
    call setP1(a)
    print p1
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access abstract member p1 in abstract class"]);
  });

  test("Fail_AccessAbstractProcedureFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  abstract procedure setP(a as Int)

  private procedure setP1(a as Int)
    call setP(a)
  end procedure

end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor
  
  property p1 as Int

  procedure testPrivate(a as Int)
    call setP1(a)
    print p1
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access abstract member setP in abstract class"]);
  });

  test("Fail_AccessAbstractFunctionFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  abstract function ff(a as Int) returns Int

  private procedure setP1(a as Int)
    print ff(a)
  end procedure

end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor
  
  property p1 as Int

  procedure testPrivate(a as Int)
    call setP1(a)
    print p1
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access abstract member ff in abstract class"]);
  });

  test("Fail_AccessInheritedPropertyFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Yon
  private property p1 as Int
end class

abstract class Foo inherits Yon

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

end class

class Bar inherits Foo
  constructor()
  end constructor

  procedure testPrivate(a as Int)
    call setP1(a)
    print p1
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access private member p1 in abstract class"]);
  });

  test("Fail_AccessInheritedProcedureFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Yon
  private procedure setP(a as Int)
  end procedure
end class

abstract class Foo inherits Yon

  private procedure setP1(a as Int)
    call setP(a)
  end procedure

end class

class Bar inherits Foo
  constructor()
  end constructor

  procedure testPrivate(a as Int)
    call setP1(a)
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access private member setP in abstract class"]);
  });

  test("Fail_AccessInheritedFunctionFromPrivate", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.testPrivate(3)
end main

abstract class Yon
  private function ff() returns Int
    return 0
  end function
end class

abstract class Foo inherits Yon

  private function fff() returns Int
    return ff()
  end function

end class

class Bar inherits Foo
  constructor()
  end constructor

  function testPrivate(a as Int) returns Int
    return fff()
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot access private member ff in abstract class"]);
  });

  test("Fail_AbstractClassCannotInheritFromConcreteClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
end main

class Foo
    constructor()
    end constructor

    property p1 as Int
  
    property p2 as Int

    function asString() returns String 
        return ""
    end function
end class

abstract class Bar inherits Foo
    abstract property p1 as Int
    abstract property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'Foo' must be inheritable class"]);
  });

  test("Fail_MustImplementAllInheritedMethods", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Float
    abstract property p2 as Float

    abstract procedure setP1(v as Float)

    abstract function product() returns Float
end class

class Bar inherits Foo
    constructor()
      set property.p1 to 3
    end constructor

    property p1 as Float

    function asString() returns String 
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Bar must implement Foo.p2",
      "Bar must implement Foo.setP1",
      "Bar must implement Foo.product",
    ]);
  });

  test("Fail_CannotInheritFromConcreteClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

class Foo
    constructor()
    end constructor

    property p1 as Int

    property p2 as Int

end class

class Bar inherits Foo
    constructor()
    end constructor

    property p1 as Int

    property p2 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'Foo' must be inheritable class"]);
  });

  test("Fail_MustCorrectlyImplementAllInheritedMethods", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as String

    abstract procedure setP1(v as Int)

    abstract function product() returns Int
end class

class Bar inherits Foo
    constructor()
      set property.p1 to 3
    end constructor

    property p1 as Float
    property p2 as String

    procedure setP1(v as String)
    end procedure

    function product() returns String
      return ""
    end function

    function asString() returns String 
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Member 'p1' must be of type Int",
      "Member 'setP1' must be of type Procedure (Int)",
      "Member 'product' must be of type Func<of  => Int>",
    ]);
  });

  test("Fail_ImplementedMethodMustHaveSameSignature", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Float
    abstract property p2 as Float

    abstract procedure setP1(v as Float)

    abstract function product() returns Int
end class

class Bar inherits Foo
    constructor()
        set property.p1 to 3
        set property.p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() returns Float
        return property.p1 * property.p2
    end function

    function asString() returns String 
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Member 'product' must be of type Func<of  => Int>"]);
  });

  test("Fail_AbstractClassDefinesMethodBody", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as Int

    abstract procedure setP1(v as Int)
        set property.p1 to p1
    end procedure

    abstract function product() returns Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_ConcretePropertyInAbstractClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

abstract class Foo
  property p1 as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  asString() {
    return "empty Abstract Class Foo";
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Fail_MissingAbstractFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
    function product() returns Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
end main

abstract class Foo
  procedure setP1(v as Int)
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotInstantiateAbstractClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new Bar()
end main

abstract class Bar
    abstract property p1 as Int
    abstract property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must be concrete to new"]);
  });

  test("Fail_SuperClassAsFunctionParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable f set to upcast(b)
  print fun(f)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function upcast(bar as Bar) returns Foo
    return foo
end function

function fun(bar as Bar) returns Int
    return foo.p1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Argument types expected: bar (Bar) Provided: Foo"]);
  });

  test("Fail_Invariance1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable lst set to {b}
  print fun(lst)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as List<of Foo>) returns Foo
    return l.get(0)
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: l (List<of Foo>) Provided: List<of Bar>",
    ]);
  });

  test("Fail_Invariance2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable lst set to [b]
  call fun(lst)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

procedure fun(l as Array<of Foo>)
  print l[0]
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: l (Array<of Foo>) Provided: Array<of Bar>",
    ]);
  });

  test("Fail_Invariance3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable lst set to new DictionaryImmutable<of String, Bar>()
  print fun(lst)
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as DictionaryImmutable<of String, Foo>) returns Foo
    return l["id"]
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types expected: l (DictionaryImmutable<of String, Foo>) Provided: DictionaryImmutable<of String, Bar>",
    ]);
  });

  test("Fail_InheritFromNonexistentClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.p1
end main

class Bar inherits Foo
    constructor()  
    end constructor
    
    property p1 as Float
    
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Foo
  abstract property p1 as Int
end class

abstract class Foo
  abstract property p1 as Int
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

abstract class Foo
  abstract property p1 as Int
  abstract property p1 as String
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

abstract class Foo
  abstract function ff() returns Int
  abstract function ff() returns Int
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

abstract class Foo
  abstract procedure ff()
  abstract procedure ff()
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

abstract class Foo
  abstract procedure ff()
  abstract property ff as Int
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

abstract class Foo
  abstract function ff() returns Int
  abstract property ff as Int
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

abstract class Foo
  abstract function ff() returns Int
  abstract procedure ff()
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope"]);
  });

  test("Fail_DuplicatePrivateMembers1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Foo
  private property p1 as Int
end class

abstract class Yon
  private property p1 as String
end class

class Bar inherits Foo, Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate inherited ids: p1"]);
  });

  test("Fail_DuplicatePrivateMembers2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Foo
  private procedure p1()
  end procedure
end class

abstract class Yon
  private property p1 as String
end class

class Bar inherits Foo, Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate inherited ids: p1"]);
  });

  test("Fail_DuplicatePrivateMembers3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Foo
  private function p1() returns Int
    return 0
  end function
end class

abstract class Yon
  private property p1 as String
end class

class Bar inherits Foo, Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate inherited ids: p1"]);
  });

  test("Fail_DuplicatePrivateMembers4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Foo
  private function p1() returns Int
    return 0
  end function
end class

abstract class Yon inherits Foo
  private property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'p1' not unique in scope",
      "Duplicate inherited ids: p1",
    ]);
  });

  test("Fail_DuplicatePrivateMembers5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Yon
  private property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope"]);
  });

  test("Fail_DuplicatePrivateMembers6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

abstract class Yon
  private property p1 as String
  abstract property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope"]);
  });

  test("Fail_IterableSuperclass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Bar inherits Iterable<of Int>
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'Iterable' must be inheritable class"]);
  });

  test("Fail_StdLibSuperClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Bar inherits BaseVG
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'BaseVG' must be inheritable class"]);
  });

  test("Fail_UnknownSuperClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Bar inherits BaseVg
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'BaseVg' is not defined",
      "Superclass 'BaseVg' must be inheritable class",
    ]);
  });

  test("Fail_OnlyOneAbstract Class", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Yon()
end main

abstract class Foo
  abstract property p1 as Float
end class

abstract class Bar
  abstract property p2 as String
end class

class Yon inherits Foo, Bar
    constructor()
        set property.p1 to 3
        set property.p2 to "apple"
    end constructor
    property p1 as Float
    property p2 as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "There must be only one abstract superclass, Foo, Bar are abstract classes",
    ]);
  });
});
