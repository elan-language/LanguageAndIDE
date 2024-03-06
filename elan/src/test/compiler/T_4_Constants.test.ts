import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";


suite('T_4_Constants', () => {

  test('Pass_Int', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to 3
main
  print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = 3;

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "3", done);
  });

  test('Pass_Float', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to 3.1
main
print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = 3.1;

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "3.1", done);
  });

  test('Pass_String', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to "hell0"
main
print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = "hell0";

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "hell0", done);
  });

  test('Pass_Char', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to 'a'
main
  print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = 'a';

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "a", done);
  });

  ignore_test('Pass_EmptyChar', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ''
main
  print a
  print a is default Char
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = '';

export async function main() {
  system.print(system.asString(a));
  system.print(system.asString(a is default Char));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "", done);
  });

  test('Pass_SpaceAsChar', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ' '
main
  print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = ' ';

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, " ", done);
  });

  test('Pass_Bool', (done) => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to true
main
  print a
end main
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
const a = true;

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "true", done);
  });

  ignore_test('Pass_Enum', (done) => {
    // enums need to be declared before use - so need to move to top of file in ts code. also we will need to set the value of
    // each enum to the appropriate string
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to Fruit.apple
main
  print a
end main
enum Fruit
  apple, orange, pear
end enum
`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
enum Fruit {
  apple = "apple", orange = "orange", pear = "pear"
}

const a = Fruit.apple;

export async function main() {
  system.print(system.asString(a));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "apple", done);
  });
});