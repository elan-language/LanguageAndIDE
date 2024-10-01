import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("StdLib HOFs", () => {
  test("Pass_filter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.filter(lambda x as Int => x > 20).asArray()
  print source.filter(lambda x as Int => x > 20).asArray()
  print source.filter(lambda x as Int => (x < 3) or (x > 35)).asArray()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.filter(source, (x) => x > 20))));
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.filter(source, (x) => x > 20))));
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.filter(source, (x) => (x < 3) || (x > 35)))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[23, 27, 31, 37][23, 27, 31, 37][2, 37]");
  });

  test("Pass_filterString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to "onetwo"
main
  print source.filter(lambda x as String => x is "o").asArray()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = "onetwo";

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.filter(source, (x) => x === "o"))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[o, o]");
  });

  test("Pass_filterInFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print filterIt(source)
end main

function filterIt(tofilter as List<of Int>) return List<of Int>
    return tofilter.filter(lambda x as Int => x > 20).asList()
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(filterIt(source)));
}

function filterIt(tofilter) {
  return _stdlib.asList(_stdlib.filter(tofilter, (x) => x > 20));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{23, 27, 31, 37}");
  });

  test("Pass_map", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.map(lambda x as Int => x + 1).asArray()
  print source.map(lambda x as Int => x.asString() + "*").asArray()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.map(source, (x) => x + 1))));
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.map(source, (x) => _stdlib.asString(x) + "*"))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38][2*, 3*, 5*, 7*, 11*, 13*, 17*, 19*, 23*, 27*, 31*, 37*]",
    );
  });

  test("Pass_mapString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to "onetwo"
main
  print source.map(lambda x as String => x + "*").asArray()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = "onetwo";

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.map(source, (x) => x + "*"))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[o*, n*, e*, t*, w*, o*]");
  });

  test("Pass_mapTestType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}.asIter()
  set source to source.map(lambda x as Int => x + 1)
  print source.asArray()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var source = _stdlib.asIter(system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]));
  source = _stdlib.map(source, (x) => x + 1);
  system.printLine(_stdlib.asString(_stdlib.asArray(source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]");
  });

  test("Pass_reduce", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.reduce(0, lambda s as Int, x as Int => s + x)
  print source.reduce(100, lambda s as Int, x as Int => s + x)
  print source.reduce("Concat:", lambda s as String, x as Int => s + x.asString())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

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

  test("Pass_reduceString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to "onetwo"
main
  print source.reduce("Concat:", lambda s as String, x as String => s + "*" + x)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = "onetwo";

async function main() {
  system.printLine(_stdlib.asString(_stdlib.reduce(source, "Concat:", (s, x) => s + "*" + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Concat:*o*n*e*t*w*o");
  });

  test("Pass_reduceToImmutableDictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {"three", "four"}
main
  var ed set to {"one":1, "two":2}
  set ed to source.reduce(ed, lambda d as ImmutableDictionary<of String, Int>, x as String => d.withPutAtKey(x, 1))
  print ed
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list(["three", "four"]);

async function main() {
  var ed = system.immutableDictionary({["one"] : 1, ["two"] : 2});
  ed = _stdlib.reduce(source, ed, (d, x) => _stdlib.withPutAtKey(d, x, 1));
  system.printLine(_stdlib.asString(ed));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one:1, two:2, three:1, four:1}");
  });

  test("Pass_max", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.max()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.maxBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.maxBy(source, (x) => x % 5)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {{1}, {2, 2}}
main
  print source.maxBy(lambda x as List<of Int> => x.length())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([system.list([1]), system.list([2, 2])]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.maxBy(source, (x) => _stdlib.length(x))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 2}");
  });

  test("Pass_maxBy2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {"apple", "orange", "pear"}
main
  print source.maxBy(lambda t as String => t.length())
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list(["apple", "orange", "pear"]);

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.min()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.minBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.minBy(source, (x) => x % 5)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.any(lambda x as Int => x > 20)
  print source.any(lambda x as Int => (x mod 2) is 0)
  print source.any(lambda x as Int => x > 40)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.any(source, (x) => x > 20)));
  system.printLine(_stdlib.asString(_stdlib.any(source, (x) => (x % 2) === 0)));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 1, 3, 7, 9, 3, 7, 1, 7}
main
  print source.groupBy(lambda x as Int => x)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 1, 3, 7, 9, 3, 7, 1, 7]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.groupBy(source, (x) => x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });

  test("Pass_sortBy", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.sortBy(lambda x as Int, y as Int => if x is y then 0 else if x < y then 1 else -1).asArray()
  print source
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.sortBy(source, (x, y) => x === y ? 0 : x < y ? 1 : -1))));
  system.printLine(_stdlib.asString(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[37, 31, 27, 23, 19, 17, 13, 11, 7, 5, 3, 2]{2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}",
    );
  });

  test("Pass_sortByString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant source set to "dbcd"
main
  print source.sortBy(lambda x as String, y as String => if x is y then 0 else if isAfter(x, y) then 1 else -1).asArray()
  print source
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const source = "dbcd";

async function main() {
  system.printLine(_stdlib.asString(_stdlib.asArray(_stdlib.sortBy(source, (x, y) => x === y ? 0 : _stdlib.isAfter(x, y) ? 1 : -1))));
  system.printLine(_stdlib.asString(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[b, c, d, d]dbcd");
  });

  test("Fail_MaxOnNonNumeric", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
