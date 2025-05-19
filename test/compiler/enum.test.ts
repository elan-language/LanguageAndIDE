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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Enum", () => {
  test("Pass_PrintValues", async () => {
    const code = `${testHeader}

main
  print Fruit.apple
  print Fruit.orange
  print Fruit.pear
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await system.printLine(Fruit.apple);
  await system.printLine(Fruit.orange);
  await system.printLine(Fruit.pear);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_EmptyEnumValue", async () => {
    const code = `${testHeader}

main
  variable e set to empty Fruit
  print e
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let e = Fruit._default;
  await system.printLine(e);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_EmptyEnumProperty", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  print foo.fruit
end main

class Foo
  constructor()
  end constructor

  property fruit as Fruit
end class
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  await system.printLine(foo.fruit);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["fruit", Fruit._default]]);};

  async _initialise() {

    return this;
  }

  fruit = Fruit._default;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_EmptyEnumPropertyOnEmptyClass", async () => {
    const code = `${testHeader}

main
  variable foo set to empty Foo
  print foo.fruit
end main

class Foo
  constructor()
  end constructor

  property fruit as Fruit
end class
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let foo = Foo.emptyInstance();
  await system.printLine(foo.fruit);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["fruit", Fruit._default]]);};

  async _initialise() {

    return this;
  }

  fruit = Fruit._default;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_useInVariable", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  set x to Fruit.pear
  print x
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  x = Fruit.pear;
  await system.printLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "pear");
  });

  test("Pass_useAsType", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  variable y set to x
  print y
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  let y = x;
  await system.printLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_passAsArgument", async () => {
    const code = `${testHeader}

main
  print isFavourite(Fruit.apple)
  print isFavourite(Fruit.pear)
end main
   
enum Fruit apple, orange, pear

function isFavourite(f as Fruit) returns Boolean
  return f is Fruit.pear
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await system.printLine((await global.isFavourite(Fruit.apple)));
  await system.printLine((await global.isFavourite(Fruit.pear)));
}

async function isFavourite(f) {
  return f === Fruit.pear;
}
global["isFavourite"] = isFavourite;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetrue");
  });

  test("Pass_returnFromFunction", async () => {
    const code = `${testHeader}

main
  print firstFruit() is Fruit.apple
end main
   
enum Fruit apple, orange, pear

function firstFruit() returns Fruit
  return Fruit.apple
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await system.printLine((await global.firstFruit()) === Fruit.apple);
}

async function firstFruit() {
  return Fruit.apple;
}
global["firstFruit"] = firstFruit;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_equality", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  print x is Fruit.apple
  print x is Fruit.pear
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  await system.printLine(x === Fruit.apple);
  await system.printLine(x === Fruit.pear);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_InInterpolatedString", async () => {
    const code = `${testHeader}

main
  variable a set to "Eat more {Fruit.apple}s!"
  print a
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = \`Eat more \${await _stdlib.asString(Fruit.apple)}s!\`;
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Eat more apples!");
  });

  test("Fail_coercionToString", async () => {
    const code = `${testHeader}

main
  variable a set to "Eat more " + Fruit.apple
  print a
end main
   
enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: String. Click for more info.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Fruit. Click for more info.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_InvalidTypeName", async () => {
    const code = `${testHeader}

main
end main

enum fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidValueName", async () => {
    const code = `${testHeader}

main
end main

enum Fruit apple, Orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssigningIntsToValues", async () => {
    const code = `${testHeader}

main
end main

enum Fruit apple = 1, orange = 2, pear = 3`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_coercionToInt", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  set a to Fruit.apple
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Fruit. Click for more info.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_undefinedEnum", async () => {
    const code = `${testHeader}

main
  print Fruit.apple
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'Fruit' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_undefinedEnumValue", async () => {
    const code = `${testHeader}

main
  print Fruit.kiwi
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'kiwi' is not defined. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main

end main

enum if apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfKeywordAsValue", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, if`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' is a keyword, and may not be used as an identifier. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedWordAsValue", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, break`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main

end main

enum Fruit banana, kiwi

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'Fruit' not unique in scope. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateValues", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, pear, orange`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'orange' not unique in scope. Click for more info.LangRef.html#compile_error",
    ]);
  });
});
