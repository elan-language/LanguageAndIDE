import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
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

suite("T52_FunctionMethods", () => {
  test("Pass_HappyCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.times(2)
end main

class Foo
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return Float
        return p1 * value
    end function

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.times(2)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(value) {
    return this.p1 * value;
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
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionViaProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.length()
end main

class Foo
    constructor()
        set p1 to new Bar()
    end constructor

    property p1 as Bar

    function length() return Float
        return p1.length() + 2
    end function

    function asString() return String
         return ""
    end function

end class

class Bar
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    function length() return Float
        return p1
    end function

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.length()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {
    this.p1 = system.initialise(new Bar());
  }

  _p1;
  get p1() {
    return this._p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  length() {
    return this.p1.length() + 2;
  }

  asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  length() {
    return this.p1;
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionMethod", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var b set to new Bar()
  print f.times(b)
end main

class Foo
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    function times(b as Bar) return Float
        return p1PlusOne() * b.p1PlusOne()
    end function

    function p1PlusOne() return Float
        return p1 + 1
    end function

    function asString() return String
         return ""
    end function

end class

immutable class Bar
    constructor()
        set p1 to 1
    end constructor

    property p1 as Float

    function p1PlusOne() return Float
        return p1 + 1
    end function

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var b = system.initialise(new Bar());
  system.print(_stdlib.asString(f.times(b)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(b) {
    return this.p1PlusOne() * b.p1PlusOne();
  }

  p1PlusOne() {
    return this.p1 + 1;
  }

  asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  constructor() {
    this.p1 = 1;
  }

  p1 = 0;

  p1PlusOne() {
    return this.p1 + 1;
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
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_FunctionMethodNameHidesGlobalFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call f.prt()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Float

  procedure prt()
    print asString()
  end procedure

  function asString() return String
    return p1.asString()
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  await f.prt();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  async prt() {
    system.print(_stdlib.asString(this.asString()));
  }

  asString() {
    return _stdlib.asString(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Fail_FunctionCannotBeCalledDirectly", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print times(f, 2)
end main

class Foo
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return Float
        return p1 * value
    end function

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["times is not defined"]);
  });

  test("Fail_FunctionMethodCannotMutateProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
  constructor()
    set p1 to 5
  end constructor

  property p1 as Float

  function times(value as Float) return Float
    set p1 to p1 * value
    return p1
  end function

  function asString() return String
    return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate non local data in function"]);
  });

  test("Fail_FunctionMethodCannotCallProcedureMethod", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return Float
        call setP1(p1 * value)
        return p1
    end function

    procedure setP1(value as Float) 
        set p1 to value
    end procedure

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Bar) return Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar is not defined"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Int) return Bar
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Bar is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function if(a as Int) return Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' keyword may not be used as identifier"]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main

end main
    
class Foo
  constructor()
  end constructor

  function foo(a as Int, b as String, a as Int) return Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name a not unique in scope"]);
  });
});
