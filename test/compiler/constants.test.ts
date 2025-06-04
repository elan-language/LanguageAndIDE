import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotCompileWithId,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Constants", () => {
  test("Pass_Int", async () => {
    const code = `${testHeader}

constant a set to 3
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 3;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_Int_Hex", async () => {
    const code = `${testHeader}

constant a set to 0xFF
main
  
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 255;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "255");
  });

  test("Pass_Int_Binary", async () => {
    const code = `${testHeader}

constant a set to 0b10101
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 21;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "21");
  });

  test("Pass_Float", async () => {
    const code = `${testHeader}

constant a set to 3.1
main
print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 3.1;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3.1");
  });

  test("Pass_String", async () => {
    const code = `${testHeader}

constant a set to "hell0"
main
print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = "hell0";

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "hell0");
  });

  test("Pass_EmptyString", async () => {
    const code = `${testHeader}

constant a set to ""
main
  print a
  print a is empty String
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = "";

};
async function main() {
  await system.printLine(global.a);
  await system.printLine(global.a === "");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_SpaceAsString", async () => {
    const code = `${testHeader}

constant a set to " "
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = " ";

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, " ");
  });

  test("Pass_Bool", async () => {
    const code = `${testHeader}

constant a set to true
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = _stdlib.true;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_Enum", async () => {
    const code = `${testHeader}

constant a set to Fruit.apple
main
  print a
end main
enum Fruit apple, orange, pear
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {
  a = Fruit.apple;

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_List", async () => {
    const code = `${testHeader}

constant a set to {1,2,3}
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([1, 2, 3]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2, 3}");
  });

  test("Fail_List", async () => {
    const code = `${testHeader}

constant a set to [1,2,3]
main
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_ListofList", async () => {
    const code = `${testHeader}

constant a set to {{4, 5}, {6, 7, 8}}
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.listImmutable([4, 5]), system.listImmutable([6, 7, 8])]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{{4, 5}, {6, 7, 8}}");
  });

  test("Pass_LargeConstant", async () => {
    const code = `${testHeader}

constant a set to {{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([system.listImmutable([0, 0, 0, 0.16, 0, 0, 0.01]), system.listImmutable([0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85]), system.listImmutable([0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07]), system.listImmutable([-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07])]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{{0, 0, 0, 0.16, 0, 0, 0.01}, {0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85}, {0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07}, {-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07}}",
    );
  });

  test("Fail_Dictionary", async () => {
    const code = `${testHeader}

constant a set to ["a":1]
main
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_useInsideMain", async () => {
    const code = `${testHeader}

main
  constant a set to 3 
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_incorrectKeyword", async () => {
    const code = `${testHeader}

const a set to 3

main
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_invalidLiteralString", async () => {
    const code = `${testHeader}

constant a set to 'hello'

main 
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_reassignment", async () => {
    const code = `${testHeader}

constant a set to 3

main
  set a to 4
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "set6", [
      "May not re-assign the constant 'a'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_libConstantReassignment", async () => {
    const code = `${testHeader}

main
  set pi to 4
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the constant 'pi'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_expression", async () => {
    const code = `${testHeader}

constant a set to 3 + 4

main
  set a to 4 
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_referenceToOtherConstant", async () => {
    const code = `${testHeader}

constant a set to 3
constant b set to a

main
  print b
end main
`;
    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = 3;

  b = this.a;

};
async function main() {
  await system.printLine(global.b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

constant if set to 3

main

end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident2", [
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedAsName", async () => {
    const code = `${testHeader}

constant break set to 3

main

end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "ident2", [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueName", async () => {
    const code = `${testHeader}

constant a set to 1
constant a set to 2
main
  
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "const1", [
      "Name 'a' not unique in scope.LangRef.html#compile_error",
    ]);
  });
  test("Pass_usingConstantAsKeyInConstantDictionary", async () => {
    const code = `${testHeader}

constant a set to {openBrace:blue, closeBrace:red}
main
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.dictionaryImmutable([[_stdlib.openBrace, _stdlib.blue], [_stdlib.closeBrace, _stdlib.red]]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{{:255, }:16711680}");
  });
});
