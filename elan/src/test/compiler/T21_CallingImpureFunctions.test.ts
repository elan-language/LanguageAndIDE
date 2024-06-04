import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T21_Functions_Procedures_ImpureFunctions_rules", () => {
  test("Pass_CanUseImpureMethodsWithinExpressionsInMainOrProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to readKey()
  var r set to randomInt(1, 6)
  set r to randomInt(1, 6) * 10
  call bar(randomInt(1,6))
end main

procedure foo()
  var k set to readKey()
  var r set to randomInt(1, 6)
  set r to randomInt(1, 6) * 10
end procedure

procedure bar(x as Int)
end procedure
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var k = _stdlib.readKey();
  var r = _stdlib.randomInt(1, 6);
  r = _stdlib.randomInt(1, 6) * 10;
  bar(_stdlib.randomInt(1, 6));
}

function foo() {
  var k = _stdlib.readKey();
  var r = _stdlib.randomInt(1, 6);
  r = _stdlib.randomInt(1, 6) * 10;
}

function bar(x) {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_CannotCallAProcedureWithinAnExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to foo()
end main

procedure foo()
end procedure
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot call Procedure"]);
  });

  test("Fail_CannotCallAFunctionLikeAProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call square(3)
end main

function square(x as Int) return Int
  return x * x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot call Function"]);
  });

  test("Fail_CannotCallAProcedureWithinAFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var k set to foo()
end main

procedure foo(x as Int)
end procedure

function square(x as Int) return Int
  call foo(x)
  return x * x
end function

`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_CannotUseAnImpureMethodWithinAFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

function square(x as Int) return Int
  var x set to random(1,6)
  return x * x
end function
`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot call impure Function"]);
  });
});
