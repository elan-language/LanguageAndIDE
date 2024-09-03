import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms
} from "./compiler-test-helpers";

suite("Chaining", () => {
  test("Pass_SimpleChain", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {{1,2}, {3,4}}
  var b set to a.get(1).get(1)
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableList([system.immutableList([1, 2]), system.immutableList([3, 4])]);
  var b = _stdlib.get(_stdlib.get(a, 1), 1);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_ChainWithIndex", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {[1,2], [3,4]}
  var b set to a.get(1)[1]
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableList([system.literalArray([1, 2]), system.literalArray([3, 4])]);
  var b = system.safeIndex(_stdlib.get(a, 1), 1);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to new Foo()
  var b set to a.a.get(0)
  print b
end main

class Foo
  constructor()
    set property.a to {1}
  end constructor
  
  property a as {Int}
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = _stdlib.get(a.a, 0);
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()]]);};
  constructor() {
    this.a = system.immutableList([1]);
  }

  a = system.emptyImmutableList();

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_PropertyChain2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var f set to new Foo()
  var b set to 0
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var b = 0;
  b = f.b.y.z;
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

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
  constructor() {

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
  constructor() {
    this.z = 2;
  }

  z = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_StringRange", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var s set to ""
  set s to "Hello World!".lowerCase()[0..1].upperCase()
  print s
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var s = "";
  s = _stdlib.upperCase(_stdlib.lowerCase("Hello World!").slice(0, 1));
  system.printLine(_stdlib.asString(s));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "H");
  });

  test("Pass_StringRange1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var aStringVar set to "abcdexefg"
  var s set to ""
  set s to aStringVar.upperCase().substring(1, 7)[2..6].indexOf("X").asString()
  print s
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var aStringVar = "abcdexefg";
  var s = "";
  s = _stdlib.asString(_stdlib.indexOf(_stdlib.substring(_stdlib.upperCase(aStringVar), 1, 7).slice(2, 6), "X"));
  system.printLine(_stdlib.asString(s));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });
  test("Pass_New", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to ""
  set a to (new Bar()).strArr[0].upperCase()[0]
  print a
end main

class Bar
  constructor()
    set property.strArr to ["apple", "orange", "pair"]
  end constructor

  property strArr as [String]

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = "";
  a = system.safeIndex(_stdlib.upperCase(system.safeIndex((system.initialise(new Bar())).strArr, 0)), 0);
  system.printLine(_stdlib.asString(a));
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["strArr", system.emptyArrayList()]]);};
  constructor() {
    this.strArr = system.literalArray(["apple", "orange", "pair"]);
  }

  strArr = system.emptyArrayList();

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A");
  });
  test("Pass_CreateArray", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var aFoo set to new Foo()
  var b set to 0
  set b to aFoo.createArr(10)[1..5].length() + 3
  print b
end main

class Foo
  constructor()
  end constructor

  function createArr(n as Int) return [Int]
    return createArray(n, 7)
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var aFoo = system.initialise(new Foo());
  var b = 0;
  b = _stdlib.length(system.array(aFoo.createArr(10).slice(1, 5))) + 3;
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  createArr(n) {
    return _stdlib.createArray(n, 7);
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

  test("Pass_CreateArray1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var aBar set to new Bar()
  var b set to 0
  set b to 5 + aBar.foo.create2DArr()[2][1] - 2
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

  function create2DArr() return [[Int]]
    return create2DArray(3, 4, 8)
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var aBar = system.initialise(new Bar());
  var b = 0;
  b = 5 + system.safeIndex(system.safeIndex(aBar.foo.create2DArr(), 2), 1) - 2;
  system.printLine(_stdlib.asString(b));
}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  constructor() {
    this.foo = system.initialise(new Foo());
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
  constructor() {

  }

  create2DArr() {
    return _stdlib.create2DArray(3, 4, 8);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_HoFs1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {1,2,3,4,5,6}
  print a.filter(lambda x as Int => x > 2).map(lambda x as Int => x * x).reduce(0, lambda s as Int, x as Int => s + x)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableList([1, 2, 3, 4, 5, 6]);
  system.printLine(_stdlib.asString(_stdlib.reduce(_stdlib.map(_stdlib.filter(a, (x) => x > 2), (x) => x * x), 0, (s, x) => s + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "86");
  });

  test("Pass_HoFs2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to [1,2,3,4,5,6]
  print a[..5].map(lambda x as Int => x * x).asArrayList()[2..].reduce(0, lambda s as Int, x as Int => s + x)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3, 4, 5, 6]);
  system.printLine(_stdlib.asString(_stdlib.reduce(system.array(_stdlib.asArrayList(_stdlib.map(system.array(a.slice(0, 5)), (x) => x * x)).slice(2)), 0, (s, x) => s + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "50");
  });

  test("Fail_TypeError", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {[1,2], [3,4]}
  var b set to a.get(1).get(1)
  print b
end main`;

   

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ArrayList to ImmutableList"]);
  });



});
