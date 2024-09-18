import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { hash } from "../../src/util";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  transforms,
} from "./compiler-test-helpers";

suite("Header", () => {
  test("Pass_hash", async () => {
    const code = `# 1477b152cbf774a70fc1ab2de640c89c756441a871812d31d11502c2865f7cac Elan Beta 2 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {

  system.printLine(_stdlib.asString("Hello World!"));
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
