import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("Shadowing", () => {
  test("Pass_DisambiguateLocalVariableFromLibConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable pi set to library.pi
  print pi
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let pi = _stdlib.pi;
  system.printLine(pi);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_DisambiguateLocalVariableFromGlobalConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant f set to 1

main
  variable f set to 2
  print f
  print global.f
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  f = 1;

};
async function main() {
  let f = 2;
  system.printLine(f);
  system.printLine(global.f);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "21");
  });

  test("Pass_DisambiguateLocalLetFromLibConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let pi be library.pi
  print pi
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const pi = _stdlib.pi;
  system.printLine(pi);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_DisambiguateLocalLetFromGlobalConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant f set to 1

main
  let f be 2
  print f
  print global.f
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  f = 1;

};
async function main() {
  const f = 2;
  system.printLine(f);
  system.printLine(global.f);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "21");
  });

  test("Pass_DisambiguateLibFunctionFromLocalAndInstanceFunctions", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable f set to new Foo()
    print f.sin(1)
    print sin(1)
    print global.sin(1)
    print library.sin(1)
end main

function sin(x as Float) returns Float
    return 111
end function

class Foo
    constructor()
    end constructor

    function sin(x as Float) returns Float
      return 222
    end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  system.printLine(f.sin(1));
  system.printLine(sin(1));
  system.printLine(global.sin(1));
  system.printLine(_stdlib.sin(1));
}

function sin(x) {
  return 111;
}
global["sin"] = sin;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  sin(x) {
    return 222;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2221111110.8414709848078965");
  });

  test("Pass_DisambiguateLibProcedureFromLocalAndInstanceProcedures", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  call f.pause(1)
  call pause(1)
  call global.pause(1)
  call library.pause(1)
end main

procedure pause(x as Float)
    print 111
end procedure

class Foo
    constructor()
    end constructor

    procedure pause(x as Float)
      print 222
    end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await f.pause(1);
  await pause(1);
  await global.pause(1);
  await _stdlib.pause(1);
}

async function pause(x) {
  system.printLine(111);
}
global["pause"] = pause;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  async pause(x) {
    system.printLine(222);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "222111111");
  });

  test("Pass_DisambiguateGlobalFunctionFromLocalVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable sin set to 2
    print sin
    print global.sin(1)
end main

function sin(x as Float) returns Float
    return 111
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let sin = 2;
  system.printLine(sin);
  system.printLine(global.sin(1));
}

function sin(x) {
  return 111;
}
global["sin"] = sin;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2111");
  });

  test("Pass_DisambiguateGlobalProcedureFromLocalVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable sin set to 2
  print sin
  call global.sin(1)
end main

procedure sin(x as Float)
  print 111
end procedure`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let sin = 2;
  system.printLine(sin);
  await global.sin(1);
}

async function sin(x) {
  system.printLine(111);
}
global["sin"] = sin;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2111");
  });

  ignore_test("Fail_LocalShadowsConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to 4

main
  variable a set to 3
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a constant and cannot be re-defined here.",
    ]);
  });

  ignore_test("Fail_IdShadowsFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print foo()
end main
function foo() returns Int
  return 1
end function

function bar() returns Int
  variable foo set to foo()
  return foo
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'foo' is already used for a function and cannot be re-defined here.",
    ]);
  });

  ignore_test("Fail_IdShadowsProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo()
end main
procedure foo()

end procedure

function bar() returns Int
  variable foo set to 1
  return foo
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'foo' is already used for a procedure and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo(1)
end main
procedure foo(a as Int)
  variable a set to a
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable a set to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.",
    ]);
  });

  test("Fail_IdShadowsLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be 1
  variable a set to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  test("Fail_LetShadowsLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be 1
  let a be 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  ignore_test("Fail_ParameterShadowsConst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant x set to 1

main
  
end main

function foo(x as Int) returns Int
  return x
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'x' is already used for a constant and cannot be re-defined here.",
    ]);
  });

  test("Fail_global", async () => {
    const code = `# FFFF Elan v1.0.0 valid

const a = 4
const b = global.a

main
 
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ShadowParameter1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  variable a set to 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.",
    ]);
  });

  test("Fail_ShadowParameter2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable result set to foo(3,4)
  print result
end main

function foo(a as Int, b as Int) returns Int
  let a be 1
  return a * b
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a parameter and cannot be re-defined here.",
    ]);
  });
});
