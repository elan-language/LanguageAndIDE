import { CodeSourceFromString } from "../../src/frames/code-source";
import { DefaultProfile } from "../../src/frames/default-profile";
import { FileImpl } from "../../src/frames/file-impl";
import { testHash, transforms, assertParses, assertStatusIsValid, assertObjectCodeIs, assertObjectCodeExecutes } from "./compiler-test-helpers";

suite("T54_With", () => {
  test("Pass_SimpleCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var a set to new Foo()
  var b set to copy a with a to 2
  print a.a
  print b.a
end main

class Foo
  constructor()
    set property.a to 1
  end constructor

  property a as Int
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = (() => {const _a = {...a}; _a.a = 2; return _a;})();
  system.printLine(_stdlib.asString(a.a));
  system.printLine(_stdlib.asString(b.a));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0]]);};
  constructor() {
    this.a = 1;
  }

  a = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });
});
