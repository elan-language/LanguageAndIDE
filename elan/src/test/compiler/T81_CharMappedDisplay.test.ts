import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";
import { AssertOutcome } from "../../system";
import { TestStatus } from "../../frames/status-enums";

suite("Pass_PassingTest", () => {
  test("Pass_SimpleDraw", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="foreground-color:0;background-color:0;">',
    );
  });

  test("Pass_PutAt", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  set g to g.putAt(0, 0, ("F", 1, 2))
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  g = _stdlib.putAt(g, 0, 0, system.tuple(["F", 1, 2]));
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="foreground-color:1;background-color:2;">F',
    );
  });

  test("Pass_PutChar", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  set g to g.putChar(0, 0, "Z")
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  g = _stdlib.putChar(g, 0, 0, "Z");
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="foreground-color:0;background-color:0;">Z',
    );
  });

  test("Pass_PutForeground", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  set g to g.putForeground(0, 0, 3)
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  g = _stdlib.putForeground(g, 0, 0, 3);
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      0,
      '<div style="foreground-color:3;background-color:0;">',
    );
  });

  test("Pass_PutBackground", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  set g to g.putBackground(0, 1, 4)
  call g.drawCharMap()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  g = _stdlib.putBackground(g, 0, 1, 4);
  _stdlib.drawCharMap(g);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(
      fileImpl,
      1,
      '<div style="foreground-color:0;background-color:4;">',
    );
  });

  test("Pass_ClearGraphics", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to getEmptyCharMap()
  call g.drawCharMap()
  call clearGraphics()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = _stdlib.getEmptyCharMap();
  _stdlib.drawCharMap(g);
  _stdlib.clearGraphics();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertGraphicsContains(fileImpl, 0, "");
  });
});
