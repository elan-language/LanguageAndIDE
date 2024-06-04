import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { MainFrame } from "../../frames/globals/main-frame";
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

suite("T_7_IfStatement", () => {
  test("Pass_1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = true;
  if (a) {
    system.print(_stdlib.asString("yes"));
    } else {
      system.print(_stdlib.asString("no"));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const varDef = (fileImpl.getChildNumber(0) as MainFrame).getChildren()[0];
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test("Pass_2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false
  if a
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = false;
  if (a) {
    system.print(_stdlib.asString("yes"));
    } else {
      system.print(_stdlib.asString("no"));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 2;
  if (a === 1) {
    system.print(_stdlib.asString("one"));
    } else if (a === 2) {
      system.print(_stdlib.asString("two"));
    } else {
      system.print(_stdlib.asString("neither"));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3;
  if (a === 1) {
    system.print(_stdlib.asString("one"));
    } else if (a === 2) {
      system.print(_stdlib.asString("two"));
    } else {
      system.print(_stdlib.asString("neither"));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = true;
  if (a) {
    system.print(_stdlib.asString("yes"));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else if a is 3
    print "three"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3;
  if (a === 1) {
    system.print(_stdlib.asString("one"));
    } else if (a === 2) {
      system.print(_stdlib.asString("two"));
    } else if (a === 3) {
      system.print(_stdlib.asString("three"));
    } else {
      system.print(_stdlib.asString("neither"));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_TwoElses", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
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
    assertDoesNotCompile(fileImpl, ["Cannot have multiple unconditional 'Else'"]);
  });

  test("Fail_ElseIfAfterElse", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else
    print "not one"
  else if a is 2
    print "two"
  end if
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Must end with unconditional 'Else'"]);
  });

  test("Fail_IfConditionNotBool", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

  main
    var a set to 2
    if a is 1
      print "one"
    else if a
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
