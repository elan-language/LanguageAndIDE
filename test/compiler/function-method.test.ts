import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
    assertDoesNotCompile,
    assertDoesNotParse,
    assertObjectCodeExecutes,
    assertObjectCodeIs,
    assertParses,
    assertStatusIsValid,
    testHash,
    testHeader,
    transforms,
} from "./compiler-test-helpers";

suite("Function Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `${testHeader}

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
  let f = system.initialise(await new Foo()._initialise());
  await system.print((await f.times(2)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return this.p1 * value;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_FunctionMethodReturnType", async () => {
    const code = `${testHeader}

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
  let f = system.initialise(await new Foo()._initialise());
  let x = 1.1;
  x = (await f.times(x));
  await system.print(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return this.p1 * value;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5.5");
  });

  test("Pass_FunctionMethodReturnType1", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable x set to empty ListImmutable<of Float>
  set x to f.times(2)
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns ListImmutable<of Float>
        return {property.p1 * value}
    end function

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let x = system.initialise(_stdlib.ListImmutable.emptyInstance());
  x = (await f.times(2));
  await system.print(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return system.listImmutable([this.p1 * value]);
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{10}");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty", async () => {
    const code = `${testHeader}

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

  function getTimes() returns ListImmutable<of Float>
    variable x set to empty ListImmutable<of Float>
    set x to property.p1.times(2)
    return x
  end function

end class

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    function times(value as Float) returns ListImmutable<of Float>
        return {property.p1 * value}
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  let x = (await b.getTimes());
  await system.print(x);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Foo()._initialise());
    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async getTimes() {
    let x = system.initialise(_stdlib.ListImmutable.emptyInstance());
    x = (await this.p1.times(2));
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return system.listImmutable([this.p1 * value]);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{10}");
  });

  test("Pass_FunctionMethodReturnTypeOnProperty1", async () => {
    const code = `${testHeader}

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
        return [new Qux()]
    end function

end class

class Qux
  constructor()
  end constructor
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Bar()._initialise());
  let x = (await b.getTimes());
  await system.print(x);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Foo()._initialise());
    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async getTimes() {
    let x = system.initialise(_stdlib.List.emptyInstance());
    x = (await this.p1.times(2));
    return x;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(value) {
    return system.list([system.initialise(await new Qux()._initialise())]);
  }

}

class Qux {
  static emptyInstance() { return system.emptyClass(Qux, []);};

  async _initialise() {

    return this;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a Qux]");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionViaProperty", async () => {
    const code = `${testHeader}

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
  let f = system.initialise(await new Foo()._initialise());
  await system.print((await f.length()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Bar()._initialise());
    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Bar.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async length() {
    return (await this.p1.length()) + 2;
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async length() {
    return this.p1;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_FunctionMethodMayCallOtherClassFunctionMethod", async () => {
    const code = `${testHeader}

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
  let f = system.initialise(await new Foo()._initialise());
  let b = system.initialise(await new Bar()._initialise());
  await system.print((await f.times(b)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(b) {
    return (await this.p1PlusOne()) * (await b.p1PlusOne());
  }

  async p1PlusOne() {
    return this.p1 + 1;
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async p1PlusOne() {
    return this.p1 + 1;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_FunctionMethodNameHidesGlobalFunction", async () => {
    const code = `${testHeader}

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
  let f = system.initialise(await new Foo()._initialise());
  await f.prt();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async prt() {
    await system.print((await this.asString()));
  }

  async asString() {
    return (await _stdlib.asString(this.p1));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Fail_FunctionCannotBeCalledDirectly", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'times' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_FunctionisNotDefined", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'noSuch' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodCannotMutateProperty", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.LangRef.html#compile_error",
    ]);
  });

  test("Fail_FunctionMethodCannotCallProcedureMethod", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Bar) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_ReturnUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  function changeValue(a as Int) returns Bar
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  function if(a as Int) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  function break(a as Int) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testHeader}

main

end main
    
class Foo
  constructor()
  end constructor

  function foo(a as Int, b as String, a as Int) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_NestedUpdateProperty", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NestedUpdateProperty1", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IncorrectScope", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.bar()
end main

class Foo
end class

function bar() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'bar' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ReturnListOfMutableType", async () => {
    const code = `${testHeader}

class Foo
  function p1() returns ListImmutable<of List<of Int>>
    return p1()
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterListOfMutableType", async () => {
    const code = `${testHeader}

class Foo
  function p1(a as ListImmutable<of List<of Int>>) returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash1", async () => {
    const code = `${testHeader}

class Foo
  function foo(foo as Int) returns String
      return ""
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameter 'foo' may not have the same name as the method in which it is defined.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterNameClash2", async () => {
    const code = `${testHeader}

class Foo
  function foo(a as Int, foo as Int) returns String
      return ""
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Parameter 'foo' may not have the same name as the method in which it is defined.LangRef.html#compile_error",
    ]);
  });
});
