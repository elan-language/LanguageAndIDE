import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
    assertDoesNotCompileWithId,
    assertObjectCodeExecutes,
    assertObjectCodeIs,
    assertParses,
    assertStatusIsValid,
    testHash,
    transforms,
} from "./compiler-test-helpers";

suite("Chaining", () => {
  test("Pass_SimpleChain", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {{1,2}, {3,4}}
  var b set to a.get(1).get(1)
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.immutableList([system.immutableList([1, 2]), system.immutableList([3, 4])]);
  var b = _stdlib.get(_stdlib.get(a, 1), 1);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_PropertyChain", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to new Foo()
  var b set to a.a.get(0)
  print b
end main

class Foo
  constructor()
    set property.a to {1}
  end constructor
  
  property a as {Int}
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = _stdlib.get(a.a, 0);
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()]]);};
  constructor() {
    this.a = system.immutableList([1]);
  }

  a = system.emptyImmutableList();

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_TypeError", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main 
  var a set to {[1,2], [3,4]}
  var b set to a.get(1).get(1)
  print b
end main`;

   

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    
    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types ArrayList to ImmutableList"]);
  });



});
