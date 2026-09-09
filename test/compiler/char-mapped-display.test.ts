import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Block Graphics", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `${testHeader}

main
  variable g set to new BlockGraphics()
  call g.display()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.BlockGraphics()._initialise());
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertGraphicsContains(fileImpl, 0, '<div style="background-color:#ffffff;">');
  });

  test("Pass_put", async () => {
    const code = `${testHeader}

main
  variable g set to new BlockGraphics()
  call g.put(1, 0, 4)
  call g.display()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.BlockGraphics()._initialise());
  g.put(1, 0, 4);
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertGraphicsContains(fileImpl, 1, '<div style="background-color:#000004;">');
  });

  test("Pass_ClearBlocks", async () => {
    const code = `${testHeader}

main
  variable g set to new BlockGraphics()
  call g.display()
  call clearBlocks()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.BlockGraphics()._initialise());
  await g.display();
  await _stdlib.clearBlocks();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_getKey", async () => {
    const code = `${testHeader}

main
  variable g set to new BlockGraphics()
  variable a set to getKey()
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.BlockGraphics()._initialise());
  let a = (await _stdlib.getKey());
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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

  test("Pass_getNumericKey", async () => {
    const code = `${testHeader}

main
  variable a set to 0
  assign a to getNumericKey()
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 0;
  a = (await _stdlib.getNumericKey());
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "-1");
  });

  test("Pass_waitForKey", async () => {
    const code = `${testHeader}

main
  variable a set to waitForKey()
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.waitForKey());
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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

  test("Pass_getKeyWithModifier", async () => {
    const code = `${testHeader}

main
  variable a set to getKeyWithModifier()
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.getKeyWithModifier());
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "(, )");
  });

  test("Pass_clearKeyBuffer", async () => {
    const code = `${testHeader}

main
  call clearKeyBuffer()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.clearKeyBuffer();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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

  test("Pass_newGraphics", async () => {
    const code = `${testHeader}

main
  variable g set to new BlockGraphics()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.BlockGraphics()._initialise());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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

  test("Pass_defaultGraphics", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable a set to foo.p
  call printNoLine(a)
end main

class Foo
  constructor()
    assign this.p to new List<of Int>()
  end constructor
  function toString() returns String
    return ""
  end function

  property p as List<of Int>
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let a = foo.p;
  await _stdlib.printNoLine(a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.p = system.initialise(await new _stdlib.List()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  p = system.initialise(_stdlib.List.emptyInstance());

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });
});
