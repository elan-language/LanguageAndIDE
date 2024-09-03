import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
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

  test("Pass_HolyTrinity", async () => {
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
