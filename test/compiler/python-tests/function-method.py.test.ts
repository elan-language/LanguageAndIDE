import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
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
} from "../compiler-test-helpers";

suite("Python Function Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.times(2)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def times(self: Foo, value: float) -> float:
    return self.p1*value
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

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
  x = 1.1 # variable definition
  x = f.times(x) # assignment
  printNoLine(x) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def times(self: Foo, value: float) -> float:
    return self.p1*value
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

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
  x = list[float]() # variable definition
  x = f.times(2) # assignment
  printNoLine(x) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def times(self: Foo, value: float) -> list[float]:
    return [self.p1*value]
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

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
  b = Bar() # variable definition
  x = b.getTimes() # variable definition
  printNoLine(x) 
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str:
    return ""
  # end function

  p1: Foo

  def getTimes(self: Bar) -> list[float]:
    x = list[float]() # variable definition
    x = self.p1.times(2) # assignment
    return x
  # end function

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  def times(self: Foo, value: float) -> list[float]:
    return [self.p1*value]
  # end function

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
  printNoLine(x) 
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str:
    return ""
  # end function

  p1: Foo

  def getTimes(self: Bar) -> list[Qux]:
    x = list[Qux]() # variable definition
    x = self.p1.times(2) # assignment
    return x
  # end function

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  def times(self: Foo, value: float) -> list[Qux]:
    return [Qux()]
  # end function

# end class

class Qux: # concrete class

  def __init__(self: Qux) -> None:

  # end constructor

  def toString(self: Qux) -> str:
    return "a Qux"
  # end function

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

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.length()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  p1: Bar

  def length(self: Foo) -> float:
    return self.p1.length() + 2
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def length(self: Bar) -> float:
    return self.p1
  # end function

  def toString(self: Bar) -> str:
    return ""
  # end function

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

def main() -> None:
  f = Foo() # variable definition
  b = Bar() # variable definition
  printNoLine(f.times(b)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def times(self: Foo, b: Bar) -> float:
    return self.p1PlusOne()*b.p1PlusOne()
  # end function

  def p1PlusOne(self: Foo) -> float:
    return self.p1 + 1
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 1 # assignment
  # end constructor

  p1: float

  def p1PlusOne(self: Bar) -> float:
    return self.p1 + 1
  # end function

  def toString(self: Bar) -> str:
    return ""
  # end function

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
  f.prt() 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  p1: float

  def prt(self: Foo) -> None:
    printNoLine(self.toString()) 
  # end procedure

  def toString(self: Foo) -> str:
    return self.p1.toString()
  # end function

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
  printNoLine(f.yon()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def foo(self: Foo) -> Foo:
    return self
  # end function

  def bar(self: Foo) -> str:
    return "bar"
  # end function

  def yon(self: Foo) -> str:
    return self.foo().bar()
  # end function

  def toString(self: Foo) -> str:
    return ""
  # end function

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
  printNoLine(times(f, 2)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  def times(self: Foo, value: float) -> float:
    return p1*value
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
    assertDoesNotCompile(fileImpl, ["'times' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_FunctionisNotDefined", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  v = 0 # variable definition
  v = f.noSuch() # assignment
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def such(self: Foo) -> int:
    return 0
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
      "'noSuch' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodCannotMutateProperty", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  def times(self: Foo, value: float) -> float:
    self.p1 = self.p1*value # assignment
    return self.p1
  # end function

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
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: float

  def times(self: Foo, value: float) -> float:
    return 
  # end function

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

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def changeValue(self: Foo, a: Bar) -> int:
    return 0
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def changeValue(self: Foo, a: int) -> Bar:
    return 0
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def if_(self: Foo) -> :
    return 
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
    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def break(self: Foo, a: int) -> int:
    return 0
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
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UseOfLangTypeAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def int(self: Foo, a: int) -> int:
    return 0
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
    assertDoesNotParse(fileImpl);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def foo(self: Foo, a: int, b: str, a: int) -> int:
    return 0
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'a' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NestedUpdateProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.foo()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def foo(self: Foo) -> int:
    if self.p2:
      self.p1 = 1 # assignment
    # end if
    return self.p1
  # end function

  p1: int

  p2: bool

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
  printNoLine(f.foo()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def foo(self: Foo) -> int:
    if self.p2:
      if self.p2:
        if self.p2:
          self.p1 = 1 # assignment
        # end if
      # end if
    # end if
    return self.p1
  # end function

  p1: int

  p2: bool

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
  printNoLine(f.bar()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return "undefined"
  # end function

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
  printNoLine(f.foo(0)) 
# end main

def bar() -> int: # function
  return 0
# end function

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def foo(self: Foo, foo: int) -> str:
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

  def toString(self: Foo) -> str:
    return ""
  # end function

  def foo(self: Foo, a: int, foo: int) -> str:
    return ""
  # end function

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
