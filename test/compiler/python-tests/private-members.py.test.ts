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

suite("Python Private Members", () => {
  test("Pass_PrivatePropertyCanBeDeclared", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  p1: float

  p2: str # private

  def toString(self: Foo) -> str:
    return self.p2
  # end function

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
  x.testSetP1(5) 
  printNoLine(x.p1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def setP1(self: Foo, a: int) -> None: # private
    self.p1 = a # assignment
  # end procedure

  def testSetP1(self: Foo, a: int) -> None:
    self.setP1(a) 
  # end procedure

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
  f = Foo() # variable definition
  printNoLine(f.testFf("test")) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo, f: str) -> str: # private
    return f
  # end function

  def testFf(self: Foo, f: str) -> str:
    return self.ff(f)
  # end function

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

  //triage: should be correct - not yet working in RefLang
  ignore_test("Fail_PrivatePropertyCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  p2: str # private

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

  ignore_test("Fail_PrivatePropertyCannotBeAccessedViaAbstract", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s = f.p2 # variable definition
# end main

class Bar(ABC): # abstract class

  p2: str # private

# end class

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

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

  ignore_test("Fail_PrivateProcedureCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  foo.setP1(5) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def setP1(self: Foo, a: int) -> None: # private
    self.p1 = a # assignment
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'setP1'.ErrorMessages.html#compile_error",
    ]);
  });

  ignore_test("Fail_PrivateFunctionCannotBeAccessed", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  a = foo.ff() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def ff(self: Foo) -> int: # private
    return p1
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'ff'.ErrorMessages.html#compile_error",
    ]);
  });

  ignore_test("Fail_PrivatePropertyCannotBePrinted", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.p2) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  p2: str # private

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

  ignore_test("Fail_PrivateFunctionCannotBePrinted", async () => {
    const code = `${testPythonHeader}


def main() -> None:
  foo = Foo() # variable definition
  printNoLine(foo.ff()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def ff(self: Foo) -> int: # private
    return p1
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'ff'.ErrorMessages.html#compile_error",
    ]);
  });
});
