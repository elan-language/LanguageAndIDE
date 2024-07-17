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

suite("T43_Inheritance", () => {
  test("Pass_DefineAbstractClassAndInheritFromIt", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
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
  abstract function product() return Float
end class

class Bar inherits Foo
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() return Float
        return p1 * p2
    end function

    function asString() return String 
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Yon()
  print f(x)
  print b(x)
end main

abstract immutable class Foo
  abstract property p1 as Float
end class

abstract immutable class Bar
  abstract property p2 as String
end class

immutable class Yon inherits Foo, Bar
    constructor()
        set p1 to 3
        set p2 to "apple"
    end constructor
    property p1 as Float
    property p2 as String
end class

function b(bar as Bar) return String
    return bar.p2
end function

function f(foo as Foo) return Float
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

function f(foo) {
  return foo.p1;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3apple");
  });

  test("Pass_InheritFromMoreThanOneAbstractClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
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

abstract class Yon
  abstract procedure setP1(v as Float)
  abstract function product() return Float
end class

class Bar inherits Foo, Yon
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() return Float
        return p1 * p2
    end function

    function asString() return String 
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
  static emptyInstance() { return system.emptyClass(Yon, []);};
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

  test("Pass_SuperclassesCanDefineSameMember", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
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

abstract class Yon
  abstract property p1 as Float 
  abstract procedure setP1(v as Float)
  abstract function product() return Float
end class

class Bar inherits Foo, Yon
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() return Float
        return p1 * p2
    end function

    function asString() return String 
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

  test("Fail_CannotInheritFromConcreteClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
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
    assertDoesNotCompile(fileImpl, ["Superclass Foo must be abstract"]);
  });

  test("Pass_AbstractMutableClassAsProcedureParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
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
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_AbstractImmutableClassAsProcedureParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
  call proc(f)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
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
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_AbstractImmutableClassAsFunctionParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
  print fun(f)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(foo as Foo) return Int
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
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_AbstractImmutableClassAsProcedureParameter1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
  call proc(f)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

abstract immutable class Yon inherits Foo
  abstract property p1 as Int
  abstract property p2 as Int
end class

immutable class Bar inherits Yon
  constructor()
  end constructor
  property p1 as Int
  property p2 as Int
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

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0], ["p2", 0]]);};
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
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", 0]]);};
  constructor() {

  }

  p1 = 0;

  p2 = 0;

}

async function proc(foo) {
  system.printLine(_stdlib.asString(foo.p1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_AbstractImmutableClassAsFunctionParameter1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
  print fun(f)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

abstract immutable class Yon inherits Foo
  abstract property p1 as Int
  abstract property p2 as Int
end class

immutable class Bar inherits Yon
  constructor()
  end constructor
  property p1 as Int
  property p2 as Int
end class

function fun(foo as Foo) return Int
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

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0], ["p2", 0]]);};
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
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", 0]]);};
  constructor() {

  }

  p1 = 0;

  p2 = 0;

}

function fun(foo) {
  return foo.p1;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_Invariance", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var b set to new Bar()
  var lst set to {b}
  print fun(lst)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as ImmutableList<of Bar>) return Bar
    return l.get(0)
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  var lst = system.immutableList([b]);
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
  return _stdlib.get(l, 0);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_AbstractMutableClassAsFunctionParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Bar()
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

function fun(foo as Foo) return Int
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
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Fail_AbstractClassCannotInheritFromConcreteClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

class Foo
    constructor()
    end constructor

    property p1 as Int
  
    property p2 as Int

    function asString() return String 
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
    assertDoesNotCompile(fileImpl, ["Superclass Foo must be abstract"]);
  });

  test("Fail_MustImplementAllInheritedMethods", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Float
    abstract property p2 as Float

    abstract procedure setP1(v as Float)

    abstract function product() return Float
end class

class Bar inherits Foo
    constructor()
      set p1 to 3
    end constructor

    property p1 as Float

    function asString() return String 
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

  test("Fail_MustCorrectlyImplementAllInheritedMethods", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as String

    abstract procedure setP1(v as Int)

    abstract function product() return Int
end class

class Bar inherits Foo
    constructor()
      set p1 to 3
    end constructor

    property p1 as Float
    property p2 as String

    procedure setP1(v as String)
    end procedure

    function product() return String
      return ""
    end function

    function asString() return String 
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be Int",
      "Expression must be Procedure",
      "Expression must be Function",
    ]);
  });

  test("Fail_ImplementedMethodMustHaveSameSignature", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Float
    abstract property p2 as Float

    abstract procedure setP1(v as Float)

    abstract function product() return Int
end class

class Bar inherits Foo
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Float
    property p2 as Float

    procedure setP1(p1 as Float)
        set property.p1 to p1
    end procedure

    function product() return Float
        return p1 * p2
    end function

    function asString() return String 
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Function"]);
  });

  test("Fail_AbstractClassDefinesMethodBody", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as Int

    abstract procedure setP1(v as Int)
        set property.p1 to p1
    end procedure

    abstract function product() return Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main

end main

abstract class Foo
  property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    function product() return Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
end main

abstract class Foo
  procedure setP1(v as Int)
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotInstantiateAbstractClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
    var a set to new Bar()
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var b set to new Bar()
  var f set to upcast(b)
  print fun(f)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function upcast(bar as Bar) return Foo
    return foo
end function

function fun(bar as Bar) return Int
    return foo.p1
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Foo to Bar"]);
  });

  // #482
  // todo fix by resolveing all types properly in func call
  ignore_test("Fail_Invariance1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var b set to new Bar()
  var lst set to {b}
  print fun(lst)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as ImmutableList<of Foo>) return Foo
    return l.get(0)
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types ImmutableList<of Class Bar> to ImmutableList<of Class Foo>",
    ]);
  });

  // #482
  // as invariance 1
  ignore_test("Fail_Invariance2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var b set to new Bar()
  var lst set to [b]
  call fun(lst)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

procedure fun(l as ArrayList<of Foo>)
  print l[0]
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types ArrayList<of Class Bar> to ArrayList<of Class Foo>",
    ]);
  });

  // #482
  ignore_test("Fail_Invariance3", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var lst set to new ImmutableDictionary<of String, Bar>()
  print fun(lst)
end main

abstract immutable class Foo
  abstract property p1 as Int
end class

immutable class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as ImmutableDictionary<of String, Foo>) return Foo
    return l["id"]
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types ArrayList<of Class Bar> to ArrayList<of Class Foo>",
    ]);
  });

  test("Fail_InheritFromNonexistentClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var x set to new Bar()
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
    assertDoesNotCompile(fileImpl, ["Foo is not defined"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Name Foo not unique in scope"]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Name p1 not unique in scope"]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
 
end main

abstract class Foo
  abstract function ff() return Int
  abstract function ff() return Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name ff not unique in scope"]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Name ff not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    assertDoesNotCompile(fileImpl, ["Name ff not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
 
end main

abstract class Foo
  abstract function ff() return Int
  abstract property ff as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name ff not unique in scope"]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
 
end main

abstract class Foo
  abstract function ff() return Int
  abstract procedure ff()
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name ff not unique in scope"]);
  });
});
