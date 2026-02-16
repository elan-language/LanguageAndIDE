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

suite("Interface", () => {
  test("Pass_SimpleInterface", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.prop)
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end interface

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.prop);
  await _stdlib.printNoLine((await x.func()));
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

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return 1;
  }

  async proc() {
    await _stdlib.printNoLine(2);
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

  test("Pass_InterfaceInheritsInterface", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.prop)
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
end interface

interface Foo1 inherits Foo
  abstract procedure proc()
end interface

interface Foo2 inherits Foo1
  abstract property prop as Int
end interface

class Bar inherits Foo2
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.prop);
  await _stdlib.printNoLine((await x.func()));
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

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, [["prop", 0]]);};
  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return 1;
  }

  async proc() {
    await _stdlib.printNoLine(2);
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

  test("Pass_MultipleInterfaceInherits", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.prop)
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
end interface

interface Foo1
  abstract procedure proc()
end interface

interface Foo2
  abstract property prop as Int
end interface

class Bar inherits Foo, Foo1, Foo2
  constructor()
    set property.prop to 3
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.prop);
  await _stdlib.printNoLine((await x.func()));
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

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, [["prop", 0]]);};
  get prop() {
    return 0;
  }
  set prop(prop) {
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async func() {
    return 1;
  }

  async proc() {
    await _stdlib.printNoLine(2);
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

  test("Pass_DifferentInterfaceIntoFunction1", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(func1(x))
  call printNoLine(func2(x))
end main

function func1(f as Foo1) returns Int
  return f.ff1()
end function 

function func2(f as Foo2) returns Int
  return f.ff2()
end function 

interface Foo1
  abstract function ff1() returns Int
end interface

interface Foo2
  abstract function ff2() returns Int
end interface

class Bar inherits Foo1, Foo2
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
  await _stdlib.printNoLine((await global.func1(x)));
  await _stdlib.printNoLine((await global.func2(x)));
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

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  async ff2() {
    return 0;
  }

}

class Bar {
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

  test("Pass_DifferentInterfaceIntoFunction2", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(func1(x))
  call printNoLine(func2(x))
end main

function func1(f as Foo1) returns Int
  return f.ff1()
end function 

function func2(f as Foo2) returns Int
  return f.ff2()
end function 

interface Foo1
  abstract function ff1() returns Int
end interface

interface Foo2 inherits Foo1
  abstract function ff2() returns Int
end interface

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
  await _stdlib.printNoLine((await global.func1(x)));
  await _stdlib.printNoLine((await global.func2(x)));
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

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  async ff2() {
    return 0;
  }

}

class Bar {
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

  test("Pass_DifferentInterfaceIntoFunction3", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(func1(x))
  call printNoLine(func2(x))
end main

function func1(f as Foo1) returns Int
  return f.ff1()
end function 

function func2(f as Foo2) returns Int
  return f.ff1()
end function 

interface Foo1
  abstract function ff1() returns Int
end interface

interface Foo2 inherits Foo1
  abstract function ff2() returns Int
end interface

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
  await _stdlib.printNoLine((await global.func1(x)));
  await _stdlib.printNoLine((await global.func2(x)));
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

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  async ff2() {
    return 0;
  }

}

class Bar {
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
  call printNoLine(x.foo)
  call printNoLine(x.foo.hasValue())
end main

interface Foo
  abstract property f as Foo2
end interface

interface Foo2
  abstract property f2 as Foo
end interface

class Bar
  constructor()
    set property.foo to new Optional<of Foo>()
  end constructor

  property foo as Optional<of Foo>

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.foo);
  await _stdlib.printNoLine(x.foo.f);
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

interface Qux inherits Bar, Yon
 
end interface`;

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
  static emptyInstance() { return system.emptyClass(Qux, []);};

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

  test("Pass_useBeforeDeclared", async () => {
    const code = `${testHeader}

main

end main

class Foo inherits Bar
 
end class

interface Bar
end interface`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async _initialise() { return this; }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

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

  test("Pass_useBeforeDeclared1", async () => {
    const code = `${testHeader}

main

end main

interface Foo inherits Bar
 
end interface

interface Bar
end interface`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

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
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end interface

class Bar inherits Foo
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
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
  call printNoLine(x.prop)
  call x.proc()
end main

interface Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end interface

class Bar inherits Foo
  constructor()
    set property.prop to 3
  end constructor

  procedure proc()
    call printNoLine(2)
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
  call printNoLine(x.prop)
  call printNoLine(x.func())
end main

interface Foo
  abstract function func() returns Int
  abstract procedure proc()
  abstract property prop as Int
end interface

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
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo1
  abstract property prop as Int
end interface

interface Foo inherits Foo1
  abstract function func() returns Int
  abstract procedure proc()
end interface

class Bar inherits Foo
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
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

  test("Fail_DoesntImplementMultipleInheritanceProp", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(x.func())
  call x.proc()
end main

interface Foo1
  abstract property prop as Int
end interface

interface Foo
  abstract function func() returns Int
  abstract procedure proc()
end interface

class Bar inherits Foo, Foo1
  constructor()
  end constructor

  function func() returns Int
    return 1
  end function

  procedure proc()
    call printNoLine(2)
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

interface Foo inherits Foo
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
      "Class/interface 'Foo' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testHeader}

main
  
end main

interface Yon inherits Foo
  abstract property prop as Int
end interface

interface Bar inherits Yon
  abstract property prop as Int
end interface

interface Foo inherits Bar
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
      "Class/interface 'Yon' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProperty", async () => {
    const code = `${testHeader}

main
  
end main

interface Foo
  abstract property prop as Int
end interface

interface Bar inherits Foo
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
      "Name 'prop' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritAbstractClass", async () => {
    const code = `${testHeader}

main
  
end main

abstract class Foo
  abstract property prop1 as Int
end class

interface Bar inherits Foo
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
      "Superclass 'Foo' must be an interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritConcreteClass", async () => {
    const code = `${testHeader}

main
  
end main

class Foo
  property prop1 as Int
end class

interface Bar inherits Foo
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
      "Superclass 'Foo' must be an interface.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MustBeAbstract", async () => {
    const code = `${testHeader}

main
  
end main

interface Bar
  property prop as Int
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_DifferentInterfaceIntoFunction", async () => {
    const code = `${testHeader}

main
  variable x set to new Bar()
  call printNoLine(func1(x))
end main

function func1(f as Foo1) returns Int
  return f.ff2()
end function 

interface Foo1
  abstract function ff1() returns Int
end interface

interface Foo2 inherits Foo1
  abstract function ff2() returns Int
end interface

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
});
