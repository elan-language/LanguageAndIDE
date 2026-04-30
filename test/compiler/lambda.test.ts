import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
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
    transforms
} from "./compiler-test-helpers";

suite("Lambda", () => {
  test("Pass_PassAsParam", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x => x * 3)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  call printNoLine(f(i))
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(4, async (x) => x * 3);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_TupleArg", async () => {
    const code = `${testHeader}

main
  call printModified((4, 5), lambda t => global.first(t))
end main

function first(t as (Int, Int)) returns Int
    variable a set to t.item_0
    return a
end function
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  call printNoLine(f(i))
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => (await global.first(t)));
}

async function first(t) {
  let a = t[0];
  return a;
}
global["first"] = first;

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_TupleArg1", async () => {
    const code = `${testHeader}

main
  call printModified((4, 5), lambda t => t.item_0)
end main
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  call printNoLine(f(i))
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => t[0]);
}

async function printModified(i, f) {
  await _stdlib.printNoLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Fail_AssignALambdaToAVariable", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x => x * 5
  call printNoLine(l(5))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssignALambdaToAProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  call foo.setP1(lambda x => x)
  variable v set to foo.p1(5)
  call printNoLine(v)
end main

class Foo
  constructor()
    set this.p1 to lambda x => 0
  end constructor
  function toString() returns String
    return ""
  end function

  procedure setP1(p as Func<of Int => Int>)
    set this.p1 to ref p
  end procedure

  property p1 as Func<of Int => Int>
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_lambdaInExpression", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x => x * 5
  call printNoLine(l(5) + 5)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnALambda", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc()
  call printNoLine(l(5))
end main
    
function getFunc() returns Func<of Int => Int>
  return lambda x => x * 5
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterlessLambda", async () => {
    const code = `${testHeader}

main
  variable x set to 3
  variable l set to lambda => x * 5
  call printNoLine(l())
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail ReturnAParameterLessLambda", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc(5)
  call printNoLine(l())
end main
    
function getFunc(x as Int) returns Func<of => Int>
  return lambda => x * 5
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_FuncOfMutableType", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc(5)
  call printNoLine(l([5]))
end main
    
function getFunc(x as Int) returns Func<of List<of Int> => List<of Int>>
  return lambda y<of Int> => [x * y[0]]
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_Lambda WithLambdaParam", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x<of Int => Int> => x(2)
  call printNoLine(l(lambda x => 2 * x))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ImmediateInvoke", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc()(5)
  call printNoLine(l)
end main
    
function getFunc() returns Func<of Int => Int>
  return lambda x => x * 5
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassLambdaWithWrongTypes", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x => x.toString())
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  call printNoLine(f(i))
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of Int => Int>), Provided: Int, Func<of Int => String>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InvokeLambdaWithWrongType", async () => {
    const code = `${testHeader}

main
  call printModified("4", lambda x => x + 3)
end main

procedure printModified(i as String, f as Func<of Int => Int>)
  call printNoLine(f(i))
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: parameter0 (Int), Provided: String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassLambdaWithWrongTypes1", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x => x)
end main

procedure printModified(i as Int, f as Func<of => Int>)
  call printNoLine(f())
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of  => Int>), Provided: Int, Func<of Int => Int>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassLambdaWithWrongTypes2", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda => 0)
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  call printNoLine(f(5))
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of Int => Int>), Provided: Int, Func<of  => Int>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InvokeLambdaWithWrongTypes", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda => 0)
end main

procedure printModified(i as Int, f as Func<of => Int>)
  call printNoLine(f(5))
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnSameNameAsVariable", async () => {
    const code = `${testHeader}

main
  variable aa set to lambda x => aa
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ReturnSameNameAsVariable1", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x => if(x is 1, x, l(x-1))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
