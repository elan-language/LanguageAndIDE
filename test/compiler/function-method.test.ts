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

suite("Function Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.times(2)
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns Float
        return property.p1 * value
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await system.printLine(f.times(2));
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

  async asString() {
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  variable x set to 1.1
  set x to f.times(x)
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns Float
        return property.p1 * value
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  let x = 1.1;
  x = f.times(x);
  await system.printLine(x);
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

  async asString() {
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  variable x set to empty List<of Float>
  set x to f.times(2)
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns List<of Float>
        return {property.p1 * value}
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  let x = system.emptyImmutableList();
  x = f.times(2);
  await system.printLine(x);
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

  async asString() {
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable x set to b.getTimes()
  print x
end main

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  property p1 as Foo

  function getTimes() returns List<of Float>
    variable x set to empty List<of Float>
    set x to property.p1.times(2)
    return x
  end function

end class

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns List<of Float>
        return {property.p1 * value}
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(new Bar());
  let x = b.getTimes();
  await system.printLine(x);
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
    let x = system.emptyImmutableList();
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable b set to new Bar()
  variable x set to b.getTimes()
  print x
end main

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  property p1 as Foo

  function getTimes() returns List<of Qux>
    variable x set to empty List<of Qux>
    set x to property.p1.times(2)
    return x
  end function

end class

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns List<of Qux>
        return {new Qux()}
    end function

end class

class Qux
  constructor()
  end constructor
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(new Bar());
  let x = b.getTimes();
  await system.printLine(x);
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
    let x = system.emptyImmutableList();
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.length()
end main

class Foo
    constructor()
        set property.p1 to new Bar()
    end constructor

    property p1 as Bar

    function length() returns Float
        return property.p1.length() + 2
    end function

    function asString() returns String
         return ""
    end function

end class

class Bar
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function length() returns Float
        return property.p1
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await system.printLine(f.length());
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

  async asString() {
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

  async asString() {
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  variable b set to new Bar()
  print f.times(b)
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(b as Bar) returns Float
        return p1PlusOne() * b.p1PlusOne()
    end function

    function p1PlusOne() returns Float
        return property.p1 + 1
    end function

    function asString() returns String
         return ""
    end function

end class

class Bar
    constructor()
        set property.p1 to 1
    end constructor

    property p1 as Float

    function p1PlusOne() returns Float
        return property.p1 + 1
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  let b = system.initialise(new Bar());
  await system.printLine(f.times(b));
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

  async asString() {
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

  async asString() {
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
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

  function asString() returns String
    return property.p1.asString()
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await f.prt();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  async prt() {
    await system.printLine(this.asString());
  }

  async asString() {
    return await _stdlib.asString(this.p1);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print times(f, 2)
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns Float
        return p1 * value
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'times' is not defined"]);
  });

  test("Fail_FunctionisNotDefined", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  variable v set to 0
  set v to f.noSuch()
end main

class Foo
    constructor()
      
    end constructor

    function such() returns Int
        return 0
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'noSuch' is not defined for type 'Foo'"]);
  });

  test("Fail_FunctionMethodCannotMutateProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
  constructor()
    set property.p1 to 5
  end constructor

  property p1 as Float

  function times(value as Float) returns Float
    set property.p1 to property.p1 * value
    return property.p1
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not set property: p1 in a function"]);
  });

  test("Fail_FunctionMethodCannotCallProcedureMethod", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns Float
        call setP1(p1 * value)
        return p1
    end function

    procedure setP1(value as Float) 
        set property.p1 to value
    end procedure

    function asString() returns String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Bar) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Int) returns Bar
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function if(a as Int) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function break(a as Int) returns Int
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
    const code = `# FFFF Elan v1.0.0 valid

main

end main
    
class Foo
  constructor()
  end constructor

  function foo(a as Int, b as String, a as Int) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope"]);
  });

  test("Fail_NestedUpdateProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let f be new Foo()
  print f.foo()
end main
    
class Foo
  constructor()
  end constructor

  function foo() returns Int
    if property.p2 then
      set property.p1 to 1
    end if
    return property.p1
  end function

  property p1 as Int
  property p2 as Boolean
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not set property: p1 in a function"]);
  });

  test("Fail_NestedUpdateProperty1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let f be new Foo()
  print f.foo()
end main
    
class Foo
  constructor()
  end constructor

  function foo() returns Int
    if property.p2 then
      if property.p2 then
        if property.p2 then
          set property.p1 to 1
        end if
      end if
    end if
    return property.p1
  end function

  property p1 as Int
  property p2 as Boolean
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not set property: p1 in a function"]);
  });

  test("Fail_IncorrectScope", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.bar()
end main

class Foo
end class

function bar() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'bar' is not defined for type 'Foo'"]);
  });
});
