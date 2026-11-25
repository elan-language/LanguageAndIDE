import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "../compiler-test-helpers";

suite("Python Equality", () => {
  test("Pass_DifferentInstancesWithSameValuesAreValueEqual", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo(7, "Apple") # variable definition
  y = Foo(7, "Orange") # variable definition
  z = Foo(7, "Orange") # variable definition
  printNoLine(x.equals(x)) 
  printNoLine(x.equals(y)) 
  printNoLine(y.equals(z)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: float, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: float

  p2: str

  def setP1(self: Foo, v: float) -> None:
    self.p1 = v # assignment
  # end procedure

  def toString(self: Foo) -> str:
    return self.p1.toString() + self.p2
  # end function

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
    return (await _stdlib.toString(this.p1)) + this.p2;
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

def main() -> None:
  x = Foo(7, "Apple") # variable definition
  y = x # variable definition
  y.setP1(3) 
  z = Foo(8, "Orange") # variable definition
  printNoLine(x.equals(x)) 
  printNoLine(x.equals(y)) 
  printNoLine(x.equals(z)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: int, p2: str) -> None:
    self.p1 = p1 # assignment
    self.p2 = p2 # assignment
  # end constructor

  p1: int

  p2: str

  def setP1(self: Foo, v: int) -> None:
    self.p1 = v # assignment
  # end procedure

  def toString(self: Foo) -> str:
    return self.p1.toString() + self.p2
  # end function

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
    return (await _stdlib.toString(this.p1)) + this.p2;
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

  ignore_test("Fail_CompareLambdas", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine((x.p1).equals(x.p1)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: Callable[[int]int]

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

def main() -> None:
  f1 = Foo(1) # variable definition
  f2 = Foo(2) # variable definition
  l1 = [f1, f2] # variable definition
  l2 = [f1, f2] # variable definition
  printNoLine(l1.equals(l2)) 
  l3 = [f2, f1] # variable definition
  printNoLine(l1.equals(l3)) 
  l4 = [Foo(1), Foo(2)] # variable definition
  printNoLine(l4.equals(l1)) 
  l4[0].setP(3) 
  printNoLine(l4.equals(l1)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p: int

  def setP(self: Foo, value: int) -> None:
    self.p = value # assignment
  # end procedure

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

def main() -> None:
  f1 = Foo(1) # variable definition
  f2 = Foo(2) # variable definition
  l1 = [f1, f2] # variable definition
  l2 = [f1, f2] # variable definition
  printNoLine(l1.equals(l2)) 
  l3 = [f2, f1] # variable definition
  printNoLine(l1.equals(l3)) 
  l4 = [Foo(1), Foo(2)] # variable definition
  printNoLine(l4.equals(l1)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo, p: int) -> None:
    self.p = p # assignment
  # end constructor

  p: int

  def toString(self: Foo) -> str:
    return ""
  # end function

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
