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
  test("Fail_LocalShadowsConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to 4

main
  var a set to 3
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

  test("Fail_IdShadowsFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print foo()
end main
function foo() return Int
  return 1
end function

function bar() return Int
  var foo set to foo()
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

  test("Fail_IdShadowsProcedure", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  call foo()
end main
procedure foo()

end procedure

function bar() return Int
  var foo set to 1
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
    const code = `# FFFF Elan Beta 3 valid

main
  call foo(1)
end main
procedure foo(a as Int)
  var a set to a
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  var a set to 2
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
    const code = `# FFFF Elan Beta 3 valid

main
  let a be 1
  var a set to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a 'let' and cannot be re-defined here.",
    ]);
  });

  test("Pass_DisambiguateLocalVariableFromLibConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var pi set to library.pi
  print pi
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var pi = _stdlib.pi;
  system.printLine(_stdlib.asString(pi));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.141592653589793");
  });

  test("Pass_DisambiguateConstantFromInstanceProperty", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant a set to 4

main
    var f set to new Foo()
    print f.prop()
    print f.cons()
end main

class Foo
    constructor()
        set property.a to 3
    end constructor

    property a as Int

    function prop() return Int
        return a
    end function

    function cons() return Int
        return global.a
    end function

    function asString() return String
        return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 4;

};
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.prop()));
  system.printLine(_stdlib.asString(f.cons()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 3;
  }

  a = 0;

  prop() {
    return this.a;
  }

  cons() {
    return global.a;
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "34");
  });

  test("Pass_DisambiguateGlobalFunctionFromInstanceFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var f set to new Foo()
    print f.loc()
    print f.glob()
end main

function bar() return Int
    return 4
end function

class Foo
    constructor()
    end constructor

    function loc() return Int
        return bar()
    end function

    function glob() return Int
        return global.bar()
    end function

    function bar() return Int
        return 3
    end function

    function asString() return String
        return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.loc()));
  system.printLine(_stdlib.asString(f.glob()));
}

function bar() {
  return 4;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  loc() {
    return this.bar();
  }

  glob() {
    return bar();
  }

  bar() {
    return 3;
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "34");
  });

  test("Pass_DisambiguateLibFunctionFromInstanceFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var f set to new Foo()
    print f.sin(1)
    print sin(1)
    print library.sin(1)
end main

function sin(x as Float) return Float
    return 111
end function

class Foo
    constructor()
    end constructor

    function sin(x as Float) return Float
      return 222
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.sin(1)));
  system.printLine(_stdlib.asString(sin(1)));
  system.printLine(_stdlib.asString(_stdlib.sin(1)));
}

function sin(x) {
  return 111;
}

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
    await assertObjectCodeExecutes(fileImpl, "2221110.8414709848078965");
  });

  ignore_test("Fail_NoSuchGlobal", async () => {
    const code = `# FFFF Elan Beta 3 valid

constant b set to 4

main
  var a set to 3
  print global.a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types (Int, String, Int) to (Int, String)"]);
  });

  test("Fail_NoSuchGlobalConstant", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.prop()
  print f.cons()
end main

class Foo
    constructor()
        set property.a to 3
    end constructor

    property a as Int

    function prop() return Int
        return a
    end function

    function cons() return Int
        return global.a
    end function

    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["a is not defined"]);
  });

  test("Fail_NoSuchGlobalSubroutine", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.loc()
  print f.glob()
end main

class Foo
    constructor()
    end constructor

    function loc() return Int
      return bar()
    end function

    function glob() return Int
      return global.bar()
    end function

    function bar() return Int
      return 3
    end function

    function asString() return String
      return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["bar is not defined"]);
  });

  test("Fail_globalGlobal", async () => {
    const code = `# FFFF Elan Beta 3 valid

const a = 4
const b = global.a

main
 
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
