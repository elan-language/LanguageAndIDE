import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Unique Identifiers", () => {
  test("Pass_CanUseKeywordWithDifferentCase", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var bReak set to 2
  print bReak
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var bReak = 2;
  system.printLine(_stdlib.asString(bReak));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_CanHaveIdentiferSameAsTypeExceptCase", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var foo set to new Foo()
  print foo
end main

class Foo
  constructor()
  end constructor
  function asString() return String
    return "Hello World!"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  system.printLine(_stdlib.asString(foo));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  asString() {
    return "Hello World!";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Fail_DeclareSameVarNameWithDifferentCase", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var fOO set to 1
  var foo set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
  });

  ignore_test("Fail_ElanKeywordWithChangedCase", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
    var pRocedure set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
  });

  ignore_test("Fail_ElanKeywordTypeEvenWithChangedCase", async () => {
    const code = `# FFFF Elan Beta 3 valid

class Main
  constructor()
  end constructor

  function asString() return String
    return ""
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
  });

  test("Fail_KeywordWithCorrectCaseIfAlteredCaseAlreadyUsed", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var bReak set to 1
  var break set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_SameVariableNameInScope", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var id set to 1
  var id set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'id' is already used for a variable and cannot be re-defined here.",
    ]);
  });
});
