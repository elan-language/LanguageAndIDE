import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { hash } from "../../util";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  transforms
} from "./compiler-test-helpers";

suite("T_3_Header", () => {
  test("Pass_hash", async () => {
    const code = `# f563a4748f657e668b43072b5826950ee08a62b67f705cc648d8e16dafff2449 Elan Beta 1 valid

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
