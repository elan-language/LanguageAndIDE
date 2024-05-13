import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";

suite('T21_Functions_Procedures_ImpureFunctions_rules', () => {

  ignore_test('Pass_CanUseImpureMethodsWithinExpressionsInMainOrProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to readKey()
  var r set to random(1,6)
  set r to random() * 10
  call bar(random(1,6))
end main

procedure foo()
  var k set to readKey()
  var r set to random(1,6)
  set r to random() * 10
end procedure

procedure bar(x as Int)
end procedure
`;

    const objectCode = ``;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  ignore_test('Fail_CannotCallAProcedureWithinAnExpression', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to foo()
end main

procedure foo()
end procedure
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["?"]);
  });

  ignore_test('Fail_CannotCallAFunctionLikeAProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call square(3)
end main

function square(x as Int) return Int
  return x * x
end procedure
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["?"]);
  });

  ignore_test('Fail_CannotCallAProcedureWithinAFunction', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to foo()
end main

procedure foo()
end procedure

function square(x as Int) return Int
  call foo()
  return x * x
end procedure

`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["?"]);
  });

  ignore_test('Fail_CannotUseAnImpureMethodWithinAFunction', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Int) return Int
  var x set to random(1,6)
  return x * x
end procedure

`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["?"]);
  });
});