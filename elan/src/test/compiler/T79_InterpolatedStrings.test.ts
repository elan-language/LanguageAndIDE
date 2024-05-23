import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Pass_CanUseVariables", () => {
  test("Pass_String", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  var b set to "Apple"
  var c set to [1,2,3]
  print "{a} {b} {c}"
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  var b = "Apple";
  var c = system.list([1, 2, 3]);
  system.print(_stdlib.asString(\`\${_stdlib.asString(a)} \${_stdlib.asString(b)} \${_stdlib.asString(c)}\`));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1 Apple ImmutableList [1, 2, 3]");
  });

  // Fails TODO
});
