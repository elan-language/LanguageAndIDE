import { AssertOutcome } from "../../src/compiler/assert-outcome";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { TestStatus } from "../../src/compiler/test-status";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertCompiles,
  assertDoesNotCompile,
  assertDoesNotParse,
  assertGraphicsContains,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python StdLib", () => {
  test("Pass_contains", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  source = ["a", "bb", "ccc"] # variable definition
  printNoLine(source.sumBy(lambda x: str: x.length())) # procedure call
# end main

def main() -> None:
  arr = ["three", "four"] # variable definition
  printNoLine(lst().contains(1)) # procedure call
  printNoLine(lst().contains(3)) # procedure call
  printNoLine(arr.contains("four")) # procedure call
  printNoLine(arr.contains("five")) # procedure call
  printNoLine("onetwo".contains("two")) # procedure call
  printNoLine("onetwo".contains("three")) # procedure call
# end main

def lst() -> list[int]: # function
  return [1, 2]
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let arr = system.list(["three", "four"]);
  await _stdlib.printNoLine((await global.lst()).contains(1));
  await _stdlib.printNoLine((await global.lst()).contains(3));
  await _stdlib.printNoLine(arr.contains("four"));
  await _stdlib.printNoLine(arr.contains("five"));
  await _stdlib.printNoLine(_stdlib.contains("onetwo", "two"));
  await _stdlib.printNoLine(_stdlib.contains("onetwo", "three"));
}

async function lst() {
  return system.list([1, 2]);
}
global["lst"] = lst;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalsetruefalse");
  });

  test("Pass_pause", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  arr = ["three", "four"] # variable definition
  printNoLine(lst().contains(1)) # procedure call
  printNoLine(lst().contains(3)) # procedure call
  printNoLine(arr.contains("four")) # procedure call
  printNoLine(arr.contains("five")) # procedure call
  printNoLine("onetwo".contains("two")) # procedure call
  printNoLine("onetwo".contains("three")) # procedure call
# end main

def main() -> None:
  printNoLine(1) # procedure call
  sleep_ms(100) # procedure call
  printNoLine(2) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(1);
  await _stdlib.sleep_ms(100);
  await _stdlib.printNoLine(2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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

  test("Pass_clock", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(1) # procedure call
  sleep_ms(100) # procedure call
  printNoLine(2) # procedure call
# end main

def main() -> None:
  a = clock() # variable definition
  sleep_ms(100) # procedure call
  b = clock() # variable definition
  printNoLine(b > a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.clock();
  await _stdlib.sleep_ms(100);
  let b = _stdlib.clock();
  await _stdlib.printNoLine(b > a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_random1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = clock() # variable definition
  sleep_ms(100) # procedure call
  b = clock() # variable definition
  printNoLine(b > a) # procedure call
# end main

def main() -> None:
  a = random() # variable definition
  b = random() # variable definition
  printNoLine(a < 1) # procedure call
  printNoLine(a != b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.random();
  let b = _stdlib.random();
  await _stdlib.printNoLine(a < 1);
  await _stdlib.printNoLine(a !== b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });

  test("Pass_float1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = random() # variable definition
  b = random() # variable definition
  printNoLine(a < 1) # procedure call
  printNoLine(a != b) # procedure call
# end main

def main() -> None:
  a = asFloat("10.1") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asFloat("10.1");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "10.1");
  });

  test("Pass_float2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asFloat("10.1") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = asFloat("x12") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asFloat("x12");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "'x12' does not parse as a float");
  });

  test("Pass_float3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asFloat("x12") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = asFloat("25g") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asFloat("25g");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "'25g' does not parse as a float");
  });

  test("Pass_float4", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asFloat("25g") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = asFloat("10") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asFloat("10");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_floatExponent", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asFloat("10") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = asFloat("10.1e2") # variable definition
  b = asFloat("10.1e+2") # variable definition
  c = asFloat("10.1e-2") # variable definition
  d = asFloat("0.12E2") # variable definition
  printNoLine([a, b, c, d]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asFloat("10.1e2");
  let b = _stdlib.asFloat("10.1e+2");
  let c = _stdlib.asFloat("10.1e-2");
  let d = _stdlib.asFloat("0.12E2");
  await _stdlib.printNoLine(system.list([a, b, c, d]));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[1010, 1010, 0.101, 12]");
  });

  test("Fail_int0", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asFloat("10.1e2") # variable definition
  b = asFloat("10.1e+2") # variable definition
  c = asFloat("10.1e-2") # variable definition
  d = asFloat("0.12E2") # variable definition
  printNoLine([a, b, c, d]) # procedure call
# end main

def main() -> None:
  a = asInt("25g") # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asInt("25g");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "'25g' does not parse as an integer");
  });

  test("Pass_int1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asInt("25g") # variable definition
# end main

def main() -> None:
  a = asInt("10") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asInt("10");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("fail_int2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asInt("10") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = asInt("") # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asInt("");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "'' does not parse as an integer");
  });

  test("Fail_int3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asInt("") # variable definition
# end main

def main() -> None:
  a = asInt("10.1") # variable definition
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.asInt("10.1");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "'10.1' does not parse as an integer");
  });
  test("Pass print (procedure) String", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = asInt("10.1") # variable definition
# end main

def main() -> None:
  printNoLine("Hello") # procedure call
  printNoLine("!") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine("Hello");
  await _stdlib.printNoLine("!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "Hello!"); //Unfortunately, the test methods don't print newlines either way!
  });

  test("Pass print (procedure) Int", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Hello") # procedure call
  printNoLine("!") # procedure call
# end main

def main() -> None:
  printNoLine(101) # procedure call
  printNoLine("!") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(101);
  await _stdlib.printNoLine("!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "101!"); //Unfortunately, the test methods don't print newlines either way!
  });

  test("Pass printTab", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(101) # procedure call
  printNoLine("!") # procedure call
# end main

def main() -> None:
  printTab(0, "Hello") # procedure call
  printTab(10, "World") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printTab(0, "Hello");
  await _stdlib.printTab(10, "World");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "Hello     World");
  });

  test("Pass printTab Int", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printTab(0, "Hello") # procedure call
  printTab(10, "World") # procedure call
# end main

def main() -> None:
  printTab(0, 12345) # procedure call
  printTab(10, 678910) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printTab(0, 12345);
  await _stdlib.printTab(10, 678910);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "12345     678910");
  });

  test("Pass lib constants", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printTab(0, 12345) # procedure call
  printTab(10, 678910) # procedure call
# end main

def main() -> None:
  printNoLine(openBrace) # procedure call
  printNoLine(closeBrace) # procedure call
  printNoLine(quotes) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.openBrace);
  await _stdlib.printNoLine(_stdlib.closeBrace);
  await _stdlib.printNoLine(_stdlib.quotes);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, `{}"`);
  });

  test("Pass_maths_tests", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(openBrace) # procedure call
  printNoLine(closeBrace) # procedure call
  printNoLine(quotes) # procedure call
# end main

class Test_maths(unittest.TestCase):
 def test_maths(self) -> None:
  self.assertEqual(pi, 3.141592653589793)
  self.assertEqual(abs(-3.7), 3.7)
  self.assertEqual(acos(0.5).round(3), 1.047)
  self.assertEqual(asin(0.5).round(3), 0.524)
  self.assertEqual(atan(1).round(2), 0.79)
  self.assertEqual(cos(pi/4).round(3), 0.707)
  self.assertEqual(exp(2).round(3), 7.389)
  self.assertEqual(logE(7.398).round(2), 2)
  self.assertEqual(log10(1000), 3)
  self.assertEqual(log2(65536), 16)
  self.assertEqual(sin(pi/6).round(2), 0.5)
  self.assertEqual(sqrt(2).round(3), 1.414)
  self.assertEqual(tan(pi/4).round(2), 1)
  self.assertEqual(radians(90).round(2), 1.57)
  self.assertEqual(degrees(1).round(0), 57)
# end test

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
_tests.push(["elan_test1", async (_outcomes) => {
  _outcomes.push(await system.assert([async () => _stdlib.pi, "Float"], [3.141592653589793, "Float"], "elan_assert4", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.abs((-3.7)), "Float"], [3.7, "Float"], "elan_assert7", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.acos(0.5), 3), "Float"], [1.047, "Float"], "elan_assert10", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.asin(0.5), 3), "Float"], [0.524, "Float"], "elan_assert13", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.atan(1), 2), "Float"], [0.79, "Float"], "elan_assert16", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.cos(_stdlib.pi / 4), 3), "Float"], [0.707, "Float"], "elan_assert19", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.exp(2), 3), "Float"], [7.389, "Float"], "elan_assert22", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.logE(7.398), 2), "Float"], [2, "Int"], "elan_assert25", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.log10(1000), "Float"], [3, "Int"], "elan_assert28", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.log2(65536), "Float"], [16, "Int"], "elan_assert31", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.sin(_stdlib.pi / 6), 2), "Float"], [0.5, "Float"], "elan_assert34", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.sqrt(2), 3), "Float"], [1.414, "Float"], "elan_assert37", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.tan(_stdlib.pi / 4), 2), "Float"], [1, "Int"], "elan_assert40", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.radians(90), 2), "Float"], [1.57, "Float"], "elan_assert43", _stdlib, false));
  _outcomes.push(await system.assert([async () => _stdlib.round(_stdlib.degrees(1), 0), "Float"], [57, "Int"], "elan_assert46", _stdlib, false));
}]);

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertTestObjectCodeExecutes(fileImpl, [
      [
        "elan_test1",
        [
          new AssertOutcome(
            TestStatus.pass,
            "3.141592653589793",
            "3.141592653589793",
            "elan_assert4",
          ),
          new AssertOutcome(TestStatus.pass, "3.7", "3.7", "elan_assert7"),
          new AssertOutcome(TestStatus.pass, "1.047", "1.047", "elan_assert10"),
          new AssertOutcome(TestStatus.pass, "0.524", "0.524", "elan_assert13"),
          new AssertOutcome(TestStatus.pass, "0.79", "0.79", "elan_assert16"),
          new AssertOutcome(TestStatus.pass, "0.707", "0.707", "elan_assert19"),
          new AssertOutcome(TestStatus.pass, "7.389", "7.389", "elan_assert22"),
          new AssertOutcome(TestStatus.pass, "2", "2", "elan_assert25"),
          new AssertOutcome(TestStatus.pass, "3", "3", "elan_assert28"),
          new AssertOutcome(TestStatus.pass, "16", "16", "elan_assert31"),
          new AssertOutcome(TestStatus.pass, "0.5", "0.5", "elan_assert34"),
          new AssertOutcome(TestStatus.pass, "1.414", "1.414", "elan_assert37"),
          new AssertOutcome(TestStatus.pass, "1", "1", "elan_assert40"),
          new AssertOutcome(TestStatus.pass, "1.57", "1.57", "elan_assert43"),
          new AssertOutcome(TestStatus.pass, "57", "57", "elan_assert46"),
        ],
      ],
    ]);
  });
  test("Pass_Random", async () => {
    const code = `${testPythonHeader}

class Test_maths(unittest.TestCase):
 def test_maths(self) -> None:
  self.assertEqual(pi, 3.141592653589793)
  self.assertEqual(abs(-3.7), 3.7)
  self.assertEqual(acos(0.5).round(3), 1.047)
  self.assertEqual(asin(0.5).round(3), 0.524)
  self.assertEqual(atan(1).round(2), 0.79)
  self.assertEqual(cos(pi/4).round(3), 0.707)
  self.assertEqual(exp(2).round(3), 7.389)
  self.assertEqual(logE(7.398).round(2), 2)
  self.assertEqual(log10(1000), 3)
  self.assertEqual(log2(65536), 16)
  self.assertEqual(sin(pi/6).round(2), 0.5)
  self.assertEqual(sqrt(2).round(3), 1.414)
  self.assertEqual(tan(pi/4).round(2), 1)
  self.assertEqual(radians(90).round(2), 1.57)
  self.assertEqual(degrees(1).round(0), 57)
# end test

def main() -> None:
  results = [0, 0] # variable definition
  for i in range(1, 10001):
    r = randint(0, 1) # variable definition
    results[r] = results[r] + 1 # assignment
  # end for
  printNoLine(results[0] > 0) # procedure call
  printNoLine(results[1] > 0) # procedure call
  printNoLine(results[0] + results[1]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0]);
  const elan_iterelan_for6 = [..._stdlib.range(1, 10001)];
  for (const i of elan_iterelan_for6) {
    let r = _stdlib.randint(0, 1);
    system.safeSet(results, system.safeIndex(results, r) + 1, [r]);
  }
  await _stdlib.printNoLine(system.safeIndex(results, 0) > 0);
  await _stdlib.printNoLine(system.safeIndex(results, 1) > 0);
  await _stdlib.printNoLine(system.safeIndex(results, 0) + system.safeIndex(results, 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truetrue10000");
  });

  test("RandomInitialised", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  results = [0, 0] # variable definition
  for i in range(1, 10001):
    r = randint(0, 1) # variable definition
    results[r] = results[r] + 1 # assignment
  # end for
  printNoLine(results[0] > 0) # procedure call
  printNoLine(results[1] > 0) # procedure call
  printNoLine(results[0] + results[1]) # procedure call
# end main

def main() -> None:
  results = [0, 0] # variable definition
  rnd = Random() # variable definition
  val = 0 # variable definition
  rnd.initialiseFromClock() # procedure call
  for i in range(1, 10001):
    val = rnd.asInt(0, 1) # assignment
    rnd = rnd.nextGen() # assignment
    results[val] = results[val] + 1 # assignment
  # end for
  printNoLine(results[0] > 0) # procedure call
  printNoLine(results[1] > 0) # procedure call
  printNoLine(results[0] + results[1]) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let val = 0;
  rnd.initialiseFromClock();
  const elan_iterelan_for15 = [..._stdlib.range(1, 10001)];
  for (const i of elan_iterelan_for15) {
    val = rnd.asInt(0, 1);
    rnd = rnd.nextGen();
    system.safeSet(results, system.safeIndex(results, val) + 1, [val]);
  }
  await _stdlib.printNoLine(system.safeIndex(results, 0) > 0);
  await _stdlib.printNoLine(system.safeIndex(results, 1) > 0);
  await _stdlib.printNoLine(system.safeIndex(results, 0) + system.safeIndex(results, 1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truetrue10000");
  });
  test("RandomInFixedSequence", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  results = [0, 0] # variable definition
  rnd = Random() # variable definition
  val = 0 # variable definition
  rnd.initialiseFromClock() # procedure call
  for i in range(1, 10001):
    val = rnd.asInt(0, 1) # assignment
    rnd = rnd.nextGen() # assignment
    results[val] = results[val] + 1 # assignment
  # end for
  printNoLine(results[0] > 0) # procedure call
  printNoLine(results[1] > 0) # procedure call
  printNoLine(results[0] + results[1]) # procedure call
# end main

def main() -> None:
  results = [0, 0, 0, 0, 0, 0, 0] # variable definition
  rnd = Random() # variable definition
  val = 0 # variable definition
  for i in range(1, 10001):
    val = rnd.asInt(3, 5) # assignment
    rnd = rnd.nextGen() # assignment
    results[val] = results[val] + 1 # assignment
  # end for
  for i in range(0, 7):
    r = results[i] # variable definition
    printNoLine(r) # procedure call
    printNoLine(", ") # procedure call
  # end for
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0, 0, 0, 0, 0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let val = 0;
  const elan_iterelan_for12 = [..._stdlib.range(1, 10001)];
  for (const i of elan_iterelan_for12) {
    val = rnd.asInt(3, 5);
    rnd = rnd.nextGen();
    system.safeSet(results, system.safeIndex(results, val) + 1, [val]);
  }
  const elan_iterelan_for25 = [..._stdlib.range(0, 7)];
  for (const i of elan_iterelan_for25) {
    let r = system.safeIndex(results, i);
    await _stdlib.printNoLine(r);
    await _stdlib.printNoLine(", ");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "0, 0, 0, 3365, 3268, 3367, 0, ");
  });
  test("Pass_RandomType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  results = [0, 0, 0, 0, 0, 0, 0] # variable definition
  rnd = Random() # variable definition
  val = 0 # variable definition
  for i in range(1, 10001):
    val = rnd.asInt(3, 5) # assignment
    rnd = rnd.nextGen() # assignment
    results[val] = results[val] + 1 # assignment
  # end for
  for i in range(0, 7):
    r = results[i] # variable definition
    printNoLine(r) # procedure call
    printNoLine(", ") # procedure call
  # end for
# end main

def main() -> None:
  results = [0, 0, 0, 0, 0, 0, 0] # variable definition
  rnd = Random() # variable definition
  dice = 0 # variable definition
  for i in range(1, 10001):
    t = rollDice(rnd) # variable definition
    dice = t.item_0 # assignment
    rnd = t.item_1 # assignment
    results[dice] = results[dice] + 1 # assignment
  # end for
  for i in range(0, 7):
    r = results[i] # variable definition
    printNoLine(r) # procedure call
    printNoLine(", ") # procedure call
  # end for
# end main

def rollDice(rnd: Random) -> tuple[int, Random]: # function
  return (rnd.asInt(1, 6), rnd.nextGen())
# end function

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let results = system.list([0, 0, 0, 0, 0, 0, 0]);
  let rnd = system.initialise(await new _stdlib.Random()._initialise());
  let dice = 0;
  const elan_iterelan_for12 = [..._stdlib.range(1, 10001)];
  for (const i of elan_iterelan_for12) {
    let t = (await global.rollDice(rnd));
    dice = t[0];
    rnd = t[1];
    system.safeSet(results, system.safeIndex(results, dice) + 1, [dice]);
  }
  const elan_iterelan_for28 = [..._stdlib.range(0, 7)];
  for (const i of elan_iterelan_for28) {
    let r = system.safeIndex(results, i);
    await _stdlib.printNoLine(r);
    await _stdlib.printNoLine(", ");
  }
}

async function rollDice(rnd) {
  return system.tuple([rnd.asInt(1, 6), rnd.nextGen()]);
}
global["rollDice"] = rollDice;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "0, 1688, 1677, 1683, 1585, 1680, 1687, ");
  });

  test("bitwise operations", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  results = [0, 0, 0, 0, 0, 0, 0] # variable definition
  rnd = Random() # variable definition
  dice = 0 # variable definition
  for i in range(1, 10001):
    t = rollDice(rnd) # variable definition
    dice = t.item_0 # assignment
    rnd = t.item_1 # assignment
    results[dice] = results[dice] + 1 # assignment
  # end for
  for i in range(0, 7):
    r = results[i] # variable definition
    printNoLine(r) # procedure call
    printNoLine(", ") # procedure call
  # end for
# end main

def main() -> None:
  a = 13 # variable definition
  b = 30 # variable definition
  anb = bitAnd(a, b) # variable definition
  aob = bitOr(a, b) # variable definition
  axb = bitXor(a, b) # variable definition
  nota = bitNot(a) # variable definition
  aL = bitShiftL(a, 2) # variable definition
  aR = bitShiftR(a, 2) # variable definition
  printNoLine(a.asBinary() + " " + b.asBinary() + " " + anb.asBinary() + " " + aob.asBinary() + " " + axb.asBinary() + " " + nota.asBinary() + " " + aL.asBinary() + " " + aR.asBinary()) # procedure call
# end main

main()
`;

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
  await _stdlib.printNoLine(_stdlib.asBinary(a) + " " + _stdlib.asBinary(b) + " " + _stdlib.asBinary(anb) + " " + _stdlib.asBinary(aob) + " " + _stdlib.asBinary(axb) + " " + _stdlib.asBinary(nota) + " " + _stdlib.asBinary(aL) + " " + _stdlib.asBinary(aR));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "1101 11110 1100 11111 10011 -1110 110100 11");
  });

  test("Pass_stringForUnicode", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 13 # variable definition
  b = 30 # variable definition
  anb = bitAnd(a, b) # variable definition
  aob = bitOr(a, b) # variable definition
  axb = bitXor(a, b) # variable definition
  nota = bitNot(a) # variable definition
  aL = bitShiftL(a, 2) # variable definition
  aR = bitShiftR(a, 2) # variable definition
  printNoLine(a.asBinary() + " " + b.asBinary() + " " + anb.asBinary() + " " + aob.asBinary() + " " + axb.asBinary() + " " + nota.asBinary() + " " + aL.asBinary() + " " + aR.asBinary()) # procedure call
# end main

def main() -> None:
  printNoLine(unicode(65)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.unicode(65));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "A");
  });

  test("Pass_asUnicode", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(unicode(65)) # procedure call
# end main

def main() -> None:
  printNoLine("Apple".asUnicode()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.asUnicode("Apple"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "65");
  });

  test("Pass_appendList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine("Apple".asUnicode()) # procedure call
# end main

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  a.appendList(b);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3, 4][3, 4]");
  });

  test("Pass_appendListOfSubclass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = list[Foo]() # variable definition
  b = list[Bar]() # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

class Foo(ABC): # abstract class


# end class

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.List()._initialise());
  let b = system.initialise(await new _stdlib.List()._initialise());
  a.appendList(b);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[][]");
  });

  test("Pass_prependList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[Foo]() # variable definition
  b = list[Bar]() # variable definition
  a.appendList(b) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  a = [1, 2] # variable definition
  b = [3, 4] # variable definition
  a.prependList(b) # procedure call
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = system.list([3, 4]);
  a.prependList(b);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[3, 4, 1, 2][3, 4]");
  });

  test("Pass_prepend", async () => {
    const code = `${testPythonHeader}

class Bar(Foo): # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

# end class

def main() -> None:
  a = [1, 2] # variable definition
  b = 3 # variable definition
  a.prepend(b) # procedure call
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2]);
  let b = 3;
  a.prepend(b);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[3, 1, 2]");
  });

  test("Pass_split", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2] # variable definition
  b = 3 # variable definition
  a.prepend(b) # procedure call
  printNoLine(a) # procedure call
# end main

def main() -> None:
  s = "Now is the time..." # variable definition
  words = s.split(" ") # variable definition
  printNoLine(words) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s = "Now is the time...";
  let words = _stdlib.split(s, " ");
  await _stdlib.printNoLine(words);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[Now, is, the, time...]");
  });
  test("Pass_joinListOfString", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s = "Now is the time..." # variable definition
  words = s.split(" ") # variable definition
  printNoLine(words) # procedure call
# end main

def main() -> None:
  words = ["Now", "is", "the", "time..."] # variable definition
  s = words.join(".") # variable definition
  printNoLine(s) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let words = system.list(["Now", "is", "the", "time..."]);
  let s = (await words.join("."));
  await _stdlib.printNoLine(s);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "Now.is.the.time...");
  });
  test("Pass_joinListOfObjects", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  words = ["Now", "is", "the", "time..."] # variable definition
  s = words.join(".") # variable definition
  printNoLine(s) # procedure call
# end main

def main() -> None:
  words = [Point(), Point()] # variable definition
  s = words.join(",") # variable definition
  printNoLine(s) # procedure call
# end main

class Point: # concrete class

  def __init__(self: Point) -> None:

  # end constructor

  def toString(self: Point) -> str: # function method
    return "a Point"
  # end function method

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let words = system.list([system.initialise(await new Point()._initialise()), system.initialise(await new Point()._initialise())]);
  let s = (await words.join(","));
  await _stdlib.printNoLine(s);
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Point";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "a Point,a Point");
  });

  test("Pass_replace", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  words = [Point(), Point()] # variable definition
  s = words.join(",") # variable definition
  printNoLine(s) # procedure call
# end main

def main() -> None:
  s1 = "[a] [b]" # variable definition
  s2 = s1.replace("[", unicode(123)).replace("]", unicode(125)) # variable definition
  printNoLine(s1) # procedure call
  printNoLine(s2) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s1 = "[a] [b]";
  let s2 = _stdlib.replace(_stdlib.replace(s1, "[", _stdlib.unicode(123)), "]", _stdlib.unicode(125));
  await _stdlib.printNoLine(s1);
  await _stdlib.printNoLine(s2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[a] [b]{a} {b}");
  });
  test("Pass_testRegExp", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s1 = "[a] [b]" # variable definition
  s2 = s1.replace("[", unicode(123)).replace("]", unicode(125)) # variable definition
  printNoLine(s1) # procedure call
  printNoLine(s2) # procedure call
# end main

def main() -> None:
  s1 = "cbababbc" # variable definition
  s2 = "cbabdabbc" # variable definition
  result1 = s1.matchesRegExp(/[a-c]*/) # variable definition
  result2 = s2.matchesRegExp(/^[a-c]*$/) # variable definition
  printNoLine(result1) # procedure call
  printNoLine(result2) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let s1 = "cbababbc";
  let s2 = "cbabdabbc";
  let result1 = _stdlib.matchesRegExp(s1, /[a-c]*/);
  let result2 = _stdlib.matchesRegExp(s2, /^[a-c]*$/);
  await _stdlib.printNoLine(result1);
  await _stdlib.printNoLine(result2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });
  test("Pass_asRegExp", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  s1 = "cbababbc" # variable definition
  s2 = "cbabdabbc" # variable definition
  result1 = s1.matchesRegExp(/[a-c]*/) # variable definition
  result2 = s2.matchesRegExp(/^[a-c]*$/) # variable definition
  printNoLine(result1) # procedure call
  printNoLine(result2) # procedure call
# end main

def main() -> None:
  r = "[a-c]*".asRegExp() # variable definition
  printNoLine(r) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let r = _stdlib.asRegExp("[a-c]*");
  await _stdlib.printNoLine(r);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "A RegExp");
  });
  test("Pass_indexOf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  r = "[a-c]*".asRegExp() # variable definition
  printNoLine(r) # procedure call
# end main

def main() -> None:
  a = [1, 3, 5, 7, 9] # variable definition
  b = [2, 4, 6, 8] # variable definition
  c = "Hello World!" # variable definition
  printNoLine(a.indexOf(9)) # procedure call
  printNoLine(a.indexOf(5)) # procedure call
  printNoLine(b.indexOf(2)) # procedure call
  printNoLine(b.indexOf(7)) # procedure call
  printNoLine(c.indexOf("o")) # procedure call
  printNoLine(c.indexOf("ll")) # procedure call
  printNoLine(c.indexOf("x")) # procedure call
  i = 1 # variable definition
  i = a.indexOf(9) # assignment
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 3, 5, 7, 9]);
  let b = system.list([2, 4, 6, 8]);
  let c = "Hello World!";
  await _stdlib.printNoLine(a.indexOf(9));
  await _stdlib.printNoLine(a.indexOf(5));
  await _stdlib.printNoLine(b.indexOf(2));
  await _stdlib.printNoLine(b.indexOf(7));
  await _stdlib.printNoLine(_stdlib.indexOf(c, "o"));
  await _stdlib.printNoLine(_stdlib.indexOf(c, "ll"));
  await _stdlib.printNoLine(_stdlib.indexOf(c, "x"));
  let i = 1;
  i = a.indexOf(9);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "420-142-1");
  });
  test("Pass_asUnicodeReturnsInt#1061", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 3, 5, 7, 9] # variable definition
  b = [2, 4, 6, 8] # variable definition
  c = "Hello World!" # variable definition
  printNoLine(a.indexOf(9)) # procedure call
  printNoLine(a.indexOf(5)) # procedure call
  printNoLine(b.indexOf(2)) # procedure call
  printNoLine(b.indexOf(7)) # procedure call
  printNoLine(c.indexOf("o")) # procedure call
  printNoLine(c.indexOf("ll")) # procedure call
  printNoLine(c.indexOf("x")) # procedure call
  i = 1 # variable definition
  i = a.indexOf(9) # assignment
# end main

def main() -> None:
  i = 1 # variable definition
  i = "A".asUnicode() # assignment
  printNoLine(i) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let i = 1;
  i = _stdlib.asUnicode("A");
  await _stdlib.printNoLine(i);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "65");
  });
  test("Pass_isNaN", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  i = 1 # variable definition
  i = "A".asUnicode() # assignment
  printNoLine(i) # procedure call
# end main

def main() -> None:
  printNoLine(sqrt(-1).isNaN()) # procedure call
  printNoLine(sqrt(2).isNaN()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.isNaN(_stdlib.sqrt((-1))));
  await _stdlib.printNoLine(_stdlib.isNaN(_stdlib.sqrt(2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });
  test("Pass_isInfinite", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(sqrt(-1).isNaN()) # procedure call
  printNoLine(sqrt(2).isNaN()) # procedure call
# end main

def main() -> None:
  printNoLine((1.0/0).isInfinite()) # procedure call
  printNoLine((-1.0/0).isInfinite()) # procedure call
  printNoLine((1.0/1).isInfinite()) # procedure call
  printNoLine(sqrt(-1).isInfinite()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.isInfinite((1 / 0)));
  await _stdlib.printNoLine(_stdlib.isInfinite(((-1) / 0)));
  await _stdlib.printNoLine(_stdlib.isInfinite((1 / 1)));
  await _stdlib.printNoLine(_stdlib.isInfinite(_stdlib.sqrt((-1))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truetruefalsefalse");
  });

  test("Pass_Constraint", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine((1.0/0).isInfinite()) # procedure call
  printNoLine((-1.0/0).isInfinite()) # procedure call
  printNoLine((1.0/1).isInfinite()) # procedure call
  printNoLine(sqrt(-1).isInfinite()) # procedure call
# end main

def main() -> None:
  a = list[CircleVG]() # variable definition
  b = list[VectorGraphic]() # variable definition
  displayVectorGraphics(a) # procedure call
  displayVectorGraphics(b) # procedure call
# end main

main()
`;

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
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_Constraint", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[CircleVG]() # variable definition
  b = list[VectorGraphic]() # variable definition
  displayVectorGraphics(a) # procedure call
  displayVectorGraphics(b) # procedure call
# end main

def main() -> None:
  a = list[Foo]() # variable definition
  displayVectorGraphics(a) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "foo"
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Argument types. Expected: listOfVGs (List<of VectorGraphic>), Provided: List<of Foo>.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_split", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = list[Foo]() # variable definition
  displayVectorGraphics(a) # procedure call
# end main

def main() -> None:
  printNoLine(asInt("12 34 56".split(" ")[1])) # procedure call
  printNoLine("z" + "a b c".split(" ")[1]) # procedure call
  printNoLine("a b c".split(" ")[1] + "z") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.asInt(system.safeIndex(_stdlib.split("12 34 56", " "), 1)));
  await _stdlib.printNoLine("z" + system.safeIndex(_stdlib.split("a b c", " "), 1));
  await _stdlib.printNoLine(system.safeIndex(_stdlib.split("a b c", " "), 1) + "z");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "34zbbz");
  });

  test("Pass_drawHtml", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(asInt("12 34 56".split(" ")[1])) # procedure call
  printNoLine("z" + "a b c".split(" ")[1]) # procedure call
  printNoLine("a b c".split(" ")[1] + "z") # procedure call
# end main

def main() -> None:
  displayHtml("<p>fred</p>") # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.displayHtml("<p>fred</p>");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertGraphicsContains(fileImpl, 0, "<p>fred</p>");
  });

  test("Pass_clearHtml", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  displayHtml("<p>fred</p>") # procedure call
# end main

def main() -> None:
  displayHtml("<p>fred</p>") # procedure call
  clearHtml() # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.displayHtml("<p>fred</p>");
  await _stdlib.clearHtml();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertGraphicsContains(fileImpl, 0, "");
  });

  test("Pass_tone", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  displayHtml("<p>fred</p>") # procedure call
  clearHtml() # procedure call
# end main

def main() -> None:
  tone(10, 10, 10) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.tone(10, 10, 10);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
  });

  test("Pass_range", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tone(10, 10, 10) # procedure call
# end main

def main() -> None:
  printNoLine(range(1, 6)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.range(1, 6));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3, 4, 5]");
  });
  test("Pass_range_EmptyIfEnd<Start", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(range(1, 6)) # procedure call
# end main

def main() -> None:
  printNoLine(range(5, 0)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.range(5, 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });
  test("Pass_rangeInSteps", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(range(5, 0)) # procedure call
# end main

def main() -> None:
  printNoLine(rangeInSteps(1, 7, 2)) # procedure call
  printNoLine(rangeInSteps(5, -4, -2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.rangeInSteps(1, 7, 2));
  await _stdlib.printNoLine(_stdlib.rangeInSteps(5, (-4), (-2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[1, 3, 5][5, 3, 1, -1, -3]");
  });
  test("Pass_rangeInStepsError1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(rangeInSteps(1, 7, 2)) # procedure call
  printNoLine(rangeInSteps(5, -4, -2)) # procedure call
# end main

def main() -> None:
  printNoLine(rangeInSteps(1, 7, 0)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.rangeInSteps(1, 7, 0));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(fileImpl, "value for step cannot be zero");
  });
  test("Pass_rangeInStepsError2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(rangeInSteps(1, 7, 0)) # procedure call
# end main

def main() -> None:
  printNoLine(rangeInSteps(1, 7, -1)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.rangeInSteps(1, 7, (-1)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      "Loop will not terminate when start < end start with negative step",
    );
  });
  test("Pass_rangeInStepsError3", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(rangeInSteps(1, 7, -1)) # procedure call
# end main

def main() -> None:
  printNoLine(rangeInSteps(6, 2, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.rangeInSteps(6, 2, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[]");
  });

  test("Fail_shadowLibraryType", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(rangeInSteps(6, 2, 2)) # procedure call
# end main

class List: # concrete class

  def __init__(self: list) -> None:

  # end constructor

  def toString(self: list) -> str: # function method
    return "undefined"
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_SetComparisonByValue", async () => {
    const code = `${testPythonHeader}

class List: # concrete class

  def __init__(self: list) -> None:

  # end constructor

  def toString(self: list) -> str: # function method
    return "undefined"
  # end function method

# end class

def main() -> None:
  b = ["2", "7"].asHashSet() # variable definition
  c = ["7", "2"].asHashSet() # variable definition
  d = ["8", "2"].asHashSet() # variable definition
  printNoLine(b.equals(c)) # procedure call
  printNoLine(b.equals(d)) # procedure call
  b2 = [2, 7].asHashSet() # variable definition
  c2 = [7, 2].asHashSet() # variable definition
  d2 = [8, 2].asHashSet() # variable definition
  printNoLine(b2.equals(c2)) # procedure call
  printNoLine(b2.equals(d2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.list(["2", "7"]).asHashSet();
  let c = system.list(["7", "2"]).asHashSet();
  let d = system.list(["8", "2"]).asHashSet();
  await _stdlib.printNoLine(_stdlib.equals(b, c));
  await _stdlib.printNoLine(_stdlib.equals(b, d));
  let b2 = system.list([2, 7]).asHashSet();
  let c2 = system.list([7, 2]).asHashSet();
  let d2 = system.list([8, 2]).asHashSet();
  await _stdlib.printNoLine(_stdlib.equals(b2, c2));
  await _stdlib.printNoLine(_stdlib.equals(b2, d2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalse");
  });

  test("Pass_divideFunctions", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = ["2", "7"].asHashSet() # variable definition
  c = ["7", "2"].asHashSet() # variable definition
  d = ["8", "2"].asHashSet() # variable definition
  printNoLine(b.equals(c)) # procedure call
  printNoLine(b.equals(d)) # procedure call
  b2 = [2, 7].asHashSet() # variable definition
  c2 = [7, 2].asHashSet() # variable definition
  d2 = [8, 2].asHashSet() # variable definition
  printNoLine(b2.equals(c2)) # procedure call
  printNoLine(b2.equals(d2)) # procedure call
# end main

def main() -> None:
  printNoLine(divAsInt(1, 2)) # procedure call
  printNoLine(divAsInt(1.0, 2.0)) # procedure call
  printNoLine(divAsInt(1, 2.0)) # procedure call
  printNoLine(divAsInt(1.0, 2)) # procedure call
  printNoLine(divAsFloat(1, 2)) # procedure call
  printNoLine(divAsFloat(1.0, 2.0)) # procedure call
  printNoLine(divAsFloat(1, 2.0)) # procedure call
  printNoLine(divAsFloat(1.0, 2)) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine(_stdlib.divAsInt(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsInt(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsInt(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsInt(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsFloat(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsFloat(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsFloat(1, 2));
  await _stdlib.printNoLine(_stdlib.divAsFloat(1, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "00000.50.50.50.5");
  });

  test("Pass_createGraphicsFunctions", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  printNoLine(divAsInt(1, 2)) # procedure call
  printNoLine(divAsInt(1.0, 2.0)) # procedure call
  printNoLine(divAsInt(1, 2.0)) # procedure call
  printNoLine(divAsInt(1.0, 2)) # procedure call
  printNoLine(divAsFloat(1, 2)) # procedure call
  printNoLine(divAsFloat(1.0, 2.0)) # procedure call
  printNoLine(divAsFloat(1, 2.0)) # procedure call
  printNoLine(divAsFloat(1.0, 2)) # procedure call
# end main

def main() -> None:
  b = list[list[int]]() # variable definition
  for i in range(0, 40):
    sa = list[int]() # variable definition
    for j in range(0, 30):
      sa.append(white) # procedure call
    # end for
    b.append(sa) # procedure call
  # end for
  b = createBlockGraphics(white) # assignment
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let b = system.initialise(await new _stdlib.List()._initialise());
  const elan_iterelan_for6 = [..._stdlib.range(0, 40)];
  for (const i of elan_iterelan_for6) {
    let sa = system.initialise(await new _stdlib.List()._initialise());
    const elan_iterelan_for13 = [..._stdlib.range(0, 30)];
    for (const j of elan_iterelan_for13) {
      sa.append(_stdlib.white);
    }
    b.append(sa);
  }
  b = (await _stdlib.createBlockGraphics(_stdlib.white));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "");
  });
  test("Pass_createList", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  b = list[list[int]]() # variable definition
  for i in range(0, 40):
    sa = list[int]() # variable definition
    for j in range(0, 30):
      sa.append(white) # procedure call
    # end for
    b.append(sa) # procedure call
  # end for
  b = createBlockGraphics(white) # assignment
# end main

def main() -> None:
  a = createPopulatedList(5, "a") # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.createPopulatedList(5, "a");
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[a, a, a, a, a]");
  });

  test("Pass_createListOfLists", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedList(5, "a") # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = createPopulatedListofLists(3, 2, 5) # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (await _stdlib.createPopulatedListofLists(3, 2, 5));
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[[5, 5], [5, 5], [5, 5]]");
  });

  test("Pass_createDictionary", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = createPopulatedListofLists(3, 2, 5) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = [("a", 1), ("b", 2)] # variable definition
  b = [(1, "a"), (2, "b")] # variable definition
  d1 = Dictionary[str, int]() # variable definition
  d2 = Dictionary[int, str]() # variable definition
  d1 = createDictionary(a) # assignment
  d2 = createDictionary(b) # assignment
  printNoLine(d1) # procedure call
  printNoLine(d2) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.tuple(["a", 1]), system.tuple(["b", 2])]);
  let b = system.list([system.tuple([1, "a"]), system.tuple([2, "b"])]);
  let d1 = system.initialise(await new _stdlib.Dictionary()._initialise());
  let d2 = system.initialise(await new _stdlib.Dictionary()._initialise());
  d1 = (await _stdlib.createDictionary(a));
  d2 = (await _stdlib.createDictionary(b));
  await _stdlib.printNoLine(d1);
  await _stdlib.printNoLine(d2);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "[a:1, b:2][1:a, 2:b]");
  });

  test("Pass_allLibraryTypeNamesValid", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [("a", 1), ("b", 2)] # variable definition
  b = [(1, "a"), (2, "b")] # variable definition
  d1 = Dictionary[str, int]() # variable definition
  d2 = Dictionary[int, str]() # variable definition
  d1 = createDictionary(a) # assignment
  d2 = createDictionary(b) # assignment
  printNoLine(d1) # procedure call
  printNoLine(d2) # procedure call
# end main

def main() -> None:
  a = CircleVG() # variable definition
  b = Dictionary[str, int]() # variable definition
  d = new HashSet<of Int> # variable definition
  e = ImageVG("") # variable definition
  f = LineVG() # variable definition
  g = list[int]() # variable definition
  h = Maybe[ImageVG]() # variable definition
  i = Queue[int]() # variable definition
  j = Random() # variable definition
  k = RawVG() # variable definition
  l = RectangleVG() # variable definition
  m = AsRef[int](1) # variable definition
  n = Stack[int]() # variable definition
  o = TextFileReader() # variable definition
  p = TextFileWriter() # variable definition
  q = Turtle() # variable definition
# end main

def foo(r: VectorGraphic) -> None: # procedure

# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_allLibraryProceduresValid", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = CircleVG() # variable definition
  b = Dictionary[str, int]() # variable definition
  d = new HashSet<of Int> # variable definition
  e = ImageVG("") # variable definition
  f = LineVG() # variable definition
  g = list[int]() # variable definition
  h = Maybe[ImageVG]() # variable definition
  i = Queue[int]() # variable definition
  j = Random() # variable definition
  k = RawVG() # variable definition
  l = RectangleVG() # variable definition
  m = AsRef[int](1) # variable definition
  n = Stack[int]() # variable definition
  o = TextFileReader() # variable definition
  p = TextFileWriter() # variable definition
  q = Turtle() # variable definition
# end main

def main() -> None:

# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_Equals", async () => {
    const code = `${testPythonHeader}

def main() -> None:

# end main

def main() -> None:
  a = 1.equals(1) # variable definition
  b = "".equals("") # variable definition
  c = True.equals(True) # variable definition
  d = 1.notEqualTo(2) # variable definition
  e = "".notEqualTo("1") # variable definition
  f = True.notEqualTo(False) # variable definition
  printNoLine(a and b and c and d and e and f) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.equals(1, 1);
  let b = _stdlib.equals("", "");
  let c = _stdlib.equals(true, true);
  let d = _stdlib.notEqualTo(1, 2);
  let e = _stdlib.notEqualTo("", "1");
  let f = _stdlib.notEqualTo(true, false);
  await _stdlib.printNoLine(a && b && c && d && e && f);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });
});
