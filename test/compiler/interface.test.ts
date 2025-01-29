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

suite("Interface", () => {
  test("Pass_SimpleInterface", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.prop
  print x.func()
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
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Bar());
  await system.printLine(x.prop);
  await system.printLine(await x.func());
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
  constructor() {
    this.prop = 3;
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_InterfaceInheritsInterface", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.prop
  print x.func()
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
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Bar());
  await system.printLine(x.prop);
  await system.printLine(await x.func());
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
  constructor() {
    this.prop = 3;
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_MultipleInterfaceInherits", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.prop
  print x.func()
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
    print 2
  end procedure

  property prop as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Bar());
  await system.printLine(x.prop);
  await system.printLine(await x.func());
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
  constructor() {
    this.prop = 3;
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_DifferentInterfaceIntoFunction1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  let x = system.initialise(new Bar());
  await system.printLine(await func1(x));
  await system.printLine(await func2(x));
}

async function func1(f) {
  return await f.ff1();
}
global["func1"] = func1;

async function func2(f) {
  return await f.ff2();
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
  constructor() {

  }

  async ff1() {
    return 1;
  }

  async ff2() {
    return 2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_DifferentInterfaceIntoFunction2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  let x = system.initialise(new Bar());
  await system.printLine(await func1(x));
  await system.printLine(await func2(x));
}

async function func1(f) {
  return await f.ff1();
}
global["func1"] = func1;

async function func2(f) {
  return await f.ff2();
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
  constructor() {

  }

  async ff1() {
    return 1;
  }

  async ff2() {
    return 2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_DifferentInterfaceIntoFunction3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
  let x = system.initialise(new Bar());
  await system.printLine(await func1(x));
  await system.printLine(await func2(x));
}

async function func1(f) {
  return await f.ff1();
}
global["func1"] = func1;

async function func2(f) {
  return await f.ff1();
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
  constructor() {

  }

  async ff1() {
    return 1;
  }

  async ff2() {
    return 2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_Default", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.foo
  print x.foo.f
end main

interface Foo
  abstract property f as Foo2
end interface

interface Foo2
  abstract property f2 as Foo
end interface

class Bar
  constructor()
  end constructor

  property foo as Foo

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(new Bar());
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
  constructor() {

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Fooa Foo2");
  });

  test("Pass_DiamondInheritance", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_useBeforeDeclared", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_useBeforeDeclared1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Fail_DoesntImplementProp", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.func()
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
    print 2
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.prop"]);
  });

  test("Fail_DoesntImplementFunc", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.prop
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
    print 2
  end procedure

  property prop as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.func"]);
  });

  test("Fail_DoesntImplementProc", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.prop
  print x.func()
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo.proc"]);
  });

  test("Fail_DoesntImplementIndirectProp", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.func()
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
    print 2
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo1.prop"]);
  });

  test("Fail_DoesntImplementMultipleInheritanceProp", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print x.func()
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
    print 2
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar must implement Foo1.prop"]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

interface Foo inherits Foo
  abstract property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Class/interface 'Foo' cannot inherit from itself"]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Class/interface 'Yon' cannot inherit from itself"]);
  });

  test("Fail_DuplicateProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

interface Foo
  abstract property prop as Int
end interface

interface Bar inherits Foo
  abstract property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'prop' not unique in scope. Suggestion: factor out the common member(s) into a higher level interface.",
    ]);
  });

  test("Fail_InheritAbstractClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

abstract class Foo
  abstract property prop1 as Int
end class

interface Bar inherits Foo
  abstract property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'Foo' must be an interface"]);
  });

  test("Fail_InheritConcreteClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

class Foo
  property prop1 as Int
end class

interface Bar inherits Foo
  abstract property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass 'Foo' must be an interface"]);
  });

  test("Fail_MustBeAbstract", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

interface Bar
  property prop as Int
end interface`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_DifferentInterfaceIntoFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Bar()
  print func1(x)
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'ff2' is not defined for type 'Foo1'"]);
  });
});
