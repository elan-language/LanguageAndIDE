import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T46_TypeMethod", () => {
  ignore_test("Pass_TypeOfStandardTypes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print typeof 1
  print typeof 1.1
  print typeof false
  print typeof "a"
  print typeof {1,2,3}
  print typeof [1,2,3]
  print typeof {"a":1,"b":2,"c":3}
  print typeof ["a":1,"b":2,"c":3]
  var foo set to new Foo()
  print typeof foo
end main

class Foo
  constructor()

  end constructor

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
