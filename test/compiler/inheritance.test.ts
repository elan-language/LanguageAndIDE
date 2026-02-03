import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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

suite("Inheritance", () => {
  test("Pass_DefineAbstractClassAndInheritFromIt", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.product())
  call x.setP1(4)
  call printNoLine(x.product())
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
  await _stdlib.printNoLine((await x.product()));
  await x.setP1(4);
  await _stdlib.printNoLine((await x.product()));
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

  async product() {
    return 0;
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", 0]]);};

  async _initialise() {
    this.p1 = 3;
    this.p2 = 4;
    return this;
  }

  p1 = 0;

  p2 = 0;

  async setP1(p1) {
    this.p1 = p1;
  }

  async product() {
    return this.p1 * this.p2;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test("Pass_PassAsAbstractClassIntoFunction", async () => {
    const code = `${testHeader}

main
  variable x set to new Yon()
  call printNoLine(f(x))
  call printNoLine(b(x))
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Yon()._initialise());
  await _stdlib.printNoLine((await global.f(x)));
  await _stdlib.printNoLine((await global.b(x)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p2", ""]]);};
  get p2() {
    return "";
  }
  set p2(p2) {
  }

}

class Yon extends Bar {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p1 = 3;
    this.p2 = "apple";
    return this;
  }

  p1 = 0;

  p2 = "";

}

async function b(bar) {
  return bar.p2;
}
global["b"] = b;

async function f(foo) {
  return foo.p1;
}
global["f"] = f;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3apple");
  });

  test("Pass_AbstractMutableClassAsProcedureParameter", async () => {
    const code = `${testHeader}

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
    call printNoLine(foo.p1)
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Bar()._initialise());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

}

async function proc(foo) {
  await _stdlib.printNoLine(foo.p1);
}
global["proc"] = proc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_Invariance", async () => {
    const code = `${testHeader}

main
  variable b set to new Bar()
  variable lst set to [b]
  call printNoLine(fun(lst))
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  let lst = system.list([b]);
  await _stdlib.printNoLine((await global.fun(lst)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

}

async function fun(l) {
  return system.safeIndex(l, 0);
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_AbstractMutableClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Bar()
  call printNoLine(fun(f))
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await global.fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_DefineAbstractWithPrivateMembers", async () => {
    const code = `${testHeader}

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
    call printNoLine(ff())
    call printNoLine(property.p1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  async ff() {
    return this.p1;
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine((await this.ff()));
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "33");
  });

  test("Pass_DefineAbstractWithPrivateMembersMultipleInheritance", async () => {
    const code = `${testHeader}

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
    call printNoLine(ff())
    call printNoLine(property.p1)
    call setP2(a + 1)
    call printNoLine(ff2())
    call printNoLine(property.p2)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  async ff() {
    return this.p1;
  }

}

class Yon extends Foo {
  static emptyInstance() { return system.emptyClass(Yon, [["p2", 0]]);};
  p2 = 0;

  async setP2(a) {
    this.p2 = a;
  }

  async ff2() {
    return this.p2;
  }

}

class Bar extends Yon {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine((await this.ff()));
    await _stdlib.printNoLine(this.p1);
    await this.setP2(a + 1);
    await _stdlib.printNoLine((await this.ff2()));
    await _stdlib.printNoLine(this.p2);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  test("Pass_DefineAbstractWithPrivateMembersIndirectInheritance", async () => {
    const code = `${testHeader}

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
    call printNoLine(ff())
    call printNoLine(property.p1)
    call setP2(a + 1)
    call printNoLine(ff2())
    call printNoLine(property.p2)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  async ff() {
    return this.p1;
  }

}

class Yon extends Foo {
  static emptyInstance() { return system.emptyClass(Yon, [["p2", 0]]);};
  p2 = 0;

  async setP2(a) {
    this.p2 = a;
  }

  async ff2() {
    return this.p2;
  }

}

class Bar extends Yon {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine((await this.ff()));
    await _stdlib.printNoLine(this.p1);
    await this.setP2(a + 1);
    await _stdlib.printNoLine((await this.ff2()));
    await _stdlib.printNoLine(this.p2);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  test("Pass_SetInheritedProperty", async () => {
    const code = `${testHeader}

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
    call printNoLine(property.p1)
    set property.p1 to a
    call printNoLine(property.p1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  async testPrivate(a) {
    await _stdlib.printNoLine(this.p1);
    this.p1 = a;
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13");
  });

  test("Pass_AccessAbstractPropertyFromPrivate", async () => {
    const code = `${testHeader}

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
    call printNoLine(property.p1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  async setP1(a) {
    this.p1 = a;
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_AccessAbstractProcedureFromPrivate", async () => {
    const code = `${testHeader}

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
    call printNoLine(property.p1)
  end procedure

  procedure setP(a as Int)
    set property.p1 to a
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  setP(a) {
  }

  async setP1(a) {
    await this.setP(a);
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine(this.p1);
  }

  async setP(a) {
    this.p1 = a;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_AccessAbstractFunctionFromPrivate", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call x.testPrivate(3)
end main

abstract class Foo
  abstract function ff(a as Int) returns Int

  private procedure setP1(a as Int)
    call printNoLine(ff(a))
  end procedure

end class

class Bar inherits Foo
  constructor()
    set property.p1 to 1
  end constructor
  
  property p1 as Int

  procedure testPrivate(a as Int)
    call setP1(a)
    call printNoLine(property.p1)
  end procedure

  function ff(a as Int) returns Int
    return a
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async ff(a) {
    return 0;
  }

  async setP1(a) {
    await _stdlib.printNoLine((await this.ff(a)));
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine(this.p1);
  }

  async ff(a) {
    return a;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "31");
  });

  test("Pass_AccessInheritedPropertyFromPrivate", async () => {
    const code = `${testHeader}

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
    call printNoLine(property.p1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p1", 0]]);};
  p1 = 0;

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async setP1(a) {
    this.p1 = a;
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_AccessInheritedProcedureFromPrivate", async () => {
    const code = `${testHeader}

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.testPrivate(3);
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async setP(a) {

  }

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async setP1(a) {
    await this.setP(a);
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async testPrivate(a) {
    await this.setP1(a);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_AccessInheritedFunctionFromPrivate", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.testPrivate(3))
end main

abstract class Yon
  private function ff() returns Int
    return 6
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await x.testPrivate(3)));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 6;
  }

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async fff() {
    return (await this.ff());
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async testPrivate(a) {
    return (await this.fff());
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_InheritImplementation", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.ff())
end main

interface Yon
  abstract function ff() returns Int
end interface

abstract class Foo

  function ff() returns Int
    return property.prop
  end function

  abstract property prop as Int
end class

class Bar inherits Foo, Yon
  constructor()
    set property.prop to 3
  end constructor

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
  }

  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  prop = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_InheritImplementation1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.ff())
end main

interface Yon
  abstract function ff() returns Int
end interface

abstract class Foo inherits Yon

  function ff() returns Int
    return property.prop
  end function

  abstract property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
  }

  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  prop = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_InheritImplementation2", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.ff())
end main

interface Yon
  abstract function ff() returns Int
end interface

abstract class Foo inherits Yon

  function ff() returns Int
    return property.prop
  end function

  abstract property prop as Int
end class

class Bar inherits Foo, Yon
  constructor()
    set property.prop to 3
  end constructor

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
  }

  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  prop = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Fail_AbstractClassCannotInheritFromConcreteClass", async () => {
    const code = `${testHeader}

main
end main

class Foo
    constructor()
    end constructor

    function asString() returns String 
        return ""
    end function
end class

abstract class Bar inherits Foo
    abstract property p1 as Int
    abstract property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Superclass 'Foo' must be inheritable class.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MustImplementAllInheritedMethods", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Bar must implement Foo.p2.LangRef.html#compile_error",
      "Bar must implement Foo.setP1.LangRef.html#compile_error",
      "Bar must implement Foo.product.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotInheritFromConcreteClass", async () => {
    const code = `${testHeader}

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

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Superclass 'Foo' must be inheritable class.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MustCorrectlyImplementAllInheritedMethods", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Member 'p1' must be of type Int.LangRef.html#MemberTypeCompileError",
      "Member 'setP1' must be of type Procedure (Int).LangRef.html#MemberTypeCompileError",
      "Member 'product' must be of type Func<of  => Int>.LangRef.html#MemberTypeCompileError",
    ]);
  });

  test("Fail_ImplementedMethodMustHaveSameSignature", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Member 'product' must be of type Func<of  => Int>.LangRef.html#MemberTypeCompileError",
    ]);
  });

  test("Fail_AbstractClassDefinesMethodBody", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_ConcretePropertyInAbstractClass", async () => {
    const code = `${testHeader}

main

end main

abstract class Foo
  property p1 as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_DiamondInheritance", async () => {
    const code = `${testHeader}

main

end main

interface Foo
  abstract property p1 as Int
end interface

interface Bar inherits Foo
  abstract property p2 as Int
end interface

interface Yon inherits Foo
  abstract property p3 as Int
end interface

class Qux inherits Bar, Yon
  property p1 as Int
  property p2 as Int
  property p3 as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p2", 0]]);};
  get p2() {
    return 0;
  }
  set p2(p2) {
  }

}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["p3", 0]]);};
  get p3() {
    return 0;
  }
  set p3(p3) {
  }

}

class Qux {
  static emptyInstance() { return system.emptyClass(Qux, [["p1", 0], ["p2", 0], ["p3", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

  p2 = 0;

  p3 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Fail_MissingAbstractFunction", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
end main

abstract class Foo
    function product() returns Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractProcedure", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
end main

abstract class Foo
  procedure setP1(v as Int)
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotInstantiateAbstractClass", async () => {
    const code = `${testHeader}

main
    variable a set to new Bar()
end main

abstract class Bar
    abstract property p1 as Int
    abstract property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must be concrete to new.LangRef.html#compile_error"]);
  });

  test("Fail_SuperClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable b set to new Bar()
  variable f set to upcast(b)
  call printNoLine(fun(f))
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: bar (Bar), Provided: Foo.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Invariance1", async () => {
    const code = `${testHeader}

main
  variable b set to new Bar()
  variable lst set to [b]
  call printNoLine(fun(lst))
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
    return l[0]
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: l (List<of Foo>), Provided: List<of Bar>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Invariance2", async () => {
    const code = `${testHeader}

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

procedure fun(l as List<of Foo>)
  call printNoLine(l[0])
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: l (List<of Foo>), Provided: List<of Bar>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Invariance3", async () => {
    const code = `${testHeader}

main
  variable lst set to new Dictionary<of String, Bar>()
  call printNoLine(fun(lst))
end main

abstract class Foo
  abstract property p1 as Int
end class

class Bar inherits Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(l as Dictionary<of String, Foo>) returns Foo
    return l["id"]
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: l (Dictionary<of String, Foo>), Provided: Dictionary<of String, Bar>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritFromNonexistentClass", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.p1)
end main

class Bar inherits Foo
    constructor()  
    end constructor
    
    property p1 as Float
    
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract property p1 as Int
end class

abstract class Foo
  abstract property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'Foo' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract property p1 as Int
  abstract property p1 as String
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'p1' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract function ff() returns Int
  abstract function ff() returns Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract procedure ff()
  abstract procedure ff()
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract procedure ff()
  abstract property ff as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract function ff() returns Int
  abstract property ff as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  abstract function ff() returns Int
  abstract procedure ff()
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers1", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  private property p1 as Int
end class

abstract class Yon inherits Foo
  private property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePrivateMembers2", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  private procedure p1()
  end procedure
end class

abstract class Yon inherits Foo
  private property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePrivateMembers3", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePrivateMembers4", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePrivateMembers5", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePrivateMembers6", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Yon
  private property p1 as String
  abstract property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor
  property p1 as Int
  property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Member 'p1' must be of type String.LangRef.html#MemberTypeCompileError",
      "Name 'p1' not unique in scope.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers1", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  property p1 as Int
end class

abstract class Yon inherits Foo
  property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMembers2", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  procedure p1()
  end procedure
end class

abstract class Yon inherits Foo
  property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor

  property p3 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMembers3", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  function p1() returns Int
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMembers4", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Foo
  function p1() returns Int
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMembers5", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMembers6", async () => {
    const code = `${testHeader}

main
 
end main

abstract class Yon
  property p1 as String
  abstract property p1 as String
end class

class Bar inherits Yon
  constructor()
  end constructor
  property p1 as String
  property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_StdLibSuperClass", async () => {
    const code = `${testHeader}

class Bar inherits VectorGraphic
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Superclass 'VectorGraphic' must be inheritable class.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnknownSuperClass", async () => {
    const code = `${testHeader}

class Bar inherits BaseVg
  constructor()
  end constructor

  property p2 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'BaseVg' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_OnlyOneAbstract Class", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "There must be only one abstract superclass, Foo, Bar are abstract classes.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SuperclassesCannotDefineSameMember", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.product())
  call x.setP1(4)
  call printNoLine(x.product())
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'p1' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SuperclassesCannotDefineSameMember1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.product())
  call x.setP1(4)
  call printNoLine(x.product())
end main

abstract class Foo
  abstract property p1 as Float
  abstract property p2 as Float 
end class

interface Yon
  abstract property p1 as Float 
  abstract procedure setP1(v as Float)
  abstract function product() returns Float
end interface

class Bar inherits Foo, Yon
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DiamondInheritance", async () => {
    const code = `${testHeader}

main

end main

interface Foo
  abstract property p1 as Int
end interface

interface Bar inherits Foo
  abstract property p2 as Int
end interface

interface Yon inherits Foo
  abstract property p3 as Int
end interface

class Qux inherits Bar, Yon
  property p2 as Int
  property p3 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Qux must implement Foo.p1.LangRef.html#compile_error"]);
  });

  test("Fail_PrivateMemberCannotImplementInterface", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(ff(x))
end main

function ff(f as Foo) returns Int
  return f.p1
end function

interface Foo
  abstract property p1 as Int
end interface

class Bar inherits Foo
  private property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.p1.LangRef.html#compile_error"]);
  });

  test("Fail_PrivateMemberCannotImplementInterface1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(ff(x))
end main

function ff(f as Yon) returns Int
  return f.p1
end function

interface Yon
  abstract property p1 as Int
end interface

abstract class Foo inherits Yon
  private property p1 as Int
end class

class Bar inherits Foo

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Yon.p1.LangRef.html#compile_error"]);
  });

  test("Fail_PrivateMemberDuplicateId", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(ff(x))
end main

function ff(f as Yon) returns Int
  return f.p1
end function

interface Yon
  abstract property p1 as Int
end interface

abstract class Foo inherits Yon
  private property p1 as Int
end class

class Bar inherits Foo
  property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_SuperClassUsedBeforeDeclared", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
end main

class Foo inherits Bar
  
end class

abstract class Bar
  
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Abstract Class 'Bar' must be declared before it is used.LangRef.html#DeclaredAboveCompileError",
    ]);
  });

  test("Fail_SuperClassUsedBeforeDeclared1", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Foo inherits Bar
  
end class

abstract class Bar
  
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Abstract Class 'Bar' must be declared before it is used.LangRef.html#DeclaredAboveCompileError",
    ]);
  });
});
