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

suite("Python Enum", () => {
  test("Pass_PrintValues", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  for x in a:
    b = x.z # variable definition
  # end for
# end main

def main() -> None:
  printNoLine(enumToString(Fruit.apple)) # procedure call
  printNoLine(enumToString(Fruit.orange)) # procedure call
  printNoLine(enumToString(Fruit.pear)) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine((await _stdlib.enumToString(Fruit.apple)));
  await _stdlib.printNoLine((await _stdlib.enumToString(Fruit.orange)));
  await _stdlib.printNoLine((await _stdlib.enumToString(Fruit.pear)));
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
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_useInVariable", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(enumToString(Fruit.apple)) # procedure call
  printNoLine(enumToString(Fruit.orange)) # procedure call
  printNoLine(enumToString(Fruit.pear)) # procedure call
# end main

def main() -> None:
  x = Fruit.apple # variable definition
  x = Fruit.pear # assignment
  printNoLine(enumToString(x)) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  x = Fruit.pear;
  await _stdlib.printNoLine((await _stdlib.enumToString(x)));
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
    await assertObjectCodeExecutes(fileImpl, "pear");
  });

  test("Pass_variableNameSameAsType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Fruit.apple # variable definition
  x = Fruit.pear # assignment
  printNoLine(enumToString(x)) # procedure call
# end main

def main() -> None:
  fruit = Fruit.apple # variable definition
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let fruit = Fruit.apple;
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

  test("Pass_useAsType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  fruit = Fruit.apple # variable definition
# end main

def main() -> None:
  x = Fruit.apple # variable definition
  y = x # variable definition
  printNoLine(enumToString(y)) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  let y = x;
  await _stdlib.printNoLine((await _stdlib.enumToString(y)));
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

  test("Pass_passAsArgument", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Fruit.apple # variable definition
  y = x # variable definition
  printNoLine(enumToString(y)) # procedure call
# end main

def main() -> None:
  printNoLine(isFavourite(Fruit.apple)) # procedure call
  printNoLine(isFavourite(Fruit.pear)) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def isFavourite(f: Fruit) -> bool: # function
  return f == Fruit.pear
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.isFavourite(Fruit.apple)));
  await _stdlib.printNoLine((await global.isFavourite(Fruit.pear)));
}

async function isFavourite(f) {
  return f === Fruit.pear;
}
global["isFavourite"] = isFavourite;
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
    await assertObjectCodeExecutes(fileImpl, "falsetrue");
  });

  test("Pass_returnFromFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(isFavourite(Fruit.apple)) # procedure call
  printNoLine(isFavourite(Fruit.pear)) # procedure call
# end main

def isFavourite(f: Fruit) -> bool: # function
  return f == Fruit.pear
# end function

def main() -> None:
  printNoLine(firstFruit() == Fruit.apple) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def firstFruit() -> Fruit: # function
  return Fruit.apple
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.firstFruit()) === Fruit.apple);
}

async function firstFruit() {
  return Fruit.apple;
}
global["firstFruit"] = firstFruit;
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_equality", async () => {
    const code = `${testPythonHeader}

def isFavourite(f: Fruit) -> bool: # function
  return f == Fruit.pear
# end function

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  x = Fruit.apple # variable definition
  printNoLine(x == Fruit.apple) # procedure call
  printNoLine(x == Fruit.pear) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  await _stdlib.printNoLine(x === Fruit.apple);
  await _stdlib.printNoLine(x === Fruit.pear);
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
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_InInterpolatedString", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = f"Eat more {enumToString(Fruit.apple)}s!" # variable definition
  printNoLine(a) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = \`Eat more \${await _stdlib.toString((await _stdlib.enumToString(Fruit.apple)))}s!\`;
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
    await assertObjectCodeExecutes(fileImpl, "Eat more apples!");
  });

  test("Fail_coercionToString", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  a = "Eat more " + Fruit.apple # variable definition
  printNoLine(a) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Fruit.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_InvalidTypeName", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:

# end main

class fruit(Enum):

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

  test("Fail_InvalidValueName", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class fruit(Enum):

def main() -> None:

# end main

class Fruit(Enum):apple, Orange, pear

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

  test("Fail_AssigningIntsToValues", async () => {
    const code = `${testPythonHeader}

class fruit(Enum):

class Fruit(Enum):apple, Orange, pear

def main() -> None:

# end main

class Fruit(Enum):apple = 1, orange = 2, pear = 3

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

  test("Fail_coercionToInt", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):apple, Orange, pear

class Fruit(Enum):apple = 1, orange = 2, pear = 3

def main() -> None:
  a = 1 # variable definition
  a = Fruit.apple # assignment
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
      "Incompatible types. Expected: Int, Provided: Fruit.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_undefinedEnum", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):apple = 1, orange = 2, pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  printNoLine(Fruit.apple) # procedure call
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
    assertDoesNotCompile(fileImpl, ["'Fruit' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_undefinedEnumValue", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  printNoLine(Fruit.kiwi) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
    assertDoesNotCompile(fileImpl, ["'kiwi' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(Fruit.kiwi) # procedure call
# end main

def main() -> None:

# end main

class if(Enum):

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

  test("Fail_UseOfKeywordAsValue", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Fruit(Enum):apple, orange, if

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

  test("Fail_UseOfReservedWordAsValue", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  break = 3

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

  test("Fail_DuplicateNames", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:

# end main

class Fruit(Enum):
  banana = 1
  kiwi = 2

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
      "Name 'Fruit' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateValues", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:

# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3
  orange = 4

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
      "Name 'orange' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PrintValues", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3
  orange = 4

def main() -> None:
  printNoLine(Fruit.apple) # procedure call
  printNoLine(Fruit.orange) # procedure call
  printNoLine(Fruit.pear) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
      "Argument types. Expected: item (AnyExceptEnum), Provided: Fruit.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_NotEnumValue", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3
  orange = 4

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

def main() -> None:
  printNoLine(enumToString("Fruit.apple")) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  orange = 2
  pear = 3

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
      "Argument types. Expected: enum value (AnyEnum), Provided: String.ErrorMessages.html#compile_error",
    ]);
  });
});
