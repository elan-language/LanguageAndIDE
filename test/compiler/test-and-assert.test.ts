import { AssertOutcome } from "../../src/compiler/assert-outcome";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { TestStatus } from "../../src/compiler/test-status";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Test and Assert", () => {
  test("Pass_PassingTest", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  return x ^ 2
end function

test square
  assert square(3) is 9
  variable actual set to square(4)
  variable expected set to 16
  assert actual is expected
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return x ** 2;
}
global["square"] = square;

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [9, "Int"], "assert13", _stdlib, false));
  let actual = (await global.square(4));
  let expected = 16;
  _outcomes.push(await system.assert([async () => actual, "Float"], [expected, "Int"], "assert22", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test10",
        [
          new AssertOutcome(TestStatus.pass, "9", "9", "assert13"),
          new AssertOutcome(TestStatus.pass, "16", "16", "assert22"),
        ],
      ],
    ]);
  });

  test("Pass_BracketedExpression", async () => {
    const code = `${testHeader}

main
end main

test foo
  assert (3 + 4) is 7
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (3 + 4), "Int"], [7, "Int"], "assert6", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.pass, "7", "7", "assert6")]],
    ]);
  });

  test("Pass_AssertTuple", async () => {
    const code = `${testHeader}

main
end main

test square
  variable t set to tuple("one", "two")
  assert t is tuple("one", "two")
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let t = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t, "tuple(String, String)"], [system.tuple(["one", "two"]), "tuple(String, String)"], "assert9", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [new AssertOutcome(TestStatus.pass, "tuple(one, two)", "tuple(one, two)", "assert9")],
      ],
    ]);
  });

  test("Pass_AssertLetTuple", async () => {
    const code = `${testHeader}

main
end main

test square
  let t be tuple("one", "two")
  assert t is tuple("one", "two")
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  const t = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t, "tuple(String, String)"], [system.tuple(["one", "two"]), "tuple(String, String)"], "assert9", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [new AssertOutcome(TestStatus.pass, "tuple(one, two)", "tuple(one, two)", "assert9")],
      ],
    ]);
  });

  test("Pass_AssertTupleFromParseAsInt", async () => {
    const code = `${testHeader}

main
end main

test square
  assert parseAsInt("3") is tuple(true, 3)
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => _stdlib.parseAsInt("3"), "tuple(Boolean, Int)"], [system.tuple([_stdlib.true, 3]), "tuple(Boolean, Int)"], "assert6", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [new AssertOutcome(TestStatus.pass, "tuple(true, 3)", "tuple(true, 3)", "assert6")],
      ],
    ]);
  });

  test("Pass_AssertSimpleVarRef", async () => {
    const code = `${testHeader}

main
end main

test square
  let t1 be tuple("one", "two")
  let t2 be tuple("one", "two")
  assert t1 is t2
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  const t1 = system.tuple(["one", "two"]);
  const t2 = system.tuple(["one", "two"]);
  _outcomes.push(await system.assert([async () => t1, "tuple(String, String)"], [t2, "tuple(String, String)"], "assert12", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [new AssertOutcome(TestStatus.pass, "tuple(one, two)", "tuple(one, two)", "assert12")],
      ],
    ]);
  });

  test("Pass_AssertCompoundVarRef1", async () => {
    const code = `${testHeader}

main
end main

test square
  let f be new Foo()
  let t2 be 10
  assert f.p1 is t2
end test

class Foo
  constructor()
    set property.p1 to 10
  end constructor

  property p1 as Int

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  const f = system.initialise(await new Foo()._initialise());
  const t2 = 10;
  _outcomes.push(await system.assert([async () => f.p1, "Int"], [t2, "Int"], "assert12", _stdlib, false));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 10;
    return this;
  }

  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.pass, "10", "10", "assert12")]],
    ]);
  });

  test("Pass_AssertCompoundVarRef2", async () => {
    const code = `${testHeader}

main
end main

test square
  let f be new Foo()
  let t2 be 10
  assert t2 is f.p1
end test

class Foo
  constructor()
    set property.p1 to 10
  end constructor

  property p1 as Int

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  const f = system.initialise(await new Foo()._initialise());
  const t2 = 10;
  _outcomes.push(await system.assert([async () => t2, "Int"], [f.p1, "Int"], "assert12", _stdlib, false));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 10;
    return this;
  }

  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.pass, "10", "10", "assert12")]],
    ]);
  });

  test("Pass_FailingTest", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  return x ^ 2
end function

test square
  assert square(3) is 10
  assert square(4) is 16
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return x ** 2;
}
global["square"] = square;

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [10, "Int"], "assert13", _stdlib, false));
  _outcomes.push(await system.assert([async () => (await global.square(4)), "Float"], [16, "Int"], "assert16", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test10",
        [
          new AssertOutcome(TestStatus.fail, "9 (Float)", "10 (Int)", "assert13"),
          new AssertOutcome(TestStatus.pass, "16", "16", "assert16"),
        ],
      ],
    ]);
  });
  test("Pass_ErrorTest1", async () => {
    const code = `${testHeader}

main
end main

test square
  variable arr set to empty List<of Int>
  assert arr[1] is "Out of range index: 1 size: 0"
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let arr = system.initialise(_stdlib.List.emptyInstance());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], ["Out of range index: 1 size: 0", "String"], "assert9", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [
          new AssertOutcome(
            TestStatus.pass,
            "Out of range index: 1 size: 0",
            "Out of range index: 1 size: 0",
            "assert9",
          ),
        ],
      ],
    ]);
  });

  test("Pass_ErrorTest2", async () => {
    const code = `${testHeader}

main
end main

test square
  variable arr set to empty List<of Int>
  assert arr[1] is 0
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let arr = system.initialise(_stdlib.List.emptyInstance());
  _outcomes.push(await system.assert([async () => system.safeIndex(arr, 1), "Int"], [0, "Int"], "assert9", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [
          new AssertOutcome(
            TestStatus.fail,
            "Out of range index: 1 size: 0 (String)",
            "0 (Int)",
            "assert9",
          ),
        ],
      ],
    ]);
  });
  test("Pass_ErrorTest3", async () => {
    const code = `${testHeader}

main
end main

test square
  variable arr set to empty List<of Int>
  variable b set to arr[1]
  assert b is 0
end test
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let arr = system.initialise(_stdlib.List.emptyInstance());
  let b = system.safeIndex(arr, 1);
  _outcomes.push(await system.assert([async () => b, "Int"], [0, "Int"], "assert12", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.error, "Out of range index: 1 size: 0", "", "")]],
    ]);
  });
  test("Pass_VariousTestsOnAssert", async () => {
    const code = `${testHeader}

main
end main

test list_
  variable a set to {3, 2, 4, 0}
  variable b set to {3, 2, 4, 0}
  assert a is b
end test

test dictionary_
  variable a set to [3:"a", 2:"b", 4:"c"]
  variable b set to [3:"a", 2:"b", 4:"c"]
  assert a is b
end test

test string_
  variable a set to "Hello World"
  variable b set to "Hello" + " " + "World"
  assert a is b
end test

test default_
  variable a set to 0
  variable b set to empty Int
  assert a is b
end test

constant hello set to "Hello"

test constant_
  variable b set to "Hello"
  assert hello is b
end test

class Foo
  constructor(b as Int)
    set property.bar to b
  end constructor

  property bar as Int
end class

test class1
  variable a set to new Foo(3)
  variable b set to new Foo(3)
  assert a is b
end test

test class2
  variable a set to empty Foo
  variable b set to empty Foo
  assert a is b
end test`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  hello = "Hello";

};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let a = system.listImmutable([3, 2, 4, 0]);
  let b = system.listImmutable([3, 2, 4, 0]);
  _outcomes.push(await system.assert([async () => a, "ListImmutable<of Int>"], [b, "ListImmutable<of Int>"], "assert12", _stdlib, false));
}]);

_tests.push(["test15", async (_outcomes) => {
  let a = system.dictionary([[3, "a"], [2, "b"], [4, "c"]]);
  let b = system.dictionary([[3, "a"], [2, "b"], [4, "c"]]);
  _outcomes.push(await system.assert([async () => a, "Dictionary<of Int, String>"], [b, "Dictionary<of Int, String>"], "assert24", _stdlib, false));
}]);

_tests.push(["test27", async (_outcomes) => {
  let a = "Hello World";
  let b = "Hello" + " " + "World";
  _outcomes.push(await system.assert([async () => a, "String"], [b, "String"], "assert36", _stdlib, false));
}]);

_tests.push(["test39", async (_outcomes) => {
  let a = 0;
  let b = 0;
  _outcomes.push(await system.assert([async () => a, "Int"], [b, "Int"], "assert48", _stdlib, false));
}]);

_tests.push(["test54", async (_outcomes) => {
  let b = "Hello";
  _outcomes.push(await system.assert([async () => global.hello, "String"], [b, "String"], "assert60", _stdlib, false));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["bar", 0]]);};

  async _initialise(b) {
    this.bar = b;
    return this;
  }

  bar = 0;

}

_tests.push(["test76", async (_outcomes) => {
  let a = system.initialise(await new Foo()._initialise(3));
  let b = system.initialise(await new Foo()._initialise(3));
  _outcomes.push(await system.assert([async () => a, "Foo"], [b, "Foo"], "assert85", _stdlib, false));
}]);

_tests.push(["test88", async (_outcomes) => {
  let a = Foo.emptyInstance();
  let b = Foo.emptyInstance();
  _outcomes.push(await system.assert([async () => a, "Foo"], [b, "Foo"], "assert97", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.pass, "{3, 2, 4, 0}", "{3, 2, 4, 0}", "assert12")]],
      [
        "test15",
        [new AssertOutcome(TestStatus.pass, "[3:a, 2:b, 4:c]", "[3:a, 2:b, 4:c]", "assert24")],
      ],
      ["test27", [new AssertOutcome(TestStatus.pass, "Hello World", "Hello World", "assert36")]],
      ["test39", [new AssertOutcome(TestStatus.pass, "0", "0", "assert48")]],
      ["test54", [new AssertOutcome(TestStatus.pass, "Hello", "Hello", "assert60")]],
      ["test76", [new AssertOutcome(TestStatus.pass, "a Foo", "a Foo", "assert85")]],
      ["test88", [new AssertOutcome(TestStatus.pass, "a Foo", "a Foo", "assert97")]],
    ]);
  });

  test("Pass_TestUseOfRoundForFloats", async () => {
    const code = `${testHeader}

main
end main

test round1
  variable a set to 1/3
  variable b set to a.round(4)
  assert b is 0.3333
end test

test round2
  variable a set to 0.9999
  variable b set to a.round(2)
  assert b is 1
end test

test round3
  variable a set to 1.25
  variable b set to a.round(1)
  assert b is 1.3
end test

test round4
  variable a set to 44.444
  variable b set to a.round(2)
  assert b is 44.44
end test

`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  let a = 1 / 3;
  let b = _stdlib.round(a, 4);
  _outcomes.push(await system.assert([async () => b, "Float"], [0.3333, "Float"], "assert12", _stdlib, false));
}]);

_tests.push(["test15", async (_outcomes) => {
  let a = 0.9999;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [1, "Int"], "assert24", _stdlib, false));
}]);

_tests.push(["test27", async (_outcomes) => {
  let a = 1.25;
  let b = _stdlib.round(a, 1);
  _outcomes.push(await system.assert([async () => b, "Float"], [1.3, "Float"], "assert36", _stdlib, false));
}]);

_tests.push(["test39", async (_outcomes) => {
  let a = 44.444;
  let b = _stdlib.round(a, 2);
  _outcomes.push(await system.assert([async () => b, "Float"], [44.44, "Float"], "assert48", _stdlib, false));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.pass, "0.3333", "0.3333", "assert12")]],
      ["test15", [new AssertOutcome(TestStatus.pass, "1", "1", "assert24")]],
      ["test27", [new AssertOutcome(TestStatus.pass, "1.3", "1.3", "assert36")]],
      ["test39", [new AssertOutcome(TestStatus.pass, "44.44", "44.44", "assert48")]],
    ]);
  });

  test("Fail_TestWithProcedure", async () => {
    const code = `${testHeader}

main
end main

procedure square(x as Int, out y as List<of Int>)
  call y.put(0,  x ^ 2)
end procedure

test square
  variable arr set to createList(1, 0)
  call square(3, arr)
  assert arr[0] is 9
end test
`;
    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_expressionForExpected", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  return x ^ 2
end function

test square
  assert square(3) is 3 * 3
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return x ** 2;
}
global["square"] = square;

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => (await global.square(3)), "Float"], [3 * 3, "Int"], "assert13", _stdlib, false));
}]);
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test10", [new AssertOutcome(TestStatus.pass, "9", "9", "assert13")]],
    ]);
  });

  test("Pass_IgnoreTest", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  return x ^ 2
end function

ignore test square
  assert square(3) is 3 * 3
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return x ** 2;
}
global["square"] = square;

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(await system.assert(["", ""], ["", ""], "assert13", _stdlib, true));
}]);
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test10", [new AssertOutcome(TestStatus.ignored, "", "", "assert13")]],
    ]);
  });

  test("Pass_IgnoreInfiniteTest1", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  while true
  end while
  return x ^ 2
end function

ignore test square
  assert square(3) is 3 * 3
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  while (_stdlib.true) {

  }
  return x ** 2;
}
global["square"] = square;

_tests.push(["test13", async (_outcomes) => {
  _outcomes.push(await system.assert(["", ""], ["", ""], "assert16", _stdlib, true));
}]);
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test13", [new AssertOutcome(TestStatus.ignored, "", "", "assert16")]],
    ]);
  });

  test("Pass_IgnoreInfiniteTest2", async () => {
    const code = `${testHeader}

main
end main

function square(x as Float) returns Float
  return x ^ 2
end function

ignore test square
  while true
  end while
  assert square(3) is 3 * 3
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

async function square(x) {
  return x ** 2;
}
global["square"] = square;

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(await system.assert(["", ""], ["", ""], "assert16", _stdlib, true));
}]);
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test10", [new AssertOutcome(TestStatus.ignored, "", "", "assert16")]],
    ]);
  });

  test("Pass_NonObviousDifferentTypes", async () => {
    const code = `${testHeader}

test array content
  let a be new Array2D<of String>(2, 2, "*")
  assert a is [["*", "*"], ["*", "*"]]
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
_tests.push(["test1", async (_outcomes) => {
  const a = system.initialise(await new _stdlib.Array2D()._initialise(2, 2, "*"));
  _outcomes.push(await system.assert([async () => a, "Array2D<of String>"], [system.list([system.list(["*", "*"]), system.list(["*", "*"])]), "List<of List<of String>>"], "assert7", _stdlib, false));
}]);

async function main() {

}
return [main, _tests];}`;

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test1",
        [
          new AssertOutcome(
            TestStatus.fail,
            "[[*, *], [*, *]] (Array2D<of String>)",
            "[[*, *], [*, *]] (List<of List<of String>>)",
            "assert7",
          ),
        ],
      ],
    ]);
  });

  test("Fail_AssertOutsideAtest", async () => {
    const code = `${testHeader}

main
  assert square(3) is 3 * 3
end main

function square(x as Float) returns Float
  return x ^ 2
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_callATest", async () => {
    const code = `${testHeader}

main
  call squareTest()
end main

function square(x as Float) returns Float
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'squareTest' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_ignoredFailCompile", async () => {
    const code = `${testHeader}

main

end main

function square(x as Float) returns Float
  return x ^ 2
end function

ignore test fred
  assert square(3, 2) is 93
end test
`;
    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: x (Float).LangRef.html#compile_error",
    ]);
  });

  test("Fail_useTestAsAReference", async () => {
    const code = `${testHeader}

main
  variable a set to squareTest
end main

function square(x as Float) returns Float
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'squareTest' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_assertWithinAMultiline", async () => {
    const code = `${testHeader}

main

end main

test square
  let a be 1
  if true then
    assert a is 9
  end if
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_assertWithinAMultiline2", async () => {
    const code = `${testHeader}

main

end main

test square
  let a be 1
  while true
    assert a is 9
  end while
end test
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
