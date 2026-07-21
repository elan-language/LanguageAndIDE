import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
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
  call printNoLine(x.toString())
end main

class Foo
  constructor()
    assign this.p1 to 5
    assign this.p2 to ""
  end constructor

  property p1 as Float

  property p2 as String

  function toString() returns String
        return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(x.p1);
  await _stdlib.printNoLine(x.p2);
  await _stdlib.printNoLine((await x.toString()));
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

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
        assign this.p1 to p_1
        assign this.p2 to p_2
    end constructor

    property p1 as Float
    property p2 as String
    function toString() returns String
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

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
      assign this.b to bar
    end constructor
  function toString() returns String
    return ""
  end function

    property b as Bar 

end class

class Bar
    constructor()
      assign this.p1 to 5
    end constructor
  function toString() returns String
    return ""
  end function

    property p1 as Int

    procedure printP1()
      call printNoLine(this.p1)
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

  async toString() {
    return "";
  }

  elan_b;
  get b() {
    return this.elan_b ??= Bar.emptyInstance();
  }
  set b(b) {
    this.elan_b = b;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async printP1() {
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  variable opt set to bar.foo
  call opt.put(foo)
  variable foo2 set to bar.foo.getValue()
  variable bar2 set to foo2.bar
  call printNoLine(bar2.p1)
  call printNoLine(bar2.p2)
end main

class Foo
  constructor()
    assign this.bar to new Bar()
  end constructor

  property bar as Bar

  function toString() returns String
    return ""
  end function

end class

class Bar
  constructor()
    assign this.p2 to ""
    assign this.foo to new Maybe<of Foo>()
  end constructor

  property p1 as Int

  property p2 as String

  property foo as Maybe<of Foo>

  function toString() returns String
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
  let opt = bar.foo;
  opt.put(foo);
  let foo2 = bar.foo.getValue();
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

  elan_bar;
  get bar() {
    return this.elan_bar ??= Bar.emptyInstance();
  }
  set bar(bar) {
    this.elan_bar = bar;
  }

  async toString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p2 = "";
    this.foo = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  p1 = 0;

  p2 = "";

  elan_foo;
  get foo() {
    return this.elan_foo ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set foo(foo) {
    this.elan_foo = foo;
  }

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    assign this.strArr to ["apple", "orange", "pair"]
  end constructor
  function toString() returns String
    return ""
  end function

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

  async toString() {
    return "";
  }

  strArr = system.initialise(_stdlib.List.emptyInstance());

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  function toString() returns String
    return ""
  end function
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

  async toString() {
    return "";
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  function toString() returns String
    return ""
  end function
  property p1 as Int

  procedure updateP1()
    assign this.p1 to 0
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

  async toString() {
    return "";
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_InheritedPropertyInitialised", async () => {
    const code = `${testHeader}

abstract class Foo
  property prop_1 as String

end class

class Bar inherits Foo
  constructor()
    assign this.prop_1 to ""
  end constructor

  function toString() returns String
    return this.prop_1
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["prop_1", ""]]);};
  prop_1 = "";

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.prop_1 = "";
    return this;
  }

  async toString() {
    return this.prop_1;
  }

}

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_NoConstructor", async () => {
    const code = `${testHeader}

class Foo

  property p1 as Int
  property p2 as String
  
  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    assign this.p1 to this.ff()
  end constructor
  function toString() returns String
    return ""
  end function

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

  async toString() {
    return "";
  }

  p1 = 0;

  async ff() {
    return 0;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  assign f to f.with_P1(1)
  call printNoLine(f.p1)
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  copy with_P1(p as Int) returns Foo
    return copyWithPropertyUpdated(this, "p1", p)
  end copy
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  f = (await f.with_P1(1));
  await _stdlib.printNoLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async with_P1(p) {
    return _stdlib.copyWithPropertyUpdated(this, "p1", p);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  variable f1 set to f.withP1(101)
  variable f2 set to f1.withP2("updated")
  variable f3 set to f2.withP1(102).withP2("updated2")
  call printNoLine(f)
  call printNoLine(f1)
  call printNoLine(f2)
  call printNoLine(f3)
end main

class Foo
  constructor()
    assign this.p2 to ""
    assign this.p3 to ""
  end constructor

  property p1 as Int

  property p2 as String

  property p3 as String

  copy withP1(p as Int) returns Foo
    return copyWithPropertyUpdated(this, "p1", p)
  end copy

  copy withP2(p as String) returns Foo
    return copyWithPropertyUpdated(this, "p2", p)
  end copy

  procedure setup(pI as Int, pS as String)
    assign this.p1 to pI
    assign this.p2 to pS
    assign this.p3 to "unchanged"
  end procedure

  function toString() returns String
    return $"Foo:{this.p1}:{this.p2}:{this.p3}"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.setup(100, "initial");
  let f1 = (await f.withP1(101));
  let f2 = (await f1.withP2("updated"));
  let f3 = (await (await f2.withP1(102)).withP2("updated2"));
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(f1);
  await _stdlib.printNoLine(f2);
  await _stdlib.printNoLine(f3);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""], ["p3", ""]]);};

  async _initialise() {
    this.p2 = "";
    this.p3 = "";
    return this;
  }

  p1 = 0;

  p2 = "";

  p3 = "";

  async withP1(p) {
    return _stdlib.copyWithPropertyUpdated(this, "p1", p);
  }

  async withP2(p) {
    return _stdlib.copyWithPropertyUpdated(this, "p2", p);
  }

  async setup(pI, pS) {
    this.p1 = pI;
    this.p2 = pS;
    this.p3 = "unchanged";
  }

  async toString() {
    return \`Foo:\${await _stdlib.toString(this.p1)}:\${await _stdlib.toString(this.p2)}:\${await _stdlib.toString(this.p3)}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "Foo:100:initial:unchangedFoo:101:initial:unchangedFoo:101:updated:unchangedFoo:102:updated2:unchanged",
    );
  });

  test("Pass_ProcedureNameMatchesCalledProcedureName", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.append()
end main

class Foo
  constructor()
    assign this.p1 to new List<of Int>()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as List<of Int>

  procedure append()
    variable p1 set to this.p1
    call p1.append(1)
    call printNoLine(this.p1)
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

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.List()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  p1 = system.initialise(_stdlib.List.emptyInstance());

  async append() {
    let p1 = this.p1;
    p1.append(1);
    await _stdlib.printNoLine(this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   
    function toString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AttemptToModifyAPropertyDirectly", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  assign x.p1 to 3
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function toString() returns String
      return ""
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_OverloadedConstructor", async () => {
    const code = `${testHeader}

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  constructor(val as Int)
      assign this.p1 to val
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
      assign this.p1 to val
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: val (Int).ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InstantiateWithWrongArgType", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7.1)
end main

class Foo
  constructor(val as Int)
      assign this.p1 to val
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: val (Int), Provided: Float.ErrorMessages.html#compile_error",
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
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingNewOnInstantiation", async () => {
    const code = `${testHeader}

main
  variable x set to Foo()
  call printNoLine(x.p1)
  call printNoLine(x.p2)
  call printNoLine(x.toString())
end main

class Foo
  constructor()
      assign this.p1 to 5
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  property p2 as String

  function toString() returns String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.ErrorMessages.html#compile_error"]);
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
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class

procedure proc(bar as Bar)
    call printNoLine(bar.p1)
end procedure
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: bar (Bar), Provided: Foo.ErrorMessages.html#compile_error",
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
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class

class Bar
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class

function fun(bar as Bar) returns Int
    return bar.p1
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: bar (Bar), Provided: Foo.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UnknownPropertyType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    assign this.p1 to new Bar()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Bar
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.ErrorMessages.html#compile_error"]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'Foo' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicatePropertyNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    assign this.p1 to ""
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as String
  property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'p1' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateFunctionNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  function ff() returns Int
    return 0
  end function
  function ff() returns Int
    return 0
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateProcedureNames", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  procedure ff()
  end procedure
  procedure ff()
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames1", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  procedure ff()
  end procedure
  property ff as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames2", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  function ff() returns Int
    return 0
  end function
  property ff as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_DuplicateMemberNames3", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  function ff() returns Int
    return 0
  end function
  procedure ff()
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'ff' not unique in scope.ErrorMessages.html#compile_error",
    ]);
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
  function toString() returns String
    return ""
  end function

    procedure setP1(a as Int)
      assign this.b to a
    end procedure
    
    property b as Int

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  function toString() returns String
    return ""
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "generic type specifier was not expected here.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_UnnecessaryGenericParm2", async () => {
    const code = `${testHeader}

main
  variable x set to new Random<of String>()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "generic type specifier was not expected here.ErrorMessages.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_CannotNewUnknownType", async () => {
    const code = `${testHeader}

main
  variable x set to new FooBar()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'FooBar' is not defined.ErrorMessages.html#compile_error",
      "'FooBar' is not defined.ErrorMessages.html#compile_error",
      "Cannot create instance of FooBar.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_CannotNewNonClassType", async () => {
    const code = `${testHeader}

main
  variable x set to new Int()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot create instance of Int.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_PropertyIsNotDefined", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
    constructor()
      assign this.vg to new CircleVG()
    end constructor
  function toString() returns String
    return ""
  end function

    property vg as CircleVG

    procedure bar()
      assign this.vg to this.vg.noSuch
    end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'noSuch' is not defined for type 'CircleVG'.ErrorMessages.html#compile_error",
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Foo' cannot inherit from itself.ErrorMessages.html#compile_error",
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Yon' cannot inherit from itself.ErrorMessages.html#compile_error",
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Bar' cannot inherit from itself.ErrorMessages.html#compile_error",
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
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class/interface 'Bar' cannot inherit from itself.ErrorMessages.html#compile_error",
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
  function toString() returns String
    return ""
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'constructor' is not defined for type 'Foo'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UpdatePropertyInFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  assign f to f.withP1(1)
  call printNoLine(f.p1)
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function withP1(p as Int) returns Foo
    assign this.p1 to p
    return this
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_UpdatePropertyInFunction1", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  assign f to f.withP1(1)
  call printNoLine(f.p1)
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function withP1(p as Int) returns Foo
    assign this.p1 to p
    return this
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not set property: p1 in a function.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InvalidUpdateProperty2", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.withP1(1)
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function
  property p1 as Int

  procedure withP1(p as Int)
    let copyOfThis be copy(this)
    assign cpy.p1 to p
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PropertyMustBeInitialised", async () => {
    const code = `${testHeader}

class Bar
  constructor()

  end constructor

  property prop_1 as String

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Property prop_1 must be initialised in constructor.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_InheritedPropertyMustBeInitialised", async () => {
    const code = `${testHeader}

abstract class Foo
  property prop_1 as String

end class

class Bar inherits Foo
  constructor()

  end constructor

  function toString() returns String
    return this.prop_1
  end function

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Property prop_1 must be initialised in constructor.ErrorMessages.html#compile_error",
    ]);
  });
});
