import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
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
   for x in a
      set n to n + x
  end for
  call printNoLine(n)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const elan_iterfor9 = [...a];
  for (const x of elan_iterfor9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    set n to n + x
  end for
  call printNoLine(n)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([7, 8, 9]);
  let n = 0;
  const elan_iterfor9 = [...a];
  for (const x of elan_iterfor9) {
    n = n + x;
  }
  await _stdlib.printNoLine(n);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    call printNoLine(x)
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = "hello";
  const elan_iterfor6 = [...a];
  for (const x of elan_iterfor6) {
    await _stdlib.printNoLine(x);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in "12"
     for y in "34"
      call printNoLine($"{x}{y}")
    end for
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const elan_iterfor3 = [..."12"];
  for (const x of elan_iterfor3) {
    const elan_iterfor7 = [..."34"];
    for (const y of elan_iterfor7) {
      await _stdlib.printNoLine(\`\${await _stdlib.toString(x)}\${await _stdlib.toString(y)}\`);
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in fruit()
    call printNoLine(x)
  end for
end main

function fruit() returns List<of String>
  return ["apple","orange", "pear"]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const elan_iterfor3 = [...(await global.fruit())];
  for (const x of elan_iterfor3) {
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for i1 in ints
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let ints = system.list([1, 2, 3]);
  const elan_iterfor6 = [...ints];
  for (const i1 of elan_iterfor6) {

  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for item in a
    call a.append(item)
    call printNoLine(item)
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  const elan_iterfor6 = [...a];
  for (const item of elan_iterfor6) {
    a.append(item);
    await _stdlib.printNoLine(item);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for i1 in ints
  end for
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    set this.l to li
  end constructor
  function toString() returns String
    return ""
  end function

  procedure display()
     for item in li
      call printNoLine(item)
    end for
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'li' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_variableIsScoped", async () => {
    const code = `${testHeader}

main
  variable a set to [7, 8, 9]
  variable x set to "hello"
   for x in a
    call printNoLine(x)
  end for
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    call printNoLine(x)
  end for
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_variableIsScoped3", async () => {
    const code = `${testHeader}

main
  variable a set to [7, 8, 9]
  variable xx set to "hello"
   for xX in a
    call printNoLine(x)
  end for
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'xx' already exists. Identifiers must be distinct by more than just case. Either rename 'xX' or extend it e.g. by adding underscore.LangRef.html#compile_error",
    ]);
  });

  test("Fail_duplicateId", async () => {
    const code = `${testHeader}

main
  variable ids set to [7, 8, 9]
   for id in id
    call printNoLine(id)
  end for
  call printNoLine(ids)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    call printNoLine(x)
  end
  call printNoLine(x)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_applyToANonIterable", async () => {
    const code = `${testHeader}

main
  variable y set to 10
   for x in y
    call printNoLine(x)
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for ch in s
    call printNoLine(ch)
    set s to "fred"
  end for
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "hello";
  const elan_iterfor6 = [...s];
  for (const ch of elan_iterfor6) {
    await _stdlib.printNoLine(ch);
    s = "fred";
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    set a to a.withAppend(x)
    call printNoLine(x)
  end for
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3, 4, 5]);
  const elan_iterfor6 = [...a];
  for (const x of elan_iterfor6) {
    a = a.withAppend(x);
    await _stdlib.printNoLine(x);
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for ch in s
    call printNoLine(ch)
    set s to "fred"
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
   for x in a
    variable b set to x.z
  end for
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
