import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

suite("Lambda", () => {
  test("Pass_PassAsParam", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x as Int => x * 3)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(4, async (x) => x * 3);
}

async function printModified(i, f) {
  await system.printLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_TupleArg", async () => {
    const code = `${testHeader}

main
  call printModified(tuple(4, 5), lambda t as (Int, Int) => global.first(t))
end main

function first(t as (Int, Int)) returns Int
    let a, _ be t
    return a
end function
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  print f(i)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => (await global.first(t)));
}

async function first(t) {
  const [a, ] = t;
  return a;
}
global["first"] = first;

async function printModified(i, f) {
  await system.printLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_TupleArg1", async () => {
    const code = `${testHeader}

main
  call printModified(tuple(4, 5), lambda t as (Int, Int) => t.item0)
end main
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  print f(i)
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await printModified(system.tuple([4, 5]), async (t) => t[0]);
}

async function printModified(i, f) {
  await system.printLine((await f(i)));
}
global["printModified"] = printModified;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_AssignALambdaToAVariable", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x as Int => x * 5
  print l(5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = async (x) => x * 5;
  await system.printLine((await l(5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_AssignALambdaToAProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  call foo.setP1(lambda x as Int => x)
  variable v set to foo.p1(5)
  print v
end main

class Foo
  constructor()
  end constructor

  procedure setP1(p as Func<of Int => Int>)
    set property.p1 to ref p
  end procedure

  property p1 as Func<of Int => Int>
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  await foo.setP1(async (x) => x);
  let v = (await foo.p1(5));
  await system.printLine(v);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", system.emptyFunc(0)]]);};

  async _initialise() {

    return this;
  }

  async setP1(p) {
    this.p1 = p;
  }

  p1 = system.emptyFunc(0);

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_lambdaInExpression", async () => {
    const code = `${testHeader}

main
  variable l set to lambda x as Int => x * 5
  print l(5) + 5
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = async (x) => x * 5;
  await system.printLine((await l(5)) + 5);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "30");
  });

  test("Pass_ReturnALambda", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc()
  print l(5)
end main
    
function getFunc() returns Func<of Int => Int>
  return lambda x as Int => x * 5
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = (await global.getFunc());
  await system.printLine((await l(5)));
}

async function getFunc() {
  return async (x) => x * 5;
}
global["getFunc"] = getFunc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_ParameterlessLambda", async () => {
    const code = `${testHeader}

main
  variable x set to 3
  variable l set to lambda => x * 5
  print l()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = 3;
  let l = async () => x * 5;
  await system.printLine((await l()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "15");
  });

  test("Pass_ReturnAParameterLessLambda", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc(5)
  print l()
end main
    
function getFunc(x as Int) returns Func<of => Int>
  return lambda => x * 5
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = (await global.getFunc(5));
  await system.printLine((await l()));
}

async function getFunc(x) {
  return async () => x * 5;
}
global["getFunc"] = getFunc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_FuncOfMutableType", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc(5)
  print l([5])
end main
    
function getFunc(x as Int) returns Func<of List<of Int> => List<of Int>>
  return lambda y as List<of Int> => [x * y[0]]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = (await global.getFunc(5));
  await system.printLine((await l(system.list([5]))));
}

async function getFunc(x) {
  return async (y) => system.list([x * system.safeIndex(y, 0)]);
}
global["getFunc"] = getFunc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[25]");
  });

  test("Pass_Lambda WithLambdaParam", async () => {
    const code = `${testHeader}

main
  let l be lambda x as Func<of Int => Int> => x(2)
  print l(lambda x as Int => 2 * x)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const l = async (x) => (await x(2));
  await system.printLine((await l(async (x) => 2 * x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Fail_ImmediateInvoke", async () => {
    const code = `${testHeader}

main
  variable l set to getFunc()(5)
  print l
end main
    
function getFunc() returns Func<of Int => Int>
  return lambda x as Int => x * 5
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassLambdaWithWrongTypes", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x as Int => x.asString())
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: i (Int), f (Func<of Int => Int>), Provided: Int, Func<of Int => String>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InvokeLambdaWithWrongType", async () => {
    const code = `${testHeader}

main
  call printModified("4", lambda x as Int => x + 3)
end main

procedure printModified(i as String, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: parameter0 (Int), Provided: String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PassLambdaWithWrongTypes1", async () => {
    const code = `${testHeader}

main
  call printModified(4, lambda x as Int => x)
end main

procedure printModified(i as Int, f as Func<of => Int>)
  print f()
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print f(5)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print f(5)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LambdaWithListOfMutableType1", async () => {
    const code = `${testHeader}

procedure printModified(i as Int, f as Func<of => ListImmutable<of List<of Int>>>)
  
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LambdaWithListOfMutableType2", async () => {
    const code = `${testHeader}

procedure printModified(i as Int, f as Func<of ListImmutable<of List<of Int>> => Int>)
  
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnSameNameAsVariable", async () => {
    const code = `${testHeader}

main
  let aa be lambda x as Int => aa
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'aa' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_ReturnSameNameAsVariable1", async () => {
    const code = `${testHeader}

main
  let l be lambda x as Int => if x is 1 then x else l(x-1)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'l' is not defined.LangRef.html#compile_error"]);
  });
});
