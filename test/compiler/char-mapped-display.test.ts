import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("Char Mapped Display", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `${testHeader}

main
  variable g set to new Array2D<of Int>(40, 30, white)
  call displayBlocks(g)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  await _stdlib.displayBlocks(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 0, '<div style="background-color:#ffffff;">');
  });

  test("Pass_withPut", async () => {
    const code = `${testHeader}

main
  variable g set to new Array2D<of Int>(40, 30, white)
  set g to g.withPut(1, 0, 4)
  call displayBlocks(g)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  g = g.withPut(1, 0, 4);
  await _stdlib.displayBlocks(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 1, '<div style="background-color:#000004;">');
  });

  test("Pass_ClearBlocks", async () => {
    const code = `${testHeader}

main
  variable g set to new Array2D<of Int>(40, 30, white)
  call displayBlocks(g)
  call clearBlocks()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  await _stdlib.displayBlocks(g);
  await _stdlib.clearBlocks();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_getKey", async () => {
    const code = `${testHeader}

main
  variable gr set to new Array2D<of Int>(40, 30, white)
  variable a set to getKey()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  let a = (await _stdlib.getKey());
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_getKeyWithModifier", async () => {
    const code = `${testHeader}

main
  variable gr set to new Array2D<of Int>(40, 30, white)
  variable a set to getKeyWithModifier()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  let a = (await _stdlib.getKeyWithModifier());
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "tuple(, )");
  });

  test("Pass_clearKeyBuffer", async () => {
    const code = `${testHeader}

main
  variable gr set to new Array2D<of Int>(40, 30, white)
  call clearKeyBuffer()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let gr = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
  await _stdlib.clearKeyBuffer();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_newGraphics", async () => {
    const code = `${testHeader}

main
  variable a set to new Array2D<of Int>(40, 30, white)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.Array2D()._initialise(40, 30, _stdlib.white));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
  print a
end main

class Foo
  constructor()
  end constructor

  property p as List<of Int>
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let foo = system.initialise(await new Foo()._initialise());
  let a = foo.p;
  await system.printLine(a);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {

    return this;
  }

  p = system.initialise(_stdlib.List.emptyInstance());

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[]");
  });
});
