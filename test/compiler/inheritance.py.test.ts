import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Inheritance", () => {
  test("Pass_DefineAbstractClassAndInheritFromIt", async () => {
    const code = `${testPythonHeader}

def foo(x: int) -> None: # procedure

# end procedure

def square(z: int) -> int: # function
  x = randint(1, 6) # variable definition
  return x*x
# end function

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.p1) # procedure call
  printNoLine(x.p2) # procedure call
  printNoLine(x.product()) # procedure call
  x.setP1(4) # procedure call
  printNoLine(x.product()) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> float:
    pass # abstract function

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
    self.p2 = 4 # assignment
  # end constructor

  p2: float # property

  def setP1(self: Bar, p1: float) -> None: # procedure method
    self.p1 = p1 # assignment
  # end procedure method

  def product(self: Bar) -> float: # function method
    return self.p1*self.p2
  # end function method

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
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
  await _stdlib.printNoLine((await x.product()));
  await x.setP1(4);
  await _stdlib.printNoLine((await x.product()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

  setP1(v) {
  }

  async product() {
    return 0;
  }

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p2", 0]]);};

  async _initialise() {
    this.p1 = 3;
    this.p2 = 4;
    return this;
  }

  p2 = 0;

  async setP1(p1) {
    this.p1 = p1;
  }

  async product() {
    return this.p1 * this.p2;
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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test("Pass_PassAsAbstractClassIntoFunction", async () => {
    const code = `${testPythonHeader}

def square(z: int) -> int: # function
  x = randint(1, 6) # variable definition
  return x*x
# end function

class Foo(ABC): # abstract class

  p1: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> float:
    pass # abstract function

# end class

def main() -> None:
  x = Yon() # variable definition
  printNoLine(f(x)) # procedure call
  printNoLine(b(x)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: float # property

# end class

class Bar(Foo): # abstract class

  p2: str # property

# end class

class Yon(Bar): # concrete class

  def __init__(self: Yon) -> None:
    self.p1 = 3 # assignment
    self.p2 = "apple" # assignment
  # end constructor

  def toString(self: Yon) -> str: # function method
    return ""
  # end function method

# end class

def b(bar: Bar) -> str: # function
  return bar.p2
# end function

def f(foo: Foo) -> float: # function
  return foo.p1
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Yon()._initialise());
  await _stdlib.printNoLine((await global.f(x)));
  await _stdlib.printNoLine((await global.b(x)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, [["p2", ""]]);};
  p2 = "";

}

class Yon extends Bar {
  static emptyInstance() { return system.emptyClass(Yon, []);};

  async _initialise() {
    this.p1 = 3;
    this.p2 = "apple";
    return this;
  }

  async toString() {
    return "";
  }

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
    await assertObjectCodeExecutes(fileImpl, "3apple");
  });

  test("Pass_AbstractMutableClassAsProcedureParameter", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> float:
    pass # abstract function

# end class

class Foo(ABC): # abstract class

  p1: float # property

# end class

class Yon(Bar): # concrete class

  def __init__(self: Yon) -> None:
    self.p1 = 3 # assignment
    self.p2 = "apple" # assignment
  # end constructor

  def toString(self: Yon) -> str: # function method
    return ""
  # end function method

# end class

def f(foo: Foo) -> float: # function
  return foo.p1
# end function

def main() -> None:
  f = Bar() # variable definition
  proc(f) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def proc(foo: Foo) -> None: # procedure
  printNoLine(foo.p1) # procedure call
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Bar()._initialise());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

}

async function proc(foo) {
  await _stdlib.printNoLine(foo.p1);
}
global["proc"] = proc;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_Invariance", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: float # property

# end class

def f(foo: Foo) -> float: # function
  return foo.p1
# end function

class Foo(ABC): # abstract class

  p1: int # property

# end class

def proc(foo: Foo) -> None: # procedure
  printNoLine(foo.p1) # procedure call
# end procedure

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "a Bar"
  # end function method

# end class

def fun(l: list[Bar]) -> Bar: # function
  return l[0]
# end function

main()
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
  p1 = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Bar";
  }

}

async function fun(l) {
  return system.safeIndex(l, 0);
}
global["fun"] = fun;
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
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_AbstractMutableClassAsFunctionParameter", async () => {
    const code = `${testPythonHeader}

def f(foo: Foo) -> float: # function
  return foo.p1
# end function

def proc(foo: Foo) -> None: # procedure
  printNoLine(foo.p1) # procedure call
# end procedure

class Foo(ABC): # abstract class

  p1: int # property

# end class

def fun(l: list[Bar]) -> Bar: # function
  return l[0]
# end function

def main() -> None:
  f = Bar() # variable definition
  printNoLine(fun(f)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def fun(foo: Foo) -> int: # function
  return foo.p1
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await global.fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_DefineAbstractWithPrivateMembers", async () => {
    const code = `${testPythonHeader}

def proc(foo: Foo) -> None: # procedure
  printNoLine(foo.p1) # procedure call
# end procedure

def fun(l: list[Bar]) -> Bar: # function
  return l[0]
# end function

class Foo(ABC): # abstract class

  p1: int # property

# end class

def fun(foo: Foo) -> int: # function
  return foo.p1
# end function

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # private property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

  def ff(self: Foo) -> int: # private function method
    return self.p1
  # end function method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.ff()) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "33");
  });

  test("Pass_DefineAbstractWithPrivateMembersMultipleInheritance", async () => {
    const code = `${testPythonHeader}

def fun(l: list[Bar]) -> Bar: # function
  return l[0]
# end function

def fun(foo: Foo) -> int: # function
  return foo.p1
# end function

class Foo(ABC): # abstract class

  p1: int # private property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

  def ff(self: Foo) -> int: # private function method
    return self.p1
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # private property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

  def ff(self: Foo) -> int: # private function method
    return self.p1
  # end function method

# end class

class Yon(Foo): # abstract class

  p2: int # private property

  def setP2(self: Yon, a: int) -> None: # private procedure method
    self.p2 = a # assignment
  # end procedure method

  def ff2(self: Yon) -> int: # private function method
    return self.p2
  # end function method

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.ff()) # procedure call
    printNoLine(self.p1) # procedure call
    self.setP2(a + 1) # procedure call
    printNoLine(self.ff2()) # procedure call
    printNoLine(self.p2) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  test("Pass_DefineAbstractWithPrivateMembersIndirectInheritance", async () => {
    const code = `${testPythonHeader}

def fun(foo: Foo) -> int: # function
  return foo.p1
# end function

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Yon(Foo): # abstract class

  p2: int # private property

  def setP2(self: Yon, a: int) -> None: # private procedure method
    self.p2 = a # assignment
  # end procedure method

  def ff2(self: Yon) -> int: # private function method
    return self.p2
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # private property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

  def ff(self: Foo) -> int: # private function method
    return self.p1
  # end function method

# end class

class Yon(Foo): # abstract class

  p2: int # private property

  def setP2(self: Yon, a: int) -> None: # private procedure method
    self.p2 = a # assignment
  # end procedure method

  def ff2(self: Yon) -> int: # private function method
    return self.p2
  # end function method

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.ff()) # procedure call
    printNoLine(self.p1) # procedure call
    self.setP2(a + 1) # procedure call
    printNoLine(self.ff2()) # procedure call
    printNoLine(self.p2) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "3344");
  });

  test("Pass_SetInheritedProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Yon(Foo): # abstract class

  p2: int # private property

  def setP2(self: Yon, a: int) -> None: # private procedure method
    self.p2 = a # assignment
  # end procedure method

  def ff2(self: Yon) -> int: # private function method
    return self.p2
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # private property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    printNoLine(self.p1) # procedure call
    self.p1 = a # assignment
    printNoLine(self.p1) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "13");
  });

  test("Pass_AccessAbstractProcedureFromPrivate", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    printNoLine(self.p1) # procedure call
    self.p1 = a # assignment
    printNoLine(self.p1) # procedure call
  # end procedure method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def setP(a: int) -> None
    pass # abstract procedure

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.setP(a) # procedure call
  # end procedure method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

  def setP(self: Bar, a: int) -> None: # procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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

  test("Pass_AccessAbstractFunctionFromPrivate", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

  def setP(self: Bar, a: int) -> None: # procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def ff(a: int) -> int:
    pass # abstract function

  def setP1(self: Foo, a: int) -> None: # private procedure method
    printNoLine(self.ff(a)) # procedure call
  # end procedure method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

  def ff(self: Bar, a: int) -> int: # function method
    return a
  # end function method

# end class

main()
`;

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

  async toString() {
    return "";
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
    await assertObjectCodeExecutes(fileImpl, "31");
  });

  test("Pass_AccessInheritedPropertyFromPrivate", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

  def ff(self: Bar, a: int) -> int: # function method
    return a
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Yon(ABC): # abstract class

  p1: int # private property

# end class

class Foo(Yon): # abstract class

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
    printNoLine(self.p1) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
  }

  async testPrivate(a) {
    await this.setP1(a);
    await _stdlib.printNoLine(this.p1);
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

  test("Pass_AccessInheritedProcedureFromPrivate", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(Yon): # abstract class

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Yon(ABC): # abstract class

  def setP(self: Yon, a: int) -> None: # private procedure method

  # end procedure method

# end class

class Foo(Yon): # abstract class

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.setP(a) # procedure call
  # end procedure method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
  }

  async testPrivate(a) {
    await this.setP1(a);
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_AccessInheritedFunctionFromPrivate", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

class Foo(Yon): # abstract class

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.setP(a) # procedure call
  # end procedure method

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.testPrivate(3)) # procedure call
# end main

class Yon(ABC): # abstract class

  def ff(self: Yon) -> int: # private function method
    return 6
  # end function method

# end class

class Foo(Yon): # abstract class

  def fff(self: Foo) -> int: # private function method
    return self.ff()
  # end function method

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def testPrivate(self: Bar, a: int) -> int: # function method
    return self.fff()
  # end function method

# end class

main()
`;

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

  async toString() {
    return "";
  }

  async testPrivate(a) {
    return (await this.fff());
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_InheritImplementation", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  x.testPrivate(3) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.testPrivate(3)) # procedure call
# end main

class Foo(Yon): # abstract class

  def fff(self: Foo) -> int: # private function method
    return self.ff()
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Yon(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

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
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
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

  test("Pass_InheritImplementation1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.testPrivate(3)) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

  prop: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Yon(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

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
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
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

  test("Pass_InheritImplementation2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

  prop: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Yon(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

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
  await _stdlib.printNoLine((await x.ff()));
}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, []);};
  async ff() {
    return 0;
  }

}

class Foo extends Yon {
  static emptyInstance() { return system.emptyClass(Foo, [["prop", 0]]);};
  async ff() {
    return this.prop;
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

  test("Fail_AbstractClassCannotInheritFromConcreteClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

class Foo(Yon): # abstract class

  def ff(self: Foo) -> int: # function method
    return self.prop
  # end function method

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

# end class

class Bar(Foo): # abstract class

  p1: int # property

  p2: int # property

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

  test("Fail_MustImplementAllInheritedMethods", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.ff()) # procedure call
# end main

def main() -> None:

# end main

class Bar(Foo): # abstract class

  p1: int # property

  p2: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> float:
    pass # abstract function

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def toString(self: Bar) -> str: # function method
    return ""
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
    assertDoesNotCompile(fileImpl, [
      "Bar must implement Foo.setP1.ErrorMessages.html#compile_error",
      "Bar must implement Foo.product.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotInheritFromConcreteClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  x = Bar() # variable definition
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
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
    assertDoesNotCompile(fileImpl, [
      "May inherit from one abstract superclass only.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MustCorrectlyImplementAllInheritedMethods", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
# end main

def main() -> None:
  x = Bar() # variable definition
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def setP1(v: int) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> int:
    pass # abstract function

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def setP1(self: Bar, v: str) -> None: # procedure method

  # end procedure method

  def product(self: Bar) -> str: # function method
    return ""
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
    assertDoesNotCompile(fileImpl, [
      "Member 'setP1' must be of type Procedure (Int).ErrorMessages.html#MemberTypeCompileError",
      "Member 'product' must be of type function that takes no parameters - returning a Int.ErrorMessages.html#MemberTypeCompileError",
    ]);
  });

  test("Fail_ImplementedMethodMustHaveSameSignature", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
# end main

def main() -> None:
  x = Bar() # variable definition
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def setP1(self: Bar, v: str) -> None: # procedure method

  # end procedure method

  def product(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> int:
    pass # abstract function

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
    self.p2 = 4 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def setP1(self: Bar, p1: float) -> None: # procedure method
    self.p1 = p1 # assignment
  # end procedure method

  def product(self: Bar) -> float: # function method
    return self.p1*self.p2
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
    assertDoesNotCompile(fileImpl, [
      "Member 'product' must be of type function that takes no parameters - returning a Int.ErrorMessages.html#MemberTypeCompileError",
    ]);
  });

  test("Fail_AbstractClassDefinesMethodBody", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
# end main

def main() -> None:
  x = Bar() # variable definition
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
    self.p2 = 4 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def setP1(self: Bar, p1: float) -> None: # procedure method
    self.p1 = p1 # assignment
  # end procedure method

  def product(self: Bar) -> float: # function method
    return self.p1*self.p2
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class


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

    assertDoesNotParse(fileImpl);
  });

  test("Pass_ConcretePropertyInAbstractClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
# end main

def main() -> None:
  x = Bar() # variable definition
# end main

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

main()
`;

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
  });

  test("Fail_MissingAbstractFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  def product(self: Foo) -> int: # function method
    return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_MissingAbstractProcedure", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Foo(ABC): # abstract class

  def product(self: Foo) -> int: # function method
    return 
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
# end main

class Foo(ABC): # abstract class

  def setP1(self: Foo, v: int) -> None: # procedure method

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotInstantiateAbstractClass", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  def product(self: Foo) -> int: # function method
    return 
  # end function method

# end class

class Foo(ABC): # abstract class

  def setP1(self: Foo, v: int) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:
  a = Bar() # variable definition
# end main

class Bar(ABC): # abstract class

  p1: int # property

  p2: int # property

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
      "Bar must be concrete to create instance.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SuperClassAsFunctionParameter", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  def setP1(self: Foo, v: int) -> None: # procedure method

  # end procedure method

# end class

class Bar(ABC): # abstract class

  p1: int # property

  p2: int # property

# end class

def main() -> None:
  b = Bar() # variable definition
  f = upcast(b) # variable definition
  printNoLine(fun(f)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def upcast(bar: Bar) -> Foo: # function
  return foo
# end function

def fun(bar: Bar) -> int: # function
  return foo.p1
# end function

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
      "Argument types. Expected: bar (Bar), Provided: Foo.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_Invariance1", async () => {
    const code = `${testPythonHeader}

class Bar(ABC): # abstract class

  p1: int # property

  p2: int # property

# end class

class Foo(ABC): # abstract class

  p1: int # property

# end class

def upcast(bar: Bar) -> Foo: # function
  return foo
# end function

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def fun(l: list[Foo]) -> Foo: # function
  return l[0]
# end function

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
      "Argument types. Expected: l (List<of Foo>), Provided: List<of Bar>.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_Invariance2", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # property

# end class

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  fun(lst) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def fun(l: list[Foo]) -> None: # procedure
  printNoLine(l[0]) # procedure call
# end procedure

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
      "Argument types. Expected: l (List<of Foo>), Provided: List<of Bar>.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_Invariance3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  fun(lst) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  lst = Dictionary[str, Bar]() # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def fun(l: Dictionary[str, Foo]) -> Foo: # function
  return l["id"]
# end function

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
      "Argument types. Expected: l (Dictionary<of String, Foo>), Provided: Dictionary<of String, Bar>.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritFromNonexistentClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = Bar() # variable definition
  lst = [b] # variable definition
  fun(lst) # procedure call
# end main

def main() -> None:
  lst = Dictionary[str, Bar]() # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.p1) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: float # property

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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  lst = Dictionary[str, Bar]() # variable definition
  printNoLine(fun(lst)) # procedure call
# end main

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.p1) # procedure call
# end main

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Foo(ABC): # abstract class

  p1: int # property

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
      "Name 'Foo' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.p1) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # property

  p1: str # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Foo(ABC): # abstract class

  p1: int # property

  p1: str # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> int:
    pass # abstract function

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
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # property

  p1: str # property

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

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
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> int:
    pass # abstract function

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
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

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
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers1", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

  @abstractmethod
  def ff() -> int:
    pass # abstract function

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # private property

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers2", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  @abstractmethod
  def ff() -> int:
    pass # abstract function

  @abstractmethod
  def ff() -> None
    pass # abstract procedure

# end class

class Foo(ABC): # abstract class

  p1: int # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> None: # private procedure method

  # end procedure method

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers3", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # private property

# end class

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # private property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> int: # private function method
    return 0
  # end function method

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers4", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # private property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> int: # private function method
    return 0
  # end function method

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers5", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # private property

# end class

def main() -> None:

# end main

class Yon(ABC): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 0 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePrivateMembers6", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 0 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

# end class

def main() -> None:

# end main

class Yon(ABC): # abstract class

  p1: str # private property

  p1: str # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers1", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Yon(Foo): # abstract class

  p1: str # property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers2", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: int # property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> None: # procedure method

  # end procedure method

# end class

class Yon(Foo): # abstract class

  p1: str # property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers3", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: int # property

# end class

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> int: # function method
    return 0
  # end function method

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers4", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # private property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  def p1(self: Foo) -> int: # function method
    return 0
  # end function method

# end class

class Yon(Foo): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p3: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers5", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Yon(Foo): # abstract class

  p1: str # private property

# end class

def main() -> None:

# end main

class Yon(ABC): # abstract class

  p1: str # private property

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 0 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMembers6", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 0 # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: int # property

# end class

def main() -> None:

# end main

class Yon(ABC): # abstract class

  p1: str # property

  p1: int # property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_StdLibSuperClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Bar(VectorGraphic): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p2: int # property

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

  test("Fail_UnknownSuperClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Bar(BaseVg): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p2: int # property

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
    assertDoesNotCompile(fileImpl, ["'BaseVg' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_OnlyOneAbstract Class", async () => {
    const code = `${testPythonHeader}

class Bar(BaseVg): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p2: int # property

# end class

def main() -> None:
  x = Yon() # variable definition
# end main

class Foo(ABC): # abstract class

  p1: float # property

# end class

class Bar(ABC): # abstract class

  p2: str # property

# end class

class Yon(Foo, Bar): # concrete class

  def __init__(self: Yon) -> None:
    self.p1 = 3 # assignment
    self.p2 = "apple" # assignment
  # end constructor

  def toString(self: Yon) -> str: # function method
    return ""
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
      "May inherit from one abstract superclass only.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SuperclassesCannotDefineSameMember", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Yon() # variable definition
# end main

class Bar(ABC): # abstract class

  p2: str # property

# end class

def main() -> None:

# end main

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

class Yon(Foo): # abstract class

  p1: float # property

  @abstractmethod
  def setP1(v: float) -> None
    pass # abstract procedure

  @abstractmethod
  def product() -> float:
    pass # abstract function

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SuperclassesCannotDefineSameMember1", async () => {
    const code = `${testPythonHeader}

class Bar(ABC): # abstract class

  p2: str # property

# end class

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

def main() -> None:
  x = Bar() # variable definition
  printNoLine(x.p1) # procedure call
  printNoLine(x.p2) # procedure call
  printNoLine(x.product()) # procedure call
  x.setP1(4) # procedure call
  printNoLine(x.product()) # procedure call
# end main

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 3 # assignment
    self.p2 = 4 # assignment
  # end constructor

  p1: float # property

  p2: float # property

  def setP1(self: Bar, p1: float) -> None: # procedure method
    self.p1 = p1 # assignment
  # end procedure method

  def product(self: Bar) -> float: # function method
    return self.p1*self.p2
  # end function method

  def toString(self: Bar) -> str: # function method
    return ""
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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivateMemberDuplicateId", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

def main() -> None:

# end main

class Yon(ABC): # abstract class

  p1: int # property

# end class

class Foo(Yon): # abstract class

  p1: int # private property

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
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SuperClassUsedBeforeDeclared", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  p1: float # property

  p2: float # property

# end class

class Yon(ABC): # abstract class

  p1: int # property

# end class

def main() -> None:
  x = Foo() # variable definition
# end main

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

class Bar(ABC): # abstract class


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
      "Abstract Class 'Bar' must be declared before it is used.ErrorMessages.html#DeclaredAboveCompileError",
    ]);
  });

  test("Fail_SuperClassUsedBeforeDeclared1", async () => {
    const code = `${testPythonHeader}

class Yon(ABC): # abstract class

  p1: int # property

# end class

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

def main() -> None:

# end main

class Foo(Bar): # abstract class


# end class

class Bar(ABC): # abstract class


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
      "Abstract Class 'Bar' must be declared before it is used.ErrorMessages.html#DeclaredAboveCompileError",
    ]);
  });
});
