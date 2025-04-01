import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { hash } from "../../src/util";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHeader,
  testHeaderVersion,
  transforms,
} from "./compiler-test-helpers";

suite("Header", () => {
  test("Pass_hash", async () => {
    const code = `# 2bca04c2bf83ece48bc494cb0d50099b2a3732ebf88773acc94f5a5f8a49cf99 ${testHeaderVersion} valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });
});
