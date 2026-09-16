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

suite("Python Private Members", () => {
  test("Pass_PrivatePropertyCanBeDeclared", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("<3") # procedure call
  printNoLine("a < b ") # procedure call
  printNoLine("c <d> ") # procedure call
  printNoLine("e <f ") # procedure call
# end main

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  p1: float # property

  p2: str # private property

  def toString(self: Foo) -> str: # function method
    return self.p2
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p1 = 5;
    this.p2 = "Apple";
    return this;
  }

  p1 = 0;

  p2 = "";

  async toString() {
    return this.p2;
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_PrivateProcedureCanBeDeclared", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x) # procedure call
# end main

def main() -> None:
  x = Foo() # variable definition
  x.testSetP1(5) # procedure call
  printNoLine(x.p1) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

  def testSetP1(self: Foo, a: int) -> None: # procedure method
    self.setP1(a) # procedure call
  # end procedure method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await x.testSetP1(5);
  await _stdlib.printNoLine(x.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  async testSetP1(a) {
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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_PrivateFunctionCanBeDeclared", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  x.testSetP1(5) # procedure call
  printNoLine(x.p1) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.testFf("test")) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def ff(self: Foo, f: str) -> str: # private function method
    return f
  # end function method

  def testFf(self: Foo, f: str) -> str: # function method
    return self.ff(f)
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.testFf("test")));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async ff(f) {
    return f;
  }

  async testFf(f) {
    return (await this.ff(f));
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
    await assertObjectCodeExecutes(fileImpl, "test");
  });

  test("Fail_PrivatePropertyCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.testFf("test")) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  p2: str # private property

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
      "Cannot reference private member 'p2'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivatePropertyCannotBeAccessedViaAbstract", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

class Bar(ABC): # abstract class

  p2: str # private property

# end class

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
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
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'p2'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivateProcedureCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

def main() -> None:
  foo = Foo() # variable definition
  foo.setP1(5) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
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
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'setP1'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivateFunctionCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

def main() -> None:
  foo = Foo() # variable definition
  a = foo.ff() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def ff(self: Foo) -> int: # private function method
    return p1
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
      "Cannot reference private member 'ff'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivatePropertyCannotBePrinted", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def setP1(self: Foo, a: int) -> None: # private procedure method
    self.p1 = a # assignment
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def ff(self: Foo) -> int: # private function method
    return p1
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.p2) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  p2: str # private property

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
      "Cannot reference private member 'p2'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrivateFunctionCannotBePrinted", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def ff(self: Foo) -> int: # private function method
    return p1
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  p2: str # private property

# end class

def main() -> None:
  foo = Foo() # variable definition
  printNoLine(foo.ff()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def ff(self: Foo) -> int: # private function method
    return p1
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
      "Cannot reference private member 'ff'.ErrorMessages.html#compile_error",
    ]);
  });
});
