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

suite("Python Function Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  max(a) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.times(2)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, value: float) -> float: # function method
    return self.p1*value
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
  await _stdlib.printNoLine((await f.times(2)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return this.p1 * value;
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
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_FunctionMethodReturnType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.times(2)) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  x = 1.1 # variable definition
  x = f.times(x) # assignment
  printNoLine(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, value: float) -> float: # function method
    return self.p1*value
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
  let x = 1.1;
  x = (await f.times(x));
  await _stdlib.printNoLine(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return this.p1 * value;
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
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  test("Pass_FunctionMethodReturnType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  x = 1.1 # variable definition
  x = f.times(x) # assignment
  printNoLine(x) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  x = list[float]() # variable definition
  x = f.times(2) # assignment
  printNoLine(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, value: float) -> list[float]: # function method
    return [self.p1*value]
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
  let x = system.initialise(await new _stdlib.List()._initialise());
  x = (await f.times(2));
  await _stdlib.printNoLine(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return system.list([this.p1 * value]);
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
    await assertObjectCodeExecutes(fileImpl, "[10]");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  x = list[float]() # variable definition
  x = f.times(2) # assignment
  printNoLine(x) # procedure call
# end main

def main() -> None:
  b = Bar() # variable definition
  x = b.getTimes() # variable definition
  printNoLine(x) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: Foo # property

  def getTimes(self: Bar) -> list[float]: # function method
    x = list[float]() # variable definition
    x = self.p1.times(2) # assignment
    return x
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

  def times(self: Foo, value: float) -> list[float]: # function method
    return [self.p1*value]
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  let x = (await b.getTimes());
  await _stdlib.printNoLine(x);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Foo()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async getTimes() {
    let x = system.initialise(await new _stdlib.List()._initialise());
    x = (await this.p1.times(2));
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async times(value) {
    return system.list([this.p1 * value]);
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
    await assertObjectCodeExecutes(fileImpl, "[10]");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = Bar() # variable definition
  x = b.getTimes() # variable definition
  printNoLine(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def times(self: Foo, value: float) -> list[float]: # function method
    return [self.p1*value]
  # end function method

# end class

def main() -> None:
  b = Bar() # variable definition
  x = b.getTimes() # variable definition
  printNoLine(x) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: Foo # property

  def getTimes(self: Bar) -> list[Qux]: # function method
    x = list[Qux]() # variable definition
    x = self.p1.times(2) # assignment
    return x
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

  def times(self: Foo, value: float) -> list[Qux]: # function method
    return [Qux()]
  # end function method

# end class

class Qux: # concrete class

  def __init__(self: Qux) -> None:

  # end constructor

  def toString(self: Qux) -> str: # function method
    return "a Qux"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  let x = (await b.getTimes());
  await _stdlib.printNoLine(x);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Foo()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async getTimes() {
    let x = system.initialise(await new _stdlib.List()._initialise());
    x = (await this.p1.times(2));
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async times(value) {
    return system.list([system.initialise(await new Qux()._initialise())]);
  }

}

class Qux {
  static emptyInstance() { return system.emptyClass(Qux, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Qux";
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
    await assertObjectCodeExecutes(fileImpl, "[a Qux]");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionViaProperty", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def times(self: Foo, value: float) -> list[float]: # function method
    return [self.p1*value]
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: Foo # property

  def getTimes(self: Bar) -> list[Qux]: # function method
    x = list[Qux]() # variable definition
    x = self.p1.times(2) # assignment
    return x
  # end function method

# end class

class Qux: # concrete class

  def __init__(self: Qux) -> None:

  # end constructor

  def toString(self: Qux) -> str: # function method
    return "a Qux"
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.length()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  p1: Bar # property

  def length(self: Foo) -> float: # function method
    return self.p1.length() + 2
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def length(self: Bar) -> float: # function method
    return self.p1
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
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.length()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Bar()._initialise());
    return this;
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async length() {
    return (await this.p1.length()) + 2;
  }

  async toString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async length() {
    return this.p1;
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionMethod", async () => {
    const code = `${testPythonHeader}

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  p1: Foo # property

  def getTimes(self: Bar) -> list[Qux]: # function method
    x = list[Qux]() # variable definition
    x = self.p1.times(2) # assignment
    return x
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.length()) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def length(self: Bar) -> float: # function method
    return self.p1
  # end function method

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  b = Bar() # variable definition
  printNoLine(f.times(b)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def times(self: Foo, b: Bar) -> float: # function method
    return self.p1PlusOne()*b.p1PlusOne()
  # end function method

  def p1PlusOne(self: Foo) -> float: # function method
    return self.p1 + 1
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  p1: float # property

  def p1PlusOne(self: Bar) -> float: # function method
    return self.p1 + 1
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
  let f = system.initialise(await new Foo()._initialise());
  let b = system.initialise(await new Bar()._initialise());
  await _stdlib.printNoLine((await f.times(b)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(b) {
    return (await this.p1PlusOne()) * (await b.p1PlusOne());
  }

  async p1PlusOne() {
    return this.p1 + 1;
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
    return this.p1 + 1;
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_FunctionMethodNameHidesGlobalFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.length()) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  b = Bar() # variable definition
  printNoLine(f.times(b)) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  p1: float # property

  def p1PlusOne(self: Bar) -> float: # function method
    return self.p1 + 1
  # end function method

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  f.prt() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float # property

  def prt(self: Foo) -> None: # procedure method
    printNoLine(self.toString()) # procedure call
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return self.p1.toString()
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.prt();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async prt() {
    await _stdlib.printNoLine((await this.toString()));
  }

  async toString() {
    return (await _stdlib.toString(this.p1));
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

  test("Pass_FunctionOnDifferentInstance1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  b = Bar() # variable definition
  printNoLine(f.times(b)) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  f.prt() # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.yon()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def foo(self: Foo) -> Foo: # function method
    return self
  # end function method

  def bar(self: Foo) -> str: # function method
    return "bar"
  # end function method

  def yon(self: Foo) -> str: # function method
    return self.foo().bar()
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
  await _stdlib.printNoLine((await f.yon()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async foo() {
    return this;
  }

  async bar() {
    return "bar";
  }

  async yon() {
    return (await (await this.foo()).bar());
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
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  test("Fail_FunctionCannotBeCalledDirectly", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.prt() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def foo(self: Foo) -> Foo: # function method
    return self
  # end function method

  def bar(self: Foo) -> str: # function method
    return "bar"
  # end function method

  def yon(self: Foo) -> str: # function method
    return self.foo().bar()
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  printNoLine(times(f, 2)) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def times(self: Foo, value: float) -> float: # function method
    return p1*value
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
    assertDoesNotCompile(fileImpl, ["'times' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_FunctionisNotDefined", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def foo(self: Foo) -> Foo: # function method
    return self
  # end function method

  def bar(self: Foo) -> str: # function method
    return "bar"
  # end function method

  def yon(self: Foo) -> str: # function method
    return self.foo().bar()
  # end function method

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

  def times(self: Foo, value: float) -> float: # function method
    return p1*value
  # end function method

# end class

def main() -> None:
  f = Foo() # variable definition
  v = 0 # variable definition
  v = f.noSuch() # assignment
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def such(self: Foo) -> int: # function method
    return 0
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
      "'noSuch' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodCannotMutateProperty", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: float # property

  def times(self: Foo, value: float) -> float: # function method
    return p1*value
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def such(self: Foo) -> int: # function method
    return 0
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

  def times(self: Foo, value: float) -> float: # function method
    self.p1 = self.p1*value # assignment
    return self.p1
  # end function method

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
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodCannotCallProcedureMethod", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def such(self: Foo) -> int: # function method
    return 0
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

  def times(self: Foo, value: float) -> float: # function method
    return 
  # end function method

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

    assertDoesNotParse(fileImpl);
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

  def times(self: Foo, value: float) -> float: # function method
    return 
  # end function method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def changeValue(self: Foo, a: Bar) -> int: # function method
    return 0
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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def changeValue(self: Foo, a: int) -> Bar: # function method
    return 0
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
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def if_(self: Foo) -> : # function method
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

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def break(self: Foo, a: int) -> int: # function method
    return 0
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
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfLangTypeAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def int(self: Foo, a: int) -> int: # function method
    return 0
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
    assertDoesNotCompile(fileImpl, [
      "'int' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, b: str, a: int) -> int: # function method
    return 0
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
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NestedUpdateProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.foo()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo) -> int: # function method
    if self.p2:
      self.p1 = 1 # assignment
    # end if
    return self.p1
  # end function method

  p1: int # property

  p2: bool # property

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
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NestedUpdateProperty1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.foo()) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.foo()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo) -> int: # function method
    if self.p2:
      if self.p2:
        if self.p2:
          self.p1 = 1 # assignment
        # end if
      # end if
    # end if
    return self.p1
  # end function method

  p1: int # property

  p2: bool # property

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
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IncorrectScope", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.foo()) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

def bar() -> int: # function
  return 0
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
    assertDoesNotCompile(fileImpl, [
      "'bar' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.bar()) # procedure call
# end main

def bar() -> int: # function
  return 0
# end function

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, foo: int) -> str: # function method
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
      "Parameter 'foo' may not have the same name as the method in which it is defined.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testPythonHeader}

def bar() -> int: # function
  return 0
# end function

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def foo(self: Foo, a: int, foo: int) -> str: # function method
    return ""
  # end function method

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
