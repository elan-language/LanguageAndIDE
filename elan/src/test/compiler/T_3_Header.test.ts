import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { hash } from "../../util";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  transforms,
} from "./compiler-test-helpers";

suite("T_3_Header", () => {
  ignore_test("Pass_hash", async () => {
    const code = `# fe7d4129310ebd088b815518559c4ac512b0e67da256e912bed669756817e4f4 Elan Beta 1 valid

main
  # My first program
  print ""Hello World!""
end main`;

    const objectCode = `export async function main(system : any) {
  system.print ("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });
});
