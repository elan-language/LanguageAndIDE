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
import { createHash } from "node:crypto";

suite("T73_Lambdas", () => {
  test("Pass_PassAsParam", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(4, lambda x as Int => x * 3)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  printModified(4, (x) => x * 3);
}

function printModified(i, f) {
  system.print(_stdlib.asString(f(i)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  ignore_test("Pass_TupleArg", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified((4, 5), lambda t as (Int, Int) => t.first())
end main
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  print f(i)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  printModified(system.tuple([4, 5]), (t) => _stdlib.first(t));
}

function printModified(i, f) {
  system.print(_stdlib.asString(f(i)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });


  test("Pass_AssignALambdaToAVariable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var l set to lambda x as Int => x * 5
  print l(5)
end main`;

const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = (x) => x * 5;
  system.print(_stdlib.asString(l(5)));
}
return [main, _tests];}`;
  
      const fileImpl = new FileImpl(
        testHash,
        new DefaultProfile(),
        transforms(),
        true,
      );
      await fileImpl.parseFrom(new CodeSourceFromString(code));
  
      assertParses(fileImpl);
      assertStatusIsValid(fileImpl);
      assertObjectCodeIs(fileImpl, objectCode);
      await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_ReturnALambda", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var l set to getFunc()
  print l(5)
end main
    
function getFunc() return Func<of Int => Int>
  return lambda x as Int => x * 5
end function`;

    
const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = getFunc();
  system.print(_stdlib.asString(l(5)));
}

function getFunc() {
  return (x) => x * 5;
}
return [main, _tests];}`;
    
        const fileImpl = new FileImpl(
          testHash,
          new DefaultProfile(),
          transforms(),
          true,
        );
        await fileImpl.parseFrom(new CodeSourceFromString(code));
    
        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "25");
  });


  test("Fail_PassLambdaWithWrongTypes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified(4, lambda x as Int => x.asString())
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_InvokeLambdaWithWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call printModified("4", lambda x as Int => x + 3)
end main

procedure printModified(i as String, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });
});
