import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Arithmetic Expressions", () => {
  test("Pass_BracketsChangeOperatorEvaluation", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Bar() # variable definition
  printNoLine(func1(x)) # procedure call
# end main

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

class Foo(ABC): # abstract class

  @abstractmethod
  def func() -> int:
    pass # abstract function

# end class

class Foo2(ABC): # abstract class

  prop: int # property

# end class

def main() -> None:
  x = 2 + 3*5 + 1 # variable definition
  y = (2 + 3)*5 + 1 # variable definition
  z = (2 + 3)*(5 + 1) # variable definition
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
  printNoLine(z) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + 3 * 5 + 1;
  let y = (2 + 3) * 5 + 1;
  let z = (2 + 3) * (5 + 1);
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
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
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  test("Pass_RedundantBracketsIgnored", async () => {
    const code = `${testPythonHeader}

class Bar(Foo2): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def ff1(self: Bar) -> int: # function method
    return 1
  # end function method

  def ff2(self: Bar) -> int: # function method
    return 2
  # end function method

# end class

class Foo2(ABC): # abstract class

  prop: int # property

# end class

def main() -> None:
  x = 2 + (3*5) + 1 # variable definition
  y = ((2 + 3))*5 + (1) # variable definition
  z = ((2 + 3)*(5 + 1)) # variable definition
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
  printNoLine(z) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + (3 * 5) + 1;
  let y = ((2 + 3)) * 5 + (1);
  let z = ((2 + 3) * (5 + 1));
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
  await _stdlib.printNoLine(z);
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
    await assertObjectCodeExecutes(fileImpl, "182630");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThatMultiply", async () => {
    const code = `${testPythonHeader}

class Foo2(ABC): # abstract class

  prop: int # property

# end class

def main() -> None:
  x = 2 + 3 ^ 2 # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 2 + 3 ** 2;
  let y = (2 + 3) ** 2;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "1125");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThanFloatDivision", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 2 + 3 ^ 2 # variable definition
# end main

def main() -> None:
  x = 16.0 / 2 ^ 3 # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 16 / 2 ** 3;
  let y = (16 / 2) ** 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  ignore_test("Pass_PowerHasHigherPrecedenceThanDivision", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 16.0 / 2 ^ 3 # variable definition
# end main

def main() -> None:
  x = 16.0 / 2 ^ 3 # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 16 / 2 ** 3;
  let y = (16 / 2) ** 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "2512");
  });

  test("Pass_MinusAsAUnaryOperator", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 16.0 / 2 ^ 3 # variable definition
# end main

def main() -> None:
  x = 0.0 # variable definition
  y = 0 # variable definition
  x = -4.7 # assignment
  y = 5*-3 # assignment
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 0;
  let y = 0;
  x = (-4.7);
  y = 5 * (-3);
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "-4.7-15");
  });

  test("Pass_OperatorPrecedenceForMod", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 0.0 # variable definition
  y = 0 # variable definition
  x = -4.7 # assignment
  y = 5*-3 # assignment
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
# end main

def main() -> None:
  x = 11 % 3 # variable definition
  y = (5 + 6) % 3 # variable definition
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 11 % 3;
  let y = (5 + 6) % 3;
  await _stdlib.printNoLine(x);
  await _stdlib.printNoLine(y);
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
    await assertObjectCodeExecutes(fileImpl, "22");
  });

  test("Fail_PlusIsNotUnary", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 11 % 3 # variable definition
  y = (5 + 6) % 3 # variable definition
  printNoLine(x) # procedure call
  printNoLine(y) # procedure call
# end main

def main() -> None:
  a = 3 * + 4 # variable definition
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

  test("Fail_MultiplyAfterMinus", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 * + 4 # variable definition
# end main

def main() -> None:
  a = 3 - * 4 # variable definition
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

  test("Pass_OperatorOrder#1167", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 3 - * 4 # variable definition
# end main

def main() -> None:
  printNoLine(2*12/3.0 + 190) # procedure call
  printNoLine(24/6/2.0) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(2 * 12 / 3 + 190);
  await _stdlib.printNoLine(24 / 6 / 2);
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
    await assertObjectCodeExecutes(fileImpl, "1982");
  });
  test("Pass_NaN#1167", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(2*12/3.0 + 190) # procedure call
  printNoLine(24/6/2.0) # procedure call
# end main

def main() -> None:
  printNoLine(sqrt(-1)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.sqrt((-1)));
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
    await assertObjectCodeExecutes(fileImpl, "NaN");
  });
  test("Pass_Infinity#1167", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(sqrt(-1)) # procedure call
# end main

def main() -> None:
  printNoLine(1.0/0) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(1 / 0);
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
    await assertObjectCodeExecutes(fileImpl, "Infinity");
  });
  test("Pass_HexAndBinaryLiterals", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(1.0/0) # procedure call
# end main

def main() -> None:
  h = 0xfffe # variable definition
  b = 0b111011 # variable definition
  printNoLine(h) # procedure call
  printNoLine(" ") # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let h = 65534;
  let b = 59;
  await _stdlib.printNoLine(h);
  await _stdlib.printNoLine(" ");
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
    await assertObjectCodeExecutes(fileImpl, "65534 59");
  });
});
