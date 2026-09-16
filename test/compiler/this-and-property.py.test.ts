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

suite("Python This and Property", () => {
  test("Pass_DisambiguateParamAndProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tf = createFileForWriting("data.txt") # variable definition
  tf.writeWholeFile("something else") # procedure call
  tf.saveAndClose() # procedure call
# end main

def main() -> None:
  x = Foo(7) # variable definition
  printNoLine(x.p1) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    self.p1 = p1 # assignment
  # end constructor

  p1: float # property

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7));
  await _stdlib.printNoLine(x.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise(p1) {
    this.p1 = p1;
    return this;
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_UsingThisAsAnInstance", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo(7) # variable definition
  printNoLine(x.p1) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

def doubled(f: Foo) -> float: # function
  return 2*f.p1
# end function

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 3 # assignment
  # end constructor

  p1: float # property

  def bar(self: Foo) -> float: # function method
    return doubled(self)
  # end function method

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
  await _stdlib.printNoLine((await f.bar()));
}

async function doubled(f) {
  return 2 * f.p1;
}
global["doubled"] = doubled;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 3;
    return this;
  }

  p1 = 0;

  async bar() {
    return (await global.doubled(this));
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_UsingPropertyAsIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 3 # assignment
  # end constructor

  p1: float # property

  def bar(self: Foo) -> float: # function method
    return doubled(self)
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
    return lst[self.p1]
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.bar()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async bar() {
    let lst = system.list([1, 2]);
    return system.safeIndex(lst, this.p1);
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_PrintThis", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 3 # assignment
  # end constructor

  p1: float # property

  def bar(self: Foo) -> float: # function method
    return doubled(self)
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
    return lst[self.p1]
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  f.bar() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "a Foo"
  # end function method

  def bar(self: Foo) -> None: # procedure method
    printNoLine(self) # procedure call
  # end procedure method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.bar();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Foo";
  }

  async bar() {
    await _stdlib.printNoLine(this);
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
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Fail_UsingPropertyAsIndex1", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
    return lst[self.p1]
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "a Foo"
  # end function method

  def bar(self: Foo) -> None: # procedure method
    printNoLine(self) # procedure call
  # end procedure method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
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

  test("Fail_NoSuchProperty", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "a Foo"
  # end function method

  def bar(self: Foo) -> None: # procedure method
    printNoLine(self) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
    return 
  # end function method

# end class

def main() -> None:
  x = Foo(7) # variable definition
  printNoLine(x.p1) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    self.p = p1 # assignment
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
    assertDoesNotCompile(fileImpl, ["'p' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_MissingSelfCausesCompileErrorDueToAssigningToParam", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  def bar(self: Foo) -> int: # function method
    lst = [1, 2] # variable definition
    return 
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    self.p = p1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

def main() -> None:
  x = Foo(7) # variable definition
  printNoLine(x.p1) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    p1 = p1 # assignment
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
      "May not mutate a parameter within a function or constructor.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ThisOutsideClassScope", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    self.p = p1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

class Foo: # concrete class

  def __init__(self: Foo, p1: float) -> None:
    p1 = p1 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

# end class

def main() -> None:
  printNoLine(self) # procedure call
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
    assertDoesNotCompile(fileImpl, [
      "Cannot use 'this' outside class context.ErrorMessages.html#ThisCompileError",
    ]);
  });
});
