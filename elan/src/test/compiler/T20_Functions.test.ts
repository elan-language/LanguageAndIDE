import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T20_Functions', () => {

  test('Pass_SimpleCase', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Float, b as Float) return Float
  return a * b
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return a * b;
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test('Pass_ReturnSimpleDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Int
    return default Int
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return 0;
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test('Pass_ReturnClassDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Foo
  return default Foo
end function

class Foo
  constructor()
  end constructor
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return Foo.defaultInstance();
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, []);};
  constructor() {

  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test('Pass_ReturnCollectionDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print foo(3,4)
end main

function foo(a as Int, b as Int) return Array<of Int>
    return default Array<of Int>
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(foo(3, 4)));
}

function foo(a, b) {
  return system.defaultArray();
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty Array");
  });

  test('Pass_Recursive', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print factorial(5)
end main

function factorial(a as Int) return Int
    var result set to 0
    if a > 2
      set result to a * factorial(a - 1)
    else 
      set result to a
    end if
    return result
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(factorial(5)));
}

function factorial(a) {
  var result = 0;
  if (a > 2) {
    result = a * factorial(a - 1);
    } else {
      result = a;
  }
  return result;
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "120");
  });

  test('Pass_GlobalFunctionOnClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var b set to new Bar()
  print foo(b)
end main

function foo(bar as Bar) return String
    return bar.asString()
end function

class Bar
    constructor()
    end constructor

    function asString() return String
        return "bar"
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  system.print(_stdlib.asString(foo(b)));
}

function foo(bar) {
  return bar.asString();
}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, []);};
  constructor() {

  }

  asString() {
    return "bar";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  test('Fail_ParameterCount', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Float) return Float
  return 0
end function

main
  var a set to f(1, 2)
  var b set to f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many parameters 1",
      "Missing parameter 0"
    ]);

  });

  test('Fail_ParameterType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Int) return Float
  return 0.0
end function

main
  var a set to f(true)
  var b set to f(1.0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Boolean to Int",
      "Incompatible types Float to Int"
    ]);

  });

  test('Fail_ReturnType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Boolean) return Int
  return p
end function

main
  var a set to f(true)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Boolean to Int"
    ]);

  });

  test('Fail_noReturnType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p as Int)
  return p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
 
    assertDoesNotParse(fileImpl);
  });

  test('Fail_noAs', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p Int) return Int 
  return p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_noReturn', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

function f(p Int) return Int 
  var c set to p
end function

main
  var a set to f(0)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });





});