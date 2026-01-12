import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { FileImpl } from "../../src/ide/frames/file-impl";
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

suite("With on Class", () => {
  test("Pass_SingleSetToVar", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable b set to copy a with a set to 2
  print a.a
  print b.a
end main

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  await system.print(a.a);
  await system.print(b.a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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
    await assertObjectCodeExecutes(fileImpl, "02");
  });

  test("Pass_SingleSetToSet", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  set a to copy a with a set to 2
  print a.a
end main

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  a = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  await system.print(a.a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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

  test("Pass_SingleSetToLet", async () => {
    const code = `${testHeader}

main
  variable a set to foo()
  print a.a
end main

function foo() returns Foo
  variable a set to new Foo()
  let b be copy a with a set to 2
  return b
end function

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await global.foo());
  await system.print(a.a);
}

async function foo() {
  let a = system.initialise(await new Foo()._initialise());
  const b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  return b;
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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

  test("Pass_CopyLet", async () => {
    const code = `${testHeader}

main
  variable a set to foo()
  print a.a
end main

function foo() returns Foo
  let a be new Foo()
  let b be copy a with a set to 2
  return b
end function

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await global.foo());
  await system.print(a.a);
}

async function foo() {
  const a = system.initialise(await new Foo()._initialise());
  const b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  return b;
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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

  test("Pass_SingleSetToReturn", async () => {
    const code = `${testHeader}

main
  variable a set to foo()
  print a.a
end main

function foo() returns Foo
  variable a set to new Foo()
  return copy a with a set to 2
end function

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await global.foo());
  await system.print(a.a);
}

async function foo() {
  let a = system.initialise(await new Foo()._initialise());
  return await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
}
global["foo"] = foo;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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

  test("Pass_MultiSet", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable b set to copy a with a set to 2, b set to "fred"
  print a.a
  print a.b
  print b.a
  print b.b
end main

class Foo
  property a as Int

  property b as String
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; _a.b = "fred"; return _a;})();
  await system.print(a.a);
  await system.print(a.b);
  await system.print(b.a);
  await system.print(b.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", ""]]);};
  async _initialise() { return this; }
  a = 0;

  b = "";

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
    await assertObjectCodeExecutes(fileImpl, "02fred");
  });

  test("Pass_CopiedObjectStillValid", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable b set to copy a with a set to 2
  print a.a
  print b.a
end main

class Foo
  property a as Int

  property b as Int

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  await system.print(a.a);
  await system.print(b.a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", 0]]);};
  async _initialise() { return this; }
  a = 0;

  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "02");
  });

  test("Pass_ExpressionSimple", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable b set to copy a with a set to 2 + 2
  print a.a
  print b.a
end main

class Foo
  property a as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2 + 2; return _a;})();
  await system.print(a.a);
  await system.print(b.a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  async _initialise() { return this; }
  a = 0;

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
    await assertObjectCodeExecutes(fileImpl, "04");
  });

  test("Pass_ExpressionNew", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable a1 set to copy a with b set to 1
  variable b set to copy a with a set to a1
  print a.a.b
  print b.a.b
end main

class Foo
  property a as Foo
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let a1 = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.b = 1; return _a;})();
  let b = await (async () => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = a1; return _a;})();
  await system.print(a.a.b);
  await system.print(b.a.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  async _initialise() { return this; }
  _a;
  get a() {
    return this._a ??= Foo.emptyInstance();
  }
  set a(a) {
    this._a = a;
  }

  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "01");
  });

  test("Pass_ExpressionIndex", async () => {
    const code = `${testHeader}

main
  variable a set to [0,2]
  variable b set to new Foo()
  variable c set to copy b with b set to a[1]
  print b.b
  print c.b
end main

class Foo
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([0, 2]);
  let b = system.initialise(await new Foo()._initialise());
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 1); return _a;})();
  await system.print(b.b);
  await system.print(c.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  async _initialise() { return this; }
  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "02");
  });

  test("Pass_MultiExpressionIndex", async () => {
    const code = `${testHeader}

main
  variable a set to [0,2]
  variable b set to new Foo()
  variable c set to copy b with b set to a[0], c set to a[1], d set to a.length()
  print c.b
  print c.c
  print c.d
end main

class Foo
  property b as Int
  property c as Int
  property d as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([0, 2]);
  let b = system.initialise(await new Foo()._initialise());
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 0); _a.c = system.safeIndex(a, 1); _a.d = a.length(); return _a;})();
  await system.print(c.b);
  await system.print(c.c);
  await system.print(c.d);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0], ["c", 0], ["d", 0]]);};
  async _initialise() { return this; }
  b = 0;

  c = 0;

  d = 0;

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
    await assertObjectCodeExecutes(fileImpl, "022");
  });

  test("Pass_MultiExpressionFunction", async () => {
    const code = `${testHeader}

main
  variable a set to [0,2]
  variable b set to new Foo()
  variable c set to copy b with b set to doIndex(a, 0), c set to doIndex(a, 1), d set to a.length()
  print c.b
  print c.c
  print c.d
end main

function doIndex(arr as List<of Int>, i as Int) returns Int 
  return arr[i]
end function

class Foo
  property b as Int
  property c as Int
  property d as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([0, 2]);
  let b = system.initialise(await new Foo()._initialise());
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = (await global.doIndex(a, 0)); _a.c = (await global.doIndex(a, 1)); _a.d = a.length(); return _a;})();
  await system.print(c.b);
  await system.print(c.c);
  await system.print(c.d);
}

async function doIndex(arr, i) {
  return system.safeIndex(arr, i);
}
global["doIndex"] = doIndex;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0], ["c", 0], ["d", 0]]);};
  async _initialise() { return this; }
  b = 0;

  c = 0;

  d = 0;

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
    await assertObjectCodeExecutes(fileImpl, "022");
  });

  test("Pass_ExpressionIndex1", async () => {
    const code = `${testHeader}

main
  variable a set to {0,2}
  variable b set to new Foo()
  variable c set to copy b with b set to a[1]
  print b.b
  print c.b
end main

class Foo
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([0, 2]);
  let b = system.initialise(await new Foo()._initialise());
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 1); return _a;})();
  await system.print(b.b);
  await system.print(c.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  async _initialise() { return this; }
  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "02");
  });

  test("Pass_ExpressionExtension", async () => {
    const code = `${testHeader}

main
  variable a set to {0,2,3}
  variable b set to new Foo()
  variable c set to copy b with b set to a.length()
  print b.b
  print c.b
end main

class Foo
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([0, 2, 3]);
  let b = system.initialise(await new Foo()._initialise());
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = a.length(); return _a;})();
  await system.print(b.b);
  await system.print(c.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  async _initialise() { return this; }
  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "03");
  });

  test("Pass_Constructor", async () => {
    const code = `${testHeader}

main
  variable b set to new Foo(2)
  variable c set to copy b with b set to 10
  print b.a
  print b.b
  print c.a
  print c.b
end main

class Foo
  constructor(a as Int)
    set property.a to a
  end constructor 

  property a as Int
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new Foo()._initialise(2));
  let c = await (async () => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = 10; return _a;})();
  await system.print(b.a);
  await system.print(b.b);
  await system.print(c.a);
  await system.print(c.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", 0]]);};

  async _initialise(a) {
    this.a = a;
    return this;
  }

  a = 0;

  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "20210");
  });

  test("Pass_Constructor1", async () => {
    const code = `${testHeader}

main
  variable c set to new Foo(2) with b set to 10
  print c.a
  print c.b
end main

class Foo
  constructor(a as Int)
    set property.a to a
  end constructor 

  property a as Int
  property b as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = await (async () => {const _a = {...system.initialise(await new Foo()._initialise(2))}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new Foo()._initialise(2)))); _a.b = 10; return _a;})();
  await system.print(c.a);
  await system.print(c.b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", 0]]);};

  async _initialise(a) {
    this.a = a;
    return this;
  }

  a = 0;

  b = 0;

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
    await assertObjectCodeExecutes(fileImpl, "210");
  });

  test("Fail_WrongType", async () => {
    const code = `${testHeader}

main
  variable b set to new Foo()
  variable c set to copy b with b set to [0]
  print c.b
end main

class Foo
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_ConstructorNotCalled", async () => {
    const code = `${testHeader}

main
  variable c set to new Foo() with b set to 0
  print c.b
end main

class Foo
  constructor(a as Int)
  end constructor
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: a (Int).LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotClass", async () => {
    const code = `${testHeader}

main
  variable a set to {1, 2}
  variable b set to copy a with a set to 0
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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_NotClass1", async () => {
    const code = `${testHeader}

main
  variable a set to {3}
  variable b set to copy a with a set to 0
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
    assertDoesNotCompile(fileImpl, ["'a' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_NoSuchProperty", async () => {
    const code = `${testHeader}

main
  variable b set to new Foo()
  variable c set to copy b with b set to 0
  print c.d
end main

class Foo
  property d as Int
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
    assertDoesNotCompile(fileImpl, ["'b' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_PrivateProperty", async () => {
    const code = `${testHeader}

main
  variable b set to new Foo()
  variable c set to copy b with b set to 0
end main

class Foo
  private property b as Int
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
      "Cannot reference private member 'b'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UnknownProperty", async () => {
    const code = `${testHeader}

main
  variable b set to new Foo()
  variable c set to copy b with aa set to aa -1
  print c.aa
end main

class Foo
  property aa as Int
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
    assertDoesNotCompile(fileImpl, ["'aa' is not defined.LangRef.html#compile_error"]);
  });
});
