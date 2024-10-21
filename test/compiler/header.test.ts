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
    const code = `# FFFF Elan Beta 3 valid

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
