import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Char Mapped Display", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  call g.display()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="color:#000000;background-color:#ffffff;">',
    );
  });

  test("Pass_WithUnicode", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withUnicode(0, 0, 90, black, white)
  call g.display()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withUnicode(0, 0, 90, _stdlib.black, _stdlib.white);
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="color:#000000;background-color:#ffffff;">Z',
    );
  });

  test("Pass_GetChar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getChar(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withText(10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(g.getChar(10, 20)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a");
  });

  test("Pass_GetForeground", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getForeground(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withText(10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(g.getForeground(10, 20)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_PutBackground", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withBlock(1, 0, 4)
  call g.display()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withBlock(1, 0, 4);
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      1,
      '<div style="color:#000000;background-color:#000004;">',
    );
  });

  test("Pass_GetBackground", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getBackground(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withText(10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(g.getBackground(10, 20)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_ClearGraphics", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  call g.display()
  call g.clearGraphics()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  await g.display();
  _stdlib.clearGraphics(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_getKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable gr set to new BlockGraphics()
  variable a set to getKey()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var gr = system.initialise(new _stdlib.BlockGraphics());
  var a = await _stdlib.getKey();
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_getKeyWithModifier", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable gr set to new BlockGraphics()
  variable a set to getKeyWithModifier()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var gr = system.initialise(new _stdlib.BlockGraphics());
  var a = await _stdlib.getKeyWithModifier();
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "(, )");
  });

  test("Pass_clearKeyBuffer", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable gr set to new BlockGraphics()
  call gr.clearKeyBuffer()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var gr = system.initialise(new _stdlib.BlockGraphics());
  _stdlib.clearKeyBuffer(gr);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_newGraphics", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new BlockGraphics()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = system.initialise(new _stdlib.BlockGraphics());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_defaultGraphics", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to new Foo()
  variable a set to foo.p
  print a
end main

class Foo
  constructor()
  end constructor

  property p as BlockGraphics
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var foo = system.initialise(new Foo());
  var a = foo.p;
  system.printLine(_stdlib.asString(a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  _p;
  get p() {
    return this._p ??= system.initialise(_stdlib.BlockGraphics.emptyInstance());
  }
  set p(p) {
    this._p = p;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a BlockGraphics");
  });

  test("Fail_emptyGraphics", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty BlockGraphics()
  set a to initialisedGraphics()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_putString", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withText(0, 0, "Hello", 1, 2)
  call g.display()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withText(0, 0, "Hello", 1, 2);
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="color:#000001;background-color:#000002;">H',
    );
    await assertGraphicsContains(
      fileImpl,
      1,
      '<div style="color:#000001;background-color:#000002;">e',
    );
  });

  test("Pass_putString overrunning both limits", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new BlockGraphics()
  set g to g.withText(39, 29, "Hello", 1, 2)
  call g.display()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var g = system.initialise(new _stdlib.BlockGraphics());
  g = g.withText(39, 29, "Hello", 1, 2);
  await g.display();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      1199,
      '<div style="color:#000001;background-color:#000002;">H',
    );
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="color:#000001;background-color:#000002;">e',
    );
  });
});
