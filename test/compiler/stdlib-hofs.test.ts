import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib HOFs", () => {
  test("Pass_filterList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.filter(lambda x as Int => x > 20))
  call printNoLine(source.filter(lambda x as Int => x > 20))
  call printNoLine(source.filter(lambda x as Int => (x < 3) or (x > 35)))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.filter(async (x) => x > 20)));
  await _stdlib.printNoLine((await source.filter(async (x) => x > 20)));
  await _stdlib.printNoLine((await source.filter(async (x) => (x < 3) || (x > 35))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  variable li set to source.split("")
  call printNoLine(li.filter(lambda x as String => x.isSameValueAs("o")))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  let li = _stdlib.split(global.source, "");
  await _stdlib.printNoLine((await li.filter(async (x) => _stdlib.isSameValueAs(x, "o"))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(filterIt(source))
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
  await _stdlib.printNoLine((await global.filterIt(global.source)));
}

async function filterIt(tofilter) {
  return (await tofilter.filter(async (x) => x > 20));
}
global["filterIt"] = filterIt;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{23, 27, 31, 37}");
  });

  test("Pass_mapList", async () => {
    const code = `${testHeader}


main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.map(lambda x as Int => x + 1))
  call printNoLine(source.map(lambda x as Int => x.asString() + "*"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.map(async (x) => x + 1)));
  await _stdlib.printNoLine((await source.map(async (x) => (await _stdlib.asString(x)) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  variable li set to source.split("")
  call printNoLine(li.map(lambda x as String => x + "*"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  let li = _stdlib.split(global.source, "");
  await _stdlib.printNoLine((await li.map(async (x) => x + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(source.asList())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.listImmutable([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  source = (await source.map(async (x) => x + 1));
  await _stdlib.printNoLine(source.asList());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 6, 8, 12, 14, 18, 20, 24, 28, 32, 38]");
  });

  test("Pass_reduceList", async () => {
    const code = `${testHeader}


main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.reduce(0, lambda s as Int, x as Int => s + x))
  call printNoLine(source.reduce(100, lambda s as Int, x as Int => s + x))
  call printNoLine(source.reduce("Concat:", lambda s as String, x as Int => s + x.asString()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.reduce(0, async (s, x) => s + x)));
  await _stdlib.printNoLine((await source.reduce(100, async (s, x) => s + x)));
  await _stdlib.printNoLine((await source.reduce("Concat:", async (s, x) => s + (await _stdlib.asString(x)))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  variable li set to source.split("")
  call printNoLine(li.reduce("Concat:", lambda s as String, x as String => s + "*" + x))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  let li = _stdlib.split(global.source, "");
  await _stdlib.printNoLine((await li.reduce("Concat:", async (s, x) => s + "*" + x)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(ed)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["three", "four"]);

};
async function main() {
  let ed = system.dictionaryImmutable([["one", 1], ["two", 2]]);
  ed = (await global.source.reduce(ed, async (d, x) => d.withPut(x, 1)));
  await _stdlib.printNoLine(ed);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one:1, two:2, three:1, four:1}");
  });
  test("Pass_maxByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.maxBy(lambda x as Int => x mod 5))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.maxBy(async (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(source.maxBy(lambda x as ListImmutable<of Int> => x.length()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable([system.listImmutable([1]), system.listImmutable([2, 2])]);

};
async function main() {
  await _stdlib.printNoLine((await global.source.maxBy(async (x) => x.length())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(source.maxBy(lambda t as String => t.length()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["apple", "orange", "pear"]);

};
async function main() {
  await _stdlib.printNoLine((await global.source.maxBy(async (t) => _stdlib.length(t))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "orange");
  });
  test("Pass_lengthList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.length())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(source.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_minInt", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(minInt(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.minInt(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_minFloat", async () => {
    const code = `${testHeader}

main
  variable source set to [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(minFloat(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.minFloat(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_maxInt", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(maxInt(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.maxInt(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Pass_maxFloat", async () => {
    const code = `${testHeader}

main
  variable source set to [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(maxFloat(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.maxFloat(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Fail_minIntAppliedToFloatList", async () => {
    const code = `${testHeader}

main
  variable source set to [2.0, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(minInt(source))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfInt (List<of Int>), Provided: List<of Float>.LangRef.html#compile_error",
    ]);
  });
  test("Pass_minByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.minBy(lambda x as Int => x mod 5))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.minBy(async (x) => x % 5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });
  test("Pass_orderByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.orderBy(lambda x as Int, y as Int => x < y))
  call printNoLine(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.orderBy(async (x, y) => x < y)));
  await _stdlib.printNoLine(source);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(source.asSet())
  call printNoLine(source.asList().asSet())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = system.listImmutable(["apple", "orange", "pair", "apple"]);

};
async function main() {
  await _stdlib.printNoLine(global.source.asSet());
  await _stdlib.printNoLine(global.source.asList().asSet());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
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
  call printNoLine(getTrailingNumber("aa1"))
end main

function getTrailingNumber(s as String) returns String
  return if s.isSameValueAs("") then "" else s[last(sequence(0, s.length() -1, 1).filter(lambda n as Int => not isnumberchar(s[n]))) + 1..s.length()]
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
  await _stdlib.printNoLine((await global.getTrailingNumber("aa1")));
}

async function getTrailingNumber(s) {
  return (_stdlib.isSameValueAs(s, "") ? "" : system.safeSlice(s, (await global.last((await _stdlib.sequence(0, _stdlib.length(s) - 1, 1).filter(async (n) => !(await global.isnumberchar(system.safeIndex(s, n))))))) + 1, _stdlib.length(s)));
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_MaxOnNonNumeric", async () => {
    const code = `${testHeader}

main
  variable source set to ["apple", "orange", "pair"]
  call printNoLine(maxInt(source))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfInt (List<of Int>), Provided: List<of String>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MaxLambdaReturningNonNumeric", async () => {
    const code = `${testHeader}

constant source set to {"apple", "orange", "pair"}
main
  call printNoLine(source.maxBy(lambda t as String => t))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: lambdaOrFunctionRef (Func<of String => Float>), Provided: Func<of String => String>.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingBrackets", async () => {
    const code = `${testHeader}

constant source set to {"apple":"apple", "orange":"orange", "pair":"pair"}
main
  call printNoLine(source.keys.map(lambda s as String => s))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Library or class function 'keys' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });
});
