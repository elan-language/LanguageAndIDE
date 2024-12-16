import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { TestStatus } from "../../src/frames/status-enums";
import { AssertOutcome } from "../../src/system";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib", () => {
  test("Pass_contains", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  lst = system.list([1, 2]);

};
async function main() {
  var arr = system.literalArray(["three", "four"]);
  system.printLine(_stdlib.asString(_stdlib.contains(global.lst, 1)));
  system.printLine(_stdlib.asString(_stdlib.contains(global.lst, 3)));
  system.printLine(_stdlib.asString(_stdlib.contains(arr, "four")));
  system.printLine(_stdlib.asString(_stdlib.contains(arr, "five")));
  system.printLine(_stdlib.asString(_stdlib.contains("onetwo", "two")));
  system.printLine(_stdlib.asString(_stdlib.contains("onetwo", "three")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruefalse");
  });

  test("Pass_pause", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 1
  call pause(100)
  print 2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(1));
  await _stdlib.pause(100);
  system.printLine(_stdlib.asString(2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_clock", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to clock()
  call pause(100)
  variable b set to clock()
  print b > a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.clock();
  await _stdlib.pause(100);
  var b = _stdlib.clock();
  system.printLine(_stdlib.asString(b > a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_random", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to random()
  variable b set to random()
  print a < 1
  print a isnt b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.random();
  var b = _stdlib.random();
  system.printLine(_stdlib.asString(a < 1));
  system.printLine(_stdlib.asString(a !== b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });

  test("Pass_parseAsFloat1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to  parseAsFloat("10.1")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("10.1");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true,10.1");
  });

  test("Pass_parseAsFloat2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to parseAsFloat("x12")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("x12");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false,0");
  });

  test("Pass_parseAsInt1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to parseAsInt("10.1")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("10.1");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true,10");
  });

  test("Pass_parseAsInt2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to parseAsInt("")
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("");
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false,0");
  });
  test("Pass print (procedure)", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printNoLine("Hello")
  print "!"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  _stdlib.printNoLine("Hello");
  system.printLine(_stdlib.asString("!"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello!"); //Unfortunately, the test methods don't print newlines either way!
  });

  test("Pass printTab", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  call printTab(0,"Hello")
  call printTab(10,"World")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  _stdlib.printTab(0, "Hello");
  _stdlib.printTab(10, "World");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello     World");
  });

  test("Pass_maths_tests", async () => {
    const code = `# FFFF Elan v1.0.0 valid

test 
  assert pi is 3.141592653589793
  assert abs(-3.7) is 3.7
  assert round(acos(0.5), 3) is 1.047
  assert round(asin(0.5), 3) is 0.524
  assert round(atan(1), 2) is 0.79
  assert round(cos(pi/4), 3) is 0.707
  assert round(exp(2), 3) is 7.389
  assert round(logE(7.398), 2) is 2
  assert log10(1000) is 3
  assert log2(65536) is 16
  assert round(sin(pi/6), 2) is 0.5
  assert round(sqrt(2), 3) is 1.414
  assert round(tan(pi/4), 2) is 1
  assert round(sinDeg(30), 2) is 0.5
  assert round(asinDeg(0.5), 2) is 30
  assert round(cosDeg(60), 2) is 0.5
  assert round(acosDeg(0.5), 2) is 60
  assert round(tanDeg(45), 2) is 1
  assert round(atanDeg(1), 2) is 45
  assert round(degToRad(90), 2) is 1.57
  assert round(radToDeg(1), 0) is 57
end test`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
_tests.push(["test1", async (_outcomes) => {
  _outcomes.push(system.assert(_stdlib.pi, 3.141592653589793, "assert4", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.abs(-3.7), 3.7, "assert7", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.acos(0.5), 3), 1.047, "assert10", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.asin(0.5), 3), 0.524, "assert13", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.atan(1), 2), 0.79, "assert16", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.cos(_stdlib.pi / 4), 3), 0.707, "assert19", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.exp(2), 3), 7.389, "assert22", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.logE(7.398), 2), 2, "assert25", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.log10(1000), 3, "assert28", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.log2(65536), 16, "assert31", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sin(_stdlib.pi / 6), 2), 0.5, "assert34", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sqrt(2), 3), 1.414, "assert37", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.tan(_stdlib.pi / 4), 2), 1, "assert40", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sinDeg(30), 2), 0.5, "assert43", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.asinDeg(0.5), 2), 30, "assert46", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.cosDeg(60), 2), 0.5, "assert49", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.acosDeg(0.5), 2), 60, "assert52", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.tanDeg(45), 2), 1, "assert55", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.atanDeg(1), 2), 45, "assert58", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.degToRad(90), 2), 1.57, "assert61", _stdlib, false));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.radToDeg(1), 0), 57, "assert64", _stdlib, false));
}]);

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
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
  test("random", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  for i from 1 to 10000 step 1
    variable r set to randomInt(3, 5)
    call results.putAt(r, results[r] + 1)
  end for
  for i from 0 to 6 step 1
    variable r set to round(results[i]/10000, 1)
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  for (var i = 1; i <= 10000; i = i + 1) {
    var r = _stdlib.randomInt(3, 5);
    _stdlib.putAt(results, r, system.safeIndex(results, r) + 1);
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

  test("RandomInitialised", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  variable rnd set to new Random()
  variable val set to 0
  call rnd.initialiseFromClock()
  for i from 1 to 10000 step 1
    set val, rnd to rnd.nextInt(3, 5)
    call results.putAt(val, results[val] + 1)
  end for
  for i from 0 to 6 step 1
    variable r set to round(results[i]/10000, 1)
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  var rnd = system.initialise(new _stdlib.Random());
  var val = 0;
  rnd.initialiseFromClock();
  for (var i = 1; i <= 10000; i = i + 1) {
    [val, rnd] = rnd.nextInt(3, 5);
    _stdlib.putAt(results, val, system.safeIndex(results, val) + 1);
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
  test("RandomInFixedSequence", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  variable rnd set to new Random()
  variable val set to 0
  for i from 1 to 10000 step 1
    set val, rnd to rnd.nextInt(3, 5)
    call results.putAt(val, results[val] + 1)
  end for
  for i from 0 to 6 step 1
    variable r set to results[i]
    print r
    print ", "
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  var rnd = system.initialise(new _stdlib.Random());
  var val = 0;
  for (var i = 1; i <= 10000; i = i + 1) {
    [val, rnd] = rnd.nextInt(3, 5);
    _stdlib.putAt(results, val, system.safeIndex(results, val) + 1);
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
  test("passing Random type", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable results set to [0, 0, 0, 0, 0, 0, 0]
  variable rnd set to new Random()
  variable dice set to 0
  for i from 1 to 10000 step 1
    set dice, rnd to rollDice(rnd)
    call results.putAt(dice, results[dice] + 1)
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var results = system.literalArray([0, 0, 0, 0, 0, 0, 0]);
  var rnd = system.initialise(new _stdlib.Random());
  var dice = 0;
  for (var i = 1; i <= 10000; i = i + 1) {
    [dice, rnd] = rollDice(rnd);
    _stdlib.putAt(results, dice, system.safeIndex(results, dice) + 1);
  }
  for (var i = 0; i <= 6; i = i + 1) {
    var r = system.safeIndex(results, i);
    system.printLine(_stdlib.asString(r));
    system.printLine(_stdlib.asString(", "));
  }
}

function rollDice(rnd) {
  return rnd.nextInt(1, 6);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0, 1688, 1677, 1683, 1585, 1680, 1687, ");
  });

  test("bitwise operations", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 13;
  var b = 30;
  var anb = _stdlib.bitAnd(a, b);
  var aob = _stdlib.bitOr(a, b);
  var axb = _stdlib.bitXor(a, b);
  var nota = _stdlib.bitNot(a);
  var aL = _stdlib.bitShiftL(a, 2);
  var aR = _stdlib.bitShiftR(a, 2);
  system.printLine(_stdlib.asString(_stdlib.asBinary(a) + " " + _stdlib.asBinary(b) + " " + _stdlib.asBinary(anb) + " " + _stdlib.asBinary(aob) + " " + _stdlib.asBinary(axb) + " " + _stdlib.asBinary(nota) + " " + _stdlib.asBinary(aL) + " " + _stdlib.asBinary(aR)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1101 11110 1100 11111 10011 -1110 110100 11");
  });
  test("2D arrays", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable oxoBoard set to create2DArray(3,3,"")
  call oxoBoard.putAt2D(0, 0, "o")
  call oxoBoard.putAt2D(2, 2, "o")
  call oxoBoard.putAt2D(1, 1, "x")
  print oxoBoard
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var oxoBoard = _stdlib.create2DArray(3, 3, "");
  _stdlib.putAt2D(oxoBoard, 0, 0, "o");
  _stdlib.putAt2D(oxoBoard, 2, 2, "o");
  _stdlib.putAt2D(oxoBoard, 1, 1, "x");
  system.printLine(_stdlib.asString(oxoBoard));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[[o, , ], [, x, ], [, , o]]");
  });

  test("Pass_stringForUnicode", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print unicode(65)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(_stdlib.unicode(65)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A");
  });

  test("Pass_asUnicode", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print "Apple".asUnicode()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(_stdlib.asUnicode("Apple")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "65");
  });

  test("Pass_appendList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable b set to [3,4]
  call a.appendList(b)
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.literalArray([3, 4]);
  _stdlib.appendList(a, b);
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3, 4][3, 4]");
  });

  test("Pass_prependList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable b set to [3,4]
  call a.prependList(b)
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = system.literalArray([3, 4]);
  _stdlib.prependList(a, b);
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 1, 2][3, 4]");
  });

  test("Pass_prepend", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [1,2]
  variable b set to 3
  call a.prepend(b)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.literalArray([1, 2]);
  var b = 3;
  _stdlib.prepend(a, b);
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[3, 1, 2]");
  });

  test("Pass_split", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let s be "Now is the time..."
  let words be s.split(" ")
  print words
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const s = "Now is the time...";
  const words = _stdlib.split(s, " ");
  system.printLine(_stdlib.asString(words));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{Now, is, the, time...}");
  });
  test("Pass_joinArrayElements", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let words be ["Now", "is","the","time..."]
  let s be words.joinArrayElements("-")
  print s
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const words = system.literalArray(["Now", "is", "the", "time..."]);
  const s = _stdlib.joinArrayElements(words, "-");
  system.printLine(_stdlib.asString(s));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Now-is-the-time...");
  });
  test("Pass_joinListElements", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let words be {"Now", "is","the","time..."}
  let s be words.joinListElements(".")
  print s
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const words = system.list(["Now", "is", "the", "time..."]);
  const s = _stdlib.joinListElements(words, ".");
  system.printLine(_stdlib.asString(s));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Now.is.the.time...");
  });
  test("Pass_replace", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let s1 be "[a] [b]"
  let s2 be s1.replace("[",unicode(123)).replace("]", unicode(125))
  print s1
  print s2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const s1 = "[a] [b]";
  const s2 = _stdlib.replace(_stdlib.replace(s1, "[", _stdlib.unicode(123)), "]", _stdlib.unicode(125));
  system.printLine(_stdlib.asString(s1));
  system.printLine(_stdlib.asString(s2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[a] [b]{a} {b}");
  });
  test("Pass_testRegExp", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let s1 be "cbababbc"
  let s2 be "cbabdabbc"
  let result1 be s1.testRegExp(/[a-c]*/)
  let result2 be s2.testRegExp(/^[a-c]*$/)
  print result1
  print result2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const s1 = "cbababbc";
  const s2 = "cbabdabbc";
  const result1 = _stdlib.testRegExp(s1, /[a-c]*/);
  const result2 = _stdlib.testRegExp(s2, /^[a-c]*$/);
  system.printLine(_stdlib.asString(result1));
  system.printLine(_stdlib.asString(result2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });
  test("Pass_asRegExp", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let r be "[a-c]*".asRegExp()
  print r
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const r = _stdlib.asRegExp("[a-c]*");
  system.printLine(_stdlib.asString(r));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A RegExp");
  });
});
