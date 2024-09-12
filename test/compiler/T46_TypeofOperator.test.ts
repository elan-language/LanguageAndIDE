import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms
} from "./compiler-test-helpers";

suite("T46_TypeMethod", () => {
  test("Pass_TypeOfStandardTypes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
async function main() {
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString("Float"));
  system.printLine(_stdlib.asString("Boolean"));
  system.printLine(_stdlib.asString("String"));
  system.printLine(_stdlib.asString("List"));
  system.printLine(_stdlib.asString("Array"));
  system.printLine(_stdlib.asString("ImmutableDictionary"));
  system.printLine(_stdlib.asString("Dictionary"));
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
    await assertObjectCodeExecutes(fileImpl, "IntFloatBooleanStringListArrayImmutableDictionaryDictionaryFoo");
  });
});
