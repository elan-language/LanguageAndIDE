import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms
} from "./compiler-test-helpers";

suite("T56_PrivateProperties", () => {
  test("Pass_PrivatePropertyCanBeDeclared", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to new Foo()
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return p2
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.printLine(_stdlib.asString(x));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor() {
    this.p1 = 5;
    this.p2 = "Apple";
  }

  p1 = 0;

  #p2 = "";

  asString() {
    return this.p2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Fail_PrivatePropertyCannotBeAccessed", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  var s set to f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot reference private property p2"]);
  });

  test("Fail_PrivatePropertyCannotBePrinted", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot reference private property p2"]);
  });
});
