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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  variable x set to 1
  variable y set to empty Array<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  variable y set to empty Array<of Int>
  set _:y to a
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  variable x set to 1
  set x:_ to a
  print x
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.literalArray([1, 2, 3]);
  var [x, y] = system.deconstructList(a);
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

  test("Pass_DeconstructArrayOfArrayIntoExistingVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  variable x set to empty Array<of Int>
  variable y set to empty Array<of Array<of Int>>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.literalArray([system.literalArray([1, 2, 3]), system.literalArray([4, 5, 6]), system.literalArray([7, 8, 9])]);
  var [x, y] = system.deconstructList(a);
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

  test("Pass_DeconstructArrayOfArrayIntoNewLetVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.literalArray([system.literalArray([1, 2, 3]), system.literalArray([4, 5, 6]), system.literalArray([7, 8, 9])]);
  const [x, y] = system.deconstructList(a);
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

  test("Pass_DeconstructExistingOneElement", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1]
  variable x set to 1
  variable y set to empty Array<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  const [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  let x:_ be a
  print x
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  const [x, ] = system.deconstructList(a);
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

  test("Pass_DeconstructIntoLetVariablesWithDiscard2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  let _:y be a
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  const [, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 3}");
  });

  test("Pass_DeconstructNewOneElement", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.literalArray([1]);
  var [x, y] = system.deconstructList(a);
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

  test("Pass_DeconstructNewLetOneElement", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1]
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.literalArray([1]);
  const [x, y] = system.deconstructList(a);
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

  test("Pass_DeconstructListIntoNewVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  var [x, y] = system.deconstructList(a);
  system.printLine(_stdlib.asString(x));
  system.printLine(_stdlib.asString(y));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructListIntoExistingVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  variable x set to 1
  variable y set to empty List<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  var x = 1;
  var y = system.emptyImmutableList();
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
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructListTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1,2,3}
  variable x:y set to a
  set x to x
  set y to y
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.list([1, 2, 3]);
  var [x, y] = system.deconstructList(a);
  x = x;
  y = y;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_DeconstructIntoWrongType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to ""
  variable y set to empty Array<of Int>
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to empty Array<of String>
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to ""
  variable y set to empty Array<of String>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array<of Int> to Array<of String>"]);
  });

  test("Fail_DeconstructIntoWrongType4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to 0
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array<of Int> to Int"]);
  });

  test("Fail_DeconstructIntoWrongType5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to empty Array<of Int>
  variable y set to empty Array<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to Array<of Int>"]);
  });

  test("Fail_DeconstructIntoWrongType6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to empty List<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Array<of Int> to List<of Int> try converting with '.asList()'",
    ]);
  });

  test("Fail_DeconstructIntoWrongType1WithDiscard", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable x set to ""
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable y set to empty Array<of String>
  set _:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Array<of Int> to Array<of String>"]);
  });

  test("Fail_CannotDeconstruct1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable x:y set to a
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "fred"
  variable x:y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"fred":1}
  variable x:y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {1:1}
  variable x set to 0
  variable y set to empty Array<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstruct5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable x set to 0
  variable y set to empty Array<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_DeconstructEmptyArray1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array<of Int>
  variable x:y set to a
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty Array<of Int>
  variable x set to 0
  variable y set to empty Array<of Int>
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2,3]
  let x be 1
  let y be empty Array<of Int>
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
      "May not re-assign the 'let' 'x'",
      "May not re-assign the 'let' 'y'",
    ]);
  });
});
