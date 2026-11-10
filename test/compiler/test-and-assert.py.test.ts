import { AssertOutcome } from "../../src/compiler/assert-outcome";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { TestStatus } from "../../src/compiler/test-status";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  ignore_test,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Test and Assert", () => {
  test("Pass_PassingTest", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
  def test_square(self : Test_square) -> None:
    self.assertEqual(square(3), 9)
    actual = square(4) # variable definition
    self.assertEqual(actual, 16)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return _stdlib.pow(x, 2);
}
global["square"] = square;

_tests.push(["python_test12", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [9, "Int"], "python_assert15", _stdlib, false));
  let actual = (await global.square(4));
  _outcomes.push(await system.assert([async () => actual, "Float"], [16, "Int"], "python_assert21", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test12",
        [
          new AssertOutcome(TestStatus.pass, "9", "9", "python_assert15"),
          new AssertOutcome(TestStatus.pass, "16", "16", "python_assert21"),
        ],
      ],
    ]);
  });

  test("Pass_BracketedExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_foo(unittest.TestCase):
  def test_foo(self: Test_foo) -> None:
    self.assertEqual((3 + 4), 7)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (3 + 4), "Int"], [7, "Int"], "python_assert6", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      ["python_test3", [new AssertOutcome(TestStatus.pass, "7", "7", "python_assert6")]],
    ]);
  });

  test("Pass_AssertTuple", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self : Test_square) -> None:
    t = ("one", "two") # variable definition
    self.assertEqual(t, ("one", "two"))
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let t = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t, "(String, String)"], [system.tuple(["one", "two"]), "(String, String)"], "python_assert9", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [new AssertOutcome(TestStatus.pass, "(one, two)", "(one, two)", "python_assert9")],
      ],
    ]);
  });

  test("Pass_AssertCompoundVarRef1", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    f = Foo() # variable definition
    self.assertEqual(f.p1, 10)
  # end test
# end test class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 10 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function

  p1: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let f = system.initialise(await new Foo()._initialise());
  _outcomes.push(await system.assert([async () => f.p1, "Int"], [10, "Int"], "python_assert9", _stdlib, false));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 10;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

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
    await assertTestObjectCodeExecutes(fileImpl, [
      ["python_test3", [new AssertOutcome(TestStatus.pass, "10", "10", "python_assert9")]],
    ]);
  });

  test("Pass_FailingTest", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    self.assertEqual(square(3), 10)
    self.assertEqual(square(4), 16)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return _stdlib.pow(x, 2);
}
global["square"] = square;

_tests.push(["python_test12", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [10, "Int"], "python_assert15", _stdlib, false));
  _outcomes.push(await system.assert([async () => (await global.square(4)), "Float"], [16, "Int"], "python_assert18", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test12",
        [
          new AssertOutcome(TestStatus.fail, "Float expected: Int", "10", "python_assert15"),
          new AssertOutcome(TestStatus.pass, "16", "16", "python_assert18"),
        ],
      ],
    ]);
  });
  test("Pass_ErrorTest1", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    arr = list[int]() # variable definition
    self.assertEqual(arr[1], "Out of range index: 1 size: 0")
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], ["Out of range index: 1 size: 0", "String"], "python_assert9", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [
          new AssertOutcome(
            TestStatus.pass,
            "Out of range index: 1 size: 0",
            "Out of range index: 1 size: 0",
            "python_assert9",
          ),
        ],
      ],
    ]);
  });

  test("Pass_ErrorTest2", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    arr = list[int]() # variable definition
    self.assertEqual(arr[1], 0)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], [0, "Int"], "python_assert9", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [
          new AssertOutcome(
            TestStatus.fail,
            "Out of range index: 1 size: 0",
            "0",
            "python_assert9",
          ),
        ],
      ],
    ]);
  });
  test("Pass_ErrorTest3", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    arr = list[int]() # variable definition
    b = arr[1] # variable definition
    self.assertEqual(b, 0)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  let b = system.safeIndex(arr, 1);
  _outcomes.push(await system.assert([async () => b, "Int"], [0, "Int"], "python_assert12", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [new AssertOutcome(TestStatus.error, "Out of range index: 1 size: 0", "", "")],
      ],
    ]);
  });
  test("Pass_VariousTestsOnAssert", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_list_(unittest.TestCase):
  def test_list_(self: Test_list) -> None:
    a = [3, 2, 4, 0] # variable definition
    self.assertEqual(a, [3, 2, 4, 0])
  # end test
# end test class

class Test_list2_(unittest.TestCase):
  def test_list2_(self: Test_list2) -> None:
    a = [3, 2, 4, 0] # variable definition
    self.assertEqual(a, [3, 2, 4, 0])
  # end test
# end test class

class Test_string_(unittest.TestCase):
  def test_string_(self: Test_string) -> None:
    a = "Hello World" # variable definition
    self.assertEqual(a, "Hello World")
  # end test
# end test class

hello = "Hello" # constant

class Test_constant_(unittest.TestCase):
  def test_constant_(self: Test_constant) -> None:
    self.assertEqual(hello, "Hello")
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  hello = "Hello";

};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let a = system.list([3, 2, 4, 0]);
  _outcomes.push(await system.assert([async () => a, "List<of Int>"], [system.list([3, 2, 4, 0]), "List<of Int>"], "python_assert9", _stdlib, false));
}]);

_tests.push(["python_test12", async (_outcomes) => {
  let a = system.list([3, 2, 4, 0]);
  _outcomes.push(await system.assert([async () => a, "List<of Int>"], [system.list([3, 2, 4, 0]), "List<of Int>"], "python_assert18", _stdlib, false));
}]);

_tests.push(["python_test21", async (_outcomes) => {
  let a = "Hello World";
  _outcomes.push(await system.assert([async () => a, "String"], ["Hello World", "String"], "python_assert27", _stdlib, false));
}]);

_tests.push(["python_test33", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => global.hello, "String"], ["Hello", "String"], "python_assert36", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [new AssertOutcome(TestStatus.pass, "[3, 2, 4, 0]", "[3, 2, 4, 0]", "python_assert9")],
      ],
      [
        "python_test12",
        [new AssertOutcome(TestStatus.pass, "[3, 2, 4, 0]", "[3, 2, 4, 0]", "python_assert18")],
      ],
      [
        "python_test21",
        [new AssertOutcome(TestStatus.pass, "Hello World", "Hello World", "python_assert27")],
      ],
      ["python_test33", [new AssertOutcome(TestStatus.pass, "Hello", "Hello", "python_assert36")]],
    ]);
  });

  test("Pass_TestUseOfRoundForFloats", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_round1(unittest.TestCase):
  def test_round1(self: Test_round1) -> None:
    a = 1/3.0 # variable definition
    b = a.round(4) # variable definition
    self.assertEqual(b, 0.3333)
  # end test
# end test class

class Test_round2(unittest.TestCase):
  def test_round2(self: Test_round2) -> None:
    a = 0.9999 # variable definition
    b = a.round(2) # variable definition
    self.assertEqual(b, 1)
  # end test
# end test class

class Test_round3(unittest.TestCase):
  def test_round3(self: Test_round3) -> None:
    a = 1.25 # variable definition
    b = a.round(1) # variable definition
    self.assertEqual(b, 1.3)
  # end test
# end test class

class Test_round4(unittest.TestCase):
  def test_round4(self: Test_round4) -> None:
    a = 44.444 # variable definition
    b = a.round(2) # variable definition
    self.assertEqual(b, 44.44)
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let a = 1 / 3;
  let b = _stdlib.round(a, 4);
  _outcomes.push(await system.assert([async () => b, "Float"], [0.3333, "Float"], "python_assert12", _stdlib, false));
}]);

_tests.push(["python_test15", async (_outcomes) => {
  let a = 0.9999;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [1, "Int"], "python_assert24", _stdlib, false));
}]);

_tests.push(["python_test27", async (_outcomes) => {
  let a = 1.25;
  let b = _stdlib.round(a, 1);
  _outcomes.push(await system.assert([async () => b, "Float"], [1.3, "Float"], "python_assert36", _stdlib, false));
}]);

_tests.push(["python_test39", async (_outcomes) => {
  let a = 44.444;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [44.44, "Float"], "python_assert48", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      ["python_test3", [new AssertOutcome(TestStatus.pass, "0.3333", "0.3333", "python_assert12")]],
      ["python_test15", [new AssertOutcome(TestStatus.pass, "1", "1", "python_assert24")]],
      ["python_test27", [new AssertOutcome(TestStatus.pass, "1.3", "1.3", "python_assert36")]],
      ["python_test39", [new AssertOutcome(TestStatus.pass, "44.44", "44.44", "python_assert48")]],
    ]);
  });

  test("Fail_TestWithProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def square(x: int, y: list[int]) -> None: # procedure
  y.put(0,  x ^ 2) # procedure call
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_expressionForExpected", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    self.assertEqual(square(3), 3*3)
  # end test
# end test class

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

  test("Fail_AssertOutsideAtest", async () => {
    const code = `${testPythonHeader}

def main() -> None:

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

  test("Fail_callATest", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  test_squareTest() # procedure call
# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_squareTest(unittest.TestCase):
  def test_squareTest(self: Test_squareTest) -> None:
    self.assertEqual(square(3), 93)
  # end test
# end test class

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
      "Cannot invoke identifier 'test_squareTest' as a method.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_useTestAsAReference", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = test_squareTest # variable definition
# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_squareTest(unittest.TestCase):
  def test_squareTest(self: Test_squareTest) -> None:
    self.assertEqual(square(3), 93)
  # end test
# end test class

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
      "Cannot assign a test to a variable.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_assertWithinAMultiline", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    a = 1 # variable definition
  # end test
# end test class

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

  test("Fail_assertWithinAMultiline2", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    a = 1 # variable definition
  # end test
# end test class

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

  test("Pass_HtmlEscapedString", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:
    actual = " 1  2   3    " # variable definition
    self.assertEqual(actual, " 1  2   3    ")
  # end test
# end test class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["python_test3", async (_outcomes) => {
  let actual = " 1  2   3    ";
  _outcomes.push(await system.assert([async () => actual, "String"], [" 1  2   3    ", "String"], "python_assert9", _stdlib, false));
}]);
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "python_test3",
        [new AssertOutcome(TestStatus.pass, " 1  2   3    ", " 1  2   3    ", "python_assert9")],
      ],
    ]);
  });

  test("Fail_DuplicateTestName1", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:

  # end test
# end test class

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:

  # end test
# end test class
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
      "Name 'test_square' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateTestName2", async () => {
    const code = `${testPythonHeader}

def test_proc() -> None: # procedure

# end procedure

class Test_proc(unittest.TestCase):
  def test_proc(self : Test_proc) -> None:

  # end test
# end test class
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
      "Name 'test_proc' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  ignore_test("Fail_DuplicateTestName3", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
  def test_square(self: Test_square) -> None:

  # end test
# end test class

class Test_proc(unittest.TestCase):
  def test_proc(self: Test_proc) -> None:

  # end test
# end test class

test_cc =  # constant
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
      "Name 'test_cc' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });
});
