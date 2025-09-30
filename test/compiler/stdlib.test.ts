import { AssertOutcome } from "../../src/compiler/assert-outcome";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { TestStatus } from "../../src/compiler/test-status";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertGraphicsContains,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib", () => {
  test("Pass_contains", async () => {
    const code = `${testHeader}

constant lst set to {1, 2}
main
  variable arr set to ["three", "four"]
  print lst.contains(1)
  print lst.contains(3)
  print arr.contains("four")
  print arr.contains("five")
  print "onetwo".contains("two")
  print "onetwo".contains("three")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  lst = system.listImmutable([1, 2]);

};
async function main() {
  let arr = system.list(["three", "four"]);
  await system.printLine(global.lst.contains(1));
  await system.printLine(global.lst.contains(3));
  await system.printLine(arr.contains("four"));
  await system.printLine(arr.contains("five"));
  await system.printLine(_stdlib.contains("onetwo", "two"));
  await system.printLine(_stdlib.contains("onetwo", "three"));
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruefalse");
  });

  test("Pass_pause", async () => {
    const code = `${testHeader}

main
  print 1
  call pause(100)
  print 2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(1);
  await _stdlib.pause(100);
  await system.printLine(2);
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

  test("Pass_clock", async () => {
    const code = `${testHeader}

main
  variable a set to clock()
  call pause(100)
  variable b set to clock()
  print b > a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.clock();
  await _stdlib.pause(100);
  let b = _stdlib.clock();
  await system.printLine(b > a);
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_random1", async () => {
    const code = `${testHeader}

main
  variable a set to random()
  variable b set to random()
  print a < 1
  print a isnt b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.random();
  let b = _stdlib.random();
  await system.printLine(a < 1);
  await system.printLine(a !== b);
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
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });

  test("Pass_parseAsFloat1", async () => {
    const code = `${testHeader}

main
  variable a set to  parseAsFloat("10.1")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsFloat("10.1");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(true, 10.1)");
  });

  test("Pass_parseAsFloat2", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsFloat("x12")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsFloat("x12");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(false, 0)");
  });

  test("Pass_parseAsFloat3", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsFloat("25g")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsFloat("25g");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(false, 0)");
  });

  test("Pass_parseAsFloat4", async () => {
    const code = `${testHeader}

main
  variable a set to  parseAsFloat("10")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsFloat("10");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(true, 10)");
  });

  test("Pass_parseAsFloatExponent", async () => {
    const code = `${testHeader}

main
  let a be  parseAsFloat("10.1e2")
  let b be  parseAsFloat("10.1e+2")
  let c be  parseAsFloat("10.1e-2")
  let d be  parseAsFloat("0.12E2")
  print [a, b, c, d]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = _stdlib.parseAsFloat("10.1e2");
  const b = _stdlib.parseAsFloat("10.1e+2");
  const c = _stdlib.parseAsFloat("10.1e-2");
  const d = _stdlib.parseAsFloat("0.12E2");
  await system.printLine(system.list([a, b, c, d]));
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
      "[tuple(true, 1010), tuple(true, 1010), tuple(true, 0.101), tuple(true, 12)]",
    );
  });

  test("Pass_parseAsInt0", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsInt("25g")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsInt("25g");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(false, 0)");
  });

  test("Pass_parseAsInt1", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsInt("10")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsInt("10");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(true, 10)");
  });

  test("Pass_parseAsInt2", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsInt("")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsInt("");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(false, 0)");
  });

  test("Pass_parseAsInt3", async () => {
    const code = `${testHeader}

main
  variable a set to parseAsInt("10.1")
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.parseAsInt("10.1");
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "tuple(false, 0)");
  });
  test("Pass print (procedure)", async () => {
    const code = `${testHeader}

main
  call printNoLine("Hello")
  print "!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("Hello");
  await system.printLine("!");
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
    await assertObjectCodeExecutes(fileImpl, "Hello!"); //Unfortunately, the test methods don't print newlines either way!
  });

  test("Pass printTab", async () => {
    const code = `${testHeader}

main
  call printTab(0,"Hello")
  call printTab(10,"World")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printTab(0, "Hello");
  await _stdlib.printTab(10, "World");
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
    await assertObjectCodeExecutes(fileImpl, "Hello     World");
  });

  test("Pass lib constants", async () => {
    const code = `${testHeader}

main
  print openBrace
  print closeBrace
  print quotes
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.openBrace);
  await system.printLine(_stdlib.closeBrace);
  await system.printLine(_stdlib.quotes);
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
    await assertObjectCodeExecutes(fileImpl, `{}"`);
  });

  test("Pass_maths_tests", async () => {
    const code = `${testHeader}

test 
  assert pi is 3.141592653589793
  assert abs(-3.7) is 3.7
  assert acos(0.5).round(3) is 1.047
  assert asin(0.5).round(3) is 0.524
  assert atan(1).round(2) is 0.79
  assert cos(pi/4).round(3) is 0.707
  assert exp(2).round(3) is 7.389
  assert logE(7.398).round(2) is 2
  assert log10(1000) is 3
  assert log2(65536) is 16
  assert sin(pi/6).round(2) is 0.5
  assert sqrt(2).round(3) is 1.414
  assert tan(pi/4).round(2) is 1
  assert sinDeg(30).round(2) is 0.5
  assert asinDeg(0.5).round(2) is 30
  assert cosDeg(60).round(2) is 0.5
  assert acosDeg(0.5).round(2) is 60
  assert tanDeg(45).round(2) is 1
  assert atanDeg(1).round(2) is 45
  assert degToRad(90).round(2) is 1.57
  assert radToDeg(1).round(0) is 57
end test`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
_tests.push(["test1", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => _stdlib.pi, "Float"], [3.141592653589793, "Float"], "assert4", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.abs((-3.7)), "Float"], [3.7, "Float"], "assert7", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.acos(0.5), 3), "Float"], [1.047, "Float"], "assert10", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.asin(0.5), 3), "Float"], [0.524, "Float"], "assert13", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.atan(1), 2), "Float"], [0.79, "Float"], "assert16", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.cos(_stdlib.pi / 4), 3), "Float"], [0.707, "Float"], "assert19", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.exp(2), 3), "Float"], [7.389, "Float"], "assert22", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.logE(7.398), 2), "Float"], [2, "Int"], "assert25", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.log10(1000), "Float"], [3, "Int"], "assert28", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.log2(65536), "Float"], [16, "Int"], "assert31", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.sin(_stdlib.pi / 6), 2), "Float"], [0.5, "Float"], "assert34", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.sqrt(2), 3), "Float"], [1.414, "Float"], "assert37", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.tan(_stdlib.pi / 4), 2), "Float"], [1, "Int"], "assert40", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.sinDeg(30), 2), "Float"], [0.5, "Float"], "assert43", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.asinDeg(0.5), 2), "Float"], [30, "Int"], "assert46", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.cosDeg(60), 2), "Float"], [0.5, "Float"], "assert49", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.acosDeg(0.5), 2), "Float"], [60, "Int"], "assert52", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.tanDeg(45), 2), "Float"], [1, "Int"], "assert55", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.atanDeg(1), 2), "Float"], [45, "Int"], "assert58", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.degToRad(90), 2), "Float"], [1.57, "Float"], "assert61", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.radToDeg(1), 0), "Float"], [57, "Int"], "assert64", _stdlib, false));
}]);

async function main() {

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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "test1",
        [
          new AssertOutcome(TestStatus.pass, "3.141592653589793", "3.141592653589793", "assert4"),
          new AssertOutcome(TestStatus.pass, "3.7", "3.7", "assert7"),
          new AssertOutcome(TestStatus.pass, "1.047", "1.047", "assert10"),
          new AssertOutcome(TestStatus.pass, "0.524", "0.524", "assert13"),
          new AssertOutcome(TestStatus.pass, "0.79", "0.79", "assert16"),
          new AssertOutcome(TestStatus.pass, "0.707", "0.707", "assert19"),
          new AssertOutcome(TestStatus.pass, "7.389", "7.389", "assert22"),
          new AssertOutcome(TestStatus.pass, "2", "2", "assert25"),
          new AssertOutcome(TestStatus.pass, "3", "3", "assert28"),
          new AssertOutcome(TestStatus.pass, "16", "16", "assert31"),
          new AssertOutcome(TestStatus.pass, "0.5", "0.5", "assert34"),
          new AssertOutcome(TestStatus.pass, "1.414", "1.414", "assert37"),
          new AssertOutcome(TestStatus.pass, "1", "1", "assert40"),
          new AssertOutcome(TestStatus.pass, "0.5", "0.5", "assert43"),
          new AssertOutcome(TestStatus.pass, "30", "30", "assert46"),
          new AssertOutcome(TestStatus.pass, "0.5", "0.5", "assert49"),
          new AssertOutcome(TestStatus.pass, "60", "60", "assert52"),
          new AssertOutcome(TestStatus.pass, "1", "1", "assert55"),
          new AssertOutcome(TestStatus.pass, "45", "45", "assert58"),
          new AssertOutcome(TestStatus.pass, "1.57", "1.57", "assert61"),
          new AssertOutcome(TestStatus.pass, "57", "57", "assert64"),
        ],
      ],
    ]);
  });
  test("Pass_Random", async () => {
    const code = `${testHeader}

main
  variable results set to [0, 0]
  for i from 1 to 10000 step 1
    variable r set to randomInt(0, 1)
    call results.put(r, results[r] + 1)
  end for
  print results[0] > 0
  print results[1] > 0
  print results[0] + results[1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0]);
  const _tofor6 = 10000;
  for (let i = 1; i <= _tofor6; i = i + 1) {
    let r = _stdlib.randomInt(0, 1);
    results.put(r, system.safeIndex(results, r) + 1);
  }
  await system.printLine(system.safeIndex(results, 0) > 0);
  await system.printLine(system.safeIndex(results, 1) > 0);
  await system.printLine(system.safeIndex(results, 0) + system.safeIndex(results, 1));
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
    await assertObjectCodeExecutes(fileImpl, "truetrue10000");
  });

  test("RandomInitialised", async () => {
    const code = `${testHeader}

main
  variable results set to [0, 0]
  variable rnd set to new Random()
  variable val set to 0
  call rnd.initialiseFromClock()
  for i from 1 to 10000 step 1
    set val, rnd to rnd.nextInt(0, 1)
    call results.put(val, results[val] + 1)
  end for
  print results[0] > 0
  print results[1] > 0
  print results[0] + results[1]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let val = 0;
  rnd.initialiseFromClock();
  const _tofor15 = 10000;
  for (let i = 1; i <= _tofor15; i = i + 1) {
    [val, rnd] = rnd.nextInt(0, 1);
    results.put(val, system.safeIndex(results, val) + 1);
  }
  await system.printLine(system.safeIndex(results, 0) > 0);
  await system.printLine(system.safeIndex(results, 1) > 0);
  await system.printLine(system.safeIndex(results, 0) + system.safeIndex(results, 1));
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
    await assertObjectCodeExecutes(fileImpl, "truetrue10000");
  });
  test("RandomInFixedSequence", async () => {
    const code = `${testHeader}

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  variable rnd set to new Random()
  variable val set to 0
  for i from 1 to 10000 step 1
    set val, rnd to rnd.nextInt(3, 5)
    call results.put(val, results[val] + 1)
  end for
  for i from 0 to 6 step 1
    variable r set to results[i]
    print r
    print ", "
  end for
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0, 0, 0, 0, 0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let val = 0;
  const _tofor12 = 10000;
  for (let i = 1; i <= _tofor12; i = i + 1) {
    [val, rnd] = rnd.nextInt(3, 5);
    results.put(val, system.safeIndex(results, val) + 1);
  }
  const _tofor24 = 6;
  for (let i = 0; i <= _tofor24; i = i + 1) {
    let r = system.safeIndex(results, i);
    await system.printLine(r);
    await system.printLine(", ");
  }
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
    await assertObjectCodeExecutes(fileImpl, "0, 0, 0, 3365, 3268, 3367, 0, ");
  });
  test("Pass_RandomType", async () => {
    const code = `${testHeader}

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  variable rnd set to new Random()
  variable dice set to 0
  for i from 1 to 10000 step 1
    set dice, rnd to rollDice(rnd)
    call results.put(dice, results[dice] + 1)
  end for
  for i from 0 to 6 step 1
    variable r set to results[i]
    print r
    print ", "
  end for
end main

function rollDice(rnd as Random) returns (Int, Random)
  return rnd.nextInt(1, 6)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0, 0, 0, 0, 0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let dice = 0;
  const _tofor12 = 10000;
  for (let i = 1; i <= _tofor12; i = i + 1) {
    [dice, rnd] = (await global.rollDice(rnd));
    results.put(dice, system.safeIndex(results, dice) + 1);
  }
  const _tofor24 = 6;
  for (let i = 0; i <= _tofor24; i = i + 1) {
    let r = system.safeIndex(results, i);
    await system.printLine(r);
    await system.printLine(", ");
  }
}

async function rollDice(rnd) {
  return rnd.nextInt(1, 6);
}
global["rollDice"] = rollDice;
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
    await assertObjectCodeExecutes(fileImpl, "0, 1688, 1677, 1683, 1585, 1680, 1687, ");
  });

  test("bitwise operations", async () => {
    const code = `${testHeader}

main
  variable a set to 13
  variable b set to 30
  variable anb set to bitAnd(a, b)
  variable aob set to bitOr(a, b)
  variable axb set to bitXor(a, b)
  variable nota set to bitNot(a)
  variable aL set to bitShiftL(a, 2)
  variable aR set to bitShiftR(a, 2)
  print a.asBinary() + " " + b.asBinary() + " " + anb.asBinary() + " " + aob.asBinary() + " " + axb.asBinary() + " " + nota.asBinary() + " " + aL.asBinary() + " " + aR.asBinary()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 13;
  let b = 30;
  let anb = _stdlib.bitAnd(a, b);
  let aob = _stdlib.bitOr(a, b);
  let axb = _stdlib.bitXor(a, b);
  let nota = _stdlib.bitNot(a);
  let aL = _stdlib.bitShiftL(a, 2);
  let aR = _stdlib.bitShiftR(a, 2);
  await system.printLine(_stdlib.asBinary(a) + " " + _stdlib.asBinary(b) + " " + _stdlib.asBinary(anb) + " " + _stdlib.asBinary(aob) + " " + _stdlib.asBinary(axb) + " " + _stdlib.asBinary(nota) + " " + _stdlib.asBinary(aL) + " " + _stdlib.asBinary(aR));
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
    await assertObjectCodeExecutes(fileImpl, "1101 11110 1100 11111 10011 -1110 110100 11");
  });
  test("Pass_2DArrays", async () => {
    const code = `${testHeader}

main
  variable oxoBoard set to new Array2D<of String>(3,3,"")
  call oxoBoard.put(0, 0, "o")
  call oxoBoard.put(2, 2, "o")
  call oxoBoard.put(1, 1, "x")
  print oxoBoard
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let oxoBoard = system.initialise(await new _stdlib.Array2D()._initialise(3, 3, ""));
  oxoBoard.put(0, 0, "o");
  oxoBoard.put(2, 2, "o");
  oxoBoard.put(1, 1, "x");
  await system.printLine(oxoBoard);
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
    await assertObjectCodeExecutes(fileImpl, "[[o, , ], [, x, ], [, , o]]");
  });

  test("Pass_2DArray_withPut", async () => {
    const code = `${testHeader}

main
  variable oxoBoard set to new Array2D<of String>(3,3,"")
  let ob2 be oxoBoard.withPut(0, 0, "o")
  let ob3 be ob2.withPut(2, 1, "x")
  let ob4 be ob3.withPut(1, 2, "o")
  print oxoBoard
  print ob2
  print ob3
  print ob4
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let oxoBoard = system.initialise(await new _stdlib.Array2D()._initialise(3, 3, ""));
  const ob2 = oxoBoard.withPut(0, 0, "o");
  const ob3 = ob2.withPut(2, 1, "x");
  const ob4 = ob3.withPut(1, 2, "o");
  await system.printLine(oxoBoard);
  await system.printLine(ob2);
  await system.printLine(ob3);
  await system.printLine(ob4);
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
      "[[, , ], [, , ], [, , ]][[o, , ], [, , ], [, , ]][[o, , ], [, , ], [, x, ]][[o, , ], [, , o], [, x, ]]",
    );
  });

  test("Pass_stringForUnicode", async () => {
    const code = `${testHeader}

main
  print unicode(65)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.unicode(65));
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
    await assertObjectCodeExecutes(fileImpl, "A");
  });

  test("Pass_asUnicode", async () => {
    const code = `${testHeader}

main
  print "Apple".asUnicode()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.asUnicode("Apple"));
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
    await assertObjectCodeExecutes(fileImpl, "65");
  });

  test("Pass_appendList", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable b set to [3,4]
  call a.appendList(b)
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  a.appendList(b);
  await system.printLine(a);
  await system.printLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3, 4][3, 4]");
  });

  test("Pass_appendListOfSubclass", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Foo>()
  variable b set to new List<of Bar>()
  call a.appendList(b)
  print a
  print b
end main

abstract class Foo
end class

class Bar inherits Foo
end class
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.appendList(b);
  await system.printLine(a);
  await system.printLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  async _initialise() { return this; }

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
    await assertObjectCodeExecutes(fileImpl, "[][]");
  });

  test("Pass_prependList", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable b set to [3,4]
  call a.prependList(b)
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  a.prependList(b);
  await system.printLine(a);
  await system.printLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 1, 2][3, 4]");
  });

  test("Pass_prepend", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable b set to 3
  call a.prepend(b)
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = 3;
  a.prepend(b);
  await system.printLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "[3, 1, 2]");
  });

  test("Pass_split", async () => {
    const code = `${testHeader}

main
  let s be "Now is the time..."
  let words be s.split(" ")
  print words
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const s = "Now is the time...";
  const words = _stdlib.split(s, " ");
  await system.printLine(words);
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
    await assertObjectCodeExecutes(fileImpl, "[Now, is, the, time...]");
  });
  test("Pass_joinListOfString", async () => {
    const code = `${testHeader}

main
  let words be ["Now", "is","the","time..."]
  let s be words.join(".")
  print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const words = system.list(["Now", "is", "the", "time..."]);
  const s = (await words.join("."));
  await system.printLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "Now.is.the.time...");
  });
  test("Pass_joinImmutableListOfString", async () => {
    const code = `${testHeader}

main
  let words be {"Now", "is","the","time..."}
  let s be words.join(".")
  print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const words = system.listImmutable(["Now", "is", "the", "time..."]);
  const s = (await words.join("."));
  await system.printLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "Now.is.the.time...");
  });

  test("Pass_joinImmutableListOfInt", async () => {
    const code = `${testHeader}

main
  let words be {1,2,3,4}
  let s be words.join("")
  print s
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const words = system.listImmutable([1, 2, 3, 4]);
  const s = (await words.join(""));
  await system.printLine(s);
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
    await assertObjectCodeExecutes(fileImpl, "1234");
  });

  test("Pass_joinImmutableListOfRecord", async () => {
    const code = `${testHeader}

main
  let words be {new Point(), new Point()}
  let s be words.join(",")
  print s
end main

record Point
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const words = system.listImmutable([system.initialise(await new Point()._initialise()), system.initialise(await new Point()._initialise())]);
  const s = (await words.join(","));
  await system.printLine(s);
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, []);};
  async _initialise() { return this; }

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
    await assertObjectCodeExecutes(fileImpl, "a Point,a Point");
  });

  test("Pass_joinListOfRecord", async () => {
    const code = `${testHeader}

main
  let words be [new Point(), new Point()]
  let s be words.join(",")
  print s
end main

record Point
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const words = system.list([system.initialise(await new Point()._initialise()), system.initialise(await new Point()._initialise())]);
  const s = (await words.join(","));
  await system.printLine(s);
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, []);};
  async _initialise() { return this; }

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
    await assertObjectCodeExecutes(fileImpl, "a Point,a Point");
  });

  test("Fail_joinArrayOfString", async () => {
    const code = `${testHeader}

main
  let words be ["Now", "is","the","time..."].asArray()
  let s be words.join(".")
  print s
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
      "'join' is not defined for type 'Array'.LangRef.html#compile_error",
    ]);
  });

  test("Pass_replace", async () => {
    const code = `${testHeader}

main
  let s1 be "[a] [b]"
  let s2 be s1.replace("[",unicode(123)).replace("]", unicode(125))
  print s1
  print s2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const s1 = "[a] [b]";
  const s2 = _stdlib.replace(_stdlib.replace(s1, "[", _stdlib.unicode(123)), "]", _stdlib.unicode(125));
  await system.printLine(s1);
  await system.printLine(s2);
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
    await assertObjectCodeExecutes(fileImpl, "[a] [b]{a} {b}");
  });
  test("Pass_testRegExp", async () => {
    const code = `${testHeader}

main
  let s1 be "cbababbc"
  let s2 be "cbabdabbc"
  let result1 be s1.matchesRegExp(/[a-c]*/)
  let result2 be s2.matchesRegExp(/^[a-c]*$/)
  print result1
  print result2
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const s1 = "cbababbc";
  const s2 = "cbabdabbc";
  const result1 = _stdlib.matchesRegExp(s1, /[a-c]*/);
  const result2 = _stdlib.matchesRegExp(s2, /^[a-c]*$/);
  await system.printLine(result1);
  await system.printLine(result2);
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
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });
  test("Pass_asRegExp", async () => {
    const code = `${testHeader}

main
  let r be "[a-c]*".asRegExp()
  print r
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const r = _stdlib.asRegExp("[a-c]*");
  await system.printLine(r);
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
    await assertObjectCodeExecutes(fileImpl, "A RegExp");
  });
  test("Pass_indexOf", async () => {
    const code = `${testHeader}

main
  let a be [1, 3, 5, 7, 9]
  let b be {2, 4, 6, 8}
  let c be "Hello World!"
  print a.indexOf(9)
  print a.indexOf(5)
  print b.indexOf(2)
  print b.indexOf(7)
  print c.indexOf("o")
  print c.indexOf("ll")
  print c.indexOf("x")
  variable i set to 1
  set i to a.indexOf(9)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.list([1, 3, 5, 7, 9]);
  const b = system.listImmutable([2, 4, 6, 8]);
  const c = "Hello World!";
  await system.printLine(a.indexOf(9));
  await system.printLine(a.indexOf(5));
  await system.printLine(b.indexOf(2));
  await system.printLine(b.indexOf(7));
  await system.printLine(_stdlib.indexOf(c, "o"));
  await system.printLine(_stdlib.indexOf(c, "ll"));
  await system.printLine(_stdlib.indexOf(c, "x"));
  let i = 1;
  i = a.indexOf(9);
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
    await assertObjectCodeExecutes(fileImpl, "420-142-1");
  });
  test("Pass_asUnicodeReturnsInt#1061", async () => {
    const code = `${testHeader}

main
  variable i set to 1
  set i to "A".asUnicode()
  print i
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let i = 1;
  i = _stdlib.asUnicode("A");
  await system.printLine(i);
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
    await assertObjectCodeExecutes(fileImpl, "65");
  });
  test("Pass_isNaN", async () => {
    const code = `${testHeader}

main
  print sqrt(-1).isNaN()
  print sqrt(2).isNaN()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.isNaN(_stdlib.sqrt((-1))));
  await system.printLine(_stdlib.isNaN(_stdlib.sqrt(2)));
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
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });
  test("Pass_isInfinite", async () => {
    const code = `${testHeader}

main
  print (1/0).isInfinite()
  print (-1/0).isInfinite()
  print (1/1).isInfinite()
  print sqrt(-1).isInfinite()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.isInfinite((1 / 0)));
  await system.printLine(_stdlib.isInfinite(((-1) / 0)));
  await system.printLine(_stdlib.isInfinite((1 / 1)));
  await system.printLine(_stdlib.isInfinite(_stdlib.sqrt((-1))));
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalsefalse");
  });

  test("Pass_Constraint", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of CircleVG>()
  variable b set to new List<of VectorGraphic>()
  call displayVectorGraphics(a)
  call displayVectorGraphics(b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  await _stdlib.displayVectorGraphics(a);
  await _stdlib.displayVectorGraphics(b);
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_Constraint", async () => {
    const code = `${testHeader}

main
  variable a set to new List<of Foo>()
  call displayVectorGraphics(a)
end main

class Foo
end class`;

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
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfVGs (List<of VectorGraphic>), Provided: List<of Foo>.LangRef.html#compile_error",
    ]);
  });

  test("Pass_split", async () => {
    const code = `${testHeader}

main
  print parseAsInt("12 34 56".split(" ")[1])
  print "z" + "a b c".split(" ")[1]
  print "a b c".split(" ")[1] + "z"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.parseAsInt(system.safeIndex(_stdlib.split("12 34 56", " "), 1)));
  await system.printLine("z" + system.safeIndex(_stdlib.split("a b c", " "), 1));
  await system.printLine(system.safeIndex(_stdlib.split("a b c", " "), 1) + "z");
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
    await assertObjectCodeExecutes(fileImpl, "tuple(true, 34)zbbz");
  });

  test("Pass_drawHtml", async () => {
    const code = `${testHeader}

main
  call displayHtml("<p>fred</p>")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.displayHtml("<p>fred</p>");
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
    await assertGraphicsContains(fileImpl, 0, "<p>fred</p>");
  });

  test("Pass_clearHtml", async () => {
    const code = `${testHeader}

main
  call displayHtml("<p>fred</p>")
  call clearHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.displayHtml("<p>fred</p>");
  await _stdlib.clearHtml();
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
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_tone", async () => {
    const code = `${testHeader}

main
  call tone(10, 10, 10)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.tone(10, 10, 10);
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
  });

  test("Pass_sequence", async () => {
    const code = `${testHeader}

main
  print sequence(1, 5)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequence(1, 5));
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3, 4, 5]");
  });
  test("Pass_sequence_EmptyIfEnd<Start", async () => {
    const code = `${testHeader}

main
  print sequence(5, 1)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequence(5, 1));
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });
  test("Pass_sequenceWithStep", async () => {
    const code = `${testHeader}

main
  print sequenceWithStep(1, 6, 2)
  print sequenceWithStep(5, -4, -2)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequenceWithStep(1, 6, 2));
  await system.printLine(_stdlib.sequenceWithStep(5, (-4), (-2)));
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
    await assertObjectCodeExecutes(fileImpl, "[1, 3, 5][5, 3, 1, -1, -3]");
  });
  test("Pass_sequenceWithStepError1", async () => {
    const code = `${testHeader}

main
  print sequenceWithStep(1, 6, 0)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequenceWithStep(1, 6, 0));
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
    await assertObjectCodeDoesNotExecute(fileImpl, "value for step cannot be zero");
  });
  test("Pass_sequenceWithStepError2", async () => {
    const code = `${testHeader}

main
  print sequenceWithStep(1, 6, -1)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequenceWithStep(1, 6, (-1)));
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Loop will not terminate when start < end start with negative step",
    );
  });
  test("Pass_sequenceWithStepError3", async () => {
    const code = `${testHeader}

main
  print sequenceWithStep(6, 1, 2)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine(_stdlib.sequenceWithStep(6, 1, 2));
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });
  test("Pass_shadowLibraryType", async () => {
    const code = `${testHeader}

class List
  function asString() returns String
    return "MyList"
  end function

end class

main
  print new List()
  print new library.List<of Int>()
end main
`;

    const objectCode = ``;

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
    await assertObjectCodeExecutes(fileImpl, "MyList[]");
  });
});
