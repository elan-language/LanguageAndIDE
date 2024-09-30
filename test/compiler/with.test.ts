import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
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

suite("With", () => {
  test("Pass_SingleSetToVar", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2
  print a.a
  print b.a
end main

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  system.printLine(_stdlib.asString(a.a));
  system.printLine(_stdlib.asString(b.a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_SingleSetToSet", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  set a to copy a with a to 2
  print a.a
end main

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  a = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  system.printLine(_stdlib.asString(a.a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_SingleSetToLet", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  var a set to new Foo()
  let b be copy a with a to 2
  return b
end function

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = foo();
  system.printLine(_stdlib.asString(a.a));
}

function foo() {
  var a = system.initialise(new Foo());
  const b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  return b;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_CopyLet", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  let a be new Foo()
  let b be copy a with a to 2
  return b
end function

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = foo();
  system.printLine(_stdlib.asString(a.a));
}

function foo() {
  const a = system.initialise(new Foo());
  const b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  return b;
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_SingleSetToReturn", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  var a set to new Foo()
  return copy a with a to 2
end function

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = foo();
  system.printLine(_stdlib.asString(a.a));
}

function foo() {
  var a = system.initialise(new Foo());
  return (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_MultiSet", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2, b to "fred"
  print a.a
  print a.b
  print b.a
  print b.b
end main

immutable class Foo
  constructor()
    set property.a to 1
    set property.b to "bill"
  end constructor

  property a as Int

  property b as String
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; _a.b = "fred"; return _a;})();
  system.printLine(_stdlib.asString(a.a));
  system.printLine(_stdlib.asString(a.b));
  system.printLine(_stdlib.asString(b.a));
  system.printLine(_stdlib.asString(b.b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", ""]]);};
  constructor() {
    this.a = 1;
    this.b = "bill";
  }

  a = 0;

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1bill2fred");
  });

  test("Pass_CopiedObjectStillValid", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2
  print a.ff()
  print b.ff()
end main

immutable class Foo
  constructor()
    set property.a to 1
    set property.b to 100
  end constructor

  property a as Int

  property b as Int

  function ff() return Int
    return a + b
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  system.printLine(_stdlib.asString(a.ff()));
  system.printLine(_stdlib.asString(b.ff()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", 0]]);};
  constructor() {
    this.a = 1;
    this.b = 100;
  }

  a = 0;

  b = 0;

  ff() {
    return this.a + this.b;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "101102");
  });

  test("Pass_ExpressionSimple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2 + 2
  print a.a
  print b.a
end main

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2 + 2; return _a;})();
  system.printLine(_stdlib.asString(a.a));
  system.printLine(_stdlib.asString(b.a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "14");
  });

  test("Pass_ExpressionNew", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo(1)
  var b set to copy a with a to new Foo(2)
  print a.a.b
  print b.a.b
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property a as Foo
  property b as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo(1));
  var b = (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = system.initialise(new Foo(2)); return _a;})();
  system.printLine(_stdlib.asString(a.a.b));
  system.printLine(_stdlib.asString(b.a.b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  constructor(i) {
    this.b = i;
  }

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "02");
  });

  test("Pass_ExpressionIndex", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to [0,2]
  var b set to new Foo(1)
  var c set to copy b with b to a[1]
  print b.b
  print c.b
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([0, 2]);
  var b = system.initialise(new Foo(1));
  var c = (() => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 1); return _a;})();
  system.printLine(_stdlib.asString(b.b));
  system.printLine(_stdlib.asString(c.b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  constructor(i) {
    this.b = i;
  }

  b = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_MultiExpressionIndex", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to [0,2]
  var b set to new Foo(1)
  var c set to copy b with b to a[0], c to a[1], d to a.length()
  print c.b
  print c.c
  print c.d
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
  property c as Int
  property d as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([0, 2]);
  var b = system.initialise(new Foo(1));
  var c = (() => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 0); _a.c = system.safeIndex(a, 1); _a.d = _stdlib.length(a); return _a;})();
  system.printLine(_stdlib.asString(c.b));
  system.printLine(_stdlib.asString(c.c));
  system.printLine(_stdlib.asString(c.d));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0], ["c", 0], ["d", 0]]);};
  constructor(i) {
    this.b = i;
  }

  b = 0;

  c = 0;

  d = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "022");
  });

  test("Pass_ExpressionIndex1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to {0,2}
  var b set to new Foo(1)
  var c set to copy b with b to a[1]
  print b.b
  print c.b
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([0, 2]);
  var b = system.initialise(new Foo(1));
  var c = (() => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = system.safeIndex(a, 1); return _a;})();
  system.printLine(_stdlib.asString(b.b));
  system.printLine(_stdlib.asString(c.b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  constructor(i) {
    this.b = i;
  }

  b = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_ExpressionExtension", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to {0,2,3}
  var b set to new Foo(1)
  var c set to copy b with b to a.length()
  print b.b
  print c.b
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([0, 2, 3]);
  var b = system.initialise(new Foo(1));
  var c = (() => {const _a = {...b}; Object.setPrototypeOf(_a, Object.getPrototypeOf(b)); _a.b = _stdlib.length(a); return _a;})();
  system.printLine(_stdlib.asString(b.b));
  system.printLine(_stdlib.asString(c.b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["b", 0]]);};
  constructor(i) {
    this.b = i;
  }

  b = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13");
  });

  test("Fail_NoSets", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a
  print a.a
  print b.a
end main

immutable class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_WrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Foo(1)
  var c set to copy b with b to [0]
  print c.b
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array to Int"]);
  });

  test("Fail_NotClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to {1, 2}
  var b set to copy a with a to 0
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Class"]);
  });

  test("Fail_NotClass1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new Foo()
  var b set to copy a with a to 0
  print b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Foo is not defined",
      "Cannot new Foo",
      "Expression must be Class",
    ]);
  });

  test("Fail_NoSuchProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Foo(1)
  var c set to copy b with b to 0
  print c.d
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property d as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["b is not defined"]);
  });

  test("Fail_PrivateProperty", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Foo(1)
  var c set to copy b with b to 0
  print c.d
end main

immutable class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  private property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot reference private member b"]);
  });

  test("Fail_NotImmutable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var b set to new Foo(1)
  var c set to copy b with b to 0
  print c.b
end main

class Foo
  constructor(i as Int)
    set property.b to i
  end constructor

  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Foo must be immutable"]);
  });
});