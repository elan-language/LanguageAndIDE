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

suite("Python Concrete Class", () => {
  test("Pass_initialiseInConstructor", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  a = foo.p # variable definition
  printNoLine(a)
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p: list[int]

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let a = foo.p;
  await _stdlib.printNoLine(a);
}

class Foo {

  async _initialise() {
    this.p = system.initialise(await new _stdlib.List()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  p = system.initialise(_stdlib.List.emptyInstance());

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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Pass_Class_SimpleInstantiation_PropertyAccess_Methods", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x.p1) 
  printNoLine(x.p2) 
  printNoLine(x.toString()) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "" # assignment
  # end constructor

  p1: float

  p2: str

  def toString(self: Foo) -> str:
    return ""
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
  await _stdlib.printNoLine((await x.toString()));
}

class Foo {

  async _initialise() {
    this.p1 = 5;
    this.p2 = "";
    return this;
  }

  p1 = 0;

  p2 = "";

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

  test("Pass_ConstructorWithParm", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo(7, "Apple") # variable definition
  printNoLine(x.p1) 
  printNoLine(x.p2) 
# end main

class Foo: # concrete class

  def __init__(self: Foo, p_1: float, p_2: str) -> None:
    self.p1 = p_1 # assignment
    self.p2 = p_2 # assignment
  # end constructor

  p1: float

  p2: str

  def toString(self: Foo) -> str:
    return ""
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
}

class Foo {

  async _initialise(p_1, p_2) {
    this.p1 = p_1;
    this.p2 = p_2;
    return this;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test("Pass_ConstructorAsScope", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  y = x.b # variable definition
  y.printP1() 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    bar = Bar() # variable definition
    self.b = bar # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  b: Bar

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = 5 # assignment
  # end constructor

  def toString(self: Bar) -> str:
    return ""
  # end function

  p1: int

  def printP1(self: Bar) -> None:
    printNoLine(self.p1) 
  # end procedure

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  let y = x.b;
  await y.printP1();
}

class Foo {

  async _initialise() {
    let bar = system.initialise(await new Bar()._initialise());
    this.b = bar;
    return this;
  }

  async toString() {
    return "";
  }

  b;

}

class Bar {

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async printP1() {
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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ReferenceProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  bar = foo.bar # variable definition
  printNoLine(bar.p1) 
  printNoLine(bar.p2) 
  opt = bar.foo # variable definition
  opt.put(foo) 
  foo2 = bar.foo.getValue() # variable definition
  bar2 = foo2.bar # variable definition
  printNoLine(bar2.p1) 
  printNoLine(bar2.p2) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.bar = Bar() # assignment
  # end constructor

  bar: Bar

  def toString(self: Foo) -> str:
    return ""
  # end function

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p2 = "" # assignment
    self.foo = Maybe[Foo]() # assignment
  # end constructor

  p1: int

  p2: str

  foo: Maybe[Foo]

  def toString(self: Bar) -> str:
    return ""
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let bar = foo.bar;
  await _stdlib.printNoLine(bar.p1);
  await _stdlib.printNoLine(bar.p2);
  let opt = bar.foo;
  opt.put(foo);
  let foo2 = bar.foo.getValue();
  let bar2 = foo2.bar;
  await _stdlib.printNoLine(bar2.p1);
  await _stdlib.printNoLine(bar2.p2);
}

class Foo {

  async _initialise() {
    this.bar = system.initialise(await new Bar()._initialise());
    return this;
  }

  bar;

  async toString() {
    return "";
  }

}

class Bar {

  async _initialise() {
    this.p2 = "";
    this.foo = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  p1 = 0;

  p2 = "";

  foo;

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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_IndexProperty", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  foo = Foo() # variable definition
  b = foo.strArr[0] # variable definition
  printNoLine(b) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.strArr = ["apple", "orange", "pair"] # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  strArr: list[str]

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let b = system.safeIndex(foo.strArr, 0);
  await _stdlib.printNoLine(b);
}

class Foo {

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
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_MutableClassAsProcedureParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  proc(f) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

# end class

def proc(foo: Foo) -> None: # procedure
  printNoLine(foo.p1) 
# end procedure

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await proc(f);
}

class Foo {

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

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

  test("Pass_MutableClassAsFunctionParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(fun(f)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def updateP1(self: Foo) -> None:
    self.p1 = 0 # assignment
  # end procedure

# end class

def fun(foo: Foo) -> int: # function
  return foo.p1
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await global.fun(f)));
}

class Foo {

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async updateP1() {
    this.p1 = 0;
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

  test("Pass_InheritedPropertyInitialised", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  prop_1: str

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop_1 = "" # assignment
  # end constructor

  def toString(self: Bar) -> str:
    return self.prop_1
  # end function

# end class
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
class Foo {
  prop_1 = "";

}

class Bar extends Foo {

  async _initialise() {
    this.prop_1 = "";
    return this;
  }

  async toString() {
    return this.prop_1;
  }

}

async function main() {

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

  test("Pass_NoConstructor", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def updateP1(self: Foo) -> None:
    self.p1 = 0 # assignment
  # end procedure

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:
    self.prop_1 = "" # assignment
  # end constructor

  def toString(self: Bar) -> str:
    return self.prop_1
  # end function

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  p1: int

  p2: str

  def toString(self: Foo) -> str:
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
  });

  test("Pass_ConstructorWithFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f.p1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = self.ff() # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def ff(self: Foo) -> int:
    return 0
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f.p1);
}

class Foo {

  async _initialise() {
    this.p1 = (await this.ff());
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async ff() {
    return 0;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_UpdatePropertyInFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f = f.with_P1(1) # assignment
  printNoLine(f.p1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def with_P1(self: Foo, p: int) -> Foo:
    return copyWith(self, "p1", p)
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  f = (await f.with_P1(1));
  await _stdlib.printNoLine(f.p1);
}

class Foo {

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async with_P1(p) {
    return _stdlib.copyWith(this, "p1", p);
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_WithPattern", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.setup(100, "initial") 
  f1 = f.withP1(101) # variable definition
  f2 = f1.withP2("updated") # variable definition
  f3 = f2.withP1(102).withP2("updated2") # variable definition
  printNoLine(f) 
  printNoLine(f1) 
  printNoLine(f2) 
  printNoLine(f3) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = "" # assignment
    self.p3 = "" # assignment
  # end constructor

  p1: int

  p2: str

  p3: str

  def withP1(self: Foo, p: int) -> Foo:
    return copyWith(self, "p1", p)
  # end function

  def withP2(self: Foo, p: str) -> Foo:
    return copyWith(self, "p2", p)
  # end function

  def setup(self: Foo, pI: int, pS: str) -> None:
    self.p1 = pI # assignment
    self.p2 = pS # assignment
    self.p3 = "unchanged" # assignment
  # end procedure

  def toString(self: Foo) -> str:
    return "Foo:" + self.p1.toString() + ":" + self.p2 + ":" + self.p3
  # end function

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.setup(100, "initial");
  let f1 = (await f.withP1(101));
  let f2 = (await f1.withP2("updated"));
  let f3 = (await (await f2.withP1(102)).withP2("updated2"));
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(f1);
  await _stdlib.printNoLine(f2);
  await _stdlib.printNoLine(f3);
}

class Foo {

  async _initialise() {
    this.p2 = "";
    this.p3 = "";
    return this;
  }

  p1 = 0;

  p2 = "";

  p3 = "";

  async withP1(p) {
    return _stdlib.copyWith(this, "p1", p);
  }

  async withP2(p) {
    return _stdlib.copyWith(this, "p2", p);
  }

  async setup(pI, pS) {
    this.p1 = pI;
    this.p2 = pS;
    this.p3 = "unchanged";
  }

  async toString() {
    return "Foo:" + (await _stdlib.toString(this.p1)) + ":" + this.p2 + ":" + this.p3;
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
    await assertObjectCodeExecutes(
      fileImpl,
      "Foo:100:initial:unchangedFoo:101:initial:unchangedFoo:101:updated:unchangedFoo:102:updated2:unchanged",
    );
  });

  test("Pass_ProcedureNameMatchesCalledProcedureName", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.append() 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: list[int]

  def append(self: Foo) -> None:
    p1 = self.p1 # variable definition
    p1.append(1) 
    printNoLine(self.p1) 
  # end procedure

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.append();
}

class Foo {

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.List()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  p1 = system.initialise(_stdlib.List.emptyInstance());

  async append() {
    let p1 = this.p1;
    p1.append(1);
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
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Fail_InitialisePropertyInLine", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  p1: int set to 3

  def toString(self: Foo) -> str:
    return "undefined"
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

  test("Fail_AttemptToModifyAPropertyDirectly", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  p1: int set to 3

  def toString(self: Foo) -> str:
    return "undefined"
  # end function

# end class

def main() -> None:
  x = Foo() # variable definition
  x.p1 =  # assignment
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OverloadedConstructor", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  x.p1 =  # assignment
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InstantiateWithoutRequiredArgs", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo, val: int) -> None:
    self.p1 = val # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

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
      "Missing argument(s). Expected: val (int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InstantiateWithWrongArgType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo(7.1) # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo, val: int) -> None:
    self.p1 = val # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

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
      "Argument types. Expected: val (int), Provided: float.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_SupplyingArgumentNotSpecified", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo(7) # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

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
      "Too many argument(s). Expected: none.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingClassOnInstantiation", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_IncompatibleClassAsProcedureParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  proc(f) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str:
    return ""
  # end function

  p1: int

# end class

def proc(bar: Bar) -> None: # procedure
  printNoLine(bar.p1) 
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
      "Argument types. Expected: bar (Bar), Provided: Foo.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_IncompatibleClassAsFunctionParameter", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(fun(f)) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str:
    return ""
  # end function

  p1: int

# end class

def fun(bar: Bar) -> int: # function
  return bar.p1
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

  test("Fail_UnknownPropertyType", async () => {
    const code = `${testPythonHeader}

def fun(bar: Bar) -> int: # function
  return bar.p1
# end function

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Bar() # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: Bar

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

  test("Fail_DuplicateNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

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

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = "" # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: str

  p1: int

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

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo) -> int:
    return 0
  # end function

  def ff(self: Foo) -> int:
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
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo) -> None:

  # end procedure

  def ff(self: Foo) -> None:

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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo) -> None:

  # end procedure

  ff: int

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

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo) -> int:
    return 0
  # end function

  ff: int

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

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  def ff(self: Foo) -> int:
    return 0
  # end function

  def ff(self: Foo) -> None:

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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_ConstructorWithCall", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    sleep(1)
  # end constructor

  def toString(self: Foo) -> str:
    return "undefined"
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
      "Cannot call Procedure in Constructor or Function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UnnecessaryGenericParm1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo[str]() # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "generic type specifier was not expected here.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_UnnecessaryGenericParm2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Random[str]() # variable definition
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
      "generic type specifier was not expected here.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_CannotNewUnknownType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = FooBar() # variable definition
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
      "'FooBar' is not defined.ErrorMessages.html#compile_error",
      "'FooBar' is not defined.ErrorMessages.html#compile_error",
      "Cannot create instance of FooBar.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotNewNonClassType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = int() # variable definition
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
      "Cannot create instance of int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PropertyIsNotDefined", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.vg = CircleVG() # assignment
  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  vg: CircleVG

  def bar(self: Foo) -> None:
    self.vg = self.vg.noSuch # assignment
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
      "'noSuch' is not defined for type 'CircleVG'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Foo(Foo): # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  prop: int

  def toString(self: Foo) -> str:
    return "undefined"
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
      "Class/interface 'Foo' cannot inherit from itself.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Yon(Foo): # concrete class

  def __init__(self: Yon) -> None:

  # end constructor

  prop: int

  def toString(self: Yon) -> str:
    return "undefined"
  # end function

# end class

class Bar(Yon): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  prop: int

  def toString(self: Bar) -> str:
    return "undefined"
  # end function

# end class

class Foo(Bar): # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  prop: int

  def toString(self: Foo) -> str:
    return "undefined"
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
      "Class/interface 'Yon' cannot inherit from itself.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotInheritFromYourself", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Bar(Bar): # abstract class

  prop: int

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
      "Class/interface 'Bar' cannot inherit from itself.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CallConstructor", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.__init__() 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UpdatePropertyInFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f = f.withP1(1) # assignment
  printNoLine(f.p1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def withP1(self: Foo, p: int) -> Foo:
    self.p1 = p # assignment
    return self
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
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UpdatePropertyInFunction1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f = f.withP1(1) # assignment
  printNoLine(f.p1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def withP1(self: Foo, p: int) -> Foo:
    self.p1 = p # assignment
    return self
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
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_UpdatePropertyInProc", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.setP1(1) 
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def setP1(self: Foo, p: int) -> None:
    self.p1 = p # assignment
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
  });

  test("Fail_PropertyMustBeInitialised", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str:
    return ""
  # end function

  p1: int

  def withP1(self: Foo, p: int) -> None:

  # end procedure

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  prop_1: str

  def toString(self: Bar) -> str:
    return "undefined"
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
      "Property prop_1 must be initialised in constructor.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritedPropertyMustBeInitialised", async () => {
    const code = `${testPythonHeader}

class Foo(ABC): # abstract class

  prop_1: str

# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str:
    return self.prop_1
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
      "Property prop_1 must be initialised in constructor.ErrorMessages.html#compile_error",
    ]);
  });
});
