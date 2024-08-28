import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
import { testHash, transforms, assertParses, assertStatusIsValid, assertObjectCodeIs, assertObjectCodeExecutes, assertDoesNotParse, ignore_test } from "./compiler-test-helpers";

suite("T54_With", () => {
  test("Pass_SingleSetToVar", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2
  print a.a
  print b.a
end main

class Foo
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  set a to copy a with a to 2
  print a.a
end main

class Foo
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  var a set to new Foo()
  let b be copy a with a to 2
  return b
end function

class Foo
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
  var b = (() => {
    var _cache;
    return () => _cache ??= (() => {const _a = {...a}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a)); _a.a = 2; return _a;})();
  })();
  return b();
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  let a be new Foo()
  let b be copy a with a to 2
  return b
end function

class Foo
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
  var a = (() => {
    var _cache;
    return () => _cache ??= system.initialise(new Foo());
  })();
  var b = (() => {
    var _cache;
    return () => _cache ??= (() => {const _a = {...a()}; Object.setPrototypeOf(_a, Object.getPrototypeOf(a())); _a.a = 2; return _a;})();
  })();
  return b();
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to foo()
  print a.a
end main

function foo() return Foo
  var a set to new Foo()
  return copy a with a to 2
end function

class Foo
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2, b to "fred"
  print a.a
  print a.b
  print b.a
  print b.b
end main

class Foo
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2
  print a.ff()
  print b.ff()
end main

class Foo
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

  test("Fail_NoSets", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  var b set to copy a
  print a.a
  print b.a
end main

class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;


    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
