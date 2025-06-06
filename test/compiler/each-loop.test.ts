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

suite("Each Loop", () => {
  test("Pass_List1", async () => {
    const code = `${testHeader}

main
  variable a set to {7,8,9}
  variable n set to 0
  each x in a
      set n to n + x
  end each
  print n
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([7, 8, 9]);
  let n = 0;
  for (const x of a) {
    n = n + x;
  }
  await system.printLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_List2", async () => {
    const code = `${testHeader}

main
  variable a set to {7,8,9}.asList()
  variable n set to 0
  each x in a
    set n to n + x
  end each
  print n
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([7, 8, 9]).asList();
  let n = 0;
  for (const x of a) {
    n = n + x;
  }
  await system.printLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_String", async () => {
    const code = `${testHeader}

main
  variable a set to "hello"
  each x in a
    print x
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "hello";
  for (const x of a) {
    await system.printLine(x);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "hello");
  });

  test("Pass_DoubleLoop", async () => {
    const code = `${testHeader}

main
  each x in "12"
    each y in "34"
      print "{x}{y}"
    end each
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  for (const x of "12") {
    for (const y of "34") {
      await system.printLine(\`\${await _stdlib.asString(x)}\${await _stdlib.asString(y)}\`);
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13142324");
  });

  test("Pass_functionProvidingList", async () => {
    const code = `${testHeader}

main
  each x in fruit()
    print x
  end each
end main

function fruit() returns ListImmutable<of String>
  return {"apple","orange", "pear"}
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  for (const x of (await global.fruit())) {
    await system.printLine(x);
  }
}

async function fruit() {
  return system.listImmutable(["apple", "orange", "pear"]);
}
global["fruit"] = fruit;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_EachOfConstant", async () => {
    const code = `${testHeader}

constant ints set to {1, 2, 3}
main
  each i1 in ints
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  ints = system.listImmutable([1, 2, 3]);

};
async function main() {
  for (const i1 of global.ints) {

  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_UndefinedIterable1", async () => {
    const code = `${testHeader}

main
  each i1 in ints
  end each
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'ints' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UndefinedIterable2", async () => {
    const code = `${testHeader}

main
  let bar be new Bar([1,2])
  call bar.display()
end main

class Bar
  private property l as List<of Int>
  constructor(li as List<of Int>)
    set property.li to li
  end constructor

  procedure display()
    each item in li
      print item
    end each
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'li' is not defined.LangRef.html#compile_error",
      "'li' is not defined.LangRef.html#compile_error",
    ]);
  });

  test("Fail_variableIsScoped", async () => {
    const code = `${testHeader}

main
  variable a set to {7, 8, 9}
  variable x set to "hello"
  each x in a
    print x
  end each
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'x' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_variableIsScoped2", async () => {
    const code = `${testHeader}

main
  variable a set to {7, 8, 9}
  each x in a
    print x
  end each
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_duplicateId", async () => {
    const code = `${testHeader}

main
  variable ids set to {7, 8, 9}
  each id in id
    print id
  end each
  print ids
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_NoEndeach", async () => {
    const code = `${testHeader}

main
  variable a set to [7, 8, 9]
  each x in a
    print x
  end for
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_applyToANonIterable", async () => {
    const code = `${testHeader}

main
  variable y set to 10
  each x in y
    print x
  end each
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Source for 'each' must be an Array, List, or String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotAlterTheIterableWithinLoop", async () => {
    const code = `${testHeader}

main
  variable a set to {1, 2, 3, 4, 5}
  each x in a
    set a to a + x
  end each
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the loop counter 'a'.LangRef.html#compile_error",
    ]);
  });
});
