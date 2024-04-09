import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T20_Functions', () => {

  test('Pass_SimpleCase', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Int
  return a * b
end function`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(foo(3, 4)));
}

function foo(a, b) {
  return a * b;
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  ignore_test('Pass_ReturnSimpleDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Int
    return default
end function`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(foo(3, 4)));
}

function foo(a, b) {
  return default;
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  ignore_test('Pass_ReturnClassDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print foo(3,4)
end main

function foo(a as Int, b as Int) return Foo
  return default
end function

class Foo
  constructor()
  end constructor
end class`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(foo(3, 4)));
}

function foo(a, b) {
  return a * b;
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  ignore_test('Pass_ReturnCollectionDefault', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print foo(3,4)
end main

function foo(a Int, b Int) as Array<of Int>
    return default
end function`;

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(foo(3, 4)));
}

function foo(a, b) {
  return a * b;
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
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

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  system.print(system.asString(factorial(5)));
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
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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

    const objectCode = `var system; export function _inject(l) { system = l; };
export async function main() {
  var b = new Bar();
  system.print(system.asString(foo(b)));
}

function foo(bar) {
  return bar.asString();
}

class Bar {
  constructor() {

  }

  asString() {
    return "bar";
  }

}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bar");
  });

  // TODO fails

});