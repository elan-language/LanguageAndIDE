import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T_8_ForLoop", () => {
  test("Pass_minimal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 1) {
    tot = tot + i;
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_reuseVariable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  var i set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tot = 0;
  var i = 0;
  for (i = 1; i <= 10; i = i + 1) {
    tot = tot + i;
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test("Pass_withStep", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
var tot set to 0
for i from 1 to 10 step 2
  set tot to tot + i
end for
print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 2) {
    tot = tot + i;
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_negativeStep", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 10 to 3 step -1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tot = 0;
  for (var i = 10; i >= 3; i = i - 1) {
    tot = tot + i;
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "52");
  });

  test("Pass_innerLoop", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1
      set tot to tot + 1
    end for
  end for
  print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var tot = 0;
  for (var i = 1; i <= 3; i = i + 1) {
    for (var j = 1; j <= 4; j = j + 1) {
      tot = tot + 1;
    }
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_canUseExistingVariablesOfRightType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var lower set to 1
  var upper set to 10
  var tot set to 0
  for i from lower to upper step 2
      set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var lower = 1;
  var upper = 10;
  var tot = 0;
  for (var i = lower; i <= upper; i = i + 2) {
    tot = tot + i;
  }
  system.printLine(_stdlib.asString(tot));
}
return [main, _tests];}`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  test("Pass_forInProcedure", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new ArrayList<of Int>()
  call a.initialiseAsArray(11, 0)
  call foo(a)
end main

procedure foo(arr as [Int])
  for i from 0 to 10 step 1
    set arr[i] to 1
  end for
  print arr[0]
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.array(new Array()));
  _stdlib.initialiseAsArray(a, 11, 0);
  await foo(a);
}

async function foo(arr) {
  for (var i = 0; i <= 10; i = i + 1) {
    system.safeSet(arr, i, 1);
  }
  system.printLine(_stdlib.asString(system.safeIndex(arr, 0)));
}
return [main, _tests];}`;
    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_reuseVariableWrongType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  var i set to ""
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Int"]);
  });

  test("Fail_useOfFloat", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0.0
  for i from 1.5 to 10.1 step 1.0
    set tot to tot + i
  end for
  print tot
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be Int",
      "Expression must be Int",
      "Expression must be Int",
    ]);
  });

  test("Fail_modifyingCounter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set i to 10
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate counter"]);
  });

  test("Fail_scopeOfCounter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to 10
  end for
  print i
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["i is not defined"]);
  });

  test("Fail_missingEnd", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1
      set tot to tot + 1
    end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_nextVariable", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10
    set tot to tot + i
  next i
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_break", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
    break
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_continue", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
    continue
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
