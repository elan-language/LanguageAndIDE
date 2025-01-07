import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Tuple Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable y set to 0
  variable z set to ""
  set y, z to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var y = 0;
  var z = "";
  [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructFromFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a, b be foo()
  print a
  print b
end main

function foo() returns (Float, Int)
  return (0.0, 0)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const [a, b] = foo();
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

function foo() {
  return system.tuple([0, 0]);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_DeconstructFromFunctionMethod", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let foo be new Foo()
  let a, b be foo.bar()
  print a
  print b
end main

class Foo
  constructor()
  end constructor

  function bar() returns (Float, Int)
    return (0.0, 0)
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const foo = system.initialise(new Foo());
  const [a, b] = foo.bar();
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  bar() {
    return system.tuple([0, 0]);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test("Pass_DeconstructFromComplexTupleFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a, b be foo()
  print a
  print b
end main

function foo() returns (List<of Float>, Int)
  return ({0.0}, 0)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const [a, b] = foo();
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

function foo() {
  return system.tuple([system.list([0]), 0]);
}
global["foo"] = foo;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{0}0");
  });

  test("Pass_CreateAndDeconstructAFourTuple", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple", true, 1.1)
  print x
  let a, b, c, d be x
  print a
  print b
  print c
  print d
  let _, _, e, _ be x
  print e
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple", _stdlib.true, 1.1]);
  system.printLine(_stdlib.asString(x));
  const [a, b, c, d] = x;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(c));
  system.printLine(_stdlib.asString(d));
  const [, , e, ] = x;
  system.printLine(_stdlib.asString(e));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(3, Apple, true, 1.1)3Appletrue1.1true");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable z set to ""
  set _, z to x
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var z = "";
  [, z] = x;
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable y set to 0
  set y, _ to x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var y = 0;
  [y, ] = x;
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple", 4)
  variable z set to ""
  set _, z, _ to x
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple", 4]);
  var z = "";
  [, z, ] = x;
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple", 4)
  variable y set to 0
  set _, _, y to x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple", 4]);
  var y = 0;
  [, , y] = x;
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  let y, z be x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  const [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("String"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3IntAppleString");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  let _, z be x
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  const [, z] = x;
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("String"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "AppleString");
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable y, z set to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariablesWithDiscard1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable _, z set to x
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [, z] = x;
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_DeconstructIntoNewVariablesWithDiscard2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable t set to (3, 4, "Apple")
  variable x, _, z set to t
  print x
  print z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var t = system.tuple([3, 4, "Apple"]);
  var [x, , z] = t;
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(z));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructIntoNewVariablesTypeCheck", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable y, z set to x
  variable a set to 0
  variable b set to ""
  set a to y
  set b to z
  print a
  print b
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [y, z] = x;
  var a = 0;
  var b = "";
  a = y;
  b = z;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test("Pass_DeconstructTupleWithListIntoNew", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to (3, a)
  variable y, z set to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var x = system.tuple([3, a]);
  var [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("Array<of Int>"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2]Array<of Int>");
  });

  test("Pass_DeconstructTupleWithListIntoNewLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to (3, a)
  let y, z be x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var x = system.tuple([3, a]);
  const [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("Array<of Int>"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2]Array<of Int>");
  });

  test("Pass_DeconstructTupleWithListIntoExisting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to (3, a)
  variable y set to 0
  variable z set to empty Array<of Int>
  set y, z to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var x = system.tuple([3, a]);
  var y = 0;
  var z = system.emptyArray();
  [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("Array<of Int>"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2]Array<of Int>");
  });

  test("Pass_DeconstructTupleWithTupleIntoNew", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to (1,2)
  variable x set to (3, a)
  variable y, z set to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  var [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  test("Pass_DeconstructTupleWithTupleIntoNewLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to (1,2)
  variable x set to (3, a)
  let y, z be x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  const [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  test("Pass_DeconstructTupleWithTupleIntoExisting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to (1, 2)
  variable x set to (3, a)
  variable y set to 0
  variable z set to (0, 0)
  set y, z to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  var y = 0;
  var z = system.tuple([0, 0]);
  [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  test("Pass_DeconstructTupleTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to (1, "string")
  variable y, z set to a
  set y to y
  set z to z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, "string"]);
  var [y, z] = a;
  y = y;
  z = z;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_DeconstructIntoWrongType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3,"Apple")
  variable y set to 0
  variable z set to ""
  set z, y to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Int to String",
      "Incompatible types String to Int",
    ]);
  });

  test("Fail_DeconstructIntoMixed1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3,"Apple")
  variable z set to ""
  set z, y to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String", "'y' is not defined"]);
  });

  test("Fail_DeconstructIntoMixed2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3,"Apple")
  variable z set to 0
  variable z, y set to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'z' is already used for a variable and cannot be re-defined here.",
    ]);
  });

  test("Fail_DeconstructIntoWrongTypeWithDiscard", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  variable y set to ""
  set y, _ to x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to (3, "Apple")
  let y be 0
  let z be ""
  set y, z to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the 'let' 'y'",
      "May not re-assign the 'let' 'z'",
    ]);
  });

  test("Fail_CannotDeconstruct", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable x,y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstructLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  let x, y be a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });
});
