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

suite("Concrete Class", () => {
  test("Pass_Class_SimpleInstantiation_PropertyAccess_Methods", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.asString())
end main

class Foo
  constructor()
    set property.p1 to 5
    set property.p2 to ""
  end constructor

  property p1 as Float

  property p2 as String

  function asString() returns String
        return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
  await _stdlib.printNoLine((await x.asString()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p1 = 5;
    this.p2 = "";
    return this;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ConstructorWithParm", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7, "Apple")
  call printNoLine(x.p1)
  call printNoLine(x.p2)
end main

class Foo
    constructor(p_1 as Float,  p_2 as String)
        set property.p1 to p_1
        set property.p2 to p_2
    end constructor

    property p1 as Float
    property p2 as String
    function asString() returns String
        return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7, "Apple"));
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise(p_1, p_2) {
    this.p1 = p_1;
    this.p2 = p_2;
    return this;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test("Pass_ConstructorAsScope", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  variable y set to x.b
  call y.printP1()
end main

class Foo
    constructor()
      variable bar set to new Bar()
      set property.b to bar
    end constructor

    property b as Bar 

end class

class Bar
    constructor()
      set property.p1 to 5
    end constructor

    property p1 as Int

    procedure printP1()
      call printNoLine(property.p1)
    end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  let y = x.b;
  await y.printP1();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    let bar = system.initialise(await new Bar()._initialise());
    this.b = bar;
    return this;
  }

  _b;
  get b() {
    return this._b ??= Bar.emptyInstance();
  }
  set b(b) {
    this._b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async printP1() {
    await _stdlib.printNoLine(this.p1);
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

  test("Pass_ReferenceProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable bar set to foo.bar
  call printNoLine(bar.p1)
  call printNoLine(bar.p2)
  variable foo2 set to bar.foo
  variable bar2 set to foo2.bar
  call printNoLine(bar2.p1)
  call printNoLine(bar2.p2)
end main

class Foo
  constructor()
    set property.bar to new Bar()
  end constructor

  property bar as Bar

  function asString() returns String
        return ""
  end function

end class

class Bar
  constructor()
    set property.p2 to ""
    set property.p2 to ""
    set property.foo to new OPtional<of Foo>()
  end constructor

  property p1 as Int

  property p2 as String

  property foo as OPtional<of Foo>()

  function asString() returns String
        return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let bar = foo.bar;
  await _stdlib.printNoLine(bar.p1);
  await _stdlib.printNoLine(bar.p2);
  let foo2 = bar.foo;
  let bar2 = foo2.bar;
  await _stdlib.printNoLine(bar2.p1);
  await _stdlib.printNoLine(bar2.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.bar = system.initialise(await new Bar()._initialise());
    return this;
  }

  _bar;
  get bar() {
    return this._bar ??= Bar.emptyInstance();
  }
  set bar(bar) {
    this._bar = bar;
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p2 = "";
    this.p2 = "";
    this.foo = system.initialise(await new Foo()._initialise());
    return this;
  }

  p1 = 0;

  p2 = "";

  _foo;
  get foo() {
    return this._foo ??= Foo.emptyInstance();
  }
  set foo(foo) {
    this._foo = foo;
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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_IndexProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable b set to foo.strArr[0]
  call printNoLine(b)
end main

class Foo
  constructor()
    set property.strArr to ["apple", "orange", "pair"]
  end constructor

  property strArr as List<of String>

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let b = system.safeIndex(foo.strArr, 0);
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["strArr", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.strArr = system.list(["apple", "orange", "pair"]);
    return this;
  }

  strArr = system.initialise(_stdlib.List.emptyInstance());

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
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_MutableClassAsProcedureParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call proc(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

procedure proc(foo as Foo)
    call printNoLine(foo.p1)
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

}

async function proc(foo) {
  await _stdlib.printNoLine(foo.p1);
}
global["proc"] = proc;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_MutableClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(fun(f))
end main

class Foo
  constructor()
  end constructor
  property p1 as Int

  procedure updateP1()
    set property.p1 to 0
  end procedure
end class

function fun(foo as Foo) returns Int
    return foo.p1
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await global.fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  p1 = 0;

  async updateP1() {
    this.p1 = 0;
  }

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_NoConstructor", async () => {
    const code = `${testHeader}

class Foo

  property p1 as Int
  property p2 as String
  
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
  });

  test("Pass_ConstructorWithFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(f.p1)
end main

class Foo
  constructor()
    set property.p1 to ff()
  end constructor

  property p1 as Int

  function ff() returns Int
    return 0
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = (await this.ff());
    return this;
  }

  p1 = 0;

  async ff() {
    return 0;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_UpdatePropertyInFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  set f to f.withP1(1)
  call printNoLine(f.p1)
end main

class Foo
  property p1 as Int

  function withP1(p as Int) returns Foo
    variable nf set to new Foo()
    set nf.p1 to p
    return nf
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  f = (await f.withP1(1));
  await _stdlib.printNoLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  async _initialise() { return this; }
  p1 = 0;

  async withP1(p) {
    let nf = system.initialise(await new Foo()._initialise());
    nf.p1 = p;
    return nf;
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_WithPattern", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.setup(100, "initial")
  variable f1 set to f.cpy()
  variable f2 set to f1.withP1(101)
  variable f3 set to f2.withP2("updated")
  variable f4 set to f3.cpy().withP1(102).withP2("updated2")
  call printNoLine(f)
  call printNoLine(f1)
  call printNoLine(f2)
  call printNoLine(f3)
  call printNoLine(f4)
end main

class Foo
  property p1 as Int

  property p2 as String

  property p3 as String

  function cpy() returns Foo
    variable nf set to new Foo()
    set nf.p1 to property.p1
    set nf.p2 to property.p2
    set nf.p3 to property.p3
    return nf
  end function

  function withP1(p as Int) returns Foo
    variable nf set to new Foo()
    set nf to cpy()
    set nf.p1 to p
    return nf
  end function

  function withP2(p as String) returns Foo
    variable nf set to new Foo()
    set nf to cpy()
    set nf.p2 to p
    return nf
  end function

  procedure setup(pI as Int, pS as String)
    set property.p1 to pI
    set property.p2 to pS
    set property.p3 to "unchanged"
  end procedure

  function asString() returns String
    return "Foo:{property.p1}:{property.p2}:{property.p3}"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.setup(100, "initial");
  let f1 = (await f.cpy());
  let f2 = (await f1.withP1(101));
  let f3 = (await f2.withP2("updated"));
  let f4 = (await (await (await f3.cpy()).withP1(102)).withP2("updated2"));
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(f1);
  await _stdlib.printNoLine(f2);
  await _stdlib.printNoLine(f3);
  await _stdlib.printNoLine(f4);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""], ["p3", ""]]);};
  async _initialise() { return this; }
  p1 = 0;

  p2 = "";

  p3 = "";

  async cpy() {
    let nf = system.initialise(await new Foo()._initialise());
    nf.p1 = this.p1;
    nf.p2 = this.p2;
    nf.p3 = this.p3;
    return nf;
  }

  async withP1(p) {
    let nf = system.initialise(await new Foo()._initialise());
    nf = (await this.cpy());
    nf.p1 = p;
    return nf;
  }

  async withP2(p) {
    let nf = system.initialise(await new Foo()._initialise());
    nf = (await this.cpy());
    nf.p2 = p;
    return nf;
  }

  async setup(pI, pS) {
    this.p1 = pI;
    this.p2 = pS;
    this.p3 = "unchanged";
  }

  async asString() {
    return \`Foo:\${await _stdlib.asString(this.p1)}:\${await _stdlib.asString(this.p2)}:\${await _stdlib.asString(this.p3)}\`;
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
    await assertObjectCodeExecutes(
      fileImpl,
      "Foo:100:initial:unchangedFoo:100:initial:unchangedFoo:101:initial:unchangedFoo:101:updated:unchangedFoo:102:updated2:unchanged",
    );
  });

  test("Pass_ProcedureNameMatchesCalledProcedureName", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.append()
end main

class Foo
  property p1 as List<of Int>

  procedure append()
    call property.p1.append(1)
    call printNoLine(property.p1)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.append();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", system.initialise(_stdlib.List.emptyInstance())]]);};
  async _initialise() { return this; }
  p1 = system.initialise(_stdlib.List.emptyInstance());

  async append() {
    this.p1.append(1);
    await _stdlib.printNoLine(this.p1);
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
    await assertObjectCodeExecutes(fileImpl, "[1]");
  });

  test("Fail_InitialisePropertyInLine", async () => {
    const code = `${testHeader}

class Foo

    property p1 as Int set to 3
    property p2 as String
   
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

  test("Fail_AttemptToModifyAPropertyDirectly", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  set x.p1 to 3
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

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
    assertDoesNotCompile(fileImpl, ["Cannot set property: p1 directly.LangRef.html#compile_error"]);
  });

  test("Fail_OverloadedConstructor", async () => {
    const code = `${testHeader}

class Foo
  constructor()
  end constructor

  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

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

  test("Fail_InstantiateWithoutRequiredArgs", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
end main

class Foo
  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

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
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: val (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_InstantiateWithWrongArgType", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7.1)
end main

class Foo
  constructor(val as Int)
      set property.p1 to val
  end constructor

  property p1 as Int

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
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: val (Int), Provided: Float.LangRef.html#compile_error",
    ]);
  });

  test("Fail_SupplyingArgumentNotSpecified", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7)
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

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
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingNewOnInstantiation", async () => {
    const code = `${testHeader}

main
  variable x set to Foo()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.asString())
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Int

  property p2 as String

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

  test("Fail_MissingClassOnInstantiation", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
end main`;

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
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_IncompatibleClassAsProcedureParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call proc(f)
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  property p1 as Int
end class

procedure proc(bar as Bar)
    call printNoLine(bar.p1)
end procedure
`;

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
      "Argument types. Expected: bar (Bar), Provided: Foo.LangRef.html#compile_error",
    ]);
  });

  test("Fail_IncompatibleClassAsFunctionParameter", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(fun(f))
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  property p1 as Int
end class

function fun(bar as Bar) returns Int
    return bar.p1
end function
`;

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
      "Argument types. Expected: bar (Bar), Provided: Foo.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnknownPropertyType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    set property.p1 to new Bar()
  end constructor
  property p1 as Bar
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

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  property p1 as Int
end class

class Foo
  constructor()
  end constructor
  property p1 as Int
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
    assertDoesNotCompile(fileImpl, ["Name 'Foo' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    set property.p1 to ""
  end constructor
  property p1 as String
  property p1 as Int
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
    assertDoesNotCompile(fileImpl, ["Name 'p1' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  function ff() returns Int
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
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  procedure ff()
  end procedure
  procedure ff()
  end procedure
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
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  procedure ff()
  end procedure
  property ff as Int
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
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  property ff as Int
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
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function ff() returns Int
    return 0
  end function
  procedure ff()
  end procedure
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
    assertDoesNotCompile(fileImpl, ["Name 'ff' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_ConstructorWithCall", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  call printNoLine(x.b)
end main

class Foo
    constructor()
      call setP1(5)
    end constructor

    procedure setP1(a as Int)
      set property.b to a
    end procedure
    
    property b as Int

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

  test("Fail_UnnecessaryGenericParm1", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo<of String>()
end main

class Foo
    constructor()
    end constructor
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
      "<of Type> was not expected here.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_UnnecessaryGenericParm2", async () => {
    const code = `${testHeader}

main
  variable x set to new Random<of String>()
end main`;

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
      "<of Type> was not expected here.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_CannotNewUnknownType", async () => {
    const code = `${testHeader}

main
  variable x set to new FooBar()
end main`;

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
      "'FooBar' is not defined.LangRef.html#compile_error",
      "'FooBar' is not defined.LangRef.html#compile_error",
      "Cannot new FooBar.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotNewNonClassType", async () => {
    const code = `${testHeader}

main
  variable x set to new Int()
end main`;

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
    assertDoesNotCompile(fileImpl, ["Cannot new Int.LangRef.html#compile_error"]);
  });

  test("Fail_PropertyIsNotDefined", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
    constructor()
      set property.vg to new CircleVG()
    end constructor

    property vg as CircleVG

    procedure bar()
      set property.vg to property.vg.noSuch
    end procedure

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
      "'noSuch' is not defined for type 'CircleVG'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelf", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Foo
  property prop as Int
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
      "Class/interface 'Foo' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritSelfIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Yon inherits Foo
  property prop as Int
end class

class Bar inherits Yon
  property prop as Int
end class

class Foo inherits Bar
  property prop as Int
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
      "Class/interface 'Yon' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritInterfaceIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Bar
  property prop as Int
end class

interface Yon inherits Bar
  abstract property prop as Int
end interface

interface Bar inherits Yon
  abstract property prop as Int
end interface`;

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
      "Class/interface 'Bar' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_InheritAbstractClassIndirect", async () => {
    const code = `${testHeader}

main
  
end main

class Foo inherits Bar
  property prop as Int
end class

abstract class Yon inherits Bar
  abstract property prop as Int
end class

abstract class Bar inherits Yon
  abstract property prop as Int
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
      "Class/interface 'Bar' cannot inherit from itself.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CallConstructor", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.constructor()
end main

class Foo
  constructor()
  end constructor
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
      "'constructor' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UpdatePropertyInFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  set f to f.withP1(f, 1)
  call printNoLine(f.p1)
end main

class Foo
  property p1 as Int

  function withP1(nf as Foo, p as Int) returns Foo
    set nf.p1 to p
    return nf
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

  test("Fail_UpdatePropertyInFunction1", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  set f to f.withP1(1)
  call printNoLine(f.p1)
end main

class Foo
  property p1 as Int

  function withP1(p as Int) returns Foo
    set property.p1 to p
    return this
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

  test("Fail_UpdatePropertyInFunction2", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable b set to f.withP1(1)
  call printNoLine(b.p1)
end main

class Bar
  property p1 as Int

end class

class Foo
  property p1 as Int

  function withP1(p as Int) returns Bar
    variable nb set to new Bar()
    set nb.p1 to p
    return nb
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

  test("Fail_UpdatePropertyInFunction3", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  set f to f.withP1(f, 1)
  call printNoLine(f.p1)
end main

class Foo
  property p1 as Int

  function withP1(nff as Foo, p as Int) returns Foo
    variable nf set to nff
    set nf.p1 to p
    return nf
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
});
