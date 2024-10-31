import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("List Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2,3]
  var x set to 1
  var y set to empty [Int]
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var x = 1;
  var y = system.emptyArray();
  [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[2, 3]");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2,3]
  var y set to empty [Int]
  set _:y to a
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var y = system.emptyArray();
  [, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[2, 3]");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2,3]
  var x set to 1
  set x:_ to a
  print x
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var x = 1;
  [x, ] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2,3]
  var x:y set to a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int[2, 3][Int]");
  });

  test("Pass_DeconstructArrayOfArrayIntoExistingVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [[1,2,3], [4,5,6], [7,8,9]]
  var x set to empty [Int]
  var y set to empty [[Int]]
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray([1, 2, 3]), system.literalArray([4, 5, 6]), system.literalArray([7, 8, 9])]);
  var x = system.emptyArray();
  var y = system.emptyArray();
  [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][[4, 5, 6], [7, 8, 9]]");
  });

  test("Pass_DeconstructArrayOfArrayIntoNewVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [[1,2,3], [4,5,6], [7,8,9]]
  var x:y set to a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray([1, 2, 3]), system.literalArray([4, 5, 6]), system.literalArray([7, 8, 9])]);
  var [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("[Int]"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("[[Int]]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][Int][[4, 5, 6], [7, 8, 9]][[Int]]");
  });

  test("Pass_DeconstructArrayOfArrayIntoNewLetVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [[1,2,3], [4,5,6], [7,8,9]]
  let x:y be a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([system.literalArray([1, 2, 3]), system.literalArray([4, 5, 6]), system.literalArray([7, 8, 9])]);
  const [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("[Int]"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("[[Int]]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][Int][[4, 5, 6], [7, 8, 9]][[Int]]");
  });

  test("Pass_DeconstructExistingOneElement", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1]
  var x set to 1
  var y set to empty [Int]
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1]);
  var x = 1;
  var y = system.emptyArray();
  [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[]");
  });

  test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1,2,3}
  let x:y be a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([1, 2, 3]);
  const [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("{Int}"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int{2, 3}{Int}");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1,2,3}
  let x:_ be a
  print x
  print typeof x
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([1, 2, 3]);
  const [x, ] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1,2,3}
  let _:y be a
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([1, 2, 3]);
  const [, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("{Int}"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 3}{Int}");
  });

  test("Pass_DeconstructNewOneElement", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1]
  var x:y set to a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1]);
  var [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int[][Int]");
  });

  test("Pass_DeconstructNewLetOneElement", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1]
  let x:y be a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1]);
  const [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("[Int]"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int[][Int]");
  });

  test("Pass_DeconstructListIntoNewVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1,2,3}
  var x:y set to a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([1, 2, 3]);
  var [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("{Int}"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int{2, 3}{Int}");
  });

  test("Pass_DeconstructListIntoExistingVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1,2,3}
  var x set to 1
  var y set to empty {Int}
  set x:y to a
  print x
  print typeof x
  print y
  print typeof y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([1, 2, 3]);
  var x = 1;
  var y = system.emptyImmutableList();
  [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("{Int}"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1Int{2, 3}{Int}");
  });

  test("Fail_DeconstructIntoWrongType1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to ""
  var y set to empty [Int]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_DeconstructIntoWrongType2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to 0
  var y set to empty [String]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_DeconstructIntoWrongType3", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to ""
  var y set to empty [String]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array to Array"]);
  });

  test("Fail_DeconstructIntoWrongType4", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to 0
  var y set to 0
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array to Int"]);
  });

  test("Fail_DeconstructIntoWrongType5", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to empty [Int]
  var y set to empty [Int]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to Array"]);
  });

  test("Fail_DeconstructIntoWrongType6", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to 0
  var y set to empty {Int}
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Array to List try converting with '.asList()'",
    ]);
  });

  test("Fail_DeconstructIntoWrongType1WithDiscard", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var x set to ""
  set x:_ to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_DeconstructIntoWrongType2WithDiscard", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2]
  var y set to empty [String]
  set _:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array to Array"]);
  });

  test("Fail_CannotDeconstruct1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  var x:y set to a
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
  let x:y be a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to "fred"
  var x:y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct3", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {"fred":1}
  var x:y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct4", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1:1}
  var x set to 0
  var y set to empty [Int]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ImmutableDictionary to Array"]);
  });

  test("Fail_CannotDeconstruct5", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to 1
  var x set to 0
  var y set to empty [Int]
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to Array"]);
  });

  test("Fail_DeconstructEmptyArray1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to empty [Int]
  var x:y set to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_DeconstructEmptyArray2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to empty [Int]
  var x set to 0
  var y set to empty [Int]
  set x:y to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [1,2,3]
  let x be 1
  let y be empty [Int]
  set x:y to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the 'let' x",
      "May not re-assign the 'let' y",
    ]);
  });
});
