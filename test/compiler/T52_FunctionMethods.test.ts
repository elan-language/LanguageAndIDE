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

suite("T52_FunctionMethods", () => {
  test("Pass_HappyCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print f.times(2)
end main

class Foo
    constructor()
        set property.p1 to 5
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
  system.printLine(_stdlib.asString(f.times(2)));
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

  test("Pass_FunctionMethodReturnType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  var x set to 1.1
  set x to f.times(x)
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
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
  var x = 1.1;
  x = f.times(x);
  system.printLine(_stdlib.asString(x));
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
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  test("Pass_FunctionMethodReturnType1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  var x set to empty {Float}
  set x to f.times(2)
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return {Float}
        return {p1 * value}
    end function

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var x = system.emptyImmutableList();
  x = f.times(2);
  system.printLine(_stdlib.asString(x));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(value) {
    return system.list([this.p1 * value]);
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
    await assertObjectCodeExecutes(fileImpl, "{10}");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Bar()
  var x set to b.getTimes()
  print x
end main

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  property p1 as Foo

  function getTimes() return {Float}
    var x set to empty {Float}
    set x to p1.times(2)
    return x
  end function

end class

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return {Float}
        return {p1 * value}
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  var x = b.getTimes();
  system.printLine(_stdlib.asString(x));
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  constructor() {
    this.p1 = system.initialise(new Foo());
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  getTimes() {
    var x = system.emptyImmutableList();
    x = this.p1.times(2);
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(value) {
    return system.list([this.p1 * value]);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{10}");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Bar()
  var x set to b.getTimes()
  print x
end main

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  property p1 as Foo

  function getTimes() return {Qux}
    var x set to empty {Qux}
    set x to p1.times(2)
    return x
  end function

end class

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return {Qux}
        return {new Qux()}
    end function

end class

class Qux
  constructor()
  end constructor
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var b = system.initialise(new Bar());
  var x = b.getTimes();
  system.printLine(_stdlib.asString(x));
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  constructor() {
    this.p1 = system.initialise(new Foo());
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  getTimes() {
    var x = system.emptyImmutableList();
    x = this.p1.times(2);
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(value) {
    return system.list([system.initialise(new Qux())]);
  }

}

class Qux {
  static emptyInstance() { return system.emptyClass(Qux, []);};
  constructor() {

  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a Qux}");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionViaProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print f.length()
end main

class Foo
    constructor()
        set property.p1 to new Bar()
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
        set property.p1 to 5
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
  system.printLine(_stdlib.asString(f.length()));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  var b set to new Bar()
  print f.times(b)
end main

class Foo
    constructor()
        set property.p1 to 5
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
        set property.p1 to 1
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
  system.printLine(_stdlib.asString(f.times(b)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  call f.prt()
end main

class Foo
  constructor()
      set property.p1 to 5
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
    system.printLine(_stdlib.asString(this.asString()));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print times(f, 2)
end main

class Foo
    constructor()
        set property.p1 to 5
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

class Foo
  constructor()
    set property.p1 to 5
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
    assertDoesNotCompile(fileImpl, ["May not reassign property: p1"]);
  });

  test("Fail_FunctionMethodCannotCallProcedureMethod", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) return Float
        call setP1(p1 * value)
        return p1
    end function

    procedure setP1(value as Float) 
        set property.p1 to value
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function break(a as Int) return Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
