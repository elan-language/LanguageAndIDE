import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Throw Catch", () => {
  test("Pass_ThrowExceptionInMain", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    throw exception "Foo"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  throw new Error("Foo");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_ThrowExceptionInMainUsingVariableForMessage", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable msg set to "Foo"
  throw exception msg
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let msg = "Foo";
  throw new Error(msg);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_ThrowExceptionUsingInterpolatedStringForMessage", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bar set to 1
  throw exception "{bar}"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = 1;
  throw new Error(\`\${_stdlib.asString(bar)}\`);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "1");
  });

  test("Pass_ThrowExceptionInProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call foo()
end main
 
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await foo();
}

async function foo() {
  throw new Error("Foo");
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test("Pass_CatchException", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  try
    call foo()
    print "not caught"
  catch exception in e
    print e
  end try
end main

procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    system.printLine(_stdlib.asString("not caught"));
  } catch (_e) {
    let e = _e.message;
    system.printLine(_stdlib.asString(e));
  }
}

async function foo() {
  throw new Error("Foo");
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_CatchSystemGeneratedException", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  try
    variable x set to empty Array<of Foo>
    variable y set to x[1]
    variable z set to y.p1
    print "not caught"
  catch exception in e
    print e
  end try
end main

class Foo
    constructor()
    end constructor

    property p1 as Int

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    let x = system.emptyArray();
    let y = system.safeIndex(x, 1);
    let z = y.p1;
    system.printLine(_stdlib.asString("not caught"));
  } catch (_e) {
    let e = _e.message;
    system.printLine(_stdlib.asString(e));
  }
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Out of range index: 1 size: 0");
  });

  test("Pass_UseException", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  try
    call foo()
    print "not caught"
  catch exception in e
    variable s set to ""
    set s to e
    print s
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  try {
    await foo();
    system.printLine(_stdlib.asString("not caught"));
  } catch (_e) {
    let e = _e.message;
    let s = "";
    s = e;
    system.printLine(_stdlib.asString(s));
  }
}

async function foo() {
  throw new Error("Foo");
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Fail_ThrowExceptionInFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable s set to foo("s")
end main
 
function foo(x String) as String
  throw exception x
  return x
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_catchMissingVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  try
    call foo()
    print "not caught"
  catch
    print "caught"
  end try
end main
  
procedure foo()
  throw exception "Foo"
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseExpressionForMessage", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable msg set to "Foo"
  throw exception msg + bar
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
