import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Impure Function", () => {
  test("Pass_CanUseImpureMethodsWithinExpressionsInMainOrProcedure", async () => {
    const code = `${testHeader}

main
  variable k set to getKey()
  variable r set to randomInt(1, 6)
  set r to randomInt(1, 6) * 10
  call bar(randomInt(1,6))
end main

procedure foo()
  variable k set to getKey()
  variable r set to randomInt(1, 6)
  set r to randomInt(1, 6) * 10
end procedure

procedure bar(x as Int)
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let k = (await _stdlib.getKey());
  let r = _stdlib.randomInt(1, 6);
  r = _stdlib.randomInt(1, 6) * 10;
  await bar(_stdlib.randomInt(1, 6));
}

async function foo() {
  let k = (await _stdlib.getKey());
  let r = _stdlib.randomInt(1, 6);
  r = _stdlib.randomInt(1, 6) * 10;
}
global["foo"] = foo;

async function bar(x) {

}
global["bar"] = bar;
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_CannotCallAProcedureWithinAnExpression", async () => {
    const code = `${testHeader}

main
  variable k set to foo()
end main

procedure foo()
end procedure
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot call procedure 'foo' within an expression.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotCallAFunctionLikeAProcedure", async () => {
    const code = `${testHeader}

main
  call square(3)
end main

function square(x as Int) returns Int
  return x * x
end function`;

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
    assertDoesNotCompile(fileImpl, [
      "Cannot call a function as a procedure.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotCallAProcedureWithinAFunction", async () => {
    const code = `${testHeader}

main
  variable k set to foo()
end main

procedure foo(x as Int)
end procedure

function square(x as Int) returns Int
  call foo(x)
  return x * x
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

  test("Fail_CannotUseAnImpureMethodWithinAFunction", async () => {
    const code = `${testHeader}

main
end main

function square(z as Int) returns Int
  variable x set to randomInt(1,6)
  return x * x
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot use a system method in a function.LangRef.html#compile_error",
    ]);
  });
});
