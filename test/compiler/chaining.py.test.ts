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

suite("Python Chaining", () => {
  test("Pass_SimpleChain", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  b = a[1][1] # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2]), system.list([3, 4])]);
  let b = system.safeIndex(system.safeIndex(a, 1), 1);
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_ChainWithIndex", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  b = a[1][1] # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2]), system.list([3, 4])]);
  let b = system.safeIndex(system.safeIndex(a, 1), 1);
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Foo() # variable definition
  b = a.a[0] # variable definition
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.a = [1] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  a: list[int] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = system.safeIndex(a.a, 0);
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.a = system.list([1]);
    return this;
  }

  async toString() {
    return "";
  }

  a = system.initialise(_stdlib.List.emptyInstance());

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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_PropertyChain2", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.a = [1] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  a: list[int] # property

# end class

def main() -> None:
  f = Foo() # variable definition
  b = 0 # variable definition
  b = f.b.y.z # assignment
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.y = Yon() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  y: Yon # property

# end class

class Yon: # concrete class

  def __init__(self: Yon) -> None:
    self.z = 2 # assignment
  # end constructor

  def toString(self: Yon) -> str: # function method
    return ""
  # end function method

  z: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let b = 0;
  b = f.b.y.z;
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.b = system.initialise(await new Bar()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_b;
  get b() {
    return this.elan_b ??= Bar.emptyInstance();
  }
  set b(b) {
    this.elan_b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.y = system.initialise(await new Yon()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_y;
  get y() {
    return this.elan_y ??= Yon.emptyInstance();
  }
  set y(y) {
    this.elan_y = y;
  }

}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["z", 0]]);};

  async _initialise() {
    this.z = 2;
    return this;
  }

  async toString() {
    return "";
  }

  z = 0;

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

  test("Pass_PropertyChain3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  b = 0 # variable definition
  b = f.b.y.z # assignment
  printNoLine(b) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.y = Yon() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  y: Yon # property

# end class

def main() -> None:
  f = [Foo()] # variable definition
  b = 0 # variable definition
  b = f[0].b.ff() # assignment
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff(self: Bar) -> int: # function method
    return 4
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.list([system.initialise(await new Foo()._initialise())]);
  let b = 0;
  b = (await system.safeIndex(f, 0).b.ff());
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.b = system.initialise(await new Bar()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_b;
  get b() {
    return this.elan_b ??= Bar.emptyInstance();
  }
  set b(b) {
    this.elan_b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async ff() {
    return 4;
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain4", async () => {
    const code = `${testPythonHeader}

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.y = Yon() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  y: Yon # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

def main() -> None:
  f = [Foo()] # variable definition
  b = 0 # variable definition
  b = f[0].b.ff() # assignment
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff(self: Bar) -> int: # function method
    return 4
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.list([system.initialise(await new Foo()._initialise())]);
  let b = 0;
  b = (await system.safeIndex(f, 0).b.ff());
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.b = system.initialise(await new Bar()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_b;
  get b() {
    return this.elan_b ??= Bar.emptyInstance();
  }
  set b(b) {
    this.elan_b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async ff() {
    return 4;
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_StringRange", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

def main() -> None:
  s = "" # variable definition
  s = "Hello World!".lowerCase().subString(0, 1).upperCase() # assignment
  printNoLine(s) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "";
  s = _stdlib.upperCase(_stdlib.subString(_stdlib.lowerCase("Hello World!"), 0, 1));
  await _stdlib.printNoLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "H");
  });

  test("Pass_StringRange1", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.b = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  b: Bar # property

# end class

def main() -> None:
  aStringVar = "abcdexefg" # variable definition
  s = "" # variable definition
  s = aStringVar.upperCase().subString(1, 7).subString(2, 6).indexOf("X").toString() # assignment
  printNoLine(s) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aStringVar = "abcdexefg";
  let s = "";
  s = (await _stdlib.toString(_stdlib.indexOf(_stdlib.subString(_stdlib.subString(_stdlib.upperCase(aStringVar), 1, 7), 2, 6), "X")));
  await _stdlib.printNoLine(s);
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
  test("Pass_New", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  aStringVar = "abcdexefg" # variable definition
  s = "" # variable definition
  s = aStringVar.upperCase().subString(1, 7).subString(2, 6).indexOf("X").toString() # assignment
  printNoLine(s) # procedure call
# end main

def main() -> None:
  a = "" # variable definition
  a = (Bar()).strArr[0].upperCase()[0] # assignment
  printNoLine(a) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.strArr = ["apple", "orange", "pair"] # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  strArr: list[str] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "";
  a = system.safeIndex(_stdlib.upperCase(system.safeIndex((system.initialise(await new Bar()._initialise())).strArr, 0)), 0);
  await _stdlib.printNoLine(a);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["strArr", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.strArr = system.list(["apple", "orange", "pair"]);
    return this;
  }

  async toString() {
    return "";
  }

  strArr = system.initialise(_stdlib.List.emptyInstance());

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
    await assertObjectCodeExecutes(fileImpl, "A");
  });
  test("Pass_CreateList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "" # variable definition
  a = (Bar()).strArr[0].upperCase()[0] # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  aFoo = Foo() # variable definition
  b = 0 # variable definition
  b = aFoo.createLst(10).subList(1, 5).length() + 3 # assignment
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def createLst(self: Foo, n: int) -> list[int]: # function method
    return createPopulatedList(n, 7)
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aFoo = system.initialise(await new Foo()._initialise());
  let b = 0;
  b = (await aFoo.createLst(10)).subList(1, 5).length() + 3;
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async createLst(n) {
    return _stdlib.createPopulatedList(n, 7);
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

  test("Pass_CreateList1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  aFoo = Foo() # variable definition
  b = 0 # variable definition
  b = aFoo.createLst(10).subList(1, 5).length() + 3 # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  aBar = Bar() # variable definition
  b = 0 # variable definition
  b = 5 + aBar.foo.create2DList()[2][1] - 2 # assignment
  printNoLine(b) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.foo = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  foo: Foo # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def create2DList(self: Foo) -> list[list[int]]: # function method
    return [[8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8]]
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aBar = system.initialise(await new Bar()._initialise());
  let b = 0;
  b = 5 + system.safeIndex(system.safeIndex((await aBar.foo.create2DList()), 2), 1) - 2;
  await _stdlib.printNoLine(b);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.foo = system.initialise(await new Foo()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_foo;
  get foo() {
    return this.elan_foo ??= Foo.emptyInstance();
  }
  set foo(foo) {
    this.elan_foo = foo;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  async create2DList() {
    return system.list([system.list([8, 8, 8, 8]), system.list([8, 8, 8, 8]), system.list([8, 8, 8, 8])]);
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

  test("Pass_HoFs1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  aBar = Bar() # variable definition
  b = 0 # variable definition
  b = 5 + aBar.foo.create2DList()[2][1] - 2 # assignment
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def create2DList(self: Foo) -> list[list[int]]: # function method
    return [[8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8]]
  # end function method

# end class

def main() -> None:
  a = [1, 2, 3, 4, 5, 6] # variable definition
  printNoLine(a.filter(lambda x: int: x > 2).map(lambda x: int: x*x).reduce(0, lambda s: int, x: int: s + x)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5, 6]);
  await _stdlib.printNoLine((await (await (await a.filter(async (x) => x > 2)).map(async (x) => x * x)).reduce(0, async (s, x) => s + x)));
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
    await assertObjectCodeExecutes(fileImpl, "86");
  });

  test("Pass_HoFs2", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def create2DList(self: Foo) -> list[list[int]]: # function method
    return [[8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8]]
  # end function method

# end class

def main() -> None:
  a = [1, 2, 3, 4, 5, 6] # variable definition
  c = a.subList(0, 5).map(lambda x: int: x*x) # variable definition
  printNoLine(c.subList(2, c.length()).reduce(0, lambda s: int, x: int: s + x)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5, 6]);
  let c = (await a.subList(0, 5).map(async (x) => x * x));
  await _stdlib.printNoLine((await c.subList(2, c.length()).reduce(0, async (s, x) => s + x)));
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
    await assertObjectCodeExecutes(fileImpl, "50");
  });

  test("Fail_TypeError", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4, 5, 6] # variable definition
  c = a.subList(0, 5).map(lambda x: int: x*x) # variable definition
  printNoLine(c.subList(2, c.length()).reduce(0, lambda s: int, x: int: s + x)) # procedure call
# end main

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  b = "" # variable definition
  b = a[1][1] # assignment
  printNoLine(b) # procedure call
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
      "Incompatible types. Expected: String, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_TypeError1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [[1, 2], [3, 4]] # variable definition
  b = "" # variable definition
  b = a[1][1] # assignment
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = Foo() # variable definition
  b = a.ff().fd() # variable definition
  printNoLine(b) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def ff(self: Foo) -> Bar: # function method
    return Bar()
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff(self: Bar) -> int: # function method
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
      "'fd' is not defined for type 'Bar'.ErrorMessages.html#compile_error",
    ]);
  });
});
