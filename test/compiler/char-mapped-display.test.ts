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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to  new BlockGraphics()
  call g.draw()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  await _stdlib.draw(g);
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withUnicode(0, 0, 90, black, white)
  call g.draw()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withUnicode(g, 0, 0, 90, _stdlib.black, _stdlib.white);
  await _stdlib.draw(g);
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getChar(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withText(g, 10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(_stdlib.getChar(g, 10, 20)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getForeground(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withText(g, 10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(_stdlib.getForeground(g, 10, 20)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withBlock(1, 0, 4)
  call g.draw()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withBlock(g, 1, 0, 4);
  await _stdlib.draw(g);
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withText(10, 20, "a", 1, 2)
  print g.getBackground(10, 20)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withText(g, 10, 20, "a", 1, 2);
  system.printLine(_stdlib.asString(_stdlib.getBackground(g, 10, 20)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var gr set to new BlockGraphics()
  call gr.draw()
  call gr.clearGraphics()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var gr = system.initialise(system.list(new Array()));
  await _stdlib.draw(gr);
  _stdlib.clearGraphics(gr);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_getKeystroke", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var gr set to new BlockGraphics()
  var a set to gr.getKeystroke()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var gr = system.initialise(system.list(new Array()));
  var a = await _stdlib.getKeystroke(gr);
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

  test("Pass_getKeystrokeWithModifier", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var gr set to new BlockGraphics()
  var a set to gr.getKeystrokeWithModifier()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var gr = system.initialise(system.list(new Array()));
  var a = await _stdlib.getKeystrokeWithModifier(gr);
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var gr set to new BlockGraphics()
  call gr.clearKeyBuffer()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var gr = system.initialise(system.list(new Array()));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to new BlockGraphics()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.list(new Array()));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to new Foo()
  var a set to foo.p
  print a
end main

class Foo
  constructor()
  end constructor

  property p as BlockGraphics
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var a = foo.p;
  system.printLine(_stdlib.asString(a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p", system.emptyImmutableList()]]);};
  constructor() {

  }

  p = system.emptyImmutableList();

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}");
  });

  test("Fail_emptyGraphics", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var a set to empty BlockGraphics()
  set a to initialisedGraphics()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_putString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withText(0, 0, "Hello", 1, 2)
  call g.draw()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withText(g, 0, 0, "Hello", 1, 2);
  await _stdlib.draw(g);
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var g set to new BlockGraphics()
  set g to g.withText(39, 29, "Hello", 1, 2)
  call g.draw()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(system.list(new Array()));
  g = _stdlib.withText(g, 39, 29, "Hello", 1, 2);
  await _stdlib.draw(g);
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
