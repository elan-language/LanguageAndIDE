import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Typeof Operator", () => {
  test("Pass_TypeOfStandardTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print typeof 1
  print typeof 1.1
  print typeof false
  print typeof "a"
  print typeof {1,2,3}
  print typeof [1,2,3]
  print typeof {"a":1,"b":2,"c":3}
  print typeof ["a":1,"b":2,"c":3]
  variable foo set to new Foo()
  print typeof foo
end main

class Foo
  constructor()

  end constructor

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString("Float"));
  system.printLine(_stdlib.asString("Boolean"));
  system.printLine(_stdlib.asString("String"));
  system.printLine(_stdlib.asString("{Int}"));
  system.printLine(_stdlib.asString("[Int]"));
  system.printLine(_stdlib.asString("{String:Int}"));
  system.printLine(_stdlib.asString("[String:Int]"));
  var foo = system.initialise(new Foo());
  system.printLine(_stdlib.asString("Foo"));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "IntFloatBooleanString{Int}[Int]{String:Int}[String:Int]Foo",
    );
  });

  test("Pass_TypeOfComplexTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let a be 1
  variable b set to lambda x as Int => x * 5
  variable c set to empty [Int]
  variable d set to [c]
  variable e set to {c, c}
  variable f set to [c:d]
  variable g set to {e:d}
  variable h set to (e,d)
  
  print typeof a
  print typeof b
  print typeof c
  print typeof d
  print typeof e
  print typeof f
  print typeof g
  print typeof h
  print typeof hh
  print typeof ii
  print typeof u
end main

procedure hh(a as Int)
  variable b set to a
end procedure

function ii(a as Int) returns Int
  return a
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const a = 1;
  var b = (x) => x * 5;
  var c = system.emptyArray();
  var d = system.literalArray([c]);
  var e = system.list([c, c]);
  var f = system.dictionary({[c] : d});
  var g = system.dictionaryImmutable({[e] : d});
  var h = system.tuple([e, d]);
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString("Func<of Int => Int>"));
  system.printLine(_stdlib.asString("[Int]"));
  system.printLine(_stdlib.asString("[[Int]]"));
  system.printLine(_stdlib.asString("{[Int]}"));
  system.printLine(_stdlib.asString("[[Int]:[[Int]]]"));
  system.printLine(_stdlib.asString("{{[Int]}:[[Int]]}"));
  system.printLine(_stdlib.asString("({[Int]}, [[Int]])"));
  system.printLine(_stdlib.asString("Procedure (Int)"));
  system.printLine(_stdlib.asString("Func<of Int => Int>"));
  system.printLine(_stdlib.asString("Unknown"));
}

async function hh(a) {
  var b = a;
}

function ii(a) {
  return a;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "IntFunc<of Int => Int>[Int][[Int]]{[Int]}[[Int]:[[Int]]]{{[Int]}:[[Int]]}({[Int]}, [[Int]])Procedure (Int)Func<of Int => Int>Unknown",
    );
  });

  test("Pass_AssignType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ""
  set a to typeof a
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = "";
  a = "String";
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "String");
  });

  test("Pass_UseType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to ""
  variable b set to typeof a
  if typeof a is typeof b
    then
      print "Pass"
    else 
      print "Fail"
  end if
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = "";
  var b = "String";
  if ("String" === "String") {
      system.printLine(_stdlib.asString("Pass"));
    } else {
      system.printLine(_stdlib.asString("Fail"));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Pass");
  });
});
