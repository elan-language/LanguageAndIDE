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
  a = "abcde" # variable definition
  a = 2.1 + 3.4 # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 9)
  actual = square(4) # variable definition
  expected = 16 # variable definition
  self.assertEqual(actual, expected)
# end test

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

_tests.push(["elan_test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [9, "Int"], "elan_assert13", _stdlib, false));
  let actual = (await global.square(4));
  let expected = 16;
  _outcomes.push(await system.assert([async () => actual, "Float"], [expected, "Int"], "elan_assert22", _stdlib, false));
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
        "elan_test10",
        [
          new AssertOutcome(TestStatus.pass, "9", "9", "elan_assert13"),
          new AssertOutcome(TestStatus.pass, "16", "16", "elan_assert22"),
        ],
      ],
    ]);
  });

  test("Pass_BracketedExpression", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 9)
  actual = square(4) # variable definition
  expected = 16 # variable definition
  self.assertEqual(actual, expected)
# end test

def main() -> None:

# end main

class Test_foo(unittest.TestCase):
 def test_foo(self) -> None:
  self.assertEqual((3 + 4), 7)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (3 + 4), "Int"], [7, "Int"], "elan_assert6", _stdlib, false));
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
      ["elan_test3", [new AssertOutcome(TestStatus.pass, "7", "7", "elan_assert6")]],
    ]);
  });

  test("Pass_AssertTuple", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 9)
  actual = square(4) # variable definition
  expected = 16 # variable definition
  self.assertEqual(actual, expected)
# end test

class Test_foo(unittest.TestCase):
 def test_foo(self) -> None:
  self.assertEqual((3 + 4), 7)
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t = ("one", "two") # variable definition
  self.assertEqual(t, ("one", "two"))
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let t = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t, "(String, String)"], [system.tuple(["one", "two"]), "(String, String)"], "elan_assert9", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.pass, "(one, two)", "(one, two)", "elan_assert9")],
      ],
    ]);
  });

  test("Pass_AssertSimpleVarRef", async () => {
    const code = `${testPythonHeader}

class Test_foo(unittest.TestCase):
 def test_foo(self) -> None:
  self.assertEqual((3 + 4), 7)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t = ("one", "two") # variable definition
  self.assertEqual(t, ("one", "two"))
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t1 = ("one", "two") # variable definition
  t2 = ("one", "two") # variable definition
  self.assertEqual(t1, t2)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let t1 = system.tuple(["one", "two"]);
  let t2 = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t1, "(String, String)"], [t2, "(String, String)"], "elan_assert12", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.pass, "(one, two)", "(one, two)", "elan_assert12")],
      ],
    ]);
  });

  test("Pass_AssertCompoundVarRef1", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t = ("one", "two") # variable definition
  self.assertEqual(t, ("one", "two"))
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t1 = ("one", "two") # variable definition
  t2 = ("one", "two") # variable definition
  self.assertEqual(t1, t2)
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(f.p1, t2)
# end test

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 10 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let f = system.initialise(await new Foo()._initialise());
  let t2 = 10;
  _outcomes.push(await system.assert([async () => f.p1, "Int"], [t2, "Int"], "elan_assert12", _stdlib, false));
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
      ["elan_test3", [new AssertOutcome(TestStatus.pass, "10", "10", "elan_assert12")]],
    ]);
  });

  test("Pass_AssertCompoundVarRef2", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  t1 = ("one", "two") # variable definition
  t2 = ("one", "two") # variable definition
  self.assertEqual(t1, t2)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(f.p1, t2)
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(t2, f.p1)
# end test

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = 10 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let f = system.initialise(await new Foo()._initialise());
  let t2 = 10;
  _outcomes.push(await system.assert([async () => t2, "Int"], [f.p1, "Int"], "elan_assert12", _stdlib, false));
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
      ["elan_test3", [new AssertOutcome(TestStatus.pass, "10", "10", "elan_assert12")]],
    ]);
  });

  test("Pass_FailingTest", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(f.p1, t2)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(t2, f.p1)
# end test

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 10)
  self.assertEqual(square(4), 16)
# end test

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

_tests.push(["elan_test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [10, "Int"], "elan_assert13", _stdlib, false));
  _outcomes.push(await system.assert([async () => (await global.square(4)), "Float"], [16, "Int"], "elan_assert16", _stdlib, false));
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
        "elan_test10",
        [
          new AssertOutcome(TestStatus.fail, "Float expected: Int", "10", "elan_assert13"),
          new AssertOutcome(TestStatus.pass, "16", "16", "elan_assert16"),
        ],
      ],
    ]);
  });
  test("Pass_ErrorTest1", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  f = Foo() # variable definition
  t2 = 10 # variable definition
  self.assertEqual(t2, f.p1)
# end test

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], "Out of range index: 1 size: 0")
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], ["Out of range index: 1 size: 0", "String"], "elan_assert9", _stdlib, false));
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
        "elan_test3",
        [
          new AssertOutcome(
            TestStatus.pass,
            "Out of range index: 1 size: 0",
            "Out of range index: 1 size: 0",
            "elan_assert9",
          ),
        ],
      ],
    ]);
  });

  test("Pass_ErrorTest2", async () => {
    const code = `${testPythonHeader}

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], "Out of range index: 1 size: 0")
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], 0)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], [0, "Int"], "elan_assert9", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.fail, "Out of range index: 1 size: 0", "0", "elan_assert9")],
      ],
    ]);
  });
  test("Pass_ErrorTest3", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], "Out of range index: 1 size: 0")
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], 0)
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  b = arr[1] # variable definition
  self.assertEqual(b, 0)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let arr = system.initialise(await new _stdlib.List()._initialise());
  let b = system.safeIndex(arr, 1);
  _outcomes.push(await system.assert([async () => b, "Int"], [0, "Int"], "elan_assert12", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.error, "Out of range index: 1 size: 0", "", "")],
      ],
    ]);
  });
  test("Pass_VariousTestsOnAssert", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  self.assertEqual(arr[1], 0)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  b = arr[1] # variable definition
  self.assertEqual(b, 0)
# end test

def main() -> None:

# end main

class Test_list_(unittest.TestCase):
 def test_list_(self) -> None:
  a = [3, 2, 4, 0] # variable definition
  b = [3, 2, 4, 0] # variable definition
  self.assertEqual(a, b)
# end test

class Test_list2_(unittest.TestCase):
 def test_list2_(self) -> None:
  a = [3, 2, 4, 0] # variable definition
  b = [3, 2, 4, 0] # variable definition
  self.assertEqual(a, b)
# end test

class Test_string_(unittest.TestCase):
 def test_string_(self) -> None:
  a = "Hello World" # variable definition
  b = "Hello" + " " + "World" # variable definition
  self.assertEqual(a, b)
# end test

hello = "Hello" # constant

class Test_constant_(unittest.TestCase):
 def test_constant_(self) -> None:
  b = "Hello" # variable definition
  self.assertEqual(hello, b)
# end test

class Foo: # concrete class

  def __init__(self: Foo, b: int) -> None:
    self.bar = b # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return "a Foo"
  # end function method

  bar: int # property

# end class

class Test_class1(unittest.TestCase):
 def test_class1(self) -> None:
  a = Foo(3) # variable definition
  b = Foo(3) # variable definition
  self.assertEqual(a, b)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  hello = "Hello";

};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let a = system.list([3, 2, 4, 0]);
  let b = system.list([3, 2, 4, 0]);
  _outcomes.push(await system.assert([async () => a, "List<of Int>"], [b, "List<of Int>"], "elan_assert12", _stdlib, false));
}]);

_tests.push(["elan_test15", async (_outcomes) => {
  let a = system.list([3, 2, 4, 0]);
  let b = system.list([3, 2, 4, 0]);
  _outcomes.push(await system.assert([async () => a, "List<of Int>"], [b, "List<of Int>"], "elan_assert24", _stdlib, false));
}]);

_tests.push(["elan_test27", async (_outcomes) => {
  let a = "Hello World";
  let b = "Hello" + " " + "World";
  _outcomes.push(await system.assert([async () => a, "String"], [b, "String"], "elan_assert36", _stdlib, false));
}]);

_tests.push(["elan_test42", async (_outcomes) => {
  let b = "Hello";
  _outcomes.push(await system.assert([async () => global.hello, "String"], [b, "String"], "elan_assert48", _stdlib, false));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["bar", 0]]);};

  async _initialise(b) {
    this.bar = b;
    return this;
  }

  async toString() {
    return "a Foo";
  }

  bar = 0;

}

_tests.push(["elan_test73", async (_outcomes) => {
  let a = system.initialise(await new Foo()._initialise(3));
  let b = system.initialise(await new Foo()._initialise(3));
  _outcomes.push(await system.assert([async () => a, "Foo"], [b, "Foo"], "elan_assert82", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.pass, "[3, 2, 4, 0]", "[3, 2, 4, 0]", "elan_assert12")],
      ],
      [
        "elan_test15",
        [new AssertOutcome(TestStatus.pass, "[3, 2, 4, 0]", "[3, 2, 4, 0]", "elan_assert24")],
      ],
      [
        "elan_test27",
        [new AssertOutcome(TestStatus.pass, "Hello World", "Hello World", "elan_assert36")],
      ],
      ["elan_test42", [new AssertOutcome(TestStatus.pass, "Hello", "Hello", "elan_assert48")]],
      ["elan_test73", [new AssertOutcome(TestStatus.pass, "a Foo", "a Foo", "elan_assert82")]],
    ]);
  });

  test("Pass_TestUseOfRoundForFloats", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  arr = list[int]() # variable definition
  b = arr[1] # variable definition
  self.assertEqual(b, 0)
# end test

class Test_list_(unittest.TestCase):
 def test_list_(self) -> None:
  a = [3, 2, 4, 0] # variable definition
  b = [3, 2, 4, 0] # variable definition
  self.assertEqual(a, b)
# end test

class Test_string_(unittest.TestCase):
 def test_string_(self) -> None:
  a = "Hello World" # variable definition
  b = "Hello" + " " + "World" # variable definition
  self.assertEqual(a, b)
# end test

class Test_constant_(unittest.TestCase):
 def test_constant_(self) -> None:
  b = "Hello" # variable definition
  self.assertEqual(hello, b)
# end test

class Test_class1(unittest.TestCase):
 def test_class1(self) -> None:
  a = Foo(3) # variable definition
  b = Foo(3) # variable definition
  self.assertEqual(a, b)
# end test

def main() -> None:

# end main

class Test_round1(unittest.TestCase):
 def test_round1(self) -> None:
  a = 1/3.0 # variable definition
  b = a.round(4) # variable definition
  self.assertEqual(b, 0.3333)
# end test

class Test_round2(unittest.TestCase):
 def test_round2(self) -> None:
  a = 0.9999 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 1)
# end test

class Test_round3(unittest.TestCase):
 def test_round3(self) -> None:
  a = 1.25 # variable definition
  b = a.round(1) # variable definition
  self.assertEqual(b, 1.3)
# end test

class Test_round4(unittest.TestCase):
 def test_round4(self) -> None:
  a = 44.444 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 44.44)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let a = 1 / 3;
  let b = _stdlib.round(a, 4);
  _outcomes.push(await system.assert([async () => b, "Float"], [0.3333, "Float"], "elan_assert12", _stdlib, false));
}]);

_tests.push(["elan_test15", async (_outcomes) => {
  let a = 0.9999;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [1, "Int"], "elan_assert24", _stdlib, false));
}]);

_tests.push(["elan_test27", async (_outcomes) => {
  let a = 1.25;
  let b = _stdlib.round(a, 1);
  _outcomes.push(await system.assert([async () => b, "Float"], [1.3, "Float"], "elan_assert36", _stdlib, false));
}]);

_tests.push(["elan_test39", async (_outcomes) => {
  let a = 44.444;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [44.44, "Float"], "elan_assert48", _stdlib, false));
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
      ["elan_test3", [new AssertOutcome(TestStatus.pass, "0.3333", "0.3333", "elan_assert12")]],
      ["elan_test15", [new AssertOutcome(TestStatus.pass, "1", "1", "elan_assert24")]],
      ["elan_test27", [new AssertOutcome(TestStatus.pass, "1.3", "1.3", "elan_assert36")]],
      ["elan_test39", [new AssertOutcome(TestStatus.pass, "44.44", "44.44", "elan_assert48")]],
    ]);
  });

  test("Fail_TestWithProcedure", async () => {
    const code = `${testPythonHeader}

class Test_list_(unittest.TestCase):
 def test_list_(self) -> None:
  a = [3, 2, 4, 0] # variable definition
  b = [3, 2, 4, 0] # variable definition
  self.assertEqual(a, b)
# end test

class Test_constant_(unittest.TestCase):
 def test_constant_(self) -> None:
  b = "Hello" # variable definition
  self.assertEqual(hello, b)
# end test

def main() -> None:

# end main

class Test_round2(unittest.TestCase):
 def test_round2(self) -> None:
  a = 0.9999 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 1)
# end test

class Test_round4(unittest.TestCase):
 def test_round4(self) -> None:
  a = 44.444 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 44.44)
# end test

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

  test("Pass_expressionForExpected", async () => {
    const code = `${testPythonHeader}

class Test_constant_(unittest.TestCase):
 def test_constant_(self) -> None:
  b = "Hello" # variable definition
  self.assertEqual(hello, b)
# end test

class Test_round2(unittest.TestCase):
 def test_round2(self) -> None:
  a = 0.9999 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 1)
# end test

def main() -> None:

# end main

def main() -> None:

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 3*3)
# end test

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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return _stdlib.pow(x, 2);
}
global["square"] = square;

_tests.push(["elan_test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [3 * 3, "Int"], "elan_assert13", _stdlib, false));
}]);
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["elan_test10", [new AssertOutcome(TestStatus.pass, "9", "9", "elan_assert13")]],
    ]);
  });

  test("Fail_AssertOutsideAtest", async () => {
    const code = `${testPythonHeader}

class Test_round2(unittest.TestCase):
 def test_round2(self) -> None:
  a = 0.9999 # variable definition
  b = a.round(2) # variable definition
  self.assertEqual(b, 1)
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(square(3), 3*3)
# end test

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

# end main

def main() -> None:

# end main

def main() -> None:
  test_squareTest() # procedure call
# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_squareTest(unittest.TestCase):
 def test_squareTest(self) -> None:
  self.assertEqual(square(3), 93)
# end test

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

# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

def main() -> None:
  a = test_squareTest # variable definition
# end main

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_squareTest(unittest.TestCase):
 def test_squareTest(self) -> None:
  self.assertEqual(square(3), 93)
# end test

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

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

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

def square(x: float) -> float: # function
  return pow(x, 2)
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

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

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

def main() -> None:

# end main

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  actual = " 1  2   3    " # variable definition
  expected = " 1  2   3    " # variable definition
  self.assertEqual(actual, expected)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["elan_test3", async (_outcomes) => {
  let actual = " 1  2   3    ";
  let expected = " 1  2   3    ";
  _outcomes.push(await system.assert([async () => actual, "String"], [expected, "String"], "elan_assert12", _stdlib, false));
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
        "elan_test3",
        [new AssertOutcome(TestStatus.pass, " 1  2   3    ", " 1  2   3    ", "elan_assert12")],
      ],
    ]);
  });

  test("Fail_DuplicateTestName1", async () => {
    const code = `${testPythonHeader}

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  a = 1 # variable definition
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  actual = " 1  2   3    " # variable definition
  expected = " 1  2   3    " # variable definition
  self.assertEqual(actual, expected)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:

# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:

# end test
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

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  actual = " 1  2   3    " # variable definition
  expected = " 1  2   3    " # variable definition
  self.assertEqual(actual, expected)
# end test

class Test_square(unittest.TestCase):
 def test_square(self) -> None:

# end test

def test_proc() -> None: # procedure

# end procedure

class Test_proc(unittest.TestCase):
 def test_proc(self) -> None:

# end test
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
 def test_square(self) -> None:

# end test

class Test_proc(unittest.TestCase):
 def test_proc(self) -> None:

# end test

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
