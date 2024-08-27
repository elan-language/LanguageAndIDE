import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms
} from "./compiler-test-helpers";

suite("Standard Lib", () => {
  test("random", async () => {
    const code = `# FFFF Elan Beta 1 valid

main
  var results set to [0, 0, 0, 0, 0, 0, 0]
  for i from 1 to 10000 step 1
    var r set to randomInt(3, 5)
    set results[r] to results[r] + 1
  end for
  for i from 0 to 6 step 1
    var r set to round(results[i]/10000, 1)
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  for (var i = 1; i <= 10000; i = i + 1) {
    var r = _stdlib.randomInt(3, 5);
    system.safeSet(results, r, system.safeIndex(results, r) + 1);
  }
  for (var i = 0; i <= 6; i = i + 1) {
    var r = _stdlib.round(system.safeIndex(results, i) / 10000, 1);
    system.printLine(_stdlib.asString(r));
    system.printLine(_stdlib.asString(", "));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0, 0, 0, 0.3, 0.3, 0.3, 0, ");
  });

  test("functionalRandom", async () => {
    const code = `# FFFF Elan Beta 1 valid

main
  var results set to [0, 0, 0, 0, 0, 0, 0]
  var rnd set to functionalRandom()
  for i from 1 to 10000 step 1
    var r set to rnd.valueInt(3, 5)
    set results[r] to results[r] + 1
    set rnd to rnd.next()
  end for
  for i from 0 to 6 step 1
    var r set to round(results[i]/10000, 1)
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  var rnd = _stdlib.functionalRandom();
  for (var i = 1; i <= 10000; i = i + 1) {
    var r = _stdlib.valueInt(rnd, 3, 5);
    system.safeSet(results, r, system.safeIndex(results, r) + 1);
    rnd = _stdlib.next(rnd);
  }
  for (var i = 0; i <= 6; i = i + 1) {
    var r = _stdlib.round(system.safeIndex(results, i) / 10000, 1);
    system.printLine(_stdlib.asString(r));
    system.printLine(_stdlib.asString(", "));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0, 0, 0, 0.3, 0.3, 0.3, 0, ");
  });
  test("functionalRandomSeed", async () => {
    const code = `# FFFF Elan Beta 1 valid

main
  var results set to [0, 0, 0, 0, 0, 0, 0]
  var rnd set to functionalRandomSeed(0, 0)
  for i from 1 to 10000 step 1
    var r set to rnd.valueInt(3, 5)
    set results[r] to results[r] + 1
    set rnd to rnd.next()
  end for
  for i from 0 to 6 step 1
    var r set to results[i]
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  var rnd = _stdlib.functionalRandomSeed(0, 0);
  for (var i = 1; i <= 10000; i = i + 1) {
    var r = _stdlib.valueInt(rnd, 3, 5);
    system.safeSet(results, r, system.safeIndex(results, r) + 1);
    rnd = _stdlib.next(rnd);
  }
  for (var i = 0; i <= 6; i = i + 1) {
    var r = system.safeIndex(results, i);
    system.printLine(_stdlib.asString(r));
    system.printLine(_stdlib.asString(", "));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0, 0, 0, 3365, 3268, 3367, 0, ");
  });
});
