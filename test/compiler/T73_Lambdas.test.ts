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

suite("T73_Lambdas", () => {
  test("Pass_PassAsParam", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call printModified((4, 5), lambda t as (Int, Int) => t.first())
end main
  
procedure printModified(i as (Int, Int), f as Func<of (Int, Int) => Int>)
  print f(i)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await printModified(system.tuple([4, 5]), (t) => _stdlib.first(t));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    set p1 to p
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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

  test("Fail_ImmediateInvoke", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
});
