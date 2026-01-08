import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Chaining", () => {
  test("Pass_SimpleChain", async () => {
    const code = `${testHeader}

main 
  variable a set to {{1,2}, {3,4}}
  variable b set to a[1][1]
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([system.listImmutable([1, 2]), system.listImmutable([3, 4])]);
  let b = system.safeIndex(system.safeIndex(a, 1), 1);
  await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_ChainWithIndex", async () => {
    const code = `${testHeader}

main 
  variable a set to [[1,2], [3,4]]
  variable b set to a[1][1]
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2]), system.list([3, 4])]);
  let b = system.safeIndex(system.safeIndex(a, 1), 1);
  await system.print(b);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain", async () => {
    const code = `${testHeader}

main 
  variable a set to new Foo()
  variable b set to a.a[0]
  print b
end main

class Foo
  constructor()
    set property.a to {1}
  end constructor
  
  property a as ListImmutable<of Int>
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = system.safeIndex(a.a, 0);
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.initialise(_stdlib.ListImmutable.emptyInstance())]]);};

  async _initialise() {
    this.a = system.listImmutable([1]);
    return this;
  }

  a = system.initialise(_stdlib.ListImmutable.emptyInstance());

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

  test("Pass_PropertyChain2", async () => {
    const code = `${testHeader}

main 
  variable f set to new Foo()
  variable b set to 0
  set b to f.b.y.z
  print b
end main

class Foo
  constructor()
  end constructor
  
  property b as Bar
end class

class Bar
  constructor()
  end constructor
  
  property y as Yon
end class

class Yon
  constructor()
    set property.z to 2
  end constructor
  
  property z as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let b = 0;
  b = f.b.y.z;
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

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
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  _y;
  get y() {
    return this._y ??= Yon.emptyInstance();
  }
  set y(y) {
    this._y = y;
  }

}

class Yon {
  static emptyInstance() { return system.emptyClass(Yon, [["z", 0]]);};

  async _initialise() {
    this.z = 2;
    return this;
  }

  z = 0;

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

  test("Pass_PropertyChain3", async () => {
    const code = `${testHeader}

main 
  variable f set to [new Foo()]
  variable b set to 0
  set b to f[0].b.ff()
  print b
end main

class Foo
  constructor()
  end constructor
  
  property b as Bar
end class

class Bar
  constructor()
  end constructor

  function ff() returns Int
    return 4
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.list([system.initialise(await new Foo()._initialise())]);
  let b = 0;
  b = (await system.safeIndex(f, 0).b.ff());
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

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
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async ff() {
    return 4;
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain4", async () => {
    const code = `${testHeader}

main 
  variable f set to [new Foo()]
  variable b set to 0
  set b to f[0].b.ff()
  print b
end main

class Foo
  constructor()
  end constructor
  
  property b as Bar
end class

class Bar
  constructor()
  end constructor

  function ff() returns Int
    return 4
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.list([system.initialise(await new Foo()._initialise())]);
  let b = 0;
  b = (await system.safeIndex(f, 0).b.ff());
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

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
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async ff() {
    return 4;
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_StringRange", async () => {
    const code = `${testHeader}

main 
  variable s set to ""
  set s to "Hello World!".lowerCase()[0..1].upperCase()
  print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "";
  s = _stdlib.upperCase(system.safeSlice(_stdlib.lowerCase("Hello World!"), 0, 1));
  await system.print(s);
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
    await assertObjectCodeExecutes(fileImpl, "H");
  });

  test("Pass_StringRange1", async () => {
    const code = `${testHeader}

main 
  variable aStringVar set to "abcdexefg"
  variable s set to ""
  set s to aStringVar.upperCase()[1..7][2..6].indexOf("X").asString()
  print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aStringVar = "abcdexefg";
  let s = "";
  s = (await _stdlib.asString(_stdlib.indexOf(system.safeSlice(system.safeSlice(_stdlib.upperCase(aStringVar), 1, 7), 2, 6), "X")));
  await system.print(s);
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
    await assertObjectCodeExecutes(fileImpl, "2");
  });
  test("Pass_New", async () => {
    const code = `${testHeader}

main 
  variable a set to ""
  set a to (new Bar()).strArr[0].upperCase()[0]
  print a
end main

class Bar
  constructor()
    set property.strArr to ["apple", "orange", "pair"]
  end constructor

  property strArr as List<of String>

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "";
  a = system.safeIndex(_stdlib.upperCase(system.safeIndex((system.initialise(await new Bar()._initialise())).strArr, 0)), 0);
  await system.print(a);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["strArr", system.initialise(_stdlib.List.emptyInstance())]]);};

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
    await assertObjectCodeExecutes(fileImpl, "A");
  });
  test("Pass_CreateList", async () => {
    const code = `${testHeader}

main 
  variable aFoo set to new Foo()
  variable b set to 0
  set b to aFoo.createLst(10)[1..5].length() + 3
  print b
end main

class Foo
  constructor()
  end constructor

  function createLst(n as Int) returns List<of Int>
    return createList(n, 7)
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aFoo = system.initialise(await new Foo()._initialise());
  let b = 0;
  b = system.safeSlice((await aFoo.createLst(10)), 1, 5).length() + 3;
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async createLst(n) {
    return _stdlib.createList(n, 7);
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

  test("Pass_CreateList1", async () => {
    const code = `${testHeader}

main 
  variable aBar set to new Bar()
  variable b set to 0
  set b to 5 + aBar.foo.create2DList()[2][1] - 2
  print b
end main

class Bar
  constructor()
    set property.foo to new Foo()
  end constructor

  property foo as Foo

end class

class Foo
  constructor()
  end constructor

  function create2DList() returns List<of List<of Int>>
    return [[8,8,8,8],[8,8,8,8],[8,8,8,8]]
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let aBar = system.initialise(await new Bar()._initialise());
  let b = 0;
  b = 5 + system.safeIndex(system.safeIndex((await aBar.foo.create2DList()), 2), 1) - 2;
  await system.print(b);
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.foo = system.initialise(await new Foo()._initialise());
    return this;
  }

  _foo;
  get foo() {
    return this._foo ??= Foo.emptyInstance();
  }
  set foo(foo) {
    this._foo = foo;
  }

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async create2DList() {
    return system.list([system.list([8, 8, 8, 8]), system.list([8, 8, 8, 8]), system.list([8, 8, 8, 8])]);
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
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_HoFs1", async () => {
    const code = `${testHeader}

main 
  variable a set to {1,2,3,4,5,6}
  print a.filter(lambda x as Int => x > 2).map(lambda x as Int => x * x).reduce(0, lambda s as Int, x as Int => s + x)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3, 4, 5, 6]);
  await system.print((await (await (await a.filter(async (x) => x > 2)).map(async (x) => x * x)).reduce(0, async (s, x) => s + x)));
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
    await assertObjectCodeExecutes(fileImpl, "86");
  });

  test("Pass_HoFs2", async () => {
    const code = `${testHeader}

main 
  variable a set to [1,2,3,4,5,6]
  print a[..5].map(lambda x as Int => x * x)[2..].reduce(0, lambda s as Int, x as Int => s + x)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5, 6]);
  await system.print((await system.safeSlice((await system.safeSlice(a, 0, 5).map(async (x) => x * x)), 2).reduce(0, async (s, x) => s + x)));
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
    await assertObjectCodeExecutes(fileImpl, "50");
  });

  test("Fail_TypeError", async () => {
    const code = `${testHeader}

main 
  variable a set to [[1,2], [3,4]]
  variable b set to ""
  set b to a[1][1]
  print b
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
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_TypeError1", async () => {
    const code = `${testHeader}

main 
  variable a set to new Foo()
  variable b set to a.ff().fd()
  print b
end main

class Foo
  constructor()
  end constructor

  function ff() returns Bar
    return new Bar()
  end function
end class

class Bar
   constructor()
   end constructor

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
    assertDoesNotCompile(fileImpl, [
      "'fd' is not defined for type 'Bar'.LangRef.html#compile_error",
    ]);
  });
});
