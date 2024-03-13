import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T19_Procedures', () => {

  test('Pass_BasicOperationIncludingPrint', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 1
  call foo()
  print 3
end main

procedure foo()
  print 2
end procedure`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  system.print(system.asString(1));
  foo();
  system.print(system.asString(3));
}

function foo() {
  system.print(system.asString(2));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

 
});