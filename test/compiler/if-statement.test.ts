import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("If Statement", () => {
  test("Pass_1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to true
  if a then
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.true;
  if (a) {
    system.printLine("yes");
  } else {
    system.printLine("no");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to false
  if a then
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.false;
  if (a) {
    system.printLine("yes");
  } else {
    system.printLine("no");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "no");
  });

  test("Pass_3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 2
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 2;
  if (a === 1) {
    system.printLine("one");
  } else if (a === 2) {
    system.printLine("two");
  } else {
    system.printLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "two");
  });

  test("Pass_4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    system.printLine("one");
  } else if (a === 2) {
    system.printLine("two");
  } else {
    system.printLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "neither");
  });

  test("Pass_5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to true
  if a then
    print "yes"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = _stdlib.true;
  if (a) {
    system.printLine("yes");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else if a is 3 then
    print "three"
  else
    print "neither"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    system.printLine("one");
  } else if (a === 2) {
    system.printLine("two");
  } else if (a === 3) {
    system.printLine("three");
  } else {
    system.printLine("neither");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Pass_7_end_with_else_if", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a is 1 then
    print "one"
  else if a is 2 then
    print "two"
  else if a is 3 then
    print "three"
  end if
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  if (a === 1) {
    system.printLine("one");
  } else if (a === 2) {
    system.printLine("two");
  } else if (a === 3) {
    system.printLine("three");
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test("Fail_noEndIf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to true
  if a
    print "yes"
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TwoElses", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a is 1 then
    print "one"
  else
    print "not one"
  else
    print "two"
  end if
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot have any clause after unconditional 'else'"]);
  });

  test("Fail_ElseIfAfterElse", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a is 1 then
    print "one"
  else
    print "not one"
  else if a is 2 then
    print "two"
  end if
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot have any clause after unconditional 'else'"]);
  });

  test("Fail_IfConditionNotBool", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  if a then
    print "yes"
  else
    print "no"
  end if
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean"]);
  });

  test("Fail_ElseConditionNotBool", async () => {
    const code = `# FFFF Elan v1.0.0 valid

  main
    variable a set to 2
    if a is 1 then
      print "one"
    else if a then
      print "two"
    else
      print "neither"
    end if
  end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be Boolean"]);
  });
});
