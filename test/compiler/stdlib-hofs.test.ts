import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib HOFs", () => {
  test("Pass_filterImmutableList", async () => {
    const code = `${testHeader}

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => (x < 3) or (x > 35))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.filter(async (x) => x > 20)));
  await system.printLine((await global.source.filter(async (x) => x > 20)));
  await system.printLine((await global.source.filter(async (x) => (x < 3) || (x > 35))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{23, 27, 31, 37}{23, 27, 31, 37}{2, 37}");
  });

  test("Pass_filterList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => x > 20)
  print source.filter(lambda x as Int => (x < 3) or (x > 35))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.filter(async (x) => x > 20)));
  await system.printLine((await source.filter(async (x) => x > 20)));
  await system.printLine((await source.filter(async (x) => (x < 3) || (x > 35))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[23, 27, 31, 37][23, 27, 31, 37][2, 37]");
  });

  test("Pass_filterStringViaSplit", async () => {
    const code = `${testHeader}

constant source set to "onetwo"
main
  let li be source.split("")
  print li.filter(lambda x as String => x is "o")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  const li = _stdlib.split(global.source, "");
  await system.printLine((await li.filter(async (x) => x === "o")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[o, o]");
  });

  test("Pass_filterInFunction", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{23, 27, 31, 37}");
  });

  test("Pass_mapImmutableList", async () => {
    const code = `${testHeader}

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.map(lambda x as Int => x + 1)
  print source.map(lambda x as Int => x.asString() + "*")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.map(async (x) => x + 1)));
  await system.printLine((await global.source.map(async (x) => (await _stdlib.asString(x)) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38}{2*, 3*, 5*, 7*, 11*, 13*, 17*, 19*, 23*, 27*, 31*, 37*}",
    );
  });

  test("Pass_mapList", async () => {
    const code = `${testHeader}


main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.map(lambda x as Int => x + 1)
  print source.map(lambda x as Int => x.asString() + "*")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.map(async (x) => x + 1)));
  await system.printLine((await source.map(async (x) => (await _stdlib.asString(x)) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38][2*, 3*, 5*, 7*, 11*, 13*, 17*, 19*, 23*, 27*, 31*, 37*]",
    );
  });

  test("Pass_mapStringViaSplit", async () => {
    const code = `${testHeader}

constant source set to "onetwo"
main
  let li be source.split("")
  print li.map(lambda x as String => x + "*")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  const li = _stdlib.split(global.source, "");
  await system.printLine((await li.map(async (x) => x + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[o*, n*, e*, t*, w*, o*]");
  });

  test("Pass_mapTestType", async () => {
    const code = `${testHeader}

main
  variable source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
  set source to source.map(lambda x as Int => x + 1)
  print source.asList()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  source = (await source.map(async (x) => x + 1));
  await system.printLine(source.asList());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]");
  });

  test("Pass_reduceImmutableList", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "195295Concat:23571113171923273137");
  });

  test("Pass_reduceList", async () => {
    const code = `${testHeader}


main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.reduce(0, lambda s as Int, x as Int => s + x)
  print source.reduce(100, lambda s as Int, x as Int => s + x)
  print source.reduce("Concat:", lambda s as String, x as Int => s + x.asString())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.reduce(0, async (s, x) => s + x)));
  await system.printLine((await source.reduce(100, async (s, x) => s + x)));
  await system.printLine((await source.reduce("Concat:", async (s, x) => s + (await _stdlib.asString(x)))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "195295Concat:23571113171923273137");
  });

  test("Pass_reduceString", async () => {
    const code = `${testHeader}

constant source set to "onetwo"
main
  let li be source.split("")
  print li.reduce("Concat:", lambda s as String, x as String => s + "*" + x)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  const li = _stdlib.split(global.source, "");
  await system.printLine((await li.reduce("Concat:", async (s, x) => s + "*" + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Concat:*o*n*e*t*w*o");
  });

  test("Pass_reduceToDictionaryImmutable", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one:1, two:2, three:1, four:1}");
  });

  test("Fail_maxImmutableList", async () => {
    const code = `${testHeader}

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print maxInt(source)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfInt (List<of Int>), Provided: ListImmutable<of Int>. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Pass_maxByImmutableList", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "19");
  });

  test("Pass_maxByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.maxBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.maxBy(async (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "19");
  });

  test("Pass_maxBy1", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 2}");
  });

  test("Pass_maxBy2", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "orange");
  });

  test("Pass_lengthImmutableList", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_lengthList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine(source.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_minInt", async () => {
    const code = `${testHeader}

main
  let source be [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print minInt(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine(_stdlib.minInt(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_minFloat", async () => {
    const code = `${testHeader}

main
  let source be [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print minFloat(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine(_stdlib.minFloat(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_maxInt", async () => {
    const code = `${testHeader}

main
  let source be [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print maxInt(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine(_stdlib.maxInt(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Pass_maxFloat", async () => {
    const code = `${testHeader}

main
  let source be [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print maxFloat(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine(_stdlib.maxFloat(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Fail_minIntAppliedToFloatList", async () => {
    const code = `${testHeader}

main
  let source be [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print minInt(source)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfInt (List<of Int>), Provided: List<of Float>. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Pass_minByImmutableList", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_minByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.minBy(lambda x as Int => x mod 5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.minBy(async (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_sortByImmutableList", async () => {
    const code = `${testHeader}

constant source set to {2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}
main
  print source.sortBy(lambda x as Int, y as Int => if x is y then 0 else if x < y then 1 else -1)
  print source
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);

};
async function main() {
  await system.printLine((await global.source.sortBy(async (x, y) => x === y ? 0 : x < y ? 1 : (-1))));
  await system.printLine(global.source);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{37, 31, 27, 23, 19, 17, 13, 11, 7, 5, 3, 2}{2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37}",
    );
  });

  test("Pass_sortByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  print source.sortBy(lambda x as Int, y as Int => if x is y then 0 else if x < y then 1 else -1)
  print source
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await system.printLine((await source.sortBy(async (x, y) => x === y ? 0 : x < y ? 1 : (-1))));
  await system.printLine(source);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "[37, 31, 27, 23, 19, 17, 13, 11, 7, 5, 3, 2][2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]",
    );
  });

  test("Pass_asSet", async () => {
    const code = `${testHeader}

constant source set to {"apple", "orange", "pair", "apple"}
main
  print source.asSet()
  print source.asList().asSet()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["apple", "orange", "pair", "apple"]);

};
async function main() {
  await system.printLine(global.source.asSet());
  await system.printLine(global.source.asList().asSet());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{apple, orange, pair}{apple, orange, pair}");
  });

  test("Pass_complexHof", async () => {
    const code = `${testHeader}

constant numberChars set to "-.0123456789"
main
  print getTrailingNumber("aa1")
end main

function getTrailingNumber(s as String) returns String
  return if s is "" then "" else s[last(sequence(0, s.length() -1).filter(lambda n as Int => not isnumberchar(s[n]))) + 1..s.length()]
end function

function isnumberchar(s as String) returns Boolean
  return numberChars.contains(s)
end function

function last(l as List<of Int>) returns Int
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
  return s === "" ? "" : system.safeSlice(s, (await global.last((await _stdlib.sequence(0, _stdlib.length(s) - 1).filter(async (n) => !(await global.isnumberchar(system.safeIndex(s, n))))))) + 1, _stdlib.length(s));
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_MaxOnNonNumeric", async () => {
    const code = `${testHeader}

main
  let source be ["apple", "orange", "pair"]
  print maxInt(source)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfInt (List<of Int>), Provided: List<of String>. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MaxLambdaReturningNonNumeric", async () => {
    const code = `${testHeader}

constant source set to {"apple", "orange", "pair"}
main
  print source.maxBy(lambda t as String => t)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: lambdaOrFunctionRef (Func<of String => Float>), Provided: Func<of String => String>. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingBrackets", async () => {
    const code = `${testHeader}

constant source set to {"apple":"apple", "orange":"orange", "pair":"pair"}
main
  print source.keys.map(lambda s as String => s)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "To evaluate function 'keys' add brackets. Click for more info.LangRef.html#compile_error",
    ]);
  });
});
