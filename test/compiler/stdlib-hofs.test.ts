import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib HOFs", () => {
  test("Pass_filter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.filter(lambda x as Int => x > 20).listImmutableAsList()
  print source.filter(lambda x as Int => x > 20).listImmutableAsList()
  print source.filter(lambda x as Int => (x < 3) or (x > 35)).listImmutableAsList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await global.source.filter(async (x) => x > 20))));
  await system.printLine(_stdlib.listImmutableAsList((await global.source.filter(async (x) => x > 20))));
  await system.printLine(_stdlib.listImmutableAsList((await global.source.filter(async (x) => (x < 3) || (x > 35)))));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to "onetwo"
main
  print source.filter(lambda x as String => x is "o").listImmutableAsList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await _stdlib.filter(global.source, async (x) => x === "o"))));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print filterIt(source)
end main

function filterIt(tofilter as ListImmutable<of Int>) returns ListImmutable<of Int>
    return tofilter.filter(lambda x as Int => x > 20)
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.filterIt(global.source)));
}

async function filterIt(tofilter) {
  return (await tofilter.filter(async (x) => x > 20));
}
global["filterIt"] = filterIt;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{23, 27, 31, 37}");
  });

  test("Pass_map", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.map(lambda x as Int => x + 1).listImmutableAsList()
  print source.map(lambda x as Int => x.asString() + "*").listImmutableAsList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await global.source.map(async (x) => x + 1))));
  await system.printLine(_stdlib.listImmutableAsList((await global.source.map(async (x) => (await _stdlib.asString(x)) + "*"))));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to "onetwo"
main
  print source.map(lambda x as String => x + "*").listImmutableAsList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await _stdlib.map(global.source, async (x) => x + "*"))));
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
  set source to source.map(lambda x as Int => x + 1)
  print source.listImmutableAsList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  source = (await source.map(async (x) => x + 1));
  await system.printLine(_stdlib.listImmutableAsList(source));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.reduce(0, lambda s as Int, x as Int => s + x)
  print source.reduce(100, lambda s as Int, x as Int => s + x)
  print source.reduce("Concat:", lambda s as String, x as Int => s + x.asString())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.reduce(0, async (s, x) => s + x)));
  await system.printLine((await global.source.reduce(100, async (s, x) => s + x)));
  await system.printLine((await global.source.reduce("Concat:", async (s, x) => s + (await _stdlib.asString(x)))));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to "onetwo"
main
  print source.reduce("Concat:", lambda s as String, x as String => s + "*" + x)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  await system.printLine((await _stdlib.reduce(global.source, "Concat:", async (s, x) => s + "*" + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Concat:*o*n*e*t*w*o");
  });

  test("Pass_reduceToDictionaryImmutable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"three", "four"}
main
  variable ed set to {"one":1, "two":2}
  set ed to source.reduce(ed, lambda d as DictionaryImmutable<of String, Int>, x as String => d.withPut(x, 1))
  print ed
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["three", "four"]);

};
async function main() {
  let ed = system.dictionaryImmutable([["one", 1], ["two", 2]]);
  ed = (await global.source.reduce(ed, async (d, x) => d.withPut(x, 1)));
  await system.printLine(ed);
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.max()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(_stdlib.max(global.source));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.maxBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.maxBy(async (x) => x % 5)));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {{1}, {2, 2}}
main
  print source.maxBy(lambda x as ListImmutable<of Int> => x.length())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([system.listImmutable([1]), system.listImmutable([2, 2])]);

};
async function main() {
  await system.printLine((await global.source.maxBy(async (x) => x.length())));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"apple", "orange", "pear"}
main
  print source.maxBy(lambda t as String => t.length())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["apple", "orange", "pear"]);

};
async function main() {
  await system.printLine((await global.source.maxBy(async (t) => _stdlib.length(t))));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(global.source.length());
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.min()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(_stdlib.min(global.source));
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.minBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.minBy(async (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_sortBy", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.sortBy(lambda x as Int, y as Int => if x is y then 0 else if x < y then 1 else -1).listImmutableAsList()
  print source
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await global.source.sortBy(async (x, y) => x === y ? 0 : x < y ? 1 : (-1)))));
  await system.printLine(global.source);
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
    const code = `# FFFF Elan v1.0.0 valid

constant source set to "dbcd"
main
  print source.sortBy(lambda x as String, y as String => if x is y then 0 else if x.isAfter(y) then 1 else -1).listImmutableAsList()
  print source
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "dbcd";

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsList((await _stdlib.sortBy(global.source, async (x, y) => x === y ? 0 : _stdlib.isAfter(x, y) ? 1 : (-1)))));
  await system.printLine(global.source);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[b, c, d, d]dbcd");
  });

  test("Pass_asSet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"apple", "orange", "pair", "apple"}
main
  print source.listImmutableAsSet()
  print source.listImmutableAsList().listAsSet()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["apple", "orange", "pair", "apple"]);

};
async function main() {
  await system.printLine(_stdlib.listImmutableAsSet(global.source));
  await system.printLine(_stdlib.listAsSet(_stdlib.listImmutableAsList(global.source)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{apple, orange, pair}{apple, orange, pair}");
  });

  test("Pass_complexHof", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant numberChars set to "-.0123456789"
main
  print getTrailingNumber("aa1")
end main

function getTrailingNumber(s as String) returns String
  return if s is "" then "" else s[last(range(0, s.length() -1).filter(lambda n as Int => not isnumberchar(s[n]))) + 1..s.length()]
end function

function isnumberchar(s as String) returns Boolean
  return numberChars.contains(s)
end function

function last(l as ListImmutable<of Int>) returns Int
  return l[l.length() - 1]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  numberChars = "-.0123456789";

};
async function main() {
  await system.printLine((await global.getTrailingNumber("aa1")));
}

async function getTrailingNumber(s) {
  return s === "" ? "" : system.safeSlice(s, (await global.last((await _stdlib.range(0, _stdlib.length(s) - 1).filter(async (n) => !(await global.isnumberchar(system.safeIndex(s, n))))))) + 1, _stdlib.length(s));
}
global["getTrailingNumber"] = getTrailingNumber;

async function isnumberchar(s) {
  return _stdlib.contains(global.numberChars, s);
}
global["isnumberchar"] = isnumberchar;

async function last(l) {
  return system.safeIndex(l, l.length() - 1);
}
global["last"] = last;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_MaxOnNonNumeric", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"apple", "orange", "pair"}
main
  print source.max()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: ListImmutable<of Float> Provided: ListImmutable<of String>",
    ]);
  });

  test("Fail_MaxLambdaReturningNonNumeric", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"apple", "orange", "pair"}
main
  print source.maxBy(lambda t as String => t)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: lambdaOrFunctionRef (Func<of String => Float>) Provided: Func<of String => String>",
    ]);
  });

  test("Fail_MissingBrackets", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant source set to {"apple":"apple", "orange":"orange", "pair":"pair"}
main
  print source.keys.map(lambda s as String => s)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["To evaluate function 'keys' add brackets."]);
  });
});
