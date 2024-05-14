import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeIs, assertParses, assertStatusIsValid, assertTestObjectCodeExecutes, ignore_test, testHash } from "./compiler-test-helpers";

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

_tests.push(["square", () => {
  system.assert(square(3), 9);
  var actual = square(4);
  var expected = 16;
  system.assert(actual, expected);
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
square: pass`);
  });

  test('Pass_FailingTest', async () => {
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
square: fail - actual 9, expected 10`);
  });

  test('Pass_FloatRoundedToFloatOfDigitsGivenInExpectedLiteral', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Float) return Float
  return x ^ 2
end function

test square
  assert square(1.23) is 1.51
  assert square(1.89) is 3.6
end test
`; 

const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

}

function square(x) {
  return x ** 2;
}

_tests.push(["square", () => {
  system.assert(square(1.23), 1.51);
  system.assert(square(1.89), 3.6);
}]);
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertTestObjectCodeExecutes(fileImpl, `Test Runner...
square: pass`);
  });

  test('Fail_expressionForExpected', async () => {
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);   
  });

  test('Fail_callATest', async () => {
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
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);   
  });

  test('Fail_useTestAsAReference', async () => {
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
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);   
  });

});