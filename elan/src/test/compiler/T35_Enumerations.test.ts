import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T35_enums', () => {

  test('Pass_PrintValues', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print Fruit.apple
  print Fruit.orange
  print Fruit.pear
end main
   
enum Fruit
  apple, orange, pear
end enum`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  system.print(_stdlib.asString(Fruit.apple));
  system.print(_stdlib.asString(Fruit.orange));
  system.print(_stdlib.asString(Fruit.pear));
}

var Fruit = {
  apple : "apple", orange : "orange", pear : "pear"
};
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test('Pass_useInVariable', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to Fruit.apple
  set x to Fruit.pear
  print x
end main
   
enum Fruit
  apple, orange, pear
end enum`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = Fruit.apple;
  x = Fruit.pear;
  system.print(_stdlib.asString(x));
}

var Fruit = {
  apple : "apple", orange : "orange", pear : "pear"
};
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "pear");
  });

  test('Pass_useAsType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to Fruit.apple
  var y set to x
  print y
end main
   
enum Fruit
  apple, orange, pear
end enum`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  var x = Fruit.apple;
  var y = x;
  system.print(_stdlib.asString(y));
}

var Fruit = {
  apple : "apple", orange : "orange", pear : "pear"
};
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });
});