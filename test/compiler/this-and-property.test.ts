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

suite("This and Property", () => {
  test("Pass_DisambiguateParamAndProperty", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to new Foo(7)
  print x.p1
end main

class Foo
  constructor(p1 as Float)
    set property.p1 to p1
  end constructor

  property p1 as Float

  function asString() return String
    return ""
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7));
  system.printLine(_stdlib.asString(x.p1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor(p1) {
    this.p1 = p1;
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_UsingThisAsAnInstance", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.bar()
end main

function doubled(f as Foo) return Float
    return 2 * f.p1
end function

immutable class Foo
    constructor()
        set property.p1 to 3
    end constructor

    property p1 as Float

    function bar() return Float
        return doubled(this)
    end function

    function asString() return String
        return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.bar()));
}

function doubled(f) {
  return 2 * f.p1;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 3;
  }

  p1 = 0;

  bar() {
    return doubled(this);
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_UsingPropertyAsIndex", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.bar()
end main

class Foo
  constructor()
    set property.p1 to 1
  end constructor

  property p1 as Int

  function bar() return Int
    var lst set to [1, 2]
    return lst[p1]
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.bar()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 1;
  }

  p1 = 0;

  bar() {
    var lst = system.literalArray([1, 2]);
    return system.safeIndex(lst, this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Fail_UsingPropertyAsIndex1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.bar()
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function bar() return Int
    var lst set to [1, 2]
    call lst.setAt(p1, 3)
    return lst[0]
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NoSuchProperty", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set property.p to p1
    end constructor

    property p1 as Float

    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["p is not defined"]);
  });

  test("Fail_MissingSelfCausesCompileErrorDueToAssigningToParam", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set p1 to p1
    end constructor

    property p1 as Float

    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign parameter: p1"]);
  });
});
