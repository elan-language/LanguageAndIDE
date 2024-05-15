import assert from "assert";
import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeIs, assertParses, assertStatusIsValid, assertTestObjectCodeExecutes, ignore_test, testHash, transforms } from "./compiler-test-helpers";
import { AssertOutcome } from "../../system";

suite('Pass_PassingTest', () => {

  test('Pass_PassingTest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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

_tests.push(["test10", (_outcomes) => {
  _outcomes.push(system.assert(square(3), 9, "assert13"));
  var actual = square(4);
  var expected = 16;
  _outcomes.push(system.assert(actual, expected, "assert22"));
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, [
      ["test10", [
        new AssertOutcome("pass", "9", "9", "assert13"),
        new AssertOutcome("pass", "16", "16", "assert22")
      ]]]);
  });

  ignore_test('Pass_FailingTest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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

_tests.push(["square", () => {
  system.assert(square(3), 10);
  system.assert(square(4), 16);
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
//     await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
// square: fail - actual 9, expected 10
// `);
  });

 
  ignore_test('Fail_expressionForExpected', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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

  test('Fail_AssertOutsideAtest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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

  ignore_test('Fail_callATest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);   
  });

  ignore_test('Fail_useTestAsAReference', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);   
  });

  ignore_test('Pass_VariousTestsOnAssert', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

test list_
  var a set to [3, 2, 4, 0]
  var b set to [3, 2, 4, 0]
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
  var b set to default Int
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
  var a set to default Foo
  var b set to default Foo
  assert a is b
end test

`;

const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    //assertObjectCodeIs(fileImpl, objectCode);
//     await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
// list_: pass
// dictionary_: pass
// string_: pass
// default_: pass
// constant_: pass
// class1: pass
// class2: pass
// `);
  });

  ignore_test('Pass_TestUseOfToPrecisionForFloats', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

test toPrecision1
  var a set to 1/3
  var b set to a.toPrecision(2)
  assert b is "0.33"
end test

test toPrecision2
  var a set to 0.9999
  var b set to a.toPrecision(3)
  assert b is "1.00"
end test

test toPrecision3
  var a set to 1.25
  var b set to a.toPrecision(2)
  assert b is "1.3"
end test

test toPrecision4
  var a set to 4444
  var b set to a.toPrecision(2)
  assert b is "4.4e+3"
end test

`;

const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    //assertObjectCodeIs(fileImpl, objectCode);
    //await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
// toPrecision1: pass
// toPrecision2: pass
// toPrecision3: pass
// toPrecision4: pass
// `);
  });
});