import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T59_Global", () => {
  ignore_test("Pass_DisambiguateConstantFromLocalVariable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

constant a set to 4

main
  var a set to 3
  print global.a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = 4;

async function main() {
  var a = 3;
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_DisambiguateConstantFromInstanceProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

constant a set to 4

main
    var f set to new Foo()
    print f.prop()
    print f.cons()
end main

class Foo
    constructor()
        set a to 3
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
const a = 4;

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
    return a;
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Foo()
  print f.prop()
  print f.cons()
end main

class Foo
    constructor()
        set a to 3
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
});
