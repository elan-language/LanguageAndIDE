import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { TestStatus } from "../../frames/status-enums";
import { AssertOutcome } from "../../system";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Pass_PassingTest", () => {
  test("Pass_PassingTest", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

function square(x as Float) return Float
  return x ^ 2
end function

test square
  assert square(3) is 9
  var actual set to square(4)
  var expected set to 16
  assert actual is expected
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

function square(x) {
  return x ** 2;
}

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(system.assert(square(3), 9, "assert13", _stdlib));
  var actual = square(4);
  var expected = 16;
  _outcomes.push(system.assert(actual, expected, "assert22", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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

  test("Pass_AssertTuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

test square
  var t set to ("one", "two")
  assert t is ("one", "two")
  assert t.first() is "one"
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  var t = system.tuple(["one", "two"]);
  _outcomes.push(system.assert(t, system.tuple(["one", "two"]), "assert9", _stdlib));
  _outcomes.push(system.assert(_stdlib.first(t), "one", "assert12", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [
          new AssertOutcome(TestStatus.pass, "Tuple (one, two)", "Tuple (one, two)", "assert9"),
          new AssertOutcome(TestStatus.pass, "one", "one", "assert12"),
        ],
      ],
    ]);
  });

  test("Pass_AssertLetTuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

test square
  let t be ("one", "two")
  assert t is ("one", "two")
  assert t.first() is "one"
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  var t = (() => {
    var _cache;
    return () => _cache ??= system.tuple(["one", "two"]);
  })();
  _outcomes.push(system.assert(t(), system.tuple(["one", "two"]), "assert9", _stdlib));
  _outcomes.push(system.assert(_stdlib.first(t()), "one", "assert12", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test3",
        [
          new AssertOutcome(TestStatus.pass, "Tuple (one, two)", "Tuple (one, two)", "assert9"),
          new AssertOutcome(TestStatus.pass, "one", "one", "assert12"),
        ],
      ],
    ]);
  });

  test("Pass_FailingTest", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

function square(x as Float) return Float
  return x ^ 2
end function

test square
  assert square(3) is 10
  assert square(4) is 16
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

function square(x) {
  return x ** 2;
}

_tests.push(["test10", async (_outcomes) => {
  _outcomes.push(system.assert(square(3), 10, "assert13", _stdlib));
  _outcomes.push(system.assert(square(4), 16, "assert16", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test10",
        [
          new AssertOutcome(TestStatus.fail, "9", "10", "assert13"),
          new AssertOutcome(TestStatus.pass, "16", "16", "assert16"),
        ],
      ],
    ]);
  });

  test("Pass_ErrorTest", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

test square
  var arr set to empty [Int]
  var b set to arr[1]
  assert b is 0
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  var arr = system.emptyArrayList();
  var b = system.safeIndex(arr, 1);
  _outcomes.push(system.assert(b, 0, "assert12", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test3", [new AssertOutcome(TestStatus.error, "Out of range index: 1 size: 0", "", "")]],
    ]);
  });

  test("Pass_VariousTestsOnAssert", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

test list_
  var a set to {3, 2, 4, 0}
  var b set to {3, 2, 4, 0}
  assert a is b
end test

test dictionary_
  var a set to [3:"a", 2:"b", 4:"c"]
  var b set to [3:"a", 2:"b", 4:"c"]
  assert a is b
end test

test string_
  var a set to "Hello World"
  var b set to "Hello" + " " + "World"
  assert a is b
end test

test default_
  var a set to 0
  var b set to empty Int
  assert a is b
end test

constant a set to "Hello"

test constant_
  var b set to "Hello"
  assert a is b
end test

class Foo
  constructor(b as Int)
    set bar to b
  end constructor

  property bar as Int
end class

test class1
  var a set to new Foo(3)
  var b set to new Foo(3)
  assert a is b
end test

test class2
  var a set to empty Foo
  var b set to empty Foo
  assert a is b
end test`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  var a = system.immutableList([3, 2, 4, 0]);
  var b = system.immutableList([3, 2, 4, 0]);
  _outcomes.push(system.assert(a, b, "assert12", _stdlib));
}]);

_tests.push(["test15", async (_outcomes) => {
  var a = system.dictionary({[3] : "a", [2] : "b", [4] : "c"});
  var b = system.dictionary({[3] : "a", [2] : "b", [4] : "c"});
  _outcomes.push(system.assert(a, b, "assert24", _stdlib));
}]);

_tests.push(["test27", async (_outcomes) => {
  var a = "Hello World";
  var b = "Hello" + " " + "World";
  _outcomes.push(system.assert(a, b, "assert36", _stdlib));
}]);

_tests.push(["test39", async (_outcomes) => {
  var a = 0;
  var b = 0;
  _outcomes.push(system.assert(a, b, "assert48", _stdlib));
}]);

const a = "Hello";

_tests.push(["test54", async (_outcomes) => {
  var b = "Hello";
  _outcomes.push(system.assert(a, b, "assert60", _stdlib));
}]);

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["bar", 0]]);};
  constructor(b) {
    this.bar = b;
  }

  bar = 0;

}

_tests.push(["test79", async (_outcomes) => {
  var a = system.initialise(new Foo(3));
  var b = system.initialise(new Foo(3));
  _outcomes.push(system.assert(a, b, "assert88", _stdlib));
}]);

_tests.push(["test91", async (_outcomes) => {
  var a = Foo.emptyInstance();
  var b = Foo.emptyInstance();
  _outcomes.push(system.assert(a, b, "assert100", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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
            "ImmutableList {3, 2, 4, 0}",
            "ImmutableList {3, 2, 4, 0}",
            "assert12",
          ),
        ],
      ],
      [
        "test15",
        [
          new AssertOutcome(
            TestStatus.pass,
            "Dictionary [2:b, 3:a, 4:c]",
            "Dictionary [2:b, 3:a, 4:c]",
            "assert24",
          ),
        ],
      ],
      ["test27", [new AssertOutcome(TestStatus.pass, "Hello World", "Hello World", "assert36")]],
      ["test39", [new AssertOutcome(TestStatus.pass, "0", "0", "assert48")]],
      ["test54", [new AssertOutcome(TestStatus.pass, "Hello", "Hello", "assert60")]],
      ["test79", [new AssertOutcome(TestStatus.pass, "a Foo", "a Foo", "assert88")]],
      ["test91", [new AssertOutcome(TestStatus.pass, "a Foo", "a Foo", "assert100")]],
    ]);
  });

  test("Pass_TestUseOfRoundForFloats", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

test round1
  var a set to 1/3
  var b set to round(a, 4)
  assert b is 0.3333
end test

test round2
  var a set to 0.9999
  var b set to round(a, 2)
  assert b is 1
end test

test round3
  var a set to 1.25
  var b set to round(a, 1)
  assert b is 1.3
end test

test round4
  var a set to 44.444
  var b set to round(a, 2)
  assert b is 44.44
end test

`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

_tests.push(["test3", async (_outcomes) => {
  var a = 1 / 3;
  var b = _stdlib.round(a, 4);
  _outcomes.push(system.assert(b, 0.3333, "assert12", _stdlib));
}]);

_tests.push(["test15", async (_outcomes) => {
  var a = 0.9999;
  var b = _stdlib.round(a, 2);
  _outcomes.push(system.assert(b, 1, "assert24", _stdlib));
}]);

_tests.push(["test27", async (_outcomes) => {
  var a = 1.25;
  var b = _stdlib.round(a, 1);
  _outcomes.push(system.assert(b, 1.3, "assert36", _stdlib));
}]);

_tests.push(["test39", async (_outcomes) => {
  var a = 44.444;
  var b = _stdlib.round(a, 2);
  _outcomes.push(system.assert(b, 44.44, "assert48", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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

  test("Pass_PassingTestWithProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

procedure square(x as Int, y as [Int])
  set y[0] to x ^ 2
end procedure

test square
  var arr set to createArray(1, 0)
  call square(3, arr)
  assert arr[0] is 9
end test
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

async function square(x, y) {
  system.safeSet(y, 0, x ** 2);
}

_tests.push(["test10", async (_outcomes) => {
  var arr = _stdlib.createArray(1, 0);
  await square(3, arr);
  _outcomes.push(system.assert(system.safeIndex(arr, 0), 9, "assert19", _stdlib));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test10", [new AssertOutcome(TestStatus.pass, "9", "9", "assert19")]],
    ]);
  });

  test("Fail_expressionForExpected", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
end main

function square(x as Float) return Float
  return x ^ 2
end function

test square
  assert square(3) is 3 * 3
end test
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssertOutsideAtest", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  assert square(3) is 3 * 3
end main

function square(x as Float) return Float
  return x ^ 2
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_callATest", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call squareTest()
end main

function square(x as Float) return Float
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["squareTest is not defined"]);
  });

  test("Fail_useTestAsAReference", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to squareTest
end main

function square(x as Float) return Float
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["squareTest is not defined"]);
  });
});
