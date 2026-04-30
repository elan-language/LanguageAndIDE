import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
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
  call printNoLine(source.filter(lambda x => x > 20))
  call printNoLine(source.filter(lambda x => x > 20))
  call printNoLine(source.filter(lambda x => (x < 3) or (x > 35)))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(li.filter(lambda x => x.equals("o")))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  source = "onetwo";

};
async function main() {
  let li = _stdlib.split(global.source, "");
  await _stdlib.printNoLine((await li.filter(async (x) => _stdlib.equals(x, "o"))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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

main
  call printNoLine(filterIt(source()))
end main

function filterIt(tofilter as List<of Int>) returns List<of Int>
    return tofilter.filter(lambda x => x > 20)
end function

function source() returns List<of Int>
  return [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.filterIt((await global.source()))));
}

async function filterIt(tofilter) {
  return (await tofilter.filter(async (x) => x > 20));
}
global["filterIt"] = filterIt;

async function source() {
  return system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
}
global["source"] = source;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[23, 27, 31, 37]");
  });

  test("Pass_mapList", async () => {
    const code = `${testHeader}


main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.map(lambda x => x + 1))
  call printNoLine(source.map(lambda x => x.toString() + "*"))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.map(async (x) => x + 1)));
  await _stdlib.printNoLine((await source.map(async (x) => (await _stdlib.toString(x)) + "*")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(li.map(lambda x => x + "*"))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  set source to source.map(lambda x => x + 1)
  call printNoLine(source)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  source = (await source.map(async (x) => x + 1));
  await _stdlib.printNoLine(source);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(source.reduce(0, lambda s, x => s + x))
  call printNoLine(source.reduce(100, lambda s, x => s + x))
  call printNoLine(source.reduce("Concat:", lambda s, x => s + x.toString()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine((await source.reduce(0, async (s, x) => s + x)));
  await _stdlib.printNoLine((await source.reduce(100, async (s, x) => s + x)));
  await _stdlib.printNoLine((await source.reduce("Concat:", async (s, x) => s + (await _stdlib.toString(x)))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(li.reduce("Concat:", lambda s, x => s + "*" + x))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Concat:*o*n*e*t*w*o");
  });

  test("Pass_reduceToDictionary", async () => {
    const code = `${testHeader}

main
  variable ed set to ["one":1, "two":2]
  set ed to source().reduce(ed, lambda d<of String, Int>, x as String => d.withSet(x, 1))
  call printNoLine(ed)
end main

function source() returns List<of String>
  return ["three", "four"]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let ed = system.dictionary([["one", 1], ["two", 2]]);
  ed = (await (await global.source()).reduce(ed, async (d, x) => d.withSet(x, 1)));
  await _stdlib.printNoLine(ed);
}

async function source() {
  return system.list(["three", "four"]);
}
global["source"] = source;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[one:1, two:2, three:1, four:1]");
  });
  test("Pass_maxByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.maxBy(lambda x => x mod 5))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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

main
  variable source set to [[1], [2, 2]]
  call printNoLine(source.maxBy(lambda x<of Int> => x.length()))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([system.list([1]), system.list([2, 2])]);
  await _stdlib.printNoLine((await source.maxBy(async (x) => x.length())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[2, 2]");
  });

  test("Pass_maxBy2", async () => {
    const code = `${testHeader}

main
  call printNoLine(source().maxBy(lambda t => t.length()))
end main

function source() returns List<of String>
  return ["apple", "orange", "pear"]
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((await (await global.source()).maxBy(async (t) => _stdlib.length(t))));
}

async function source() {
  return system.list(["apple", "orange", "pear"]);
}
global["source"] = source;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_min", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(min(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.min(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(min(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.min(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_max", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(max(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.max(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(max(source))
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list([2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]);
  await _stdlib.printNoLine(_stdlib.max(source));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "37");
  });

  test("Pass_minByList", async () => {
    const code = `${testHeader}

main
  variable source set to [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 31, 37]
  call printNoLine(source.minBy(lambda x => x mod 5))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
  call printNoLine(source.orderBy(lambda x, y => x < y))
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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

main
  variable source set to ["apple", "orange", "pair", "apple"]
  call printNoLine(source.asSet())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list(["apple", "orange", "pair", "apple"]);
  await _stdlib.printNoLine(source.asSet());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[apple, orange, pair]");
  });

  // Ignored only because it often times out
  ignore_test("Pass_complexHof", async () => {
    const code = `${testHeader}

constant numberChars set to "-.0123456789"
main
  call printNoLine(getTrailingNumber("aa1"))
end main

function getTrailingNumber(s as String) returns String
  return if(s.equals(""), "", s[last(range(0, s.length()).filter(lambda n => not isnumberchar(s[n]))) + 1..s.length()])
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
  return (_stdlib.equals(s, "") ? "" : system.safeSlice(s, (await global.last((await _stdlib.range(0, _stdlib.length(s)).filter(async (n) => !(await global.isnumberchar(system.safeIndex(s, n))))))) + 1, _stdlib.length(s)));
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_MaxOnNonNumeric", async () => {
    const code = `${testHeader}

main
  variable source set to ["apple", "orange", "pair"]
  call printNoLine(max(source))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let source = system.list(["apple", "orange", "pair"]);
  await _stdlib.printNoLine(_stdlib.max(source));
}
return [main, _tests];}`;

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "NaN");
  });

  test("Fail_MaxLambdaReturningNonNumeric", async () => {
    const code = `${testHeader}

main
  call printNoLine(source().maxBy(lambda t => t))
end main

function source() returns List<of String>
  return ["apple", "orange", "pair"]
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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

main
  variable source set to ["apple":"apple", "orange":"orange", "pair":"pair"]
  call printNoLine(source.keys.map(lambda s => s))
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Library or class function 'keys' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });
});
