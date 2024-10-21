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

suite("Enum", () => {
  test("Pass_PrintValues", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print Fruit.apple
  print Fruit.orange
  print Fruit.pear
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  system.printLine(_stdlib.asString(Fruit.apple));
  system.printLine(_stdlib.asString(Fruit.orange));
  system.printLine(_stdlib.asString(Fruit.pear));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_EmptyEnumValue", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var e set to empty Fruit
  print e
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var e = Fruit._default;
  system.printLine(_stdlib.asString(e));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_EmptyEnumProperty", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var foo set to new Foo()
  print foo.fruit
end main

class Foo
  constructor()
  end constructor

  property fruit as Fruit
end class
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var foo = system.initialise(new Foo());
  system.printLine(_stdlib.asString(foo.fruit));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["fruit", Fruit._default]]);};
  constructor() {

  }

  fruit = Fruit._default;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_EmptyEnumPropertyOnEmptyClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var foo set to empty Foo
  print foo.fruit
end main

class Foo
  constructor()
  end constructor

  property fruit as Fruit
end class
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var foo = Foo.emptyInstance();
  system.printLine(_stdlib.asString(foo.fruit));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["fruit", Fruit._default]]);};
  constructor() {

  }

  fruit = Fruit._default;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_useInVariable", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to Fruit.apple
  set x to Fruit.pear
  print x
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var x = Fruit.apple;
  x = Fruit.pear;
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "pear");
  });

  test("Pass_useAsType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to Fruit.apple
  var y set to x
  print y
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var x = Fruit.apple;
  var y = x;
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_passAsArgument", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print isFavourite(Fruit.apple)
  print isFavourite(Fruit.pear)
end main
   
enum Fruit apple, orange, pear

function isFavourite(f as Fruit) return Boolean
  return f is Fruit.pear
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  system.printLine(_stdlib.asString(isFavourite(Fruit.apple)));
  system.printLine(_stdlib.asString(isFavourite(Fruit.pear)));
}

function isFavourite(f) {
  return system.objectEquals(f, Fruit.pear);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetrue");
  });

  test("Pass_returnFromFunction", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print firstFruit() is Fruit.apple
end main
   
enum Fruit apple, orange, pear

function firstFruit() return Fruit
  return Fruit.apple
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  system.printLine(_stdlib.asString(system.objectEquals(firstFruit(), Fruit.apple)));
}

function firstFruit() {
  return Fruit.apple;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_equality", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to Fruit.apple
  print x is Fruit.apple
  print x is Fruit.pear
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var x = Fruit.apple;
  system.printLine(_stdlib.asString(system.objectEquals(x, Fruit.apple)));
  system.printLine(_stdlib.asString(system.objectEquals(x, Fruit.pear)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_SwitchCaseOnEnum", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to Fruit.orange
  switch f
    case Fruit.apple
      print "a"
    case Fruit.orange
      print "o"
    case Fruit.pear
      print "p"
    default
  end switch
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var f = Fruit.orange;
  switch (f) {
    case Fruit.apple:
      system.printLine(_stdlib.asString("a"));
      break;
    case Fruit.orange:
      system.printLine(_stdlib.asString("o"));
      break;
    case Fruit.pear:
      system.printLine(_stdlib.asString("p"));
      break;
    default:

      break;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "o");
  });

  test("Pass_coercionToString", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to "Eat more " + Fruit.apple + "s!"
  print a
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var a = "Eat more " + Fruit.apple + "s!";
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Eat more apples!");
  });

  test("Fail_InvalidTypeName", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
end main

enum fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidValueName", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
end main

enum Fruit apple, Orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssigningIntsToValues", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
end main

enum Fruit apple = 1, orange = 2, pear = 3`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_coercionToInt", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  set a to Fruit.apple
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Enum Fruit to Int"]);
  });

  test("Fail_undefinedEnum", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print Fruit.apple
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Fruit is not defined"]);
  });

  test("Fail_undefinedEnumValue", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  print Fruit.kiwi
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["kiwi is not defined"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFF Elan Beta 3 valid

main

end main

enum if apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfKeywordAsValue", async () => {
    const code = `# FFFF Elan Beta 3 valid

main

end main

enum Fruit apple, orange, if`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedWordAsValue", async () => {
    const code = `# FFFF Elan Beta 3 valid

main

end main

enum Fruit apple, orange, break`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `# FFFF Elan Beta 3 valid

main

end main

enum Fruit banana, kiwi

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name Fruit not unique in scope"]);
  });

  test("Fail_DuplicateValues", async () => {
    const code = `# FFFF Elan Beta 3 valid

main

end main

enum Fruit apple, orange, pear, orange`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name orange not unique in scope"]);
  });
});
