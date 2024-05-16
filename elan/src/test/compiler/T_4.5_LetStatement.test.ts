import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { MainFrame } from "../../frames/globals/main-frame";
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

suite("T_4.5_LetStatement", () => {
  ignore_test("Pass_normal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let y be x + 3
  print x + y
end main`;

    const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const varDef = (fileImpl.getChildNumber(0) as MainFrame).getChildren()[0];
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  ignore_test("Pass_proveLazilyEvaluated", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be  1 / 0
  let y be 4
  print y
end main`;

    const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const varDef = (fileImpl.getChildNumber(0) as MainFrame).getChildren()[0];
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4"); //i.e. does not generate a division by zero error from the first let (are we testing that it DOES for a var/set!)
  });

  ignore_test("Fail_cannotRedefine ", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let x be 4
  print x + y
end main`;

    const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const varDef = (fileImpl.getChildNumber(0) as MainFrame).getChildren()[0];
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
  });

  ignore_test("Fail_cannotAssign", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  set x to 4
  print x + y
end main`;

    const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const varDef = (fileImpl.getChildNumber(0) as MainFrame).getChildren()[0];
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });
});
