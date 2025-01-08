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
  // more tests ? multiple interface inheritance
  // passing as different interfaces into function
  // interface as default
  // access inherited member after passing into function

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  system.printLine(_stdlib.asString(x.prop));
  system.printLine(_stdlib.asString(x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  func() {
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

  func() {
    return 1;
  }

  async proc() {
    system.printLine(_stdlib.asString(2));
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  system.printLine(_stdlib.asString(x.prop));
  system.printLine(_stdlib.asString(x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  func() {
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

  func() {
    return 1;
  }

  async proc() {
    system.printLine(_stdlib.asString(2));
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  system.printLine(_stdlib.asString(x.prop));
  system.printLine(_stdlib.asString(x.func()));
  await x.proc();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  func() {
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

  func() {
    return 1;
  }

  async proc() {
    system.printLine(_stdlib.asString(2));
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

  test("Fail_InheritAbstractClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  
end main

abstract class Foo
  abstract property prop as Int
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
  property prop as Int
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
});
