import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T62_Tuples', () => {

  test('Pass_CreatingTuplesAndReadingContents', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var x set to (3, "Apple")
    print x
    print first(x)
    print second(x)
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  system.print(_stdlib.asString(x));
  system.print(_stdlib.asString(_stdlib.first(x)));
  system.print(_stdlib.asString(_stdlib.second(x)));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Tuple (3, Apple)3Apple");
  });

  test('Pass_FunctionReturnsTuple', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to f()
  print x
  print first(x)
  print second(x)
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = f();
  system.print(_stdlib.asString(x));
  system.print(_stdlib.asString(_stdlib.first(x)));
  system.print(_stdlib.asString(_stdlib.second(x)));
}

function f() {
  return system.tuple(["1", "2"]);
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Tuple (1, 2)12");
  });

  test('Pass_IndexFunctionReturnsTuple', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print first(f())
end main

function f() return (String, String)
   return ("1", "2")
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(_stdlib.first(f())));
}

function f() {
  return system.tuple(["1", "2"]);
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  // pending lambda
  ignore_test('Pass_IndexGenericFunctionReturnsTuple', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print reduce(a, (1,1), lambda i, j -> j).first()
end main
constant a set to [(1,2)]`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(_stdlib.first(f())));
}

function f() {
  return system.tuple(["1", "2"]);
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test('Pass_FunctionTupleParameter', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to "one"
  var y set to "two"
  print f((x,y))
end main

function f(t as (String, String)) return String
   return first(t)
end function`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = "one";
  var y = "two";
  system.print(_stdlib.asString(f(system.tuple([x, y]))));
}

function f(t) {
  return _stdlib.first(t);
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  // pending settarget changes
  ignore_test('Pass_DeconstructIntoExistingVariables', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to (3,"Apple")
  var y set to 0
  var z set to ""
  set (y, z) to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var y = 0;
  var z = "";
  [y, z] = x;
  system.print(_stdlib.asString(y));
  system.print(_stdlib.asString(z));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  ignore_test('Pass_DeconstructIntoNewVariables', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to (3,""Apple"")
  var (y, z) set to x
  print y
  print z
end main
`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  var [y, z] = x;
  system.print(_stdlib.asString(y));
  system.print(_stdlib.asString(z));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Apple");
  });

  test('Pass_AssignANewTupleOfSameType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to (3,"Apple")
  set x to (4,"Pear")
  print x
end main
`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.tuple([3, "Apple"]);
  x = system.tuple([4, "Pear"]);
  system.print(_stdlib.asString(x));
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Tuple (4, Pear)");
  });

  

  // Fails TODO

});