import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T70_StandardHofs", () => {
  test("Pass_filter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
main
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => (x < 3) or (x > 35))
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.print(_stdlib.asString(_stdlib.filter(source, (x) => x > 20)));
  system.print(_stdlib.asString(_stdlib.filter(source, (x) => x > 20)));
  system.print(_stdlib.asString(_stdlib.filter(source, (x) => (x < 3) || (x > 35))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Iter [23, 27, 31, 37]Iter [23, 27, 31, 37]Iter [2, 37]");
  });

  test("Pass_map", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
main
  print source.map(lambda x as Int => x + 1)
  print source.map(lambda x as Int => x.asString() + "*")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.print(_stdlib.asString(_stdlib.map(source, (x) => x + 1)));
  system.print(_stdlib.asString(_stdlib.map(source, (x) => _stdlib.asString(x) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Iter [3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]Iter [2*, 3*, 5*, 7*, 11*, 13*, 17*, 19*, 23*, 27*, 31*, 37*]");
  });

  test("Pass_reduce", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
main
  print source.reduce(0, lambda s as Int, x as Int => s + x)
  print source.reduce(100, lambda s as Int, x as Int => s + x)
  print source.reduce("Concat:", lambda s as String, x as Int => s + x.asString())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.print(_stdlib.asString(_stdlib.reduce(source, 0, (s, x) => s + x)));
  system.print(_stdlib.asString(_stdlib.reduce(source, 100, (s, x) => s + x)));
  system.print(_stdlib.asString(_stdlib.reduce(source, "Concat:", (s, x) => s + _stdlib.asString(x))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "195295Concat:23571113171923273137");
  });

  test("Pass_max", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
main
  print source.max()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.print(_stdlib.asString(_stdlib.max(source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  // Fails TODO
});
