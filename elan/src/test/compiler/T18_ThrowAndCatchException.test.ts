import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T18_ThrowAndCatchException', () => {

  test('Pass_ThrowExceptionInMain', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    throw "Foo"
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  throw new Error("Foo");
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  test('Pass_ThrowExceptionInMainUsingVariableForMessage', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var msg set to "Foo"
  throw msg
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var msg = "Foo";
  throw new Error(msg);
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });

  ignore_test('Pass_ThrowExceptionUsingInterpolatedStringForMessage', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var bar set to 1
  throw "{bar}"
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var bar = 1;
  throw new Error("{bar}");
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "1");
  });

  test('Pass_ThrowExceptionInProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  call foo()
end main
 
procedure foo()
  throw "Foo"
end procedure`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  foo();
}

function foo() {
  throw new Error("Foo");
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Foo");
  });
});