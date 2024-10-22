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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var y set to 0
  var z set to ""
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

  test("Pass_CreateAndDeconstructAFourTuple", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple", true, 1.1)
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
  var x = system.tuple([3, "Apple", true, 1.1]);
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var z set to ""
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var y set to 0
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple", 4)
  var z set to ""
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple", 4)
  var y set to 0
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var y, z set to x
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var _, z set to x
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
    const code = `# FFFF Elan Beta 3 valid

main
  var t set to (3, 4, "Apple")
  var x, _, z set to t
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var y, z set to x
  var a set to 0
  var b set to ""
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to (3, a)
  var y, z set to x
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
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2][Int]");
  });

  test("Pass_DeconstructTupleWithListIntoNewLet", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to (3, a)
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
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2][Int]");
  });

  test("Pass_DeconstructTupleWithListIntoExisting", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to (3, a)
  var y set to 0
  var z set to empty [Int]
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
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int[1, 2][Int]");
  });

  test("Pass_DeconstructTupleWithTupleIntoNew", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to (1,2)
  var x set to (3, a)
  var y, z set to x
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to (1,2)
  var x set to (3, a)
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
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to (1, 2)
  var x set to (3, a)
  var y set to 0
  var z set to (0, 0)
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

  test("Fail_DeconstructIntoWrongType", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3,"Apple")
  var y set to 0
  var z set to ""
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3,"Apple")
  var z set to ""
  set z, y to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String", "y is not defined"]);
  });

  test("Fail_DeconstructIntoMixed2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3,"Apple")
  var z set to ""
  var z, y set to x
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
  var y set to ""
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
    const code = `# FFFF Elan Beta 3 valid

main
  var x set to (3, "Apple")
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
    assertDoesNotCompile(fileImpl, ["May not mutate y", "May not mutate z"]);
  });

  test("Fail_CannotDeconstruct", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  var x,y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstructLet", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
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
