import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { TestStatus } from "../../frames/status-enums";
import { AssertOutcome } from "../../system";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T71_StandardLib", () => {
  test("Pass_contains", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

constant lst set to {"one", "two"}
main
  var arr set to ["three", "four"]
  print lst.contains("two")
  print lst.contains("three")
  print arr.contains("four")
  print arr.contains("five")
  print "onetwo".contains("two")
  print "onetwo".contains("three")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const lst = system.immutableList(["one", "two"]);

async function main() {
  var arr = system.literalArray(["three", "four"]);
  system.printLine(_stdlib.asString(_stdlib.contains(lst, "two")));
  system.printLine(_stdlib.asString(_stdlib.contains(lst, "three")));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to clock()
  call pause(100)
  var b set to clock()
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to random()
  var b set to random()
  print a < 1
  print a is not b
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to  parseAsFloat("10.1")
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("10.1");
  system.printLine(_stdlib.asString(_stdlib.first(a)));
  system.printLine(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true10.1");
  });

  test("Pass_parseAsFloat2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to parseAsFloat("x12")
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsFloat("x12");
  system.printLine(_stdlib.asString(_stdlib.first(a)));
  system.printLine(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false0");
  });

  test("Pass_parseAsInt1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to parseAsInt("10.1")
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("10.1");
  system.printLine(_stdlib.asString(_stdlib.first(a)));
  system.printLine(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "true10");
  });

  test("Pass_parseAsInt2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to parseAsInt("")
  print a.first()
  print a.second()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.parseAsInt("");
  system.printLine(_stdlib.asString(_stdlib.first(a)));
  system.printLine(_stdlib.asString(_stdlib.second(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false0");
  });
  test("Pass print (procedure)", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call print("Hello")
  print "World"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  _stdlib.print("Hello");
  system.printLine(_stdlib.asString("World"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "HelloWorld"); //Unfortunately, the test methods don't print newlines either way!
  });

  test("Pass printTab", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
  _outcomes.push(system.assert(_stdlib.pi, 3.141592653589793, "assert4", _stdlib));
  _outcomes.push(system.assert(_stdlib.abs(-3.7), 3.7, "assert7", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.acos(0.5), 3), 1.047, "assert10", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.asin(0.5), 3), 0.524, "assert13", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.atan(1), 2), 0.79, "assert16", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.cos(_stdlib.pi / 4), 3), 0.707, "assert19", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.exp(2), 3), 7.389, "assert22", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.logE(7.398), 2), 2, "assert25", _stdlib));
  _outcomes.push(system.assert(_stdlib.log10(1000), 3, "assert28", _stdlib));
  _outcomes.push(system.assert(_stdlib.log2(65536), 16, "assert31", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sin(_stdlib.pi / 6), 2), 0.5, "assert34", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sqrt(2), 3), 1.414, "assert37", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.tan(_stdlib.pi / 4), 2), 1, "assert40", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.sinDeg(30), 2), 0.5, "assert43", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.asinDeg(0.5), 2), 30, "assert46", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.cosDeg(60), 2), 0.5, "assert49", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.acosDeg(0.5), 2), 60, "assert52", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.tanDeg(45), 2), 1, "assert55", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.atanDeg(1), 2), 45, "assert58", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.degToRad(90), 2), 1.57, "assert61", _stdlib));
  _outcomes.push(system.assert(_stdlib.round(_stdlib.radToDeg(1), 0), 57, "assert64", _stdlib));
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
});
