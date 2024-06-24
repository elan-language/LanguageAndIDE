import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
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

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => (x < 3) or (x > 35))
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.filter(source, (x) => x > 20)));
  system.printLine(_stdlib.asString(_stdlib.filter(source, (x) => x > 20)));
  system.printLine(_stdlib.asString(_stdlib.filter(source, (x) => (x < 3) || (x > 35))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "Iter [23, 27, 31, 37]Iter [23, 27, 31, 37]Iter [2, 37]",
    );
  });

  test("Pass_filterInFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print filterIt(source)
end main

function filterIt(tofilter as Iter<of Int>) return Iter<of Int>
    return tofilter.filter(lambda x as Int => x > 20)
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(filterIt(source)));
}

function filterIt(tofilter) {
  return _stdlib.filter(tofilter, (x) => x > 20);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Iter [23, 27, 31, 37]");
  });

  test("Pass_map", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.map(lambda x as Int => x + 1)
  print source.map(lambda x as Int => x.asString() + "*")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.map(source, (x) => x + 1)));
  system.printLine(_stdlib.asString(_stdlib.map(source, (x) => _stdlib.asString(x) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "Iter [3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]Iter [2*, 3*, 5*, 7*, 11*, 13*, 17*, 19*, 23*, 27*, 31*, 37*]",
    );
  });

  test("Pass_mapTestType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}.asIter()
  set source to source.map(lambda x as Int => x + 1)
  print source
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var source = _stdlib.asIter(system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]));
  source = _stdlib.map(source, (x) => x + 1);
  system.printLine(_stdlib.asString(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Iter [3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]");
  });

  test("Pass_reduce", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.reduce(0, lambda s as Int, x as Int => s + x)
  print source.reduce(100, lambda s as Int, x as Int => s + x)
  print source.reduce("Concat:", lambda s as String, x as Int => s + x.asString())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.reduce(source, 0, (s, x) => s + x)));
  system.printLine(_stdlib.asString(_stdlib.reduce(source, 100, (s, x) => s + x)));
  system.printLine(_stdlib.asString(_stdlib.reduce(source, "Concat:", (s, x) => s + _stdlib.asString(x))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "195295Concat:23571113171923273137");
  });

  test("Pass_reduceToImmutableDictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {"three", "four"}
main
  var ed set to {"one":1, "two":2}
  set ed to source.reduce(ed, lambda d as ImmutableDictionary<of String, Int>, x as String => d.withKey(x, 1))
  print ed
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList(["three", "four"]);

async function main() {
  var ed = system.immutableDictionary({["one"] : 1, ["two"] : 2});
  ed = _stdlib.reduce(source, ed, (d, x) => _stdlib.withKey(d, x, 1));
  system.printLine(_stdlib.asString(ed));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableDictionary {one:1, two:2, three:1, four:1}");
  });

  test("Pass_max", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.max()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.max(source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Pass_maxBy", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.maxBy(lambda x as Int => mod(x, 5))
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.maxBy(source, (x) => _stdlib.mod(x, 5))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "19");
  });

  test("Pass_maxBy1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {{1}, {2, 2}}
main
  print source.maxBy(lambda x as ImmutableList<of Int> => x.length())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([system.immutableList([1]), system.immutableList([2, 2])]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.maxBy(source, (x) => _stdlib.length(x))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {2, 2}");
  });

  test("Pass_maxBy2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {"apple", "orange", "pear"}
main
  print source.maxBy(lambda t as String => t.length())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList(["apple", "orange", "pear"]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.maxBy(source, (t) => _stdlib.length(t))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "orange");
  });

  test("Pass_length", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.length(source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_min", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.min()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.min(source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_minBy", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.minBy(lambda x as Int => mod(x, 5))
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.minBy(source, (x) => _stdlib.mod(x, 5))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_any", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.any(lambda x as Int => x > 20)
  print source.any(lambda x as Int => mod(x, 2) is 0)
  print source.any(lambda x as Int => x > 40)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.any(source, (x) => x > 20)));
  system.printLine(_stdlib.asString(_stdlib.any(source, (x) => _stdlib.mod(x, 2) === 0)));
  system.printLine(_stdlib.asString(_stdlib.any(source, (x) => x > 40)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  ignore_test("Pass_groupBy", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.groupBy(lambda x as Int => x.mod(5))
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.immutableList({2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37});

async function main() {
  system.printLine(_stdlib.asString(_stdlib.groupBy(source, (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Fail_MaxOnNonNumeric", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {"apple", "orange", "pair"}
main
  print source.max()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Float"]);
  });

  test("Fail_MaxLambdaReturningNonNumeric", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant source set to {"apple", "orange", "pair"}
main
  print source.maxBy(lambda t as String => t)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Float"]);
  });
});
