import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Abstract Class", () => {
  test("Pass_SimpleAbstractClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return 1
  # end function method

  def proc(self: Bar) -> None: # procedure method
    printNoLine(2) # procedure call
  # end procedure method

  prop: int # property

# end class

main()
`;

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

  proc() {
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["prop", 0]]);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async toString() {
    return "";
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_AbstractClassWithConcreteMembers", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  def func(self: Foo) -> int: # function method
    return 1
  # end function method

  def proc(self: Foo) -> None: # procedure method
    printNoLine(2) # procedure call
  # end procedure method

  prop: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

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
    return 1;
  }

  async proc() {
    await _stdlib.printNoLine(2);
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_AbstractClassWithConcreteMembers1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
  x.proc() # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  def func(self: Foo) -> int: # function method
    return self.prop
  # end function method

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

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
    await _stdlib.printNoLine((await this.func()));
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_AbstractClassWithConcreteMembers2", async () => {
    const code = `${testPythonHeader}

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

class Foo(ABC): # abstract class

  def func(self: Foo) -> int: # function method
    return self.prop
  # end function method

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return self.prop
  # end function method

# end class

main()
`;

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
    await _stdlib.printNoLine((await this.func()));
  }

  prop = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async toString() {
    return "";
  }

  async func() {
    return this.prop;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_AbstractClassInheritsAbstractClass", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  def func(self: Foo) -> int: # function method
    return self.prop
  # end function method

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

# end class

class Foo1(Foo): # abstract class

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

class Foo2(Foo1): # abstract class

  prop: int # property

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return 1
  # end function method

  def proc(self: Bar) -> None: # procedure method
    printNoLine(2) # procedure call
  # end procedure method

# end class

main()
`;

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

class Foo1 extends Foo {
  static emptyInstance() { return system.emptyClass(Foo1, []);};
  proc() {
  }

}

class Foo2 extends Foo1 {
  static emptyInstance() { return system.emptyClass(Foo2, [["prop", 0]]);};
  prop = 0;

}

class Bar extends Foo2 {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop = 3;
    return this;
  }

  async toString() {
    return "";
  }

  async func() {
    return 1;
  }

  async proc() {
    await _stdlib.printNoLine(2);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "312");
  });

  test("Pass_DifferentAbstractClassIntoFunction1", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  def proc(self: Foo) -> None: # procedure method
    printNoLine(self.func()) # procedure call
  # end procedure method

  prop: int # property

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

# end class

class Foo2(Foo1): # abstract class

  prop: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
  printNoLine(func2(x)) # procedure call
# end main

def func1(f: Foo1) -> int: # function
  return f.ff1()
# end function

def func2(f: Foo2) -> int: # function
  return f.ff2()
# end function

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

main()
`;

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

  async toString() {
    return "";
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_DifferentAbstractClassIntoFunction2", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
  printNoLine(func2(x)) # procedure call
# end main

def func2(f: Foo2) -> int: # function
  return f.ff2()
# end function

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
  printNoLine(func2(x)) # procedure call
# end main

def func1(f: Foo1) -> int: # function
  return f.ff1()
# end function

def func2(f: Foo2) -> int: # function
  return f.ff1()
# end function

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

main()
`;

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

  async toString() {
    return "";
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_Default", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
  printNoLine(func2(x)) # procedure call
# end main

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

def func1(f: Foo1) -> int: # function
  return f.ff1()
# end function

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.foo) # procedure call
  printNoLine(x.foo.hasValue()) # procedure call
# end main

class Foo(ABC): # abstract class

  f: Foo2 # property

# end class

class Foo2(ABC): # abstract class

  f2: Foo # property

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.foo = Maybe[Foo]() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  foo: Maybe[Foo] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine(x.foo);
  await _stdlib.printNoLine(x.foo.hasValue());
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  elan_f;
  get f() {
    return this.elan_f ??= Foo2.emptyInstance();
  }
  set f(f) {
    this.elan_f = f;
  }

}

class Foo2 {
  static emptyInstance() { return system.emptyClass(Foo2, []);};
  elan_f2;
  get f2() {
    return this.elan_f2 ??= Foo.emptyInstance();
  }
  set f2(f2) {
    this.elan_f2 = f2;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.foo = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_foo;
  get foo() {
    return this.elan_foo ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set foo(foo) {
    this.elan_foo = foo;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Maybefalse");
  });

  test("Fail_DoesntImplementFunc", async () => {
    const code = `${testPythonHeader}

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.foo) # procedure call
  printNoLine(x.foo.hasValue()) # procedure call
# end main

class Foo2(ABC): # abstract class

  f2: Foo # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def proc(self: Bar) -> None: # procedure method
    printNoLine(2) # procedure call
  # end procedure method

  prop: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Bar must implement Foo.func.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DoesntImplementProc", async () => {
    const code = `${testPythonHeader}

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Foo2(ABC): # abstract class

  f2: Foo # property

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return 1
  # end function method

  prop: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Bar must implement Foo.proc.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `${testPythonHeader}

class Foo2(ABC): # abstract class

  f2: Foo # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return 1
  # end function method

  prop: int # property

# end class

def main() -> None:

# end main

class Foo(Foo): # abstract class

  prop: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Foo' cannot inherit from itself.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
# end main

def main() -> None:

# end main

def main() -> None:

# end main

class Yon(Foo): # abstract class

  prop1: int # property

# end class

class Bar(Yon): # abstract class

  prop2: int # property

# end class

class Foo(Bar): # abstract class

  prop3: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Yon' cannot inherit from itself.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Yon(Foo): # abstract class

  prop1: int # property

# end class

class Foo(Bar): # abstract class

  prop3: int # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  prop: int # property

# end class

class Bar(Foo): # abstract class

  prop: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'prop' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritConcreteClass", async () => {
    const code = `${testPythonHeader}

class Yon(Foo): # abstract class

  prop1: int # property

# end class

def main() -> None:

# end main

class Bar(Foo): # abstract class

  prop: int # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  prop1: int # property

# end class

class Bar(Foo): # abstract class

  prop2: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May inherit from one abstract superclass only.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DifferentAbstractClassIntoFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Bar(Foo): # abstract class

  prop2: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
# end main

def func1(f: Foo1) -> int: # function
  return f.ff2()
# end function

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Foo2(Foo1): # abstract class

  @abstractmethod
  def ff2() -> int:
    pass # abstract function

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'ff2' is not defined for type 'Foo1'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MultipleAbstractClassInherits", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
# end main

class Foo1(ABC): # abstract class

  @abstractmethod
  def ff1() -> int:
    pass # abstract function

# end class

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.prop) # procedure call
  printNoLine(x.func()) # procedure call
  x.proc() # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

# end class

class Foo1(ABC): # abstract class

  @abstractmethod
  def proc() -> None
    pass # abstract procedure

# end class

class Foo2(ABC): # abstract class

  prop: int # property

# end class

class Bar(Foo, Foo1, Foo2): # concrete class

  def __init__(self: Bar) -> None:
    self.prop = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def func(self: Bar) -> int: # function method
    return 1
  # end function method

  def proc(self: Bar) -> None: # procedure method
    printNoLine(2) # procedure call
  # end procedure method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May inherit from one abstract superclass only.ErrorMessages.html#compile_error",
    ]);
  });
});
