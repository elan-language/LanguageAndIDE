import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

suite("Python Equality", () => {
  test("Pass_DifferentInstancesWithSameValuesAreValueEqual", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  x = Foo(7, "Apple") # variable definition
  y = Foo(7, "Orange") # variable definition
  z = Foo(7, "Orange") # variable definition
  printNoLine(x.equals(x)) # procedure call
  printNoLine(x.equals(y)) # procedure call
  printNoLine(y.equals(z)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: float, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: float # property

  p2: str # property

  def setP1(self: Foo, v: float) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = system.initialise(await new Foo()._initialise(7, "Orange"));
  let z = system.initialise(await new Foo()._initialise(7, "Orange"));
  await _stdlib.printNoLine(_stdlib.equals(x, x));
  await _stdlib.printNoLine(_stdlib.equals(x, y));
  await _stdlib.printNoLine(_stdlib.equals(y, z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    return this;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  async toString() {
    return \`\${await _stdlib.toString(this.p1)} \${await _stdlib.toString(this.p2)}\`;
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });

  test("Pass_ActuallyTheSameReference", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Foo: # concrete class

  def __init__(self: Foo, p1: float, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: float # property

  p2: str # property

  def setP1(self: Foo, v: float) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

def main() -> None:
  x = Foo(7, "Apple") # variable definition
  y = x # variable definition
  y.setP1(3) # procedure call
  z = Foo(8, "Orange") # variable definition
  printNoLine(x.equals(x)) # procedure call
  printNoLine(x.equals(y)) # procedure call
  printNoLine(x.equals(z)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: int, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: int # property

  p2: str # property

  def setP1(self: Foo, v: int) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  let y = x;
  await y.setP1(3);
  let z = system.initialise(await new Foo()._initialise(8, "Orange"));
  await _stdlib.printNoLine(_stdlib.equals(x, x));
  await _stdlib.printNoLine(_stdlib.equals(x, y));
  await _stdlib.printNoLine(_stdlib.equals(x, z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    return this;
  }

  p1 = 0;

  p2 = "";

  async setP1(v) {
    this.p1 = v;
  }

  async toString() {
    return \`\${await _stdlib.toString(this.p1)} \${await _stdlib.toString(this.p2)}\`;
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_CompareLambdas", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p1: float, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: float # property

  p2: str # property

  def setP1(self: Foo, v: float) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo, p1: int, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: int # property

  p2: str # property

  def setP1(self: Foo, v: int) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

def main() -> None:
  x = Foo() # variable definition
  printNoLine((x.p1).equals(x.p1)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: Callable[[int]int] # property

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
      "Library or class function 'p1' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
      "Library or class function 'p1' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
      "Library or class function 'p1' cannot be used without bracketsErrorMessages.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Pass_ListValueEquality1", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p1: int, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: int # property

  p2: str # property

  def setP1(self: Foo, v: int) -> None: # procedure method
    self.p1 = v # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return f"{self.p1} {self.p2}"
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: Callable[[int]int] # property

# end class

def main() -> None:
  f1 = Foo(1) # variable definition
  f2 = Foo(2) # variable definition
  l1 = [f1, f2] # variable definition
  l2 = [f1, f2] # variable definition
  printNoLine(l1.equals(l2)) # procedure call
  l3 = [f2, f1] # variable definition
  printNoLine(l1.equals(l3)) # procedure call
  l4 = [Foo(1), Foo(2)] # variable definition
  printNoLine(l4.equals(l1)) # procedure call
  l4[0].setP(3) # procedure call
  printNoLine(l4.equals(l1)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p: int # property

  def setP(self: Foo, value: int) -> None: # procedure method
    self.p = value # assignment
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = system.initialise(await new Foo()._initialise(1));
  let f2 = system.initialise(await new Foo()._initialise(2));
  let l1 = system.list([f1, f2]);
  let l2 = system.list([f1, f2]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l2));
  let l3 = system.list([f2, f1]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l3));
  let l4 = system.list([system.initialise(await new Foo()._initialise(1)), system.initialise(await new Foo()._initialise(2))]);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
  await system.safeIndex(l4, 0).setP(3);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};

  async _initialise(p) {
    this.p = p;
    return this;
  }

  async toString() {
    return "";
  }

  p = 0;

  async setP(value) {
    this.p = value;
  }

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalse");
  });

  test("Pass_ListValueEquality2", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: Callable[[int]int] # property

# end class

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p: int # property

  def setP(self: Foo, value: int) -> None: # procedure method
    self.p = value # assignment
  # end procedure method

# end class

def main() -> None:
  f1 = Foo(1) # variable definition
  f2 = Foo(2) # variable definition
  l1 = [f1, f2] # variable definition
  l2 = [f1, f2] # variable definition
  printNoLine(l1.equals(l2)) # procedure call
  l3 = [f2, f1] # variable definition
  printNoLine(l1.equals(l3)) # procedure call
  l4 = [Foo(1), Foo(2)] # variable definition
  printNoLine(l4.equals(l1)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  p: int # property

  def toString(self: Foo) -> str: # function method
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f1 = system.initialise(await new Foo()._initialise(1));
  let f2 = system.initialise(await new Foo()._initialise(2));
  let l1 = system.list([f1, f2]);
  let l2 = system.list([f1, f2]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l2));
  let l3 = system.list([f2, f1]);
  await _stdlib.printNoLine(_stdlib.equals(l1, l3));
  let l4 = system.list([system.initialise(await new Foo()._initialise(1)), system.initialise(await new Foo()._initialise(2))]);
  await _stdlib.printNoLine(_stdlib.equals(l4, l1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [[\"p\", 0]]);};

  async _initialise(p) {
    this.p = p;
    return this;
  }

  p = 0;

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetrue");
  });
});
