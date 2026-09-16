import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python toString", () => {
  test("Pass_SimpleExtension", async () => {
    const code = `${testPythonHeader}

aa = 1 # constant

def main() -> None:
  f = 1 # variable definition
  printNoLine(f.toString()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = 1;
  await _stdlib.printNoLine((await _stdlib.toString(f)));
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

  test("Pass_EmptyClassIsCreatedWithDefaultConstructorAndToString", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = 1 # variable definition
  printNoLine(f.toString()) # procedure call
# end main

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "undefined";
  }

}
return [main, _tests];}`;

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_emptyClassAsString", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  f = Foo() # variable definition
  p = f.p1 # variable definition
  s = p.toString() # variable definition
  printNoLine(s) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Maybe[Foo]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: Maybe[Foo] # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let p = f.p1;
  let s = (await _stdlib.toString(p));
  await _stdlib.printNoLine(s);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set p1(p1) {
    this.elan_p1 = p1;
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
    await assertObjectCodeExecutes(fileImpl, "a Maybe");
  });

  // this behaviour has changed from c# compiler
  test("Pass_emptyClassReplacesAsString", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  p = f.p1 # variable definition
  s = p.toString() # variable definition
  printNoLine(s) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  s1 = f.toString() # variable definition
  p = f.p1 # variable definition
  s2 = p.toString() # variable definition
  printNoLine(s1) # procedure call
  printNoLine(s2) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = Maybe[Foo]() # assignment
  # end constructor

  p1: Maybe[Foo] # property

  def toString(self: Foo) -> str: # function method
    return "Custom toString"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s1 = (await f.toString());
  let p = f.p1;
  let s2 = (await _stdlib.toString(p));
  await _stdlib.printNoLine(s1);
  await _stdlib.printNoLine(s2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async toString() {
    return "Custom toString";
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
    await assertObjectCodeExecutes(fileImpl, "Custom toStringa Maybe");
  });

  test("Pass_AsStringMayBeCalled", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s1 = f.toString() # variable definition
  p = f.p1 # variable definition
  s2 = p.toString() # variable definition
  printNoLine(s1) # procedure call
  printNoLine(s2) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  s = f.toString() # variable definition
  printNoLine(s) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  p1: float # property

  p2: str # property

  def toString(self: Foo) -> str: # function method
    return self.p2
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s = (await f.toString());
  await _stdlib.printNoLine(s);
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

  test("Pass_AsStringCalledWhenObjectPrinted", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  s = f.toString() # variable definition
  printNoLine(s) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 5 # assignment
    self.p2 = "Apple" # assignment
  # end constructor

  p1: float # property

  p2: str # property

  def toString(self: Foo) -> str: # function method
    return self.p2
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f);
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

  test("Pass_AsStringOnVariousDataTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  printNoLine(f) # procedure call
# end main

def main() -> None:
  l = [1, 2, 3] # variable definition
  sl = l.toString() # variable definition
  printNoLine(sl) # procedure call
  a = [1, 2, 3] # variable definition
  sa = a.toString() # variable definition
  printNoLine(sa) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = system.list([1, 2, 3]);
  let sl = (await _stdlib.toString(l));
  await _stdlib.printNoLine(sl);
  let a = system.list([1, 2, 3]);
  let sa = (await _stdlib.toString(a));
  await _stdlib.printNoLine(sa);
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][1, 2, 3]");
  });
});
