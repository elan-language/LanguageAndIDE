import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
import {
  testHash,
  transforms,
  assertParses,
  assertStatusIsValid,
  assertObjectCodeIs,
  assertObjectCodeExecutes,
  ignore_test,
  assertDoesNotCompile,
} from "./compiler-test-helpers";

suite("List Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Pass_DeconstructExistingOneElement", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  // #466
  ignore_test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to {1,2,3}
  let x:y set to a
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
  test("Pass_DeconstructNewOneElement", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Pass_DeconstructListIntoNewVariables", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_DeconstructIntoWrongType4", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Fail_CannotDeconstruct1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Fail_CannotDeconstruct2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
});
