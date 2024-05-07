import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";

suite('Pass_PassingTest', () => {

  ignore_test('Pass_PassingTest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Number) return Number
  return x ^ 2
end function

test square
  assert square(3) is 9
  var actual set to square(4)
  var expected set to 16
  assert actual is expected
end test
`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    // TODO need a new test helper method to test the test running and test the resulting message
  });

  ignore_test('Pass_FailingTest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Number) return Number
  return x ^ 2
end function

test square
  assert square(3) is 10
  assert square(4) is 16
end test
`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    // The test execution should stop at the first failure
  });

  ignore_test('Pass_FloatRoundedToNumberOfDigitsGivenInExpectedLiteral', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Number) return Number
  return x ^ 2
end function

test square
  assert square(1.23) is 1.51
  assert square(1.89) is 3.6
end test
`; 

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    // TODO need a new test helper method to test the test running and test the resulting message
  });

  ignore_test('Fail_expressionForExpected', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Number) return Number
  return x ^ 2
end function

test square
  assert square(3) is 3 * 3
end test
`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
    
  });

  ignore_test('Fail_AssertOutsideAtest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  assert square(3) is 3 * 3
end main

function square(x as Number) return Number
  return x ^ 2
end function
`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);   
  });

  ignore_test('Fail_callATest', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call squareTest
end main

function square(x as Number) return Number
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);   
  });

  ignore_test('Fail_useTestAsAReference', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to squareTest
end main

function square(x as Number) return Number
  return x ^ 2
end function

test squareTest
  assert square(3) is 93
end test
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);   
  });

});