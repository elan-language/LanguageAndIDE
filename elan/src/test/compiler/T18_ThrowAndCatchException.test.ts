import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T18_ThrowAndCatchException', () => {

  test('Pass_ThrowExceptionInMain', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    throw "Foo"
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  throw new Error("Foo");
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test('Pass_ThrowExceptionInMainUsingVariableForMessage', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var msg set to "Foo"
  throw msg
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var msg = "Foo";
  throw new Error(msg);
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test('Pass_ThrowExceptionUsingInterpolatedStringForMessage', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var bar set to 1
  throw "{bar}"
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var bar = 1;
  throw new Error(\`\${_stdlib.asString(bar)}\`);
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "1");
  });

  test('Pass_ThrowExceptionInProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo()
end main
 
procedure foo()
  throw "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  foo();
}

function foo() {
  throw new Error("Foo");
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test('Pass_CatchException', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  try
    call foo()
    print "not caught"
  catch e
    print e
  end try
end main

procedure foo()
  throw "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  try
    foo()
    print "not caught";
  catch (_e) {
    var e = _e as Error;
    system.print(_stdlib.asString(e));
  }
}

function foo() {
  throw new Error("Foo");
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test('Pass_CatchSystemGeneratedException', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  try
    var x set to 1
    var y set to 0
    var z set to x div y
    print "not caught";
  catch e
    print e
  end try
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  try {
    var x = 1;
    var y = 0;
    var z = x / y;
    system.print(_stdlib.asString("not caught"));
  }
  catch (_e) {
    var e = _e as Error;
    system.print(_stdlib.asString(e));
  }
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test('Pass_UseException', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  try
    call foo()
    print ""not caught""
  catch e
    print e.message
  end try
end main
  
procedure foo()
  throw "Foo"
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  try
    foo()
    print "not caught";
  catch (_e) {
    var e = _e as Error;
    system.print(_stdlib.asString(e));
  }
}

function foo() {
  throw new Error("Foo");
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test('Fail_ThrowExceptionInFunction', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var s set to foo("s")
end main
 
function foo(x String) as String
  throw x
  return x
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_catchMissingVariable', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  try
    call foo()
    print "not caught"
  catch
    print "caught"
  end try
end main
  
procedure foo()
  throw "Foo"
end procedure
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_UseExpressionForMessage', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var msg set to "Foo"
  throw msg + bar
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});