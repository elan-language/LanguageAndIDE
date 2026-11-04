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

suite("Python Conditional Expressions", () => {
  test("Pass_InFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(grade(90)) # procedure call
  printNoLine(grade(70)) # procedure call
  printNoLine(grade(50)) # procedure call
  printNoLine(grade(30)) # procedure call
# end main

def grade(score: float) -> str: # function
  return "Distinction" if score > 80 else "Merit" if score > 60 else "Pass" if score > 40 else "Fail" 
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.grade(90)));
  await _stdlib.printNoLine((await global.grade(70)));
  await _stdlib.printNoLine((await global.grade(50)));
  await _stdlib.printNoLine((await global.grade(30)));
}

async function grade(score) {
  return (score > 40 ? (score > 60 ? (score > 80 ? "Distinction" : "Merit") : "Pass") : "Fail");
}
global["grade"] = grade;
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
    await assertObjectCodeExecutes(fileImpl, "DistinctionMeritPassFail");
  });

  test("Pass_InVariableDeclaration", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = 70 # variable definition
  grade = "Distinction" if score > 80 else "Merit" if score > 60 else "Pass" if score > 40 else "Fail"  # variable definition
  printNoLine(grade) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70;
  let grade = (score > 40 ? (score > 60 ? (score > 80 ? "Distinction" : "Merit") : "Pass") : "Fail");
  await _stdlib.printNoLine(grade);
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
    await assertObjectCodeExecutes(fileImpl, "Merit");
  });

  test("Pass_InExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = 70 # variable definition
  score = score + 1 if score == 70 else 2 # assignment
  printNoLine(score) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70;
  score = score + (score === 70 ? 1 : 2);
  await _stdlib.printNoLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "71");
  });

  test("Pass_MostPreciseType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = 70.1 # variable definition
  score = 60.1 if True else 60 # assignment
  printNoLine(score) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70.1;
  score = (true ? 60.1 : 60);
  await _stdlib.printNoLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "60.1");
  });

  test("Pass_MostPreciseType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = 70.1 # variable definition
  score = 60 if False else 60.1 # assignment
  printNoLine(score) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70.1;
  score = (false ? 60 : 60.1);
  await _stdlib.printNoLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "60.1");
  });

  test("Pass_CommonSuperClass1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = cast(Bar()) # variable definition
  score = Bar() if False else cast(Bar()) # assignment
  printNoLine(score) # procedure call
# end main

class Foo(ABC): # abstract class


# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "a Bar"
  # end function method

# end class

def cast(bar: Foo) -> Foo: # function
  return bar
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = (await global.cast(system.initialise(await new Bar()._initialise())));
  score = (false ? system.initialise(await new Bar()._initialise()) : (await global.cast(system.initialise(await new Bar()._initialise()))));
  await _stdlib.printNoLine(score);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Bar";
  }

}

async function cast(bar) {
  return bar;
}
global["cast"] = cast;
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
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_CommonSuperClass2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = cast(Bar()) # variable definition
  score = cast(Bar()) if False else Bar() # assignment
  printNoLine(score) # procedure call
# end main

class Foo(ABC): # abstract class


# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "a Bar"
  # end function method

# end class

def cast(bar: Foo) -> Foo: # function
  return bar
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = (await global.cast(system.initialise(await new Bar()._initialise())));
  score = (false ? (await global.cast(system.initialise(await new Bar()._initialise()))) : system.initialise(await new Bar()._initialise()));
  await _stdlib.printNoLine(score);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Bar";
  }

}

async function cast(bar) {
  return bar;
}
global["cast"] = cast;
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
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Fail_EndIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(grade(90)) # procedure call
  printNoLine(grade(70)) # procedure call
  printNoLine(grade(50)) # procedure call
  printNoLine(grade(30)) # procedure call
# end main

def grade(score: int) -> : # function
  return 
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NotBooleanCondition", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 2 if 5 else 7 # variable definition
  printNoLine(a) # procedure call
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
      "Condition of 'if' expression does not evaluate to a bool.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_BranchesDifferentTypes", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "five" if True else 7 # variable definition
  printNoLine(a) # procedure call
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
      "Cannot determine common type between int and str.ErrorMessages.html#TernaryCompileError",
    ]);
  });

  test("Fail_MostPreciseType1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 10 # variable definition
  a = 0.5 if True else 10 # assignment
  printNoLine(a) # procedure call
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
      "Incompatible types. Expected: int, Provided: float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_MostPreciseType2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 10 # variable definition
  a = 10 if True else 0.5 # assignment
  printNoLine(a) # procedure call
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
      "Incompatible types. Expected: int, Provided: float.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_NoCommonSuperClass1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = Bar() # variable definition
  score = Foo() if False else Bar() # assignment
  printNoLine(score) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
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
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot determine common type between Bar and Foo.ErrorMessages.html#TernaryCompileError",
      "Incompatible types. Expected: Bar, Provided: Foo.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_NoCommonSuperClass2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = Bar() # variable definition
  score = Bar() if False else Foo() # assignment
  printNoLine(score) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
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
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot determine common type between Foo and Bar.ErrorMessages.html#TernaryCompileError",
    ]);
  });

  test("Fail_CannotAssignToBaseClass1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = Bar() # variable definition
  score =  Bar() if False else cast(Bar()) # assignment
  printNoLine(score) # procedure call
# end main

class Foo(ABC): # abstract class


# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "undefined"
  # end function method

# end class

def cast(bar: Foo) -> Foo: # function
  return bar
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
      "Incompatible types. Expected: Bar, Provided: Foo.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CannotAssignToBaseClass2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  score = Bar() # variable definition
  score = cast(Bar()) if False else Bar() # assignment
  printNoLine(score) # procedure call
# end main

class Foo(ABC): # abstract class


# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return "undefined"
  # end function method

# end class

def cast(bar: Foo) -> Foo: # function
  return bar
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
      "Incompatible types. Expected: Bar, Provided: Foo.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
