import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Char Mapped Display", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = Foo() # variable definition
  b = a.ff().fd() # variable definition
  printNoLine(b) # procedure call
# end main

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

def main() -> None:
  g = createBlockGraphics(white) # variable definition
  displayBlocks(g) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = (await _stdlib.createBlockGraphics(_stdlib.white));
  await _stdlib.displayBlocks(g);
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
    await assertGraphicsContains(fileImpl, 0, '<div style="background-color:#ffffff;">');
  });

  test("Pass_withPut", async () => {
    const code = `${testPythonHeader}

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

def main() -> None:
  g = createBlockGraphics(white) # variable definition
  g[1][0] = 4 # assignment
  displayBlocks(g) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = (await _stdlib.createBlockGraphics(_stdlib.white));
  system.safeSet(g, 4, [1, 0]);
  await _stdlib.displayBlocks(g);
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
    await assertGraphicsContains(fileImpl, 1, '<div style="background-color:#000004;">');
  });

  test("Pass_ClearBlocks", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  g = createBlockGraphics(white) # variable definition
  g[1][0] = 4 # assignment
  displayBlocks(g) # procedure call
# end main

def main() -> None:
  g = createBlockGraphics(white) # variable definition
  displayBlocks(g) # procedure call
  clearBlocks() # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = (await _stdlib.createBlockGraphics(_stdlib.white));
  await _stdlib.displayBlocks(g);
  await _stdlib.clearBlocks();
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
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_getKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  g = createBlockGraphics(white) # variable definition
  displayBlocks(g) # procedure call
  clearBlocks() # procedure call
# end main

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  a = getKey() # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = (await _stdlib.createBlockGraphics(_stdlib.white));
  let a = (await _stdlib.getKey());
  await _stdlib.printNoLine(a);
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

  test("Pass_getNumericKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  a = getKey() # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = 0 # variable definition
  a = getNumericKey() # assignment
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.getNumericKey());
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "-1");
  });

  test("Pass_waitForKey", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 0 # variable definition
  a = getNumericKey() # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = waitForKey() # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.waitForKey());
  await _stdlib.printNoLine(a);
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

  test("Pass_getKeyWithModifier", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = waitForKey() # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  a = getKeyWithModifier() # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = (await _stdlib.createBlockGraphics(_stdlib.white));
  let a = (await _stdlib.getKeyWithModifier());
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "(, )");
  });

  test("Pass_clearKeyBuffer", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  a = getKeyWithModifier() # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  clearKeyBuffer() # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = (await _stdlib.createBlockGraphics(_stdlib.white));
  await _stdlib.clearKeyBuffer();
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

  test("Pass_newGraphics", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  gr = createBlockGraphics(white) # variable definition
  clearKeyBuffer() # procedure call
# end main

def main() -> None:
  a = createBlockGraphics(white) # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.createBlockGraphics(_stdlib.white));
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

  test("Pass_defaultGraphics", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createBlockGraphics(white) # variable definition
# end main

def main() -> None:
  foo = Foo() # variable definition
  a = foo.p # variable definition
  printNoLine(a) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p: list[int] # property

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
  static emptyInstance() { return system.emptyClass(Foo, [["p", system.initialise(_stdlib.List.emptyInstance())]]);};

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
});
