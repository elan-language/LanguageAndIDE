import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Lambda", () => {
  test("Pass_PassAsParam", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified(4, lambda x as Int => x * 3)
end main
  
procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printModified(4, (x) => x * 3);
}

async function printModified(i, f) {
  system.printLine(_stdlib.asString(f(i)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_TupleArg", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified((4, 5), lambda t as (Int, Int) => first(t))
end main

function first(t as (Int, Int)) return Int
    let a, _ be t
    return a
end function
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  print f(i)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printModified(system.tuple([4, 5]), (t) => first(t));
}

function first(t) {
  const [a, ] = t;
  return a;
}

async function printModified(i, f) {
  system.printLine(_stdlib.asString(f(i)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_AssignALambdaToAVariable", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var l set to lambda x as Int => x * 5
  print l(5)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = (x) => x * 5;
  system.printLine(_stdlib.asString(l(5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_AssignALambdaToAProperty", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to new Foo()
  call foo.setP1(lambda x as Int => x)
  var v set to foo.p1(5)
  print v
end main

class Foo
  constructor()
  end constructor

  procedure setP1(p as Func<of Int => Int>)
    set property.p1 to p
  end procedure

  property p1 as Func<of Int => Int>
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  await foo.setP1((x) => x);
  var v = foo.p1(5);
  system.printLine(_stdlib.asString(v));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", system.emptyFunc(0)]]);};
  constructor() {

  }

  async setP1(p) {
    this.p1 = p;
  }

  p1 = system.emptyFunc(0);

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_lambdaInExpression", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var l set to lambda x as Int => x * 5
  print l(5) + 5
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = (x) => x * 5;
  system.printLine(_stdlib.asString(l(5) + 5));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "30");
  });

  test("Pass_ReturnALambda", async () => {
    const code = `# FFFF Elan Beta 4 valid

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
  system.printLine(_stdlib.asString(l(5)));
}

function getFunc() {
  return (x) => x * 5;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_ParameterlessLambda", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to 3
  var l set to lambda => x * 5
  print l()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = 3;
  var l = () => x * 5;
  system.printLine(_stdlib.asString(l()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "15");
  });

  test("Pass_ReturnAParameterLessLambda", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var l set to getFunc(5)
  print l()
end main
    
function getFunc(x as Int) return Func<of => Int>
  return lambda => x * 5
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = getFunc(5);
  system.printLine(_stdlib.asString(l()));
}

function getFunc(x) {
  return () => x * 5;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Fail_ImmediateInvoke", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var l set to getFunc()(5)
  print l
end main
    
function getFunc() return Func<of Int => Int>
  return lambda x as Int => x * 5
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PassLambdaWithWrongTypes", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified(4, lambda x as Int => x.asString())
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_InvokeLambdaWithWrongType", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified("4", lambda x as Int => x + 3)
end main

procedure printModified(i as String, f as Func<of Int => Int>)
  print f(i)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_PassLambdaWithWrongTypes1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified(4, lambda x as Int => x)
end main

procedure printModified(i as Int, f as Func<of => Int>)
  print f()
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Function Signatures do not match expected: 0 parameter(s) got: 1",
    ]);
  });

  test("Fail_PassLambdaWithWrongTypes2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified(4, lambda => 0)
end main

procedure printModified(i as Int, f as Func<of Int => Int>)
  print f(5)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Function Signatures do not match expected: 1 parameter(s) got: 0",
    ]);
  });

  test("Fail_InvokeLambdaWithWrongTypes", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  call printModified(4, lambda => 0)
end main

procedure printModified(i as Int, f as Func<of => Int>)
  print f(5)
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 0 got: 1"]);
  });
});
