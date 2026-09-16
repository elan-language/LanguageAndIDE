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

suite("Python Procedure Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `${testPythonHeader}

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
  printNoLine(f.p1) # procedure call
  f.setP1(7) # procedure call
  printNoLine(f.p1) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def setP1(self: Foo, value: float) -> None: # procedure method
    self.p1 = value # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f.p1);
  await f.setP1(7);
  await _stdlib.printNoLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async setP1(value) {
    this.p1 = value;
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
    await assertObjectCodeExecutes(fileImpl, "57");
  });

  test("Pass_ProcedureCanContainSystemCall", async () => {
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
  # end constructor

  p1: float # property

  def setP1(self: Foo, value: float) -> None: # procedure method
    self.p1 = value # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  f.display() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def display(self: Foo) -> None: # procedure method
    printNoLine(self.p1) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.display();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async display() {
    await _stdlib.printNoLine(this.p1);
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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureMethod", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def setP1(self: Foo, value: float) -> None: # procedure method
    self.p1 = value # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def display(self: Foo) -> None: # procedure method
    printNoLine(self.p1) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  b = Bar() # variable definition
  f.times(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, b: Bar) -> None: # procedure method
    b.p1PlusOne() # procedure call
    self.p1PlusOne() # procedure call
    self.p1 = self.p1 + b.p1 # assignment
    printNoLine(self.p1) # procedure call
  # end procedure method

  def p1PlusOne(self: Foo) -> None: # procedure method
    self.p1 = self.p1 + 1 # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  p1: float # property

  def p1PlusOne(self: Bar) -> None: # procedure method
    self.p1 = self.p1 + 1 # assignment
  # end procedure method

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let b = system.initialise(await new Bar()._initialise());
  await f.times(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(b) {
    await b.p1PlusOne();
    await this.p1PlusOne();
    this.p1 = this.p1 + b.p1;
    await _stdlib.printNoLine(this.p1);
  }

  async p1PlusOne() {
    this.p1 = this.p1 + 1;
  }

  async toString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async p1PlusOne() {
    this.p1 = this.p1 + 1;
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
    await assertObjectCodeExecutes(fileImpl, "8");
  });

  test("Fail_ProcedureMethodCannotBeCalledDirectly", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def display(self: Foo) -> None: # procedure method
    printNoLine(self.p1) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, b: Bar) -> None: # procedure method
    b.p1PlusOne() # procedure call
    self.p1PlusOne() # procedure call
    self.p1 = self.p1 + b.p1 # assignment
    printNoLine(self.p1) # procedure call
  # end procedure method

  def p1PlusOne(self: Foo) -> None: # procedure method
    self.p1 = self.p1 + 1 # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  show(f) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def show(self: Foo) -> None: # procedure method
    printNoLine(p1) # procedure call
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
    assertDoesNotCompile(fileImpl, ["'show' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_CallUnknownMethodOnInstance", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, b: Bar) -> None: # procedure method
    b.p1PlusOne() # procedure call
    self.p1PlusOne() # procedure call
    self.p1 = self.p1 + b.p1 # assignment
    printNoLine(self.p1) # procedure call
  # end procedure method

  def p1PlusOne(self: Foo) -> None: # procedure method
    self.p1 = self.p1 + 1 # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def show(self: Foo) -> None: # procedure method
    printNoLine(p1) # procedure call
  # end procedure method

# end class

def main() -> None:
  x = Foo() # variable definition
  x.calculate() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: str # property

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
      "'calculate' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def show(self: Foo) -> None: # procedure method
    printNoLine(p1) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: str # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def changeValue(self: Foo, a: Bar) -> None: # procedure method

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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: str # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def changeValue(self: Foo, a: Bar) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def if_(self: Foo) -> None: # procedure method

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

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def changeValue(self: Foo, a: Bar) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def if_(self: Foo) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def break(self: Foo, a: int) -> None: # procedure method

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
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfLangTypeAsName", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def if_(self: Foo) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def break(self: Foo, a: int) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def short(self: Foo, a: int) -> None: # procedure method

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
      "'short' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def break(self: Foo, a: int) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def short(self: Foo, a: int) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, b: str, a: int) -> None: # procedure method

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
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SetPropertyWithoutPrefix", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def short(self: Foo, a: int) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, b: str, a: int) -> None: # procedure method

  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo) -> None: # procedure method
    p1 = 4 # assignment
  # end procedure method

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
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_standaloneLibProcedureAsExtension", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, b: str, a: int) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo) -> None: # procedure method
    p1 = 4 # assignment
  # end procedure method

  p1: int # property

# end class

def main() -> None:
  x = 3 # variable definition
  x.clearPrintedText() # procedure call
# end main

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
      "'clearPrintedText' is not defined for type 'Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_standaloneProcedureAsExtension", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo) -> None: # procedure method
    p1 = 4 # assignment
  # end procedure method

  p1: int # property

# end class

def main() -> None:
  x = 3 # variable definition
  x.foo(x) # procedure call
# end main

def foo(x: int) -> None: # procedure

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
      "'foo' is not defined for type 'Int'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 3 # variable definition
  x.foo(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, foo: int) -> None: # procedure method

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
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, foo: int) -> None: # procedure method

  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, foo: int) -> None: # procedure method

  # end procedure method

# end class
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
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });
});
