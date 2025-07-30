import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Abstract Class", () => {
  test("Pass_SimpleAbstractClass", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine(x.prop);
  await system.printLine((await x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async func() {
    return 0;
  }

  proc() {
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

  async func() {
    return 1;
  }

  async proc() {
    await system.printLine(2);
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
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_AbstractClassWithConcreteMembers", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
  call x.proc()
end main

abstract class Foo
  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

  property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine(x.prop);
  await system.printLine((await x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async func() {
    return 1;
  }

  async proc() {
    await system.printLine(2);
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
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
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_AbstractClassWithConcreteMembers1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call x.proc()
end main

abstract class Foo
  function func() returns Int
    return property.prop
  end function

  procedure proc()
    print func()
  end procedure

  property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async func() {
    return this.prop;
  }

  async proc() {
    await system.printLine((await this.func()));
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
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

  test("Pass_AbstractClassWithConcreteMembers2", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int

  procedure proc()
    print func()
  end procedure

  property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return property.prop
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async func() {
    return 0;
  }

  async proc() {
    await system.printLine((await this.func()));
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return this.prop;
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

  test("Pass_AbstractClassInheritsAbstractClass", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int
end class

abstract class Foo1 inherits Foo
  abstract procedure proc()
end class

abstract class Foo2 inherits Foo1
  abstract property prop as Int
end class

class Bar inherits Foo2
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine(x.prop);
  await system.printLine((await x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async func() {
    return 0;
  }

}

class Foo1 extends Foo {
  static emptyInstance() { return system.emptyClass(Foo1, []);};
  proc() {
  }

}

class Foo2 extends Foo1 {
  static emptyInstance() { return system.emptyClass(Foo2, [["prop", 0]]);};
  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar extends Foo2 {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return 1;
  }

  async proc() {
    await system.printLine(2);
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
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_AbstractClassInheritsInterface", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
end interface

abstract class Foo1 inherits Foo
  abstract procedure proc()
end class

abstract class Foo2 inherits Foo1
  abstract property prop as Int
end class

class Bar inherits Foo2
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine(x.prop);
  await system.printLine((await x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async func() {
    return 0;
  }

}

class Foo1 {
  static emptyInstance() { return system.emptyClass(Foo1, []);};
  proc() {
  }

}

class Foo2 extends Foo1 {
  static emptyInstance() { return system.emptyClass(Foo2, [["prop", 0]]);};
  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar extends Foo2 {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return 1;
  }

  async proc() {
    await system.printLine(2);
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
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_DifferentAbstractClassIntoFunction1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print func1(x)
  print func2(x)
end main

function func1(f as Foo1) returns Int
  return f.ff1()
end function 

function func2(f as Foo2) returns Int
  return f.ff2()
end function 

abstract class Foo1
  abstract function ff1() returns Int
end class

abstract class Foo2 inherits Foo1
  abstract function ff2() returns Int
end class

class Bar inherits Foo2
  constructor()
  end constructor

  function ff1() returns Int
    return 1
  end function

  function ff2() returns Int
    return 2
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine((await global.func1(x)));
  await system.printLine((await global.func2(x)));
}

async function func1(f) {
  return (await f.ff1());
}
global["func1"] = func1;

async function func2(f) {
  return (await f.ff2());
}
global["func2"] = func2;

class Foo1 {
  static emptyInstance() { return system.emptyClass(Foo1, []);};
  async ff1() {
    return 0;
  }

}

class Foo2 extends Foo1 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  async ff2() {
    return 0;
  }

}

class Bar extends Foo2 {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async ff1() {
    return 1;
  }

  async ff2() {
    return 2;
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_DifferentAbstractClassIntoFunction2", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print func1(x)
  print func2(x)
end main

function func1(f as Foo1) returns Int
  return f.ff1()
end function 

function func2(f as Foo2) returns Int
  return f.ff1()
end function 

abstract class Foo1
  abstract function ff1() returns Int
end class

abstract class Foo2 inherits Foo1
  abstract function ff2() returns Int
end class

class Bar inherits Foo2
  constructor()
  end constructor

  function ff1() returns Int
    return 1
  end function

  function ff2() returns Int
    return 2
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine((await global.func1(x)));
  await system.printLine((await global.func2(x)));
}

async function func1(f) {
  return (await f.ff1());
}
global["func1"] = func1;

async function func2(f) {
  return (await f.ff1());
}
global["func2"] = func2;

class Foo1 {
  static emptyInstance() { return system.emptyClass(Foo1, []);};
  async ff1() {
    return 0;
  }

}

class Foo2 extends Foo1 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  async ff2() {
    return 0;
  }

}

class Bar extends Foo2 {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async ff1() {
    return 1;
  }

  async ff2() {
    return 2;
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
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_Default", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.foo
  print x.foo.f
end main

abstract class Foo
  abstract property f as Foo2
end class

abstract class Foo2
  abstract property f2 as Foo
end class

class Bar
  constructor()
  end constructor

  property foo as Foo

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await system.printLine(x.foo);
  await system.printLine(x.foo.f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  get f() {
    return Foo2.emptyInstance();
  }
  set f(f) {
  }

}

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  get f2() {
    return Foo.emptyInstance();
  }
  set f2(f2) {
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  _foo;
  get foo() {
    return this._foo ??= Foo.emptyInstance();
  }
  set foo(foo) {
    this._foo = foo;
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
    await assertObjectCodeExecutes(fileImpl, "a Fooa Foo2");
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

abstract class Qux inherits Bar, Yon
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

  test("Pass_DiamondInheritance1", async () => {
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

abstract class Qux inherits Bar, Yon
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
  static emptyInstance() { return system.emptyClass(Qux, [["p2", 0], ["p3", 0]]);};
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

  test("Fail_DoesntImplementProp", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.func()
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end class

class Bar inherits Foo
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

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
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.prop.LangRef.html#compile_error"]);
  });

  test("Fail_DoesntImplementFunc", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  procedure proc()
    print 2
  end procedure

  property prop as Int
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
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.func.LangRef.html#compile_error"]);
  });

  test("Fail_DoesntImplementProc", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
end main

abstract class Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end class

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  property prop as Int
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
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.proc.LangRef.html#compile_error"]);
  });

  test("Fail_DoesntImplementIndirectProp", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.func()
  call x.proc()
end main

abstract class Foo1
  abstract property prop as Int
end class

abstract class Foo inherits Foo1
  abstract function func() returns Int
  abstract procedure proc()
end class

class Bar inherits Foo
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

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
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo1.prop.LangRef.html#compile_error"]);
  });

  test("Fail_DoesntImplementIndirectProp1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.func()
  call x.proc()
end main

interface Foo1
  abstract property prop as Int
end interface

abstract class Foo inherits Foo1
  abstract function func() returns Int
  abstract procedure proc()
end class

class Bar inherits Foo
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

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
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo1.prop.LangRef.html#compile_error"]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Foo inherits Foo
  abstract property prop as Int
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
      "Class/interface 'Foo' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Yon inherits Foo
  abstract property prop as Int
end class

abstract class Bar inherits Yon
  abstract property prop as Int
end class

abstract class Foo inherits Bar
  abstract property prop as Int
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
      "Class/interface 'Yon' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritInterfaceIndirect", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Foo inherits Bar
  abstract property prop as Int
end class

interface Yon inherits Bar
  abstract property prop as Int
end interface

interface Bar inherits Yon
  abstract property prop as Int
end interface`;

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
      "Class/interface 'Bar' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProperty", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Foo
  abstract property prop as Int
end class

abstract class Bar inherits Foo
  abstract property prop as Int
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
      "Name 'prop' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePropertyInterface", async () => {
    const code = `${testHeader}

main
  
end main

interface Foo
  abstract property prop as Int
end interface

abstract class Bar inherits Foo
  abstract property prop as Int
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
      "Name 'prop' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritConcreteClass", async () => {
    const code = `${testHeader}

main
  
end main

class Foo
  property prop1 as Int
end class

abstract class Bar inherits Foo
  abstract property prop as Int
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

  test("Fail_DifferentAbstractClassIntoFunction", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print func1(x)
end main

function func1(f as Foo1) returns Int
  return f.ff2()
end function 

abstract class Foo1
  abstract function ff1() returns Int
end class

abstract class Foo2 inherits Foo1
  abstract function ff2() returns Int
end class

class Bar inherits Foo2
  constructor()
  end constructor

  function ff1() returns Int
    return 1
  end function

  function ff2() returns Int
    return 2
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
      "'ff2' is not defined for type 'Foo1'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MultipleAbstractClassInherits", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  print x.prop
  print x.func()
  call x.proc()
end main

abstract class Foo
  abstract function func() returns Int
end class

abstract class Foo1
  abstract procedure proc()
end class

abstract class Foo2
  abstract property prop as Int
end class

class Bar inherits Foo, Foo1, Foo2
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    print 2
  end procedure

  property prop as Int
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
      "There must be only one abstract superclass, Foo, Foo1, Foo2 are abstract classes.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnListOfMutableType", async () => {
    const code = `${testHeader}

abstract class Foo
  abstract function p1() returns ListImmutable<of List<of Int>>
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
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterListOfMutableType", async () => {
    const code = `${testHeader}

abstract class Foo
  abstract function p1(a as ListImmutable<of List<of Int>>) returns Int
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
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });
});
