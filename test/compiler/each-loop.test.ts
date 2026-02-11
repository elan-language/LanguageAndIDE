import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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
  variable a set to [7,8,9]
  variable n set to 0
  each x in a
      set n to n + x
  end each
  call printNoLine(n)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const _itereach9 = [...a];
  for (const x of _itereach9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_List2", async () => {
    const code = `${testHeader}

main
  variable a set to [7,8,9]
  variable n set to 0
  each x in a
    set n to n + x
  end each
  call printNoLine(n)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const _itereach9 = [...a];
  for (const x of _itereach9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
    call printNoLine(x)
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "hello";
  const _itereach6 = [...a];
  for (const x of _itereach6) {
    await _stdlib.printNoLine(x);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
      call printNoLine("{x}{y}")
    end each
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const _itereach3 = [..."12"];
  for (const x of _itereach3) {
    const _itereach7 = [..."34"];
    for (const y of _itereach7) {
      await _stdlib.printNoLine(\`\${await _stdlib.asString(x)}\${await _stdlib.asString(y)}\`);
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
    call printNoLine(x)
  end each
end main

function fruit() returns List<of String>
  return ["apple","orange", "pear"]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const _itereach3 = [...(await global.fruit())];
  for (const x of _itereach3) {
    await _stdlib.printNoLine(x);
  }
}

async function fruit() {
  return system.list(["apple", "orange", "pear"]);
}
global["fruit"] = fruit;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_EachOfVariable", async () => {
    const code = `${testHeader}


main
  variable ints set to [1, 2, 3]
  each i1 in ints
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let ints = system.list([1, 2, 3]);
  const _itereach6 = [...ints];
  for (const i1 of _itereach6) {

  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_UpdateCollection", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  each item in a
    call a.append(item)
    call printNoLine(item)
  end each
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  const _itereach6 = [...a];
  for (const item of _itereach6) {
    a.append(item);
    await _stdlib.printNoLine(item);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

  test("Fail_UndefinedIterable1", async () => {
    const code = `${testHeader}

main
  each i1 in ints
  end each
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'ints' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UndefinedIterable2", async () => {
    const code = `${testHeader}

main
  variable bar set to new Bar([1,2])
  call bar.display()
end main

class Bar
  private property l as List<of Int>
  constructor(li as List<of Int>)
    set property.li to li
  end constructor

  procedure display()
    each item in li
      call printNoLine(item)
    end each
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  variable a set to [7, 8, 9]
  variable x set to "hello"
  each x in a
    call printNoLine(x)
  end each
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'x' is already used for a variable and cannot be re-defined here.LangRef.html#compile_error",
    ]);
  });

  test("Fail_variableIsScoped2", async () => {
    const code = `${testHeader}

main
  variable a set to [7, 8, 9]
  each x in a
    call printNoLine(x)
  end each
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_duplicateId", async () => {
    const code = `${testHeader}

main
  variable ids set to [7, 8, 9]
  each id in id
    call printNoLine(id)
  end each
  call printNoLine(ids)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'id' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_NoEndeach", async () => {
    const code = `${testHeader}

main
  variable a set to [7, 8, 9]
  each x in a
    call printNoLine(x)
  end for
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_applyToANonIterable", async () => {
    const code = `${testHeader}

main
  variable y set to 10
  each x in y
    call printNoLine(x)
  end each
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Source for 'each' must be an Array, List, or String.LangRef.html#compile_error",
    ]);
  });

  test("Pass_ReassignTheIterableWithinLoop", async () => {
    const code = `${testHeader}

main
  variable s set to "hello"
  each ch in s
    call printNoLine(ch)
    set s to "fred"
  end each
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "hello";
  const _itereach6 = [...s];
  for (const ch of _itereach6) {
    await _stdlib.printNoLine(ch);
    s = "fred";
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "hello");
  });

  test("Pass_AlterTheIterableWithinLoop", async () => {
    const code = `${testHeader}

main
  variable a set to [1, 2, 3, 4, 5]
  each x in a
    set a to a.withAppend(x)
    call printNoLine(x)
  end each
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5]);
  const _itereach6 = [...a];
  for (const x of _itereach6) {
    a = a.withAppend(x);
    await _stdlib.printNoLine(x);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12345");
  });

  test("Fail_ReassignTheLetIterableWithinLoop", async () => {
    const code = `${testHeader}

main
  constant s set to "hello"
  each ch in s
    call printNoLine(ch)
    set s to "fred"
  end each
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the constant 's'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_undefinedCollection", async () => {
    const code = `${testHeader}

main
  each x in a
    variable b set to x.z
  end each
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'a' is not defined.LangRef.html#compile_error",
      "'x' is not defined.LangRef.html#compile_error",
    ]);
  });
});
